"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase";
import { toPng } from "html-to-image";

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

  const [likes, setLikes] = useState<number>(post.likes ?? 0);
  const [views, setViews] = useState<number>(post.views ?? 0);
  const [liking, setLiking] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const viewedRef = useRef(false);

  const locLabel = useMemo(() => {
    const c = post.city?.trim();
    const co = post.country?.trim();
    if (!c && !co) return null;
    if (c && co) return `${c}, ${co}`;
    return c || co || null;
  }, [post.city, post.country]);

  // bump views
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      async (entries) => {
        const e = entries[0];
        if (e.isIntersecting && !viewedRef.current) {
          viewedRef.current = true;
          setViews((v) => v + 1);
          try {
            await supabase
              .from("posts")
              .update({ views: (post.views ?? 0) + 1 })
              .eq("id", post.id);
          } catch {
            /* ignore */
          }
        }
      },
      { threshold: 0.55 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [post.id, post.views, supabase]);

  async function like() {
    if (liking) return;
    const key = `liked:${post.id}`;
    if (typeof window !== "undefined" && localStorage.getItem(key)) return;

    setLiking(true);
    setLikes((l) => l + 1);
    try {
      await supabase
        .from("posts")
        .update({ likes: (post.likes ?? 0) + 1 })
        .eq("id", post.id);
      if (typeof window !== "undefined") localStorage.setItem(key, "1");
    } catch {
      setLikes((l) => Math.max(0, l - 1));
      if (typeof window !== "undefined") localStorage.removeItem(key);
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
        pixelRatio: 2,
      });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "ourspace-post.png", { type: "image/png" });

      // Native share
      // @ts-ignore
      if (navigator.share && (navigator as any).canShare?.({ files: [file] })) {
        // @ts-ignore
        await navigator.share({ title: "OurSpace", text: "", files: [file] });
        return;
      }

      const w = window.open();
      if (w) {
        w.document.write(`<meta name="viewport" content="width=device-width, initial-scale=1" />`);
        w.document.write(`<img src="${dataUrl}" style="width:100%;height:auto" />`);
      }
    } catch (e) {
      console.error(e);
      alert("Could not generate image");
    }
  }

  const created = new Date(post.created_at);
  const timestamp = `${created.toLocaleDateString()} ${created.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  return (
    <article ref={cardRef} className="card card--padded post">
      <div className="post__header">
        <div className="flex items-center gap-2">
          <span className="badge">{post.tag || "Random"}</span>
          {locLabel && <span className="badge">📍 {locLabel}</span>}
        </div>
        <span className="text-xs opacity-70">{timestamp}</span>
      </div>

      <div className="post__body whitespace-pre-wrap">{post.text}</div>

      <div className="post__footer">
        <button className="btn btn-ghost" onClick={like} disabled={liking}>
          ❤️ {likes}
        </button>
        <span className="opacity-70">👁️ {views}</span>
        <button className="btn btn-ghost" onClick={shareImage}>
          🔗 Share
        </button>
      </div>
    </article>
  );
}
