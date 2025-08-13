import Link from 'next/link';
import Image from 'next/image';
import { Pokemon } from '@/lib/pokemon-api';
import { useFavorites } from '@/hooks/use-favorites';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(pokemon.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(pokemon.id);
  };

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 cursor-pointer">
        <div className="relative">
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-0 right-0 z-10 p-1 rounded-full transition-colors ${
              isFavorite 
                ? 'text-red-500 hover:text-red-600' 
                : 'text-gray-300 hover:text-red-400'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
          
          <div className="flex justify-center mb-4">
            {pokemon.sprite && (
              <Image
                src={pokemon.sprite}
                alt={pokemon.name}
                width={96}
                height={96}
                className="object-contain"
                loading="lazy"
              />
            )}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold capitalize mb-2 text-gray-900">{pokemon.name}</h3>
          <p className="text-sm text-gray-500 mb-2">#{pokemon.id.toString().padStart(3, '0')}</p>
          
          <div className="flex flex-wrap justify-center gap-1 mb-3">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getTypeColor(type)}`}
              >
                {type}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div>
              <span className="font-medium">Height:</span> {pokemon.height / 10}m
            </div>
            <div>
              <span className="font-medium">Weight:</span> {pokemon.weight / 10}kg
            </div>
          </div>
        </div>
      </div>
    </Link>
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