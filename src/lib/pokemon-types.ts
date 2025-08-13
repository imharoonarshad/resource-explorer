export function getTypeColor(type: string): string {
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