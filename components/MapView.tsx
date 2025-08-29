"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import { createClient } from "@/lib/supabase";

type Row = { city: string | null; country: string | null; lat: number | null; lng: number | null; created_at?: string };

export default function MapView() {
  const supabase = createClient();
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("city,country,lat,lng,created_at")
        .not("lat", "is", null)
        .not("lng", "is", null)
        .order("created_at", { ascending: false })
        .limit(1000);
      if (!error && data) setRows(data as Row[]);
    })();
  }, []);

  // cluster by ~city area (0.1° bins)
  const clusters = useMemo(() => {
    const m = new Map<string, { city?: string; country?: string; lat: number; lng: number; count: number }>();
    for (const r of rows) {
      if (r.lat == null || r.lng == null) continue;
      const lat = Number((Math.round(r.lat * 10) / 10).toFixed(1));
      const lng = Number((Math.round(r.lng * 10) / 10).toFixed(1));
      const key = `${lat},${lng}`;
      const cur = m.get(key) || { lat, lng, count: 0, city: r.city ?? undefined, country: r.country ?? undefined };
      cur.count += 1;
      if (!cur.city && r.city) cur.city = r.city;
      if (!cur.country && r.country) cur.country = r.country;
      m.set(key, cur);
    }
    return Array.from(m.values());
  }, [rows]);

  return (
    <div style={{ height: 520, width: "100%", borderRadius: 16, overflow: "hidden" }}>
      <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {clusters.map((c) => {
          const r = 6 + Math.min(24, Math.sqrt(c.count) * 4);
          return (
            <CircleMarker
              key={`${c.lat},${c.lng}`}
              center={[c.lat, c.lng]}
              radius={r}
              pathOptions={{ color: "#3b82f6", fillColor: "#60a5fa", fillOpacity: 0.35, weight: 2 }}
            >
              <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                <div style={{ fontWeight: 700 }}>{c.city ?? "Somewhere"}</div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>
                  {c.country ?? ""} • {c.count} post{c.count > 1 ? "s" : ""}
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
