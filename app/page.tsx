export default function Page() {
  return (
    <div className="text-center space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">OurSpace</h1>
        <p className="muted">Say anything. Read everything.</p>
      </div>
      <a href="/feed" className="btn-primary">Enter the Feed</a>
      <div className="mt-10 card text-left">
        <p className="muted">
          Anonymous posts. No sign-ups. X-style postcards with ❤️ likes, 👁 views and 🔗 share.
        </p>
      </div>
    </div>
  );
}
