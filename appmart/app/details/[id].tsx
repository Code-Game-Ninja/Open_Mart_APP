import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import { getRepository, getRepositoryReadme, getRepositoryReleases, getLatestRelease } from '@/services/github';
import { useFavoritesStore } from '@/store/favorites';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import ReleasesModal from '@/components/ReleasesModal';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RepoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const [showReleases, setShowReleases] = useState(false);

  // Parse owner/repo from the id (format: owner__repo with double underscore separator)
  const [owner, repoName] = (id || '').split('__');
  
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const { data: repo, isLoading, error } = useQuery({
    queryKey: ['repo', owner, repoName],
    queryFn: () => getRepository(owner, repoName),
    enabled: !!owner && !!repoName,
  });

  const { data: readme } = useQuery({
    queryKey: ['readme', owner, repoName],
    queryFn: () => getRepositoryReadme(owner, repoName),
    enabled: !!owner && !!repoName,
  });

  const { data: releases } = useQuery({
    queryKey: ['releases', owner, repoName],
    queryFn: () => getRepositoryReleases(owner, repoName, { per_page: 20 }),
    enabled: !!owner && !!repoName,
  });

  const { data: latestRelease } = useQuery({
    queryKey: ['latest-release', owner, repoName],
    queryFn: () => getLatestRelease(owner, repoName),
    enabled: !!owner && !!repoName,
  });

  const favorite = repo ? isFavorite(repo.id) : false;

  useEffect(() => {
    if (repo) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [repo]);

  const handleFavoritePress = () => {
    if (!repo) return;
    if (favorite) {
      removeFavorite(repo.id);
    } else {
      addFavorite(repo);
    }
  };

  const handleOpenGitHub = () => {
    if (repo?.html_url) {
      Linking.openURL(repo.html_url);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return String(num);
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const themeColors = {
    background: isDark ? '#0F172A' : '#fff',
    card: isDark ? '#1E293B' : '#fff',
    text: isDark ? '#F1F5F9' : '#111827',
    subtext: isDark ? '#94A3B8' : '#6B7280',
    border: isDark ? '#334155' : '#E5E7EB',
    infoLabel: isDark ? '#64748B' : '#6B7280',
    readme: isDark ? '#1E293B' : '#F9FAFB',
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !repo) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: themeColors.background }]}>
        <EmptyState
          icon="alert-circle-outline"
          title="Repository Not Found"
          subtitle="Unable to load repository details."
          actionLabel="Go Back"
          onAction={() => router.back()}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerTintColor: '#fff',
        }}
      />
      <StatusBar style="light" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.banner}>
          <Image
            source={{ uri: repo.owner.avatar_url }}
            blurRadius={20}
            style={styles.bannerImage}
          />
          <View style={styles.bannerOverlay}>
            <Animated.View
              style={[
                styles.appHeader,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <Image
                source={{ uri: repo.owner.avatar_url }}
                style={styles.appIcon}
              />
              <View style={styles.appInfo}>
                <Text style={styles.appName}>{repo.name}</Text>
                <Text style={styles.appAuthor}>by {repo.owner.login}</Text>
              </View>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={handleFavoritePress}
              >
                <Ionicons
                  name={favorite ? 'heart' : 'heart-outline'}
                  size={26}
                  color={favorite ? '#EF4444' : '#fff'}
                />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>

        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Stats */}
          <View style={[styles.statsContainer, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
            <View style={[styles.statItem, styles.statBorder, { borderColor: themeColors.border }]}>
              <Ionicons name="star" size={20} color="#F59E0B" />
              <Text style={[styles.statValue, { color: themeColors.text }]}>{formatNumber(repo.stargazers_count)}</Text>
              <Text style={[styles.statLabel, { color: themeColors.subtext }]}>Stars</Text>
            </View>
            <View style={[styles.statItem, styles.statBorder, { borderColor: themeColors.border }]}>
              <Ionicons name="git-branch-outline" size={20} color="#10B981" />
              <Text style={[styles.statValue, { color: themeColors.text }]}>{formatNumber(repo.forks_count)}</Text>
              <Text style={[styles.statLabel, { color: themeColors.subtext }]}>Forks</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="eye-outline" size={20} color="#6366F1" />
              <Text style={[styles.statValue, { color: themeColors.text }]}>{formatNumber(repo.watchers_count)}</Text>
              <Text style={[styles.statLabel, { color: themeColors.subtext }]}>Watchers</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>About</Text>
          <Text style={[styles.description, { color: themeColors.subtext }]}>
            {repo.description || 'No description available'}
          </Text>

          {/* Topics/Tags */}
          {repo.topics && repo.topics.length > 0 && (
            <View style={styles.tagsContainer}>
              {repo.topics.slice(0, 8).map((topic) => (
                <View key={topic} style={[styles.tag, { backgroundColor: isDark ? 'rgba(59, 130, 246, 0.2)' : '#EFF6FF' }]}>
                  <Text style={[styles.tagText, { color: isDark ? '#60A5FA' : '#2563EB' }]}>{topic}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Info */}
          <View style={[styles.infoSection, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
            {repo.language && (
              <View style={styles.infoRow}>
                <Ionicons name="code-slash-outline" size={18} color={themeColors.infoLabel} />
                <Text style={[styles.infoLabel, { color: themeColors.infoLabel }]}>Language</Text>
                <Text style={[styles.infoValue, { color: themeColors.text }]}>{repo.language}</Text>
              </View>
            )}
            {repo.license && (
              <View style={styles.infoRow}>
                <Ionicons name="document-text-outline" size={18} color={themeColors.infoLabel} />
                <Text style={[styles.infoLabel, { color: themeColors.infoLabel }]}>License</Text>
                <Text style={[styles.infoValue, { color: themeColors.text }]}>{repo.license.spdx_id}</Text>
              </View>
            )}
            <View style={styles.infoRow}>
              <Ionicons name="git-commit-outline" size={18} color={themeColors.infoLabel} />
              <Text style={[styles.infoLabel, { color: themeColors.infoLabel }]}>Default Branch</Text>
              <Text style={[styles.infoValue, { color: themeColors.text }]}>{repo.default_branch}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={18} color={themeColors.infoLabel} />
              <Text style={[styles.infoLabel, { color: themeColors.infoLabel }]}>Last Updated</Text>
              <Text style={[styles.infoValue, { color: themeColors.text }]}>{formatDate(repo.pushed_at)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="alert-circle-outline" size={18} color={themeColors.infoLabel} />
              <Text style={[styles.infoLabel, { color: themeColors.infoLabel }]}>Open Issues</Text>
              <Text style={[styles.infoValue, { color: themeColors.text }]}>{repo.open_issues_count}</Text>
            </View>
          </View>

          {/* README Preview */}
          {readme && readme !== 'No README available' && (
            <>
              <Text style={[styles.sectionTitle, { color: themeColors.text }]}>README</Text>
              <View style={[styles.readmeContainer, { backgroundColor: themeColors.readme }]}>
                <Text style={[styles.readmeText, { color: themeColors.subtext }]} numberOfLines={15}>
                  {readme.substring(0, 800)}
                  {readme.length > 800 ? '...' : ''}
                </Text>
              </View>
            </>
          )}

          <View style={{ height: 120 }} />
        </Animated.View>
      </ScrollView>

      {/* Footer with Download Button */}
      <View style={[styles.footer, { backgroundColor: themeColors.background, borderTopColor: themeColors.border }]}>
        {releases && releases.length > 0 && (
          <TouchableOpacity 
            style={[styles.downloadButton, { backgroundColor: isDark ? '#10B981' : '#059669' }]} 
            onPress={() => setShowReleases(true)}
          >
            <Ionicons name="download-outline" size={24} color="white" />
            <View style={styles.downloadButtonContent}>
              <Text style={styles.downloadButtonText}>Download</Text>
              {latestRelease && (
                <Text style={styles.downloadVersionText}>
                  {latestRelease.tag_name} • {releases.length} version{releases.length > 1 ? 's' : ''}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          style={[
            releases && releases.length > 0 ? styles.githubButtonSmall : styles.openButton, 
            { backgroundColor: isDark ? '#2563EB' : '#111827' }
          ]} 
          onPress={handleOpenGitHub}
        >
          <Ionicons name="logo-github" size={24} color="white" />
          {!(releases && releases.length > 0) && (
            <Text style={styles.openButtonText}>View on GitHub</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Releases Modal */}
      {releases && (
        <ReleasesModal
          releases={releases}
          visible={showReleases}
          onClose={() => setShowReleases(false)}
          repoName={repo.name}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  banner: {
    height: 280,
    backgroundColor: '#111827',
    width: '100%',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    opacity: 0.4,
    position: 'absolute',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingTop: 100,
  },
  appHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#fff',
  },
  appInfo: {
    marginLeft: 16,
    flex: 1,
    marginBottom: 4,
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  appAuthor: {
    color: '#D1D5DB',
    fontWeight: '500',
    marginTop: 4,
  },
  favoriteButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  content: {
    padding: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statBorder: {
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 6,
  },
  statLabel: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 28,
  },
  tag: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    color: '#2563EB',
    fontWeight: '500',
    fontSize: 13,
  },
  infoSection: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 28,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  infoLabel: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  readmeContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  readmeText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    fontFamily: 'monospace',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  openButton: {
    flex: 1,
    backgroundColor: '#111827',
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  openButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  downloadButton: {
    flex: 1,
    backgroundColor: '#059669',
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  downloadButtonContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 2,
  },
  downloadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  downloadVersionText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '500',
  },
  githubButtonSmall: {
    width: 56,
    height: 56,
    backgroundColor: '#111827',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
});
