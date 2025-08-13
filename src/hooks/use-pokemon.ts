import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '@/lib/pokemon-api';

export function usePokemonList(limit: number = 20, offset: number = 0) {
  return useQuery({
    queryKey: ['pokemon', 'list', limit, offset],
    queryFn: () => pokemonApi.getPokemonList(limit, offset),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePokemonDetail(idOrName: string | number) {
  return useQuery({
    queryKey: ['pokemon', 'detail', idOrName],
    queryFn: () => pokemonApi.getPokemonDetail(idOrName),
    enabled: !!idOrName,
    staleTime: 10 * 60 * 1000,
  });
}

export function usePokemonSearch(query: string) {
  return useQuery({
    queryKey: ['pokemon', 'search', query],
    queryFn: () => pokemonApi.searchPokemon(query),
    enabled: !!query && query.length > 0,
    staleTime: 2 * 60 * 1000,
  });
}

export function usePokemonListWithDetails(
  limit: number = 20, 
  offset: number = 0
) {
  return useQuery({
    queryKey: ['pokemon', 'list-with-details', limit, offset],
    queryFn: async () => {
      const listResponse = await pokemonApi.getPokemonList(limit, offset);
      
      const pokemonWithDetails = await Promise.all(
        listResponse.results.map(async (pokemon) => {
          const id = pokemonApi.extractIdFromUrl(pokemon.url);
          const detail = await pokemonApi.getPokemonDetail(id);
          return pokemonApi.mapPokemonDetail(detail);
        })
      );

      return {
        ...listResponse,
        results: pokemonWithDetails,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}