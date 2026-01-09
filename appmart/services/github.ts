// GitHub API Service - Production Ready
const GITHUB_TOKEN = process.env.EXPO_PUBLIC_GITHUB_TOKEN || '';
const BASE_URL = 'https://api.github.com';

if (!GITHUB_TOKEN) {
  console.warn('⚠️ GitHub token not found. API requests may be rate limited.');
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  topics: string[];
  html_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  license: {
    name: string;
    spdx_id: string;
  } | null;
  open_issues_count: number;
  default_branch: string;
}

export interface SearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepo[];
}

export interface ReleaseAsset {
  id: number;
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
  content_type: string;
  created_at: string;
}

export interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  created_at: string;
  published_at: string;
  assets: ReleaseAsset[];
  prerelease: boolean;
  draft: boolean;
}

const headers = {
  'Accept': 'application/vnd.github+json',
  'Authorization': `Bearer ${GITHUB_TOKEN}`,
  'X-GitHub-Api-Version': '2022-11-28',
};

// Search repositories
export async function searchRepositories(
  query: string,
  options?: {
    sort?: 'stars' | 'forks' | 'updated' | 'help-wanted-issues';
    order?: 'desc' | 'asc';
    per_page?: number;
    page?: number;
  }
): Promise<SearchResponse> {
  const params = new URLSearchParams({
    q: query,
    sort: options?.sort || 'stars',
    order: options?.order || 'desc',
    per_page: String(options?.per_page || 50),
    page: String(options?.page || 1),
  });

  const response = await fetch(`${BASE_URL}/search/repositories?${params}`, { headers });
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  
  return response.json();
}

// Get trending repositories
export async function getTrendingRepositories(
  language?: string,
  timeRange: 'daily' | 'weekly' | 'monthly' = 'weekly'
): Promise<SearchResponse> {
  const date = new Date();
  switch (timeRange) {
    case 'daily':
      date.setDate(date.getDate() - 1);
      break;
    case 'weekly':
      date.setDate(date.getDate() - 7);
      break;
    case 'monthly':
      date.setMonth(date.getMonth() - 1);
      break;
  }
  
  const dateStr = date.toISOString().split('T')[0];
  let query = `created:>${dateStr}`;
  if (language) {
    query += ` language:${language}`;
  }
  
  return searchRepositories(query, { sort: 'stars', per_page: 100 });
}

// Get repository details
export async function getRepository(owner: string, repo: string): Promise<GitHubRepo> {
  const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}`, { headers });
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  
  return response.json();
}

// Get repository README
export async function getRepositoryReadme(owner: string, repo: string): Promise<string> {
  try {
    const response = await fetch(`${BASE_URL}/repos/${owner}/${repo}/readme`, {
      headers: {
        ...headers,
        'Accept': 'application/vnd.github.raw',
      },
    });
    
    if (!response.ok) {
      return 'No README available';
    }
    
    return response.text();
  } catch {
    return 'No README available';
  }
}

// Get repositories by category/topic
export async function getRepositoriesByTopic(
  topic: string,
  options?: {
    per_page?: number;
    page?: number;
  }
): Promise<SearchResponse> {
  return searchRepositories(`topic:${topic}`, {
    sort: 'stars',
    per_page: options?.per_page || 20,
    page: options?.page || 1,
  });
}

// Get popular open source Android apps
export async function getAndroidApps(): Promise<SearchResponse> {
  return searchRepositories('topic:android-app stars:>1000', {
    sort: 'stars',
    per_page: 30,
  });
}

// Get popular React Native apps
export async function getReactNativeApps(): Promise<SearchResponse> {
  return searchRepositories('topic:react-native stars:>500', {
    sort: 'stars',
    per_page: 30,
  });
}

// Get repository releases
export async function getRepositoryReleases(
  owner: string,
  repo: string,
  options?: {
    per_page?: number;
    page?: number;
  }
): Promise<GitHubRelease[]> {
  const params = new URLSearchParams({
    per_page: String(options?.per_page || 10),
    page: String(options?.page || 1),
  });

  try {
    const response = await fetch(
      `${BASE_URL}/repos/${owner}/${repo}/releases?${params}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch releases');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching releases:', error);
    throw error;
  }
}

// Get latest release
export async function getLatestRelease(
  owner: string,
  repo: string
): Promise<GitHubRelease | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/repos/${owner}/${repo}/releases/latest`,
      { headers }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching latest release:', error);
    return null;
  }
}

// Search by language
export async function getRepositoriesByLanguage(
  language: string,
  minStars: number = 100
): Promise<SearchResponse> {
  return searchRepositories(`language:${language} stars:>=${minStars}`, {
    sort: 'stars',
    per_page: 30,
  });
}

// Category mappings to GitHub topics
export const CATEGORY_TOPICS: Record<string, string[]> = {
  'Developer Tools': ['developer-tools', 'devtools', 'cli', 'terminal'],
  'Productivity': ['productivity', 'notes', 'todo', 'task-management'],
  'Media': ['media-player', 'video', 'audio', 'music'],
  'Games': ['game', 'android-game', 'mobile-game'],
  'Social': ['social', 'chat', 'messaging'],
  'System': ['system', 'utility', 'android-utility'],
};
