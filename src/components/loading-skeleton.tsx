export function PokemonCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 bg-gray-200 rounded"></div>
      </div>
      <div className="text-center">
        <div className="h-6 bg-gray-200 rounded mb-2 w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-1/4 mx-auto"></div>
        <div className="flex justify-center gap-1 mb-3">
          <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function PokemonListSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <PokemonCardSkeleton key={i} />
      ))}
    </div>
  );
}