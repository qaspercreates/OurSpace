"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import PostForm from "@/components/PostForm";
import PostCard from "@/components/PostCard";

type Post = {
  id: string;
  text: string;
  tag: string;
  likes: number;
  views: number;
  created_at: string;
};

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState(0);
  const pageSize = 20;
  const loadedOnce = useRef(false);

  const load = async (reset=false) => {
    setLoading(true);
    const start = reset ? 0 : from;
    const end = start + pageSize - 1;

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .range(start, end);

    if (!error && data) {
      setPosts(reset ? (data as Post[]) : [...posts, ...(data as Post[])]);
      setFrom(end + 1);
    } else {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!loadedOnce.current) { load(true); loadedOnce.current = true; }
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 space-y-6">
      <PostForm onPosted={() => load(true)} />

      {/* Uniform gaps between cards */}
      <section className="stack-4">
        {posts.map((p) => <PostCard key={p.id} post={p} />)}
      </section>

      <div className="text-center">
        <button onClick={() => load()} disabled={loading} className="btn-outline">
          {loading ? "Loading..." : "Load more"}
        </button>
      </div>
    </main>
  );
}
