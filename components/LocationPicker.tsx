"use client";

import { useState } from "react";
import { CITIES, City } from "@/data/cities";

type Props = {
  value?: City | null;
  onChange: (c: City | null) => void;
};

export default function LocationPicker({ value, onChange }: Props) {
  const [query, setQuery] = useState("");

  const filtered = query
    ? CITIES.filter(
        (c) =>
          c.city.toLowerCase().includes(query.toLowerCase()) ||
          c.country.toLowerCase().includes(query.toLowerCase())
      )
    : CITIES.slice(0, 12);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-[var(--muted)]">Add a rough location (optional)</label>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search a city (e.g., Birmingham)"
        className="w-full rounded-md border border-[var(--border)] bg-white/80 px-3 py-2"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-auto">
        <button
          type="button"
          className={`btn-outline text-sm ${!value ? "ring-1 ring-[var(--border)]" : ""}`}
          onClick={() => onChange(null)}
        >
          No location
        </button>
        {filtered.map((c) => (
          <button
            type="button"
            key={`${c.city}-${c.country}`}
            onClick={() => onChange(c)}
            className={`btn-outline text-sm ${
              value && value.city === c.city && value.country === c.country ? "ring-2 ring-blue-400" : ""
            }`}
          >
            {c.city}, {c.country}
          </button>
        ))}
      </div>
    </div>
  );
}
