"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import PostForm from "@/components/PostForm";
import PostCard from "@/components/PostCard";
import { createClient } from "@/lib/supabase";

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
  const [page, setPage] = useState(0);
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(true);

  async function load(initial = false) {
    const from = initial ? 0 : page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from("posts") // lowercase table name
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("Fetch error:", error);
      return;
    }

    setPosts((prev) => (initial ? (data as Post[]) : [...prev, ...(data as Post[])]));
    setMore((data?.length ?? 0) === PAGE_SIZE);
    setPage((p) => (initial ? 1 : p + 1));
    setLoading(false);
  }

  useEffect(() => {
    load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <main className="container section stack-y">
        <PostForm onPosted={() => load(true)} />

        <div className="stack-y">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          {more ? (
            <button className="btn btn-outline" onClick={() => load(false)}>
              Load more
            </button>
          ) : (
            !loading && <span className="text-sm opacity-70">No more posts</span>
          )}
        </div>
      </main>
    </>
  );
}
