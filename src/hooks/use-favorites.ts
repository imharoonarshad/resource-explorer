import { useStore } from '@/store/use-store';
import { startTransition } from 'react';

export function useFavorites() {
  const { favorites, toggleFavorite: storeToggleFavorite, isFavorite, clearFavorites } = useStore();

  const toggleFavorite = (pokemonId: number) => {
    startTransition(() => {
      storeToggleFavorite(pokemonId);
    });
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    isLoaded: true,
  };
}