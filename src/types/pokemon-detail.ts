export interface BackButtonProps {
  onClick: () => void;
}

export interface PokemonImageProps {
  src: string;
  alt: string;
}

export interface PokemonHeaderProps {
  name: string;
  id: number;
  isFavorite: boolean;
  onFavoriteClick: () => void;
}

export interface TypeInfo {
  type: {
    name: string;
  };
}

export interface PokemonTypesProps {
  types: TypeInfo[];
}

export interface Ability {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

export interface PokemonBasicStatsProps {
  height: number;
  weight: number;
  baseExperience: number | null;
  abilities: Ability[];
}

export interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonStatsProps {
  stats: Stat[];
}

export interface PokemonAbilitiesProps {
  abilities: Ability[];
}