import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  // Favorites
  favorites: number[];
  toggleFavorite: (pokemonId: number) => void;
  isFavorite: (pokemonId: number) => boolean;
  clearFavorites: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Favorites
      favorites: [],
      toggleFavorite: (pokemonId: number) => {
        set((state) => ({
          favorites: state.favorites.includes(pokemonId)
            ? state.favorites.filter(id => id !== pokemonId)
            : [...state.favorites, pokemonId]
        }));
      },
      isFavorite: (pokemonId: number) => get().favorites.includes(pokemonId),
      clearFavorites: () => set({ favorites: [] })
    }),
    {
      name: 'pokemon-store',
      skipHydration: true
    }
  )
);