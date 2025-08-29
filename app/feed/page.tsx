"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import PostForm from "@/components/PostForm";
import PostCard from "@/components/PostCard";

type Post = {
  id: string; text: string; tag: string | null; likes: number; views: number; created_at: string;
  city?: string | null; country?: string | null; lat?: number | null; lng?: number | null;
};

const PAGE_SIZE = 10;

export default function FeedPage() {
  const supabase = createClient();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(true);

  async function load(initial=false){
    const from = (initial ? 0 : page*PAGE_SIZE);
    const to = from + PAGE_SIZE - 1;
    const { data, error } = await supabase
      .from("posts")
      .select("id,text,tag,likes,views,created_at,city,country,lat,lng")
      .order("created_at",{ascending:false})
      .range(from,to);
    if (error) { console.error(error); return; }
    setPosts(prev => initial ? (data as Post[]) : [...prev, ...(data as Post[])]);
    setMore((data?.length ?? 0) === PAGE_SIZE);
    setPage(p => initial ? 1 : p+1);
    setLoading(false);
  }

  useEffect(() => { load(true); /* eslint-disable-next-line */ }, []);

  return (
    <main className="container">
      <div className="hero" style={{paddingTop:"10px", paddingBottom:"0"}}>
        <h2 className="badge">Welcome</h2>
      </div>

      <section className="stack-4">
        <PostForm />
        <div className="post-list">
          {posts.map(p => <PostCard key={p.id} post={p} />)}
        </div>
        <div className="flex justify-center" style={{marginTop:"10px"}}>
          {more ? (
            <button className="btn-outline" onClick={() => load(false)}>Load more</button>
          ) : (!loading && <span className="muted text-sm">No more posts</span>)}
        </div>
      </section>
    </main>
  );
}
