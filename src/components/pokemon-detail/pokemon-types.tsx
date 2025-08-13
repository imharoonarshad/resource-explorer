import { getTypeColor } from '@/lib/pokemon-types';
import { PokemonTypesProps } from '@/types/pokemon-detail';

export function PokemonTypes({ types }: PokemonTypesProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-900">Types</h3>
      <div className="flex gap-2">
        {types.map((typeInfo) => (
          <span
            key={typeInfo.type.name}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${getTypeColor(typeInfo.type.name)}`}
          >
            {typeInfo.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}