'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { usePokemonDetail } from '@/hooks/use-pokemon';
import { useFavorites } from '@/hooks/use-favorites';
import { ErrorDisplay } from '@/components/error-boundary';

export default function PokemonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const { data: pokemon, isLoading, error } = usePokemonDetail(id);
  const { favorites, toggleFavorite } = useFavorites();
  
  const isFavorite = pokemon && favorites.includes(pokemon.id);
  
  const handleFavoriteClick = () => {
    if (pokemon) {
      toggleFavorite(pokemon.id);
    }
  };
  
  const handleBack = () => {
    router.back();
  };
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="container mx-auto">
          <button
            onClick={handleBack}
            className="mb-4 inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to List
          </button>
          <ErrorDisplay error={error as Error} retry={() => window.location.reload()} />
        </div>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="container mx-auto">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-24 mb-8"></div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="w-96 h-96 bg-gray-200 rounded-lg mx-auto"></div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-48"></div>
                  <div className="h-6 bg-gray-200 rounded w-32"></div>
                  <div className="flex gap-2">
                    <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
                    <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-16 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!pokemon) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to List
        </button>
        
        {/* Pokemon Detail Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-1/2 p-8 bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="flex justify-center items-center h-full">
                {pokemon.sprites?.other?.['official-artwork']?.front_default && (
                  <Image
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    alt={pokemon.name}
                    width={400}
                    height={400}
                    className="object-contain max-w-full h-auto"
                    priority
                  />
                )}
              </div>
            </div>
            
            {/* Info Section */}
            <div className="lg:w-1/2 p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 capitalize mb-2">
                    {pokemon.name}
                  </h1>
                  <p className="text-xl text-gray-500">
                    #{pokemon.id.toString().padStart(3, '0')}
                  </p>
                </div>
                
                <button
                  onClick={handleFavoriteClick}
                  className={`p-3 rounded-full transition-colors ${
                    isFavorite 
                      ? 'text-red-500 hover:text-red-600 bg-red-50' 
                      : 'text-gray-300 hover:text-red-400 bg-gray-50'
                  }`}
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>
              
              {/* Types */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Types</h3>
                <div className="flex gap-2">
                  {pokemon.types.map((typeInfo) => (
                    <span
                      key={typeInfo.type.name}
                      className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${getTypeColor(typeInfo.type.name)}`}
                    >
                      {typeInfo.type.name}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Basic Stats */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-600">Height</h4>
                  <p className="text-2xl font-bold text-gray-900">
                    {pokemon.height / 10}m
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-600">Weight</h4>
                  <p className="text-2xl font-bold text-gray-900">
                    {pokemon.weight / 10}kg
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-600">Base Experience</h4>
                  <p className="text-2xl font-bold text-gray-900">
                    {pokemon.base_experience || 'N/A'}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-600">Abilities</h4>
                  <p className="text-sm text-gray-900 capitalize">
                    {pokemon.abilities.length}
                  </p>
                </div>
              </div>
              
              {/* Stats */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Base Stats</h3>
                <div className="space-y-3">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize font-medium text-gray-700">{stat.stat.name.replace('-', ' ')}</span>
                        <span className="font-bold text-gray-900">{stat.base_stat}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Abilities */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Abilities</h3>
                <div className="space-y-2">
                  {pokemon.abilities.map((ability, index) => (
                    <div
                      key={index}
                      className={`px-3 py-2 rounded-lg border ${
                        ability.is_hidden 
                          ? 'bg-purple-50 border-purple-200' 
                          : 'bg-blue-50 border-blue-200'
                      }`}
                    >
                      <span className="capitalize font-medium">
                        {ability.ability.name.replace('-', ' ')}
                      </span>
                      {ability.is_hidden && (
                        <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          Hidden
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    normal: 'bg-gray-200 text-gray-800',
    fire: 'bg-red-200 text-red-800',
    water: 'bg-blue-200 text-blue-800',
    electric: 'bg-yellow-200 text-yellow-800',
    grass: 'bg-green-200 text-green-800',
    ice: 'bg-cyan-200 text-cyan-800',
    fighting: 'bg-orange-200 text-orange-800',
    poison: 'bg-purple-200 text-purple-800',
    ground: 'bg-yellow-300 text-yellow-900',
    flying: 'bg-indigo-200 text-indigo-800',
    psychic: 'bg-pink-200 text-pink-800',
    bug: 'bg-lime-200 text-lime-800',
    rock: 'bg-amber-200 text-amber-800',
    ghost: 'bg-violet-200 text-violet-800',
    dragon: 'bg-indigo-300 text-indigo-900',
    dark: 'bg-gray-800 text-gray-100',
    steel: 'bg-slate-200 text-slate-800',
    fairy: 'bg-pink-100 text-pink-700',
  };
  return colors[type] || 'bg-gray-200 text-gray-800';
}