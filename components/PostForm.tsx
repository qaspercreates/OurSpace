"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const TAGS = ["Funny", "Sad", "Angry", "Secret", "Random"] as const;

export default function PostForm({ onPosted }: { onPosted: () => void }) {
  const [text, setText] = useState("");
  const [tag, setTag] = useState<(typeof TAGS)[number]>("Random");
  const maxLen = 280;

  const submit = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (trimmed.length > maxLen) return alert("Keep it under 280 characters.");

    const { error } = await supabase.from("Posts").insert({
      text: trimmed,
      tag,
      likes: 0,
      views: 0
    });

    if (error) {
      console.error("Insert error:", error);
      alert("Error: " + error.message);
      return;
    }
    setText("");
    setTag("Random");
    onPosted();
  };

  return (
    <div className="card space-y-3">
      <textarea
        className="w-full bg-transparent outline-none resize-none"
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={maxLen}
        rows={3}
      />
      <div className="flex items-center justify-between">
        <select
          className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2"
          value={tag}
          onChange={(e) => setTag(e.target.value as any)}
        >
          {TAGS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <button onClick={submit} className="btn-primary">Post</button>
      </div>
    </div>
  );
}
