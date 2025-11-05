import React from "react";
import { fetchPokemonDetail } from "@/lib/pokemon-api";
import { Pokemon } from "@/lib/types";
import Image from "next/image";
import TypeBadge from "@/components/ui/TypeBadge";
import Link from "next/link";
import { Metadata } from "next";

type Params = { id: number };

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const numId = Number(id);
  try {
    const poke = await fetchPokemonDetail(numId);
    return {
      title: `${poke.name} — #${String(poke.id).padStart(3, "0")}`,
      description: `Detalhes de ${poke.name}. Tipos: ${poke.types.join(", ")}`,
    };
  } catch {
    return {
      title: "Pokémon não encontrado",
      description: "Pokémon não encontrado",
    };
  }
}

export default async function PokemonPage({ params }: { params: Params }) {
  const { id } = await params;
  const numId = Number(id);
  if (Number.isNaN(numId)) return <div>Id inválido</div>;

  try {
    const p: Pokemon = await fetchPokemonDetail(numId);

    return (
      <article
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          padding: 24,
          background:
            "radial-gradient(circle at top left, #f8f9ff, #e9ecf9, #dfe5f5)",
          borderRadius: 16,
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          maxWidth: 900,
          margin: "40px auto",
        }}
      >
        <section
          style={{
            background: "linear-gradient(135deg, #ffffff, #f8f8f8)",
            borderRadius: 12,
            padding: 24,
            textAlign: "center",
            boxShadow: "inset 0 0 12px rgba(0,0,0,0.04)",
          }}
        >
          <Image
            src={p.officialArtwork ?? p.image ?? "/pokeball.png"}
            alt={p.name}
            width={380}
            height={380}
            style={{
              objectFit: "contain",
              filter: "drop-shadow(0 8px 10px rgba(0,0,0,0.15))",
            }}
            priority
          />

          <h2
            style={{
              textTransform: "capitalize",
              marginTop: 10,
              fontSize: 26,
              color: "#222",
            }}
          >
            {p.name}
          </h2>

          <div style={{ color: "#888", fontWeight: 500 }}>
            #{String(p.id).padStart(3, "0")}
          </div>

          <div style={{ marginTop: 14 }}>
            {p.types?.map((t) => (
              <TypeBadge key={t} type={t} />
            ))}
          </div>
        </section>
        <section
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 24,
            boxShadow: "inset 0 0 12px rgba(0,0,0,0.04)",
          }}
        >
          <h3
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#2a2a2a",
              borderBottom: "2px solid #eee",
              paddingBottom: 8,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            Detalhes
          </h3>

          <p
            style={{
              fontSize: 15,
              color: "#444",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            <strong>Altura:</strong> {p.height ?? "-"} | <strong>Peso:</strong>{" "}
            {p.weight ?? "-"}
          </p>

          <div style={{ marginTop: 16 }}>
            <h4
              style={{
                marginBottom: 10,
                fontSize: 16,
                fontWeight: 600,
                color: "#2a75bb",
              }}
            >
              Habilidades
            </h4>

            {p.abilities?.length ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {p.abilities.map((a) => (
                  <span
                    key={a}
                    style={{
                      background: "#2a75bb",
                      color: "#fff",
                      padding: "5px 10px",
                      borderRadius: 999,
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: "capitalize",
                      letterSpacing: 0.3,
                    }}
                  >
                    {a}
                  </span>
                ))}
              </div>
            ) : (
              <span>-</span>
            )}
          </div>

          <div style={{ marginTop: 22 }}>
            <h4
              style={{
                marginBottom: 10,
                fontSize: 16,
                fontWeight: 600,
                color: "#d62828",
              }}
            >
              Stats
            </h4>

            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                color: "#333",
                lineHeight: 1.8,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {p.stats?.length ? (
                p.stats.map((s) => {
                  const icons: Record<string, string> = {
                    hp: "❤️",
                    attack: "⚔️",
                    defense: "🛡️",
                    "special-attack": "💥",
                    "special-defense": "✨",
                    speed: "💨",
                  };

                  const labelMap: Record<string, string> = {
                    hp: "HP",
                    attack: "Ataque",
                    defense: "Defesa",
                    "special-attack": "Atq. Esp.",
                    "special-defense": "Def. Esp.",
                    speed: "Velocidade",
                  };

                  const icon = icons[s.name.toLowerCase()] || "🔹";
                  const label = labelMap[s.name.toLowerCase()] || s.name;

                  return (
                    <li
                      key={s.name}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "#f8f8f8",
                        borderRadius: 6,
                        padding: "6px 10px",
                        border: "1px solid #eee",
                      }}
                    >
                      <span
                        style={{ display: "flex", alignItems: "center", gap: 8 }}
                      >
                        <span style={{ fontSize: 18 }}>{icon}</span>
                        <strong>{label}</strong>
                      </span>
                      <span style={{ fontWeight: 600, color: "#2a75bb" }}>
                        {s.value}
                      </span>
                    </li>
                  );
                })
              ) : (
                <li>-</li>
              )}
            </ul>
          </div>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <Link
              href="/search"
              style={{
                display: "inline-block",
                padding: "10px 18px",
                background: "#2a75bb",
                color: "#fff",
                borderRadius: 8,
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.2s",
              }} className="hover-link"
            >
              ← Voltar
            </Link>
          </div>
        </section>
      </article>
    );
  } catch {
    return (
      <div style={{ padding: 24, background: "#fff", borderRadius: 8 }}>
        <h2>Pokémon não encontrado</h2>
        <p>Verifique o ID informado.</p>
        <div style={{ marginTop: 12 }}>
          <Link href="/search">Voltar</Link>
        </div>
      </div>
    );
  }
}
