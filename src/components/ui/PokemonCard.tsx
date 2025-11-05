"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Pokemon } from "@/lib/types";
import { GenericCard } from "./GenericCard";
import TypeBadge from "./TypeBadge";

type PokemonCardProps = React.ComponentProps<"div"> & {
  pokemon: Pokemon;
};

export default function PokemonCard({ pokemon, ...rest }: PokemonCardProps) {
  const { onClick, ...safeRest } = rest;
  const number = `#${String(pokemon.id).padStart(3, "0")}`;
  return (
    <GenericCard<Pokemon>
      data={pokemon}
      renderContent={(p) => (
        <Link href={`/pokemon/${p.id}`} title={p.name}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Image
              src={p.officialArtwork ?? p.image ?? "/pokeball.png"}
              alt={p.name}
              width={160}
              height={160}
              style={{ objectFit: "contain" }}
              priority={false}
            />

            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 700, textTransform: "capitalize" }}>
                {p.name}
              </div>
              <div style={{ color: "#666", fontSize: 12 }}>{number}</div>
              <div style={{ marginTop: 6 }}>
                {p.types?.map((t) => (
                  <TypeBadge key={t} type={t} />
                ))}
              </div>
            </div>
          </div>
        </Link>
      )}
      {...safeRest}
    />
  );
}
