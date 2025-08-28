"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { elementToPngBlob } from "@/lib/capture";
import clsx from "clsx";

export default function PostCard({ post }: { post: any }) {
  const [likes, setLikes] = useState<number>(post.likes || 0);
  const [views, setViews] = useState<number>(post.views || 0);
  const [liked, setLiked] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLiked(localStorage.getItem(`liked_${post.id}`) === "1");
  }, [post.id]);

  // Count a view once when the card enters viewport
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    let done = false;
    const obs = new IntersectionObserver(async (entries) => {
      entries.forEach(async (ent) => {
        if (ent.isIntersecting && !done) {
          done = true;
          const { data, error } = await supabase.rpc("bump_views", { p_id: post.id });
          if (!error && data) setViews((data as any).views);
          else if (error) console.error("View update error:", error);
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
    try {
      const el = cardRef.current!;
      // Optional inset to give a margin in stories
      el.style.boxShadow = "0 0 0 12px #000 inset";
      const blob = await elementToPngBlob(el);
      el.style.boxShadow = "";

      const file = new File([blob], "ourspace-post.png", { type: "image/png" });

      // If device supports file share, share **image only** (no caption)
      if ((navigator as any).canShare?.({ files: [file] })) {
        await (navigator as any).share({
          files: [file],
          title: "OurSpace" // no `text` -> no caption
        });
        return;
      }

      // Fallback: download the image so user can upload it anywhere
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "ourspace-post.png";
      document.body.appendChild(a);
      a.click();
      a.remove();

      // Optionally also copy a link for convenience (no forced caption)
      const url = `${location.origin}/feed#${post.id}`;
      await navigator.clipboard.writeText(url);
      alert("Saved image to your device and copied the link.");
    } catch (e: any) {
      console.error("Share failed:", e);
      // Last fallback: just copy link
      const url = `${location.origin}/feed#${post.id}`;
      await navigator.clipboard.writeText(url);
      alert("Couldn’t create an image here. Link copied!");
    }
  };

  const time = new Date(post.created_at).toLocaleString();

  return (
    <article ref={cardRef} id={post.id} className="card">
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
