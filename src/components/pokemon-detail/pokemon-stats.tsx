import { PokemonStatsProps } from '@/types/pokemon-detail';

export function PokemonStats({ stats }: PokemonStatsProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Base Stats</h3>
      <div className="space-y-3">
        {stats.map((stat) => (
          <div key={stat.stat.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="capitalize font-medium text-gray-700">
                {stat.stat.name.replace('-', ' ')}
              </span>
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
  );
}