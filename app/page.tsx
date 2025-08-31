// app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <header className="border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">OurSpace</h1>
          <span className="text-sm text-gray-500">The internet, unfiltered.</span>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-3">Post something</h2>
          <div className="flex items-start gap-3">
            <textarea
              placeholder="What's on your mind?"
              className="w-full h-24 resize-none rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="rounded-md px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
              Post
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">0/280</p>
        </div>

        <div className="space-y-4">
          <article className="rounded-lg border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">2 min ago • Random</span>
              <button className="text-sm px-3 py-1 rounded-md border hover:bg-gray-50">Share</button>
            </div>
            <p className="mb-4">hello from ourspace 👋</p>
            <div className="flex items-center gap-3">
              <button className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700">❤️ 2</button>
              <span className="text-sm text-gray-500">👁️ 39</span>
            </div>
          </article>

          <button className="w-full rounded-md border py-2 hover:bg-gray-50">Load more</button>
        </div>
      </section>

      <footer className="mt-12 border-t">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          OurSpace — The internet, unfiltered.
        </div>
      </footer>
    </main>
  );
}
