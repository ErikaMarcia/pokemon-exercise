export type PokemonType =
  | "normal" | "fire" | "water" | "grass" | "electric" | "ice" | "fighting"
  | "poison" | "ground" | "flying" | "psychic" | "bug" | "rock" | "ghost"
  | "dragon" | "dark" | "steel" | "fairy";

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  image?: string;
  officialArtwork?: string;
  height?: number;
  weight?: number;
  abilities?: string[];
  stats?: { name: string; value: number }[];
}
