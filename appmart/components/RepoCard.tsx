import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GitHubRepo } from '@/services/github';
import { Link } from 'expo-router';
import { useFavoritesStore } from '@/store/favorites';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface RepoCardProps {
  repo: GitHubRepo;
  index?: number;
}

export default function RepoCard({ repo, index = 0 }: RepoCardProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const favorite = isFavorite(repo.id);

  const themeColors = {
    card: isDark ? '#1E293B' : '#fff',
    name: isDark ? '#F1F5F9' : '#111827',
    text: isDark ? '#94A3B8' : '#6B7280',
    stat: isDark ? '#CBD5E1' : '#6B7280',
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleFavoritePress = () => {
    if (favorite) {
      removeFavorite(repo.id);
    } else {
      addFavorite(repo);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return String(num);
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY }, { scale: scaleAnim }],
        },
      ]}
    >
      <Link href={`/details/${repo.owner.login}__${repo.name}`} asChild>
        <Pressable
          style={[
            styles.card,
            {
              backgroundColor: themeColors.card,
              borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
            },
          ]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Image
            source={{ uri: repo.owner.avatar_url }}
            style={styles.avatar}
          />
          
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={[styles.name, { color: themeColors.name }]} numberOfLines={1}>
                {repo.name}
              </Text>
              <Pressable onPress={handleFavoritePress} hitSlop={10}>
                <Ionicons
                  name={favorite ? 'heart' : 'heart-outline'}
                  size={22}
                  color={favorite ? '#EF4444' : isDark ? '#64748B' : '#9CA3AF'}
                />
              </Pressable>
            </View>
            
            <Text style={[styles.owner, { color: themeColors.text }]}>by {repo.owner.login}</Text>
            
            <Text style={[styles.description, { color: themeColors.text }]} numberOfLines={2}>
              {repo.description || 'No description available'}
            </Text>
            
            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Ionicons name="star" size={14} color="#F59E0B" />
                <Text style={[styles.statText, { color: themeColors.stat }]}>{formatNumber(repo.stargazers_count)}</Text>
              </View>
              
              <View style={styles.statItem}>
                <Ionicons name="git-branch-outline" size={14} color={isDark ? '#94A3B8' : '#6B7280'} />
                <Text style={[styles.statText, { color: themeColors.stat }]}>{formatNumber(repo.forks_count)}</Text>
              </View>
              
              {repo.language && (
                <View style={[styles.languageBadge, { backgroundColor: isDark ? 'rgba(243, 244, 246, 0.1)' : '#F3F4F6' }]}>
                  <View style={[styles.languageDot, { backgroundColor: getLanguageColor(repo.language) }]} />
                  <Text style={[styles.languageText, { color: themeColors.text }]}>{repo.language}</Text>
                </View>
              )}
            </View>
          </View>
        </Pressable>
      </Link>
    </Animated.View>
  );
}

function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: '#F7DF1E',
    TypeScript: '#3178C6',
    Python: '#3776AB',
    Java: '#B07219',
    Kotlin: '#A97BFF',
    Swift: '#FA7343',
    Go: '#00ADD8',
    Rust: '#DEA584',
    Ruby: '#CC342D',
    'C++': '#F34B7D',
    C: '#555555',
    'C#': '#239120',
    PHP: '#4F5D95',
    Dart: '#00B4AB',
  };
  return colors[language] || '#6B7280';
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.06)',
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
    flex: 1,
    marginRight: 8,
    letterSpacing: -0.3,
  },
  owner: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 21,
    marginTop: 8,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 14,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  languageBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 5,
  },
  languageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  languageText: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '500',
  },
});
