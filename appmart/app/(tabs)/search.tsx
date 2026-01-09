import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

import SearchInput from '@/components/SearchInput';
import RepoCard from '@/components/RepoCard';
import EmptyState from '@/components/EmptyState';
import { searchRepositories } from '@/services/github';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const headerAnim = useRef(new Animated.Value(0)).current;
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleQueryChange = (text: string) => {
    setQuery(text);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(text);
    }, 400);
  };

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchRepositories(debouncedQuery, { per_page: 50 }),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 2,
  });

  const repos = data?.items || [];
  const showLoading = isLoading && debouncedQuery.length >= 2;
  const showResults = !isLoading && repos.length > 0;
  const showEmpty = !isLoading && debouncedQuery.length >= 2 && repos.length === 0;
  const showInitial = debouncedQuery.length < 2;

  const themeColors = {
    background: isDark ? '#0F172A' : '#F8FAFC',
    text: isDark ? '#F1F5F9' : '#111827',
    subtext: isDark ? '#94A3B8' : '#6B7280',
    indicator: isDark ? '#38BDF8' : '#2563EB',
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]} edges={['top']}>
      <Animated.View
        style={[
          styles.header,
          {
            opacity: headerAnim,
            transform: [{
              translateY: headerAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            }],
          },
        ]}
      >
        <BlurView
          intensity={isDark ? 60 : 40}
          tint={isDark ? 'dark' : 'light'}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
          <Text style={[styles.title, { color: themeColors.text }]}>Search</Text>
          <Text style={[styles.subtitle, { color: themeColors.subtext }]}>Find repositories on GitHub</Text>
          
          <View style={styles.searchContainer}>
            <SearchInput
              value={query}
              onChangeText={handleQueryChange}
              placeholder="Search repositories..."
              autoFocus
            />
          </View>
        </View>
        
        {isFetching && !isLoading && (
          <View style={styles.fetchingIndicator}>
            <ActivityIndicator size="small" color={themeColors.indicator} />
            <Text style={[styles.fetchingText, { color: themeColors.subtext }]}>Searching...</Text>
          </View>
        )}
      </Animated.View>

      {showLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={themeColors.indicator} />
          <Text style={[styles.loadingText, { color: themeColors.subtext }]}>Searching repositories...</Text>
        </View>
      )}

      {showInitial && (
        <EmptyState
          icon="search"
          title="Start Searching"
          subtitle="Enter at least 2 characters to search for repositories"
        />
      )}

      {showEmpty && (
        <EmptyState
          icon="file-tray-outline"
          title="No Results"
          subtitle={`No repositories found for "${debouncedQuery}"`}
        />
      )}

      {error && (
        <EmptyState
          icon="warning-outline"
          title="Search Failed"
          subtitle="An error occurred while searching. Please try again."
        />
      )}

      {showResults && (
        <>
          <View style={styles.resultsHeader}>
            <Text style={[styles.resultsCount, { color: themeColors.subtext }]}>
              {data?.total_count.toLocaleString()} results
            </Text>
          </View>
          
          <FlatList
            data={repos}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item, index }) => (
              <RepoCard repo={item} index={index} />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            onScrollBeginDrag={() => Keyboard.dismiss()}
            keyboardShouldPersistTaps="handled"
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingBottom: 8,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 4,
  },
  searchContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  fetchingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 8,
  },
  fetchingText: {
    fontSize: 13,
    color: '#6B7280',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 15,
    color: '#6B7280',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  resultsCount: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  listContent: {
    paddingTop: 4,
    paddingBottom: 100,
    gap: 4,
  },
});
