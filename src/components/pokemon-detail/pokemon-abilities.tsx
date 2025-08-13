import { PokemonAbilitiesProps } from '@/types/pokemon-detail';

export function PokemonAbilities({ abilities }: PokemonAbilitiesProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Abilities</h3>
      <div className="space-y-2">
        {abilities.map((ability, index) => (
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
  );
}