export function PokemonDetailSkeleton() {
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