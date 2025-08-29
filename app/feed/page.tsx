"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import PostForm from "@/components/PostForm";
import PostCard from "@/components/PostCard";

type Post = {
  id: string;
  text: string;
  tag: string | null;
  likes: number;
  views: number;
  created_at: string;
  city?: string | null;
  country?: string | null;
  lat?: number | null;
  lng?: number | null;
};

const PAGE_SIZE = 10;

export default function FeedPage() {
  const supabase = createClient();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState(true);
  const [page, setPage] = useState(0);

  async function load(initial = false) {
    if (initial) {
      setLoading(true);
      setPage(0);
    }
    const from = (initial ? 0 : page * PAGE_SIZE);
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from("posts")
      .select("id,text,tag,likes,views,created_at,city,country,lat,lng")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }
    if (initial) {
      setPosts((data ?? []) as Post[]);
    } else {
      setPosts((prev) => [...prev, ...((data ?? []) as Post[])]);
    }
    setMore((data?.length ?? 0) === PAGE_SIZE);
    setPage((p) => (initial ? 1 : p + 1));
    setLoading(false);
  }

  useEffect(() => {
    load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="container">
      <section className="hero" style={{ paddingTop: "1.25rem", paddingBottom: "0" }}>
        <h1 className="hero-title" style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)" }}>
          What’s on your mind?
        </h1>
      </section>

      <section className="stack-4" style={{ marginTop: "1rem" }}>
        <PostForm />
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}

        <div className="flex justify-center">
          {more ? (
            <button onClick={() => load(false)} className="btn-outline">Load more</button>
          ) : (
            !loading && <div className="text-sm text-[var(--muted)]">No more posts</div>
          )}
        </div>
      </section>
    </main>
  );
}
