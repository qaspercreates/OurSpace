export default function HomePage() {
  return (
    <main>
      <section className="hero container">
        {/* Big logo for landing */}
        <img
          src="/logo.svg"
          alt="OurSpace"
          className="hero-logo w-56 md:w-72 lg:w-80 h-auto drop-shadow"
        />

        <h1 className="hero-title bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Say anything. Read everything.
        </h1>

        <p className="hero-sub">
          Anonymous posts. No sign-ups. X-style postcards with ❤️ likes, 👁 views and 🔗 share
          (shares a clean screenshot).
        </p>

        <div className="hero-cta">
          <a href="/feed" className="btn-primary">Enter the Feed</a>
        </div>
      </section>

      {/* Feature cards to keep the hero area feeling alive */}
      <section className="container pb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="text-2xl mb-2">🕵️ Anonymous</div>
          <p className="text-zinc-300">No account. Post instantly. One-like-per-person (local guard).</p>
        </div>
        <div className="card">
          <div className="text-2xl mb-2">📈 Feels alive</div>
          <p className="text-zinc-300">Views tick when a card actually hits the screen.</p>
        </div>
        <div className="card">
          <div className="text-2xl mb-2">📸 Built to share</div>
          <p className="text-zinc-300">Share generates a post image for Snap/IG/TikTok and copies the link.</p>
        </div>
      </section>
    </main>
  );
}
