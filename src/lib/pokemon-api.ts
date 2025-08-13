export interface Pokemon {
  id: number;
  name: string;
  url: string;
  sprite: string;
  types: string[];
  height: number;
  weight: number;
  base_experience: number;
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
  abilities: Array<{
    ability: { name: string; url: string };
    is_hidden: boolean;
  }>;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: { name: string; url: string };
  }>;
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
  abilities: Array<{
    ability: { name: string; url: string };
    is_hidden: boolean;
  }>;
}

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonApi = {
  async getPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon list');
    }
    return response.json();
  },

  async getPokemonDetail(idOrName: string | number): Promise<PokemonDetail> {
    const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon details');
    }
    return response.json();
  },

  async searchPokemon(query: string): Promise<Pokemon[]> {
    // For search, we'll fetch a larger list and filter client-side
    // In a real app, you might use a different endpoint or service
    const response = await fetch(`${BASE_URL}/pokemon?limit=1000`);
    if (!response.ok) {
      throw new Error('Failed to search Pokemon');
    }
    const data: PokemonListResponse = await response.json();
    
    const filtered = data.results.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );

    // Fetch details for filtered results (limit to 20 for performance)
    const detailedPokemon = await Promise.all(
      filtered.slice(0, 20).map(async (pokemon) => {
        const detail = await this.getPokemonDetail(pokemon.name);
        return this.mapPokemonDetail(detail);
      })
    );

    return detailedPokemon;
  },

  mapPokemonDetail(detail: PokemonDetail): Pokemon {
    return {
      id: detail.id,
      name: detail.name,
      url: `${BASE_URL}/pokemon/${detail.id}`,
      sprite: detail.sprites.other['official-artwork']?.front_default || detail.sprites.front_default,
      types: detail.types.map(t => t.type.name),
      height: detail.height,
      weight: detail.weight,
      base_experience: detail.base_experience,
      stats: detail.stats,
      abilities: detail.abilities,
    };
  },

  extractIdFromUrl(url: string): number {
    const matches = url.match(/\/pokemon\/(\d+)\//);
    return matches ? parseInt(matches[1]) : 0;
  }
};