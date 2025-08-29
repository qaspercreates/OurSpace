"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase";
import { toPng } from "html-to-image";
import clsx from "clsx";

type Post = {
  id: string;
  text: string;
  tag: string | null;
  likes: number;
  views: number;
  created_at: string;
  city?: string | null;
  country?: string | null;
};

export default function PostCard({ post }: { post: Post }) {
  const supabase = createClient();
  const [likes, setLikes] = useState(post.likes ?? 0);
  const [views, setViews] = useState(post.views ?? 0);
  const [liking, setLiking] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const viewedRef = useRef(false);

  // Increment views when the card actually hits the screen (once)
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      async (entries) => {
        const e = entries[0];
        if (e.isIntersecting && !viewedRef.current) {
          viewedRef.current = true;
          setViews((v) => v + 1);
          await supabase.rpc("increment_views", { row_id: post.id }).catch(() => {});
        }
      },
      { threshold: 0.6 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [post.id, supabase]);

  async function like() {
    if (liking) return;
    setLiking(true);
    setLikes((l) => l + 1);
    try {
      await supabase.rpc("increment_likes", { row_id: post.id });
    } catch {
      setLikes((l) => Math.max(0, l - 1));
    } finally {
      setLiking(false);
    }
  }

  async function shareImage() {
    const el = cardRef.current;
    if (!el) return;
    try {
      const dataUrl = await toPng(el, {
        cacheBust: true,
        backgroundColor: "#ffffff",
        pixelRatio: 2
      });
      const blob = await (await fetch(dataUrl)).blob();
      // Try native share
      if (navigator.share && (navigator as any).canShare?.({ files: [new File([blob], "ourspace.png", { type: "image/png" })] })) {
        await navigator.share({
          title: "OurSpace",
          text: "",
          files: [new File([blob], "ourspace.png", { type: "image/png" })]
        });
      } else {
        // fallback: open image in a new tab
        const w = window.open();
        if (w) {
          w.document.write(`<img src="${dataUrl}" style="width:100%;height:auto"/>`);
        }
      }
    } catch (e) {
      console.error(e);
      alert("Could not generate image");
    }
  }

  const created = new Date(post.created_at);

  return (
    <article ref={cardRef} className="card">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="inline-flex items-center gap-2">
          <span className="rounded-full border px-2 py-0.5 text-xs">{post.tag ?? "Random"}</span>
          {post.city ? (
            <span className="text-[var(--muted)] text-xs">{post.city}{post.country ? `, ${post.country}` : ""}</span>
          ) : null}
        </span>
        <time className="text-[var(--muted)] text-xs">
          {created.toLocaleDateString()} {created.toLocaleTimeString()}
        </time>
      </div>

      <p className="whitespace-pre-wrap text-[1.025rem]" style={{ lineHeight: 1.55 }}>{post.text}</p>

      <div className="mt-3 flex items-center gap-4 text-sm">
        <button
          onClick={like}
          disabled={liking}
          className={clsx("btn-outline", liking && "opacity-70")}
          aria-label="Like"
        >
          ❤️ {likes}
        </button>

        <span className="text-[var(--muted)]">👁️ {views}</span>

        <button onClick={shareImage} className="btn-outline" aria-label="Share">
          🔗 Share
        </button>
      </div>
    </article>
  );
}
