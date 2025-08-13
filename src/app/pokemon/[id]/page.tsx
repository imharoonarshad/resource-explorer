'use client';

import { useParams, useRouter } from 'next/navigation';
import { usePokemonDetail } from '@/hooks/use-pokemon';
import { useFavorites } from '@/hooks/use-favorites';
import { ErrorDisplay } from '@/components/error-boundary';
import {
  BackButton,
  PokemonDetailSkeleton,
  PokemonImage,
  PokemonHeader,
  PokemonTypes,
  PokemonBasicStats,
  PokemonStats,
  PokemonAbilities
} from '@/components/pokemon-detail';

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
          <BackButton onClick={handleBack} />
          <ErrorDisplay error={error as Error} retry={() => window.location.reload()} />
        </div>
      </div>
    );
  }
  
  if (isLoading) {
    return <PokemonDetailSkeleton />;
  }
  
  if (!pokemon) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <BackButton onClick={handleBack} />
        
        {/* Pokemon Detail Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            {pokemon.sprites?.other?.['official-artwork']?.front_default && (
              <PokemonImage
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
              />
            )}
            
            {/* Info Section */}
            <div className="lg:w-1/2 p-8">
              <PokemonHeader
                name={pokemon.name}
                id={pokemon.id}
                isFavorite={isFavorite || false}
                onFavoriteClick={handleFavoriteClick}
              />
              
              <PokemonTypes types={pokemon.types} />
              
              <PokemonBasicStats
                height={pokemon.height}
                weight={pokemon.weight}
                baseExperience={pokemon.base_experience}
                abilities={pokemon.abilities}
              />
              
              <PokemonStats stats={pokemon.stats} />
              
              <PokemonAbilities abilities={pokemon.abilities} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}