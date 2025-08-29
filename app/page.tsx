export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="hero container">
        <div className="mx-auto w-fit mb-2 px-3 py-1 rounded-full bg-white/70 border border-[rgba(15,23,42,.10)] text-sm text-[var(--muted)]">
          This is Our Space
        </div>

        <h1 className="hero-title">
          Say anything. Read everything.
        </h1>

        <p className="hero-sub">
          Instant, anonymous posts. No sign-ups. Tap ❤️ to like, 👁 to see reach, and share a clean
          screenshot anywhere. No DMs. No comment wars. Just the world’s thoughts—unfiltered,
          beautifully simple.
        </p>

        <div className="hero-cta">
          <a href="/feed" className="btn-primary">Enter the Feed</a>
        </div>
      </section>

      {/* WHY OURSPACE */}
      <section className="container grid grid-cols-1 md:grid-cols-3 gap-4 pb-10">
        <div className="card">
          <div className="text-2xl mb-2">🕵️ Anonymous by default</div>
          <p className="text-[var(--muted)]">
            No account. Post in seconds. One-like-per-person (local guard) keeps things honest
            without tracking you.
          </p>
        </div>
        <div className="card">
          <div className="text-2xl mb-2">📊 Lightweight signals</div>
          <p className="text-[var(--muted)]">
            Views tick only when a post actually hits your screen. Likes are simple and public—
            nothing to overthink.
          </p>
        </div>
        <div className="card">
          <div className="text-2xl mb-2">📸 Built to share</div>
          <p className="text-[var(--muted)]">
            Share creates a crisp image of the post and copies the link. Perfect for Stories, chats,
            and broadcasts.
          </p>
        </div>
      </section>

      {/* WHAT YOU'LL FIND */}
      <section className="container pb-10">
        <div className="card">
          <h2 className="text-xl font-semibold mb-3">What people share here</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-[var(--muted)]">
            <li className="card">Hot takes that wouldn’t survive a comment section.</li>
            <li className="card">Advice requests from strangers who actually read.</li>
            <li className="card">Confessions & wins without chasing clout.</li>
            <li className="card">Tiny stories, shower thoughts, late-night musings.</li>
            <li className="card">Crowd wisdom on work, money, school, travel, fitness.</li>
            <li className="card">Stuff people can’t post anywhere else.</li>
          </ul>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container pb-10">
        <div className="card">
          <h2 className="text-xl font-semibold mb-3">How it works</h2>
          <ol className="list-decimal pl-6 space-y-2 text-[var(--ink)]">
            <li>Pick a tag (Advice, Confession, Storytime, etc.) and write up to 280 characters.</li>
            <li>Post. People can ❤️ like; 👁 views increment when your card is seen.</li>
            <li>Tap <strong>Share</strong> to export a clean image and copy the link.</li>
          </ol>
        </div>
      </section>

      {/* ETHOS / SAFETY */}
      <section className="container pb-16">
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">The vibe</h2>
          <ul className="list-disc pl-5 space-y-1 text-[var(--muted)]">
            <li>Be real. No harassment. No doxxing. No illegal content.</li>
            <li>No sign-ups, no DMs, no comment wars—share elsewhere if you want to discuss.</li>
            <li>We filter obvious spam and illegal posts. The rest is the internet, unfiltered.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
