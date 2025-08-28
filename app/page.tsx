export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center">
      <section className="mx-auto max-w-5xl px-4 w-full text-center">
        {/* BIG logo for landing only */}
        <img
          src="/logo.svg"
          alt="OurSpace"
          className="mx-auto mb-8 w-48 md:w-60 h-auto drop-shadow"
        />

        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Say anything. Read everything.
        </h1>

        <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Anonymous posts. No sign-ups. X-style postcards with ❤️ likes, 👁 views and 🔗 share
          (shares as actual screenshots).
        </p>

        <div className="flex items-center justify-center gap-3 mb-14">
          <a href="/feed" className="btn-primary text-base">Enter the Feed</a>
          <a href="#how" className="btn-outline text-base">How it works</a>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="card">
            <div className="text-2xl mb-2">🕵️‍♂️ Anonymous</div>
            <p className="text-zinc-300">
              No account. Post instantly. One-tap like with local guard so nobody can farm.
            </p>
          </div>
          <div className="card">
            <div className="text-2xl mb-2">📈 Real reach</div>
            <p className="text-zinc-300">
              Views count automatically when cards enter the screen. Feels alive.
            </p>
          </div>
          <div className="card">
            <div className="text-2xl mb-2">📸 Viral share</div>
            <p className="text-zinc-300">
              Share exports a clean screenshot of the post for Snap/IG/TikTok + copies the link.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div id="how" className="max-w-3xl mx-auto text-left mt-10 md:mt-16">
          <div className="card">
            <ol className="list-decimal pl-6 space-y-2 text-zinc-200">
              <li>Pick a tag and write your thought (280 chars).</li>
              <li>Post. People can ❤️ like and 👁 view numbers tick up.</li>
              <li>Tap 🔗 Share to blast the screenshot to socials.</li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
