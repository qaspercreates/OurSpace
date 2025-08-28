export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <section className="text-center max-w-2xl">
        {/* Use either the logo OR the text, not both */}
        <img
          src="/logo.svg"
          alt="OurSpace"
          className="mx-auto mb-6 w-40 h-auto drop-shadow"
        />

        <p className="text-zinc-300 text-lg md:text-xl mb-8">
          Say anything. Read everything.
          <br />
          Anonymous posts. No sign-ups. X-style postcards with ❤️ likes, 👁 views and 🔗 share.
        </p>

        <a href="/feed" className="btn-primary text-base inline-block">
          Enter the Feed
        </a>
      </section>
    </main>
  );
}
