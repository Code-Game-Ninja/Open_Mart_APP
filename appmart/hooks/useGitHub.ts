import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import {
  searchRepositories,
  getTrendingRepositories,
  getRepository,
  getRepositoryReadme,
  getRepositoriesByTopic,
  getAndroidApps,
  SearchResponse,
  GitHubRepo,
} from '@/services/github';

// Hook for trending repositories
export function useTrendingRepos(timeRange: 'daily' | 'weekly' | 'monthly' = 'weekly') {
  return useQuery({
    queryKey: ['trending', timeRange],
    queryFn: () => getTrendingRepositories(undefined, timeRange),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

// Hook for searching repositories
export function useSearchRepos(query: string, enabled = true) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchRepositories(query, { per_page: 30 }),
    enabled: enabled && query.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Hook for infinite search with pagination
export function useInfiniteSearchRepos(query: string) {
  return useInfiniteQuery({
    queryKey: ['infiniteSearch', query],
    queryFn: ({ pageParam = 1 }) => 
      searchRepositories(query, { per_page: 20, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.items.length < 20) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
    enabled: query.length > 0,
  });
}

// Hook for repository details
export function useRepository(owner: string, repo: string) {
  return useQuery({
    queryKey: ['repo', owner, repo],
    queryFn: () => getRepository(owner, repo),
    enabled: !!owner && !!repo,
    staleTime: 1000 * 60 * 5,
  });
}

// Hook for repository README
export function useRepositoryReadme(owner: string, repo: string) {
  return useQuery({
    queryKey: ['readme', owner, repo],
    queryFn: () => getRepositoryReadme(owner, repo),
    enabled: !!owner && !!repo,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

// Hook for repositories by topic/category
export function useReposByTopic(topic: string) {
  return useQuery({
    queryKey: ['topic', topic],
    queryFn: () => getRepositoriesByTopic(topic, { per_page: 30 }),
    enabled: !!topic,
    staleTime: 1000 * 60 * 10,
  });
}

// Hook for Android apps
export function useAndroidApps() {
  return useQuery({
    queryKey: ['android-apps'],
    queryFn: getAndroidApps,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}

// Hook for featured repositories (combination of trending and popular)
export function useFeaturedRepos() {
  return useQuery({
    queryKey: ['featured'],
    queryFn: async () => {
      const [trending, popular] = await Promise.all([
        getTrendingRepositories(undefined, 'weekly'),
        searchRepositories('stars:>50000', { sort: 'stars', per_page: 10 }),
      ]);
      
      // Combine and deduplicate
      const allRepos = [...trending.items, ...popular.items];
      const uniqueRepos = allRepos.filter(
        (repo, index, self) => index === self.findIndex(r => r.id === repo.id)
      );
      
      return {
        total_count: uniqueRepos.length,
        incomplete_results: false,
        items: uniqueRepos.slice(0, 30),
      } as SearchResponse;
    },
    staleTime: 1000 * 60 * 10,
  });
}
