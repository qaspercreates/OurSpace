"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import clsx from "clsx";

export default function PostCard({ post }: { post: any }) {
  const [likes, setLikes] = useState<number>(post.likes || 0);
  const [views, setViews] = useState<number>(post.views || 0);
  const [liked, setLiked] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLiked(localStorage.getItem(`liked_${post.id}`) === "1");
  }, [post.id]);

  // Count a view once when the card enters viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const obs = new IntersectionObserver(async (entries) => {
      entries.forEach(async (ent) => {
        if (ent.isIntersecting && !done) {
          done = true;
          const { data, error } = await supabase.rpc("bump_views", { p_id: post.id });
          if (error) {
            console.error("View update error:", error);
          } else if (data) {
            setViews((data as any).views);
          }
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [post.id]);

  const like = async () => {
    if (liked) return;
    const { data, error } = await supabase.rpc("bump_likes", { p_id: post.id });
    if (error) {
      console.error("Like update error:", error);
      alert("Error: " + error.message);
      return;
    }
    setLiked(true);
    localStorage.setItem(`liked_${post.id}`, "1");
    if (data) setLikes((data as any).likes);
  };

  const share = async () => {
    const url = `${location.origin}/feed#${post.id}`;
    const text = post.text;
    if (navigator.share) {
      try { await navigator.share({ title: "OurSpace", text, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  };

  const time = new Date(post.created_at).toLocaleString();

  return (
    <article ref={ref} id={post.id} className="card">
      <div className="flex items-center justify-between text-xs muted mb-2">
        <span className="tag">{post.tag}</span>
        <span>{time}</span>
      </div>
      <p className="text-lg leading-relaxed whitespace-pre-wrap">{post.text}</p>
      <div className="flex items-center gap-6 mt-4 text-sm">
        <button onClick={like} className={clsx("hover:opacity-80", liked && "opacity-60 cursor-default")}>
          ❤️ {likes}
        </button>
        <span>👁 {views}</span>
        <button onClick={share}>🔗 Share</button>
      </div>
    </article>
  );
}
