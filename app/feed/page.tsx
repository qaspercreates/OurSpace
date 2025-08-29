"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    // TODO: replace with supabase fetch
    setPosts([
      { id: 1, text: "hello world", likes: 2, views: 15 },
      { id: 2, text: "my secret", likes: 1, views: 10 },
    ]);
  }, []);

  return (
    <>
      <Navbar />
      <main className="container section stack-y">
        <div className="card card--padded">
          <textarea
            className="input"
            placeholder="What's on your mind?"
            rows={3}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="counter">0/280</span>
            <button className="btn btn-primary">Post</button>
          </div>
        </div>

        <div className="stack-y">
          {posts.map((p) => (
            <div key={p.id} className="card card--padded post">
              <div className="post__header">
                <span>Anonymous</span>
                <span className="text-xs">{p.views} views</span>
              </div>
              <div className="post__body">{p.text}</div>
              <div className="post__footer">
                <span>❤️ {p.likes}</span>
                <button className="btn-link">Share</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
