import MapView from "@/components/MapView";

export const dynamic = "force-dynamic"; // always fresh

export default function MapPage() {
  return (
    <main className="container">
      <section className="hero">
        <h1 className="hero-title">OurSpace Map</h1>
        <p className="hero-sub">
          Posts are pinned to cities (not exact locations). Circles grow with activity.
        </p>
      </section>

      <section className="card" style={{ padding: 0 }}>
        <MapView />
      </section>
    </main>
  );
}
