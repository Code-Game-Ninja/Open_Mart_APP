import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Animated,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';

import RepoCard from '@/components/RepoCard';
import { CategoryChip, CATEGORIES } from '@/components/CategoryChip';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import { searchRepositories, getTrendingRepositories, getRepositoriesByTopic } from '@/services/github';

import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  // Background decoration bubbles
  const bubble1Anim = useRef(new Animated.Value(0)).current;
  const bubble2Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bubble1Anim, { toValue: 1, duration: 4000, useNativeDriver: true }),
        Animated.timing(bubble1Anim, { toValue: 0, duration: 4000, useNativeDriver: true })
      ])
    ).start();
    
    Animated.loop(
      Animated.sequence([
        Animated.timing(bubble2Anim, { toValue: 1, duration: 5000, useNativeDriver: true }),
        Animated.timing(bubble2Anim, { toValue: 0, duration: 5000, useNativeDriver: true })
      ])
    ).start();
  }, []);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['repos', selectedCategory.id],
    queryFn: async () => {
      if (selectedCategory.topic === '') {
        return getTrendingRepositories(undefined, 'weekly');
      }
      return getRepositoriesByTopic(selectedCategory.topic, { per_page: 100 });
    },
    staleTime: 1000 * 60 * 5,
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleCategoryPress = (category: typeof CATEGORIES[0]) => {
    setSelectedCategory(category);
  };

  const repos = data?.items || [];

  const themeColors = {
    background: isDark ? '#0F172A' : '#F8FAFC',
    text: isDark ? '#F1F5F9' : '#0F172A',
    subtext: isDark ? '#94A3B8' : '#64748B',
    bubble1: isDark ? '#3B82F6' : '#3B82F6',
    bubble2: isDark ? '#8B5CF6' : '#8B5CF6',
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Dynamic Background */}
      <View style={styles.backgroundContainer}>
        <Animated.View 
          style={[
            styles.bubble, 
            { 
              top: -50, 
              left: -50, 
              backgroundColor: themeColors.bubble1,
              transform: [
                { scale: bubble1Anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] }) },
                { translateY: bubble1Anim.interpolate({ inputRange: [0, 1], outputRange: [0, 20] }) }
              ],
              opacity: isDark ? 0.15 : 0.2 
            }
          ]} 
        />
        <Animated.View 
          style={[
            styles.bubble, 
            { 
              top: 100, 
              right: -50, 
              backgroundColor: themeColors.bubble2,
              transform: [
                { scale: bubble2Anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.3] }) },
                { translateY: bubble2Anim.interpolate({ inputRange: [0, 1], outputRange: [0, -30] }) }
              ],
              opacity: isDark ? 0.1 : 0.15 
            }
          ]} 
        />
      </View>

      <SafeAreaView style={styles.contentContainer} edges={['top']}>
        <View style={styles.header}>
          <BlurView
            intensity={isDark ? 60 : 40}
            tint={isDark ? 'dark' : 'light'}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
            <View>
              <Text style={[styles.greeting, { color: themeColors.subtext }]}>Discover</Text>
              <Text style={[styles.title, { color: themeColors.text }]}>Open Source Apps</Text>
            </View>
            <Pressable
              style={styles.searchButton}
              onPress={() => router.push('/search')}
            >
              <BlurView
                intensity={80}
                tint={isDark ? 'dark' : 'light'}
                style={{ ...StyleSheet.absoluteFillObject, borderRadius: 18 }}
              />
              <LinearGradient
                colors={isDark ? ['rgba(56, 189, 248, 0.15)', 'rgba(14, 165, 233, 0.2)'] : ['rgba(14, 165, 233, 0.1)', 'rgba(56, 189, 248, 0.15)']}
                style={[styles.searchButtonGradient, { borderColor: isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(14, 165, 233, 0.3)' }]}
              >
                <Ionicons name="search" size={24} color={isDark ? '#38BDF8' : '#0EA5E9'} />
              </LinearGradient>
            </Pressable>
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContent}
          >
            {CATEGORIES.map((category, index) => (
              <CategoryChip
                key={category.id}
                category={category}
                isSelected={selectedCategory.id === category.id}
                onPress={() => handleCategoryPress(category)}
                index={index}
              />
            ))}
          </ScrollView>
        </View>

        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <EmptyState
            icon="cloud-offline-outline"
            title="Connection Error"
            subtitle="Failed to load repositories. Check your connection."
            actionLabel="Retry"
            onAction={onRefresh}
          />
        ) : repos.length === 0 ? (
          <EmptyState
            icon="apps-outline"
            title="No Repositories Found"
            subtitle="No repositories found for this category."
          />
        ) : (
          <Animated.FlatList
            data={repos}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item, index }) => (
              <RepoCard repo={item} index={index} />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={isDark ? '#38BDF8' : '#2563EB'}
                colors={[isDark ? '#38BDF8' : '#2563EB']}
              />
            }
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Slate-50
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    zIndex: -1,
  },
  bubble: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    filter: 'blur(60px)', // Web only
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 16,
    zIndex: 10,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    backgroundColor: 'transparent',
  },
  greeting: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 2,
    letterSpacing: -0.5,
  },
  searchButton: {
    width: 52,
    height: 52,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  searchButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  categoriesContainer: {
    paddingVertical: 12,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingRight: 24,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 100,
  },
});
