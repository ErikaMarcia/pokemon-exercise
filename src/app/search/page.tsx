import { Pokemon } from "@/lib/types";
import SearchBar from "./SearchBar";
import { fetchFirstGen } from "@/lib/pokemon-api";
import PokemonCard from "@/components/ui/PokemonCard";

type SearchParams = {
  name?: string;
};

export const dynamic = "force-dynamic"; // evitar cache SSR

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedParams = await searchParams;
  const nameQ = (resolvedParams.name ?? "").toLowerCase().trim();

  const pokemons: Pokemon[] = await fetchFirstGen();

  const filtered = nameQ
    ? pokemons.filter((p) => p.name.toLowerCase().includes(nameQ))
    : pokemons;

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>🔎 Busca Pokémon</h1>
      <SearchBar />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginTop: 24,
        }}
      >
        {filtered.length > 0 ? (
          filtered.map((p) => <PokemonCard key={p.id} pokemon={p} />)
        ) : (
          <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>
            Nenhum Pokémon encontrado 😢
          </p>
        )}
      </div>
    </div>
  );
}
