import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GitHubRepo } from '@/services/github';

interface FavoritesState {
  favorites: GitHubRepo[];
  addFavorite: (repo: GitHubRepo) => void;
  removeFavorite: (repoId: number) => void;
  isFavorite: (repoId: number) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addFavorite: (repo: GitHubRepo) => {
        const { favorites } = get();
        if (!favorites.find(f => f.id === repo.id)) {
          set({ favorites: [...favorites, repo] });
        }
      },
      
      removeFavorite: (repoId: number) => {
        const { favorites } = get();
        set({ favorites: favorites.filter(f => f.id !== repoId) });
      },
      
      isFavorite: (repoId: number) => {
        const { favorites } = get();
        return favorites.some(f => f.id === repoId);
      },
      
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'appmart-favorites',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
