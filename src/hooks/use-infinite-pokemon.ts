import { useInfiniteQuery } from '@tanstack/react-query';
import { pokemonApi, Pokemon } from '@/lib/pokemon-api';

interface PokemonPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

const ITEMS_PER_PAGE = 20;

export function useInfinitePokemonList() {
  return useInfiniteQuery<PokemonPage, Error>({
    queryKey: ['pokemon', 'infinite-list'],
    queryFn: async ({ pageParam }) => {
      const offset = pageParam as number;
      const listResponse = await pokemonApi.getPokemonList(ITEMS_PER_PAGE, offset);
      
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
      } as PokemonPage;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const totalLoaded = pages.length * ITEMS_PER_PAGE;
      return totalLoaded < lastPage.count ? totalLoaded : undefined;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}