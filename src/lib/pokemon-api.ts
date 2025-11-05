import { Pokemon } from './types';
import path from 'path';
import fs from 'fs/promises';

const POKEAPI_LIST = 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0';
const POKEAPI_POKEMON = (id: number | string) => `https://pokeapi.co/api/v2/pokemon/${id}`;

async function readLocalSample(): Promise<Pokemon[]> {
  const p = path.join(process.cwd(), 'public', 'data', 'first-gen-pokemon.sample.json');
  try {
    const txt = await fs.readFile(p, 'utf-8');
    return JSON.parse(txt) as Pokemon[];
  } catch {
    return [];
  }
}

export async function fetchFirstGen(): Promise<Pokemon[]> {
  try {
    const res = await fetch(POKEAPI_LIST, { next: { revalidate: 60 * 60 * 24 } });
    if (!res.ok) throw new Error('Failed to fetch list from PokeAPI');
    const json = await res.json();
    const results: { name: string; url: string }[] = json.results;
    const pokes: Pokemon[] = results.map((r, i) => {
      const id = i + 1;
      return {
        id,
        name: r.name,
        types: [],
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        officialArtwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      };
    });
    return pokes;
  } catch (e) {
    const fallback = await readLocalSample();
    return fallback;
  }
}

export async function fetchPokemonDetail(id: number): Promise<Pokemon> {
  try {
    const res = await fetch(POKEAPI_POKEMON(id), { next: { revalidate: 60 * 60 * 24 } });
    if (!res.ok) throw new Error(`Pokemon ${id} not found`);
    const json = await res.json();
    const types: string[] = json.types.map((t: {type: {name: string}}) => t.type.name);
    const abilities: string[] = json.abilities.map((a: {ability: {name: string}}) => a.ability.name);
    const stats = json.stats.map((s: {stat: {name: string}, base_stat:string}) => ({ name: s.stat.name, value: s.base_stat }));
    const poke: Pokemon = {
      id: json.id,
      name: json.name,
      types: types as Pokemon['types'],
      image: json.sprites.front_default,
      officialArtwork: json.sprites.other?.['official-artwork']?.front_default ?? json.sprites.front_default,
      height: json.height,
      weight: json.weight,
      abilities,
      stats
    };
    return poke;
  } catch (e) {
    const sample = await readLocalSample();
    const found = sample.find(p => p.id === id || p.name.toLowerCase() === String(id).toLowerCase());
    if (found) return found;
    throw e;
  }
}
