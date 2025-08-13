import Image from 'next/image';
import { PokemonImageProps } from '@/types/pokemon-detail';

export function PokemonImage({ src, alt }: PokemonImageProps) {
  return (
    <div className="lg:w-1/2 p-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="flex justify-center items-center h-full">
        <Image
          src={src}
          alt={alt}
          width={400}
          height={400}
          className="object-contain max-w-full h-auto"
          priority
        />
      </div>
    </div>
  );
}