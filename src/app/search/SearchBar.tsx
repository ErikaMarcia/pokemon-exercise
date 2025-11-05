"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("name") || "";
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim().toLowerCase();

    router.push(
      trimmed ? `/search?name=${encodeURIComponent(trimmed)}` : "/search"
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        margin: "20px 0",
      }}
    >
      <input
        type="text"
        placeholder="Digite o nome do Pokémon..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: "250px",
          padding: "8px 12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "8px 16px",
          backgroundColor: "#2a75bb",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Buscar
      </button>
    </form>
  );
}
