"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import LocationPicker from "./LocationPicker";
import { City } from "@/data/cities";

const TAGS = [
  "Random","Advice","Confession","Storytime","Funny",
  "Angry","Sad","Wholesome","News","Tech"
];

export default function PostForm() {
  const supabase = createClient();
  const [tag, setTag] = useState(TAGS[0]);
  const [text, setText] = useState("");
  const [loc, setLoc] = useState<City | null>(null);
  const [busy, setBusy] = useState(false);
  const limit = 280;

  async function submit() {
    if (!text.trim()) return;
    setBusy(true);
    try {
      const payload: any = { text: text.trim(), tag, likes: 0, views: 0 };
      if (loc) {
        payload.city = loc.city;
        payload.country = loc.country;
        payload.lat = Number(loc.lat.toFixed(2));
        payload.lng = Number(loc.lng.toFixed(2));
      }
      const { error } = await supabase.from("posts").insert(payload);
      if (error) throw error;
      setText(""); setLoc(null);
      // refresh list
      window.location.reload();
    } catch (e: any) {
      alert(e.message || "Could not post");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card stack-4">
      <div className="flex items-center gap-3">
        <select className="btn-outline text-sm" value={tag} onChange={(e) => setTag(e.target.value)}>
          {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <div className="ml-auto text-sm text-[var(--muted)]">{text.length}/{limit}</div>
      </div>

      <textarea
        rows={3}
        maxLength={limit}
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <LocationPicker value={loc} onChange={setLoc} />

      <div className="flex justify-end">
        <button onClick={submit} disabled={busy} className="btn-primary">
          {busy ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
