'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePokemonSearch } from '@/hooks/use-pokemon';
import { useInfinitePokemonList } from '@/hooks/use-infinite-pokemon';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useFavorites } from '@/hooks/use-favorites';
import PokemonCard from '@/components/pokemon-card';
import { PokemonListSkeleton } from '@/components/loading-skeleton';
import { ErrorDisplay, EmptyState } from '@/components/error-boundary';
import type { Pokemon } from '@/lib/pokemon-api';

interface PokemonPage {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export default function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const query = searchParams.get('q') || '';
  const typeFilter = searchParams.get('type') || '';
  const sortBy = searchParams.get('sort') || 'id';
  const showFavorites = searchParams.get('favorites') === 'true';
  
  const { favorites } = useFavorites();
  const { ref: loadMoreRef, isIntersecting } = useIntersectionObserver();
  
  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  // Fetch data based on search or infinite list
  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError,
  } = usePokemonSearch(debouncedQuery);
  
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: infiniteLoading,
    error: infiniteError,
  } = useInfinitePokemonList();
  
  // Load more when intersection observer triggers
  useEffect(() => {
    console.log('Infinite scroll check:', {
      isIntersecting,
      hasNextPage,
      isFetchingNextPage,
      debouncedQuery,
      shouldFetch: isIntersecting && hasNextPage && !isFetchingNextPage && !debouncedQuery
    });
    
    if (isIntersecting && hasNextPage && !isFetchingNextPage && !debouncedQuery) {
      const timer = setTimeout(() => {
        console.log('Fetching next page...');
        fetchNextPage();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, debouncedQuery, fetchNextPage]);
  
  const isLoading = debouncedQuery ? searchLoading : infiniteLoading;
  const error = debouncedQuery ? searchError : infiniteError;
  
  // Get Pokemon data
  const pokemon = useMemo(() => {
    if (debouncedQuery && searchData) {
      return searchData;
    } else if (!debouncedQuery && infiniteData) {
      return infiniteData.pages.flatMap((page) => (page as PokemonPage).results || []);
    }
    return [];
  }, [debouncedQuery, searchData, infiniteData]);
  
  // Filter and sort Pokemon
  const processedPokemon = useCallback(() => {
    let filtered = [...pokemon];
    
    // Filter by favorites
    if (showFavorites) {
      filtered = filtered.filter(p => favorites.includes(p.id));
    }
    
    // Filter by type
    if (typeFilter) {
      filtered = filtered.filter(p => p.types.includes(typeFilter));
    }
    
    // Sort Pokemon
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'type':
          return a.types[0].localeCompare(b.types[0]);
        case 'height':
          return b.height - a.height;
        case 'weight':
          return b.weight - a.weight;
        default: // 'id'
          return a.id - b.id;
      }
    });
    
    return filtered;
  }, [pokemon, showFavorites, favorites, typeFilter, sortBy]);
  
  const filteredPokemon = processedPokemon();
  
  // Update URL with query parameters
  const updateSearchParams = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    
    // Remove page param as we're using infinite scroll
    params.delete('page');
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);
  
  const handleSearch = (newQuery: string) => {
    updateSearchParams({ q: newQuery });
  };
  
  const handleTypeFilter = (type: string) => {
    updateSearchParams({ type: type === typeFilter ? null : type });
  };
  
  const handleSort = (sort: string) => {
    updateSearchParams({ sort });
  };
  
  const handleFavoriteFilter = () => {
    updateSearchParams({ favorites: showFavorites ? null : 'true' });
  };
  
  // Get all unique types from current Pokemon
  const availableTypes = [...new Set(pokemon.flatMap(p => p.types))].sort();
  
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-gray-50 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-between items-start mb-4">
              <div></div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Resource Explorer</h1>
                <p className="text-gray-600">Discover and explore Pokemon with advanced search and filtering</p>
              </div>
              <div></div>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search Pokemon..."
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="id">Sort by ID</option>
                  <option value="name">Sort by Name</option>
                  <option value="type">Sort by Type</option>
                  <option value="height">Sort by Height</option>
                  <option value="weight">Sort by Weight</option>
                </select>
                
                <select
                  value={typeFilter}
                  onChange={(e) => handleTypeFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  {availableTypes.map(type => (
                    <option key={type} value={type} className="capitalize">
                      {type}
                    </option>
                  ))}
                </select>
                
                <button
                  onClick={handleFavoriteFilter}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    showFavorites
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  ❤️ Favorites ({favorites.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div id="scroll-container" className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          {/* Content */}
          {error && (
            <ErrorDisplay 
              error={error as Error} 
              retry={() => window.location.reload()} 
            />
          )}
          
          {isLoading && <PokemonListSkeleton />}
          
          {!isLoading && !error && filteredPokemon.length === 0 && (
            <EmptyState
              title={showFavorites ? "No favorites yet" : "No Pokemon found"}
              description={
                showFavorites 
                  ? "Start adding Pokemon to your favorites by clicking the heart icon."
                  : query 
                    ? `No Pokemon match your search for "${query}"`
                    : "Try adjusting your filters."
              }
            />
          )}
          
          {!isLoading && !error && filteredPokemon.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {filteredPokemon.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
              </div>
              
              {/* Infinite scroll trigger */}
              {!debouncedQuery && hasNextPage && (
                <div ref={loadMoreRef} className="flex justify-center items-center py-8">
                  {isFetchingNextPage ? (
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      Loading more...
                    </div>
                  ) : (
                    <div className="text-gray-400">
                      Scroll down to load more
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}