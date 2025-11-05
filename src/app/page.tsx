import Link from "next/link";

export default function HomePage() {
  return (
    <header style={{ textAlign: "center", marginTop: 40 }}>
      <h1>Primeira Geração — 150 Pokémons</h1>
      <div style={{ marginTop: 16 }}>
        <Link
          href="/search"
          style={{
            padding: "8px 12px",
            background: "#6b6bff",
            color: "#fff",
            borderRadius: 8,
            textDecoration: "none",
          }}
        >
          🔍 Busca Avançada
        </Link>
      </div>
    </header>
  );
}
