import { PokemonHeaderProps } from '@/types/pokemon-detail';

export function PokemonHeader({ name, id, isFavorite, onFavoriteClick }: PokemonHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-4">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 capitalize mb-2">
          {name}
        </h1>
        <p className="text-xl text-gray-500">
          #{id.toString().padStart(3, '0')}
        </p>
      </div>
      
      <button
        onClick={onFavoriteClick}
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
  );
}