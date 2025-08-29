import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="container section">
        <section className="hero">
          <span className="hero-eyebrow">This is Our Space</span>
          <h1 className="hero-title">Say anything. Read everything.</h1>
          <p className="hero-sub">
            Instant, anonymous posts. No sign-ups. Tap ❤️ to like, 👁️ to see reach, 
            and share a clean screenshot anywhere. No DMs. No comments. 
            Just the world’s thoughts — unfiltered, beautifully simple.
          </p>
          <Link href="/feed" className="btn btn-primary">
            Enter the Feed
          </Link>
        </section>

        <section className="section">
          <div className="feature-grid">
            <div className="card card--padded">
              <h2 className="text-lg font-bold mb-2">👤 Anonymous by default</h2>
              <p>No account. Post in seconds. One-like-per-person keeps it honest.</p>
            </div>
            <div className="card card--padded">
              <h2 className="text-lg font-bold mb-2">📊 Lightweight signals</h2>
              <p>Views tick only when a post hits your screen. Likes are simple and public.</p>
            </div>
            <div className="card card--padded">
              <h2 className="text-lg font-bold mb-2">🚀 Built to go viral</h2>
              <p>Share generates a crisp image for TikTok, Snap, IG, or chats.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="text-xl font-bold mb-4">What people share here</h2>
          <div className="chips">
            <div className="chip">🔥 Hot takes that wouldn’t survive a comment section</div>
            <div className="chip">💡 Advice requests from strangers who really read</div>
            <div className="chip">🎉 Confessions & wins without chasing clout</div>
            <div className="chip">📝 Tiny stories, shower thoughts, late-night musings</div>
            <div className="chip">🌍 Crowd wisdom on work, money, school, travel, fitness</div>
            <div className="chip">✨ Stuff people can’t post anywhere else</div>
          </div>
        </section>

        <footer className="footer">
          OurSpace — The internet, unfiltered.
        </footer>
      </main>
    </>
  );
}
