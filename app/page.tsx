export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="hero container">
        <div className="mx-auto w-fit mb-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300">
          This is Our Space
        </div>

        <h1 className="hero-title bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Say anything. Read everything.
        </h1>

        <p className="hero-sub">
          Instant, anonymous posts. No sign-ups. Tap ❤️ to like, 👁 to see reach, and share a clean
          screenshot anywhere. No DMs. No comments. Just the world’s thoughts—unfiltered.
        </p>

        <div className="hero-cta">
          <a href="/feed" className="btn-primary">Enter the Feed</a>
        </div>
      </section>

      {/* WHY STAY */}
      <section className="container grid grid-cols-1 md:grid-cols-3 gap-4 pb-10">
        <div className="card">
          <div className="text-2xl mb-2">🕵️ Anonymous by default</div>
          <p className="text-zinc-300">
            No account. Post in seconds. One-like-per-person (local guard) keeps the vibe honest.
          </p>
        </div>
        <div className="card">
          <div className="text-2xl mb-2">📊 Lightweight signals</div>
          <p className="text-zinc-300">
            Views tick only when a post actually hits your screen. Likes are simple and public.
          </p>
        </div>
        <div className="card">
          <div className="text-2xl mb-2">📸 Built to go viral</div>
          <p className="text-zinc-300">
            Share exports a crisp image of the post and copies the link—perfect for Stories and chats.
          </p>
        </div>
      </section>

      {/* WHAT YOU'LL FIND */}
      <section className="container pb-10">
        <div className="card">
          <h2 className="text-xl font-semibold mb-3">What people share here</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-zinc-300">
            <li className="card">Hot takes that wouldn’t survive a comment section.</li>
            <li className="card">Advice requests from strangers who actually read.</li>
            <li className="card">Confessions &amp; wins without chasing clout.</li>
            <li className="card">Tiny stories, shower thoughts, and late-night musings.</li>
            <li className="card">Crowd wisdom on work, money, school, travel, fitness.</li>
            <li className="card">Stuff people can’t post anywhere else.</li>
          </ul>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container pb-14">
        <div className="card">
          <h2 className="text-xl font-semibold mb-3">How it works</h2>
          <ol className="list-decimal pl-6 space-y-2 text-zinc-200">
            <li>Pick a tag (e.g., Advice, Confession, Storytime) and write up to 280 characters.</li>
            <li>Post. People can ❤️ like; 👁 views increment when your card is seen.</li>
            <li>Tap Share to blast a screenshot to Snap/IG/TikTok or send the link to friends.</li>
          </ol>
        </div>
      </section>

      {/* GUIDELINES / ETHOS */}
      <section className="container pb-16">
        <div className="card text-zinc-300">
          <div className="font-semibold text-zinc-100 mb-2">The vibe</div>
          <ul className="list-disc pl-5 space-y-1">
            <li>Be real. No harassment. No doxxing. No illegal content.</li>
            <li>No sign-ups, no DMs, no comment wars—share to discuss elsewhere.</li>
            <li>We remove obvious spam and illegal posts. The rest is the internet, unfiltered.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
