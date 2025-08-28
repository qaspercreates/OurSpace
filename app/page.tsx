export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <img src="/logo.svg" alt="OurSpace Logo" className="w-24 h-24 mb-6 drop-shadow-lg" />
      <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
        OurSpace
      </h1>
      <p className="text-lg md:text-xl text-zinc-300 max-w-lg mb-8">
        Say anything. Read everything.<br />
        Anonymous posts. No sign-ups. Pure feed with ❤️ likes, 👁 views and 🔗 share.
      </p>
      <a href="/feed" className="btn-primary text-lg">
        Enter the Feed
      </a>
    </main>
  );
}
