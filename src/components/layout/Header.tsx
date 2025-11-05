"use client";

import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#f2f2f2",
        borderBottom: "2px solid #ddd",
      }}
    >
      <div>
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "#111",
            fontWeight: 800,
            fontSize: 20,
          }}
        >
          PokeDex
        </Link>
      </div>
    </header>
  );
}
