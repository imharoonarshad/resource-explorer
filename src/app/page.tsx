import { Suspense } from 'react';
import HomeContent from '@/components/home-content';
import { PokemonListSkeleton } from '@/components/loading-skeleton';

export default function Home() {
  return (
    <Suspense fallback={<PokemonListSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}