import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="container hero">
        <span className="badge">This is Our Space</span>
        <h1 className="hero-title">Say anything. Read everything.</h1>
        <p className="hero-sub">
          Instant, anonymous posts. No sign-ups. Tap ❤️ to like, 👁️ to see reach, and share a clean screenshot anywhere.
          No DMs. No comment wars. Just the world’s thoughts—unfiltered, beautifully simple.
        </p>
        <div className="center" style={{marginBottom: "18px"}}>
          <Link href="/feed" className="btn-primary">Enter the Feed</Link>
        </div>

        <div className="stack-3">
          <div className="card">
            <strong>🙈 Anonymous by default</strong>
            <div className="muted">No account. Post in seconds. One-like-per-person (local guard) keeps things honest.</div>
          </div>
          <div className="card">
            <strong>📊 Lightweight signals</strong>
            <div className="muted">Views tick when your post hits a screen. Likes are simple & public.</div>
          </div>
          <div className="card">
            <strong>📸 Built to share</strong>
            <div className="muted">Share exports a crisp post image and copies the link—perfect for Stories and chats.</div>
          </div>
        </div>

        <div className="stack-3" style={{marginTop:"18px"}}>
          <div className="card">
            <strong>What people share here</strong>
            <div className="muted">
              Hot takes, advice requests, tiny stories, confessions, wins, late-night musings, and stuff
              you can’t post anywhere else.
            </div>
          </div>
          <div className="card">
            <strong>How it works</strong>
            <ol className="muted" style={{margin:"8px 0 0 18px"}}>
              <li>Pick a tag (Advice, Confession, Storytime…) and write up to 280 characters.</li>
              <li>Post. People can ❤️ like; 👁️ views increment when your card is seen.</li>
              <li>Tap Share to export a clean image and copy the link.</li>
            </ol>
          </div>
          <div className="card dense">
            <strong>The vibe</strong>
            <div className="muted">Be real. No harassment. No doxxing. No illegal content.</div>
          </div>
        </div>
      </section>
    </main>
  );
}
