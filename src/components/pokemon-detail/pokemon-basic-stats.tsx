import { PokemonBasicStatsProps } from '@/types/pokemon-detail';

export function PokemonBasicStats({ height, weight, baseExperience, abilities }: PokemonBasicStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-6 mb-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-600">Height</h4>
        <p className="text-2xl font-bold text-gray-900">
          {height / 10}m
        </p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-600">Weight</h4>
        <p className="text-2xl font-bold text-gray-900">
          {weight / 10}kg
        </p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-600">Base Experience</h4>
        <p className="text-2xl font-bold text-gray-900">
          {baseExperience || 'N/A'}
        </p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-600">Abilities</h4>
        <p className="text-sm text-gray-900 capitalize">
          {abilities.length}
        </p>
      </div>
    </div>
  );
}