export default function Navbar() {
  return (
    <header className="border-b border-zinc-800">
      <div className="container py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 no-underline">
          <img src="/logo.svg" alt="OurSpace" className="h-6 w-auto" />
        </a>
        <a href="/feed" className="btn-outline">Enter the Feed</a>
      </div>
    </header>
  );
}
