"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const TAGS = [
  "Random",
  "Funny",
  "Storytime",
  "Advice",
  "Confession",
  "Hot Take",
  "Wholesome",
  "Love",
  "Friendship",
  "School",
  "Work",
  "Money",
  "Tech",
  "Gaming",
  "Sports",
  "Music",
  "Movies/TV",
  "Books",
  "News",
  "Travel",
  "Food",
  "Fitness",
  "Mental Health",
  "Small Win",
];

export default function PostForm({ onPosted }: { onPosted: () => void }) {
  const [text, setText] = useState("");
  const [tag, setTag] = useState(TAGS[0]);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    const { error } = await supabase
      .from("posts")
      .insert({ text, tag, likes: 0, views: 0 });
    setLoading(false);
    if (error) {
      alert("Could not post. Try again.");
      return;
    }
    setText("");
    setTag(TAGS[0]);
    onPosted();
  };

  return (
    <div className="card">
      <div className="flex items-start gap-3">
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="min-w-[9rem] md:min-w-[12rem] bg-black/30 border border-white/10 rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-purple-400"
        >
          {TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 280))}
          placeholder="What’s on your mind?"
          rows={3}
          className="flex-1 bg-black/20 border border-white/10 rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={submit}
          disabled={loading || !text.trim()}
          className="btn-primary self-start"
        >
          {loading ? "Posting…" : "Post"}
        </button>
      </div>

      <div className="mt-2 text-sm text-zinc-400">{text.length}/280</div>
    </div>
  );
}
