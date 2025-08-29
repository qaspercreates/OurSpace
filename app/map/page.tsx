"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase";

type CityPoint = {
  city: string | null;
  country: string | null;
  lat: number | null;
  lng: number | null;
};

const supabase = createClient();

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletReadyRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Draw markers once Leaflet script has loaded
  const initMap = async () => {
    if (leafletReadyRef.current || !mapRef.current) return;
    // @ts-expect-error - Leaflet is added globally by the script tag
    const L = (window as any).L;
    if (!L) return;

    leafletReadyRef.current = true;

    // Base map
    const map = L.map(mapRef.current, {
      zoomControl: false,
      minZoom: 1.5,
      maxZoom: 18,
      worldCopyJump: true,
    }).setView([20, 0], 2.2);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors',
      crossOrigin: true,
    }).addTo(map);

    try {
      setLoading(true);
      setError(null);

      // Get latest locations (limit to keep it snappy)
      const { data, error } = await supabase
        .from("Posts")
        .select("city, country, lat, lng")
        .not("lat", "is", null)
        .not("lng", "is", null)
        .limit(1000);

      if (error) throw error;

      // Group by city/country to count posts
      const grouped = new Map<string, { lat: number; lng: number; n: number; label: string }>();

      (data as CityPoint[]).forEach((p) => {
        if (p.lat == null || p.lng == null) return;
        const key = `${(p.city || "Unknown").toLowerCase()}|${(p.country || "Unknown").toLowerCase()}`;
        const label = `${p.city || "Unknown"}, ${p.country || ""}`.trim();
        if (!grouped.has(key)) grouped.set(key, { lat: p.lat, lng: p.lng, n: 0, label });
        grouped.get(key)!.n += 1;
      });

      setCount(Array.from(grouped.values()).reduce((a, b) => a + b.n, 0));

      // Render soft glow circles proportional to count
      Array.from(grouped.values()).forEach(({ lat, lng, n, label }) => {
        const radius = Math.min(40000, 6000 + Math.sqrt(n) * 4000); // scale
        // @ts-expect-error
        L.circle([lat, lng], {
          color: "rgba(66, 133, 244, 0.25)",
          weight: 1,
          fillColor: "rgba(66, 133, 244, 0.35)",
          fillOpacity: 0.5,
          radius,
        })
          .addTo(map)
          .bindPopup(
            `<div style="font-weight:700;margin-bottom:4px">${escapeHtml(label)}</div><div>${n} post${
              n === 1 ? "" : "s"
            }</div>`
          );
      });
    } catch (e: any) {
      setError(e.message || "Failed to load locations.");
    } finally {
      setLoading(false);
    }
  };

  // Leaflet script loaded -> init map
  const onLeafletReady = () => {
    // small delay so CSS is applied
    setTimeout(initMap, 0);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).L) {
      // If user revisits and Leaflet is already on the page
      onLeafletReady();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Leaflet CSS/JS from CDN (no npm deps) */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin="anonymous"
        strategy="afterInteractive"
        onLoad={onLeafletReady}
      />

      <Navbar />

      <main className="container section">
        <div className="card card--padded mb-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">World feed</h1>
              <p className="text-sm opacity-80">
                Posts are plotted at city level for privacy. Zoom and tap circles to see counts.
              </p>
            </div>
            <div className="stat">
              <div className="stat__label">Plotted posts</div>
              <div className="stat__value">{loading ? "…" : count}</div>
            </div>
          </div>
        </div>

        <div className="card card--padded" style={{ padding: 0 }}>
          <div
            ref={mapRef}
            className="map"
            style={{
              width: "100%",
              height: "70vh",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          />
        </div>

        {error && (
          <div className="card card--padded mt-4" role="alert">
            <div className="text-red-600 font-medium">Error</div>
            <div className="text-sm mt-1">{error}</div>
          </div>
        )}
      </main>
    </>
  );
}

/** tiny helper to avoid popup HTML issues */
function escapeHtml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
