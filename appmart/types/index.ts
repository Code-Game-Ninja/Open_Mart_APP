export interface App {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  author: string;
  stars: number;
  tags: string[];
  category: string;
  updatedAt: string;
  downloads: number;
  platform: ('android' | 'ios' | 'web' | 'windows' | 'macos' | 'linux')[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}
