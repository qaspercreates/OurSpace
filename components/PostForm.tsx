"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase";

const supabase = createClient();

const TAGS = [
  "Random",
  "Advice",
  "Confession",
  "Storytime",
  "Hot take",
  "Win",
  "Rant",
  "Ask me",
  "News",
  "Tech",
  "Relationships",
  "Work",
  "School",
  "Fitness",
];

const MAX_CHARS = 280;

// round to ~0.02° ≈ 2 km near equator (coarser at higher latitudes)
const roundCoord = (n: number, places = 2) =>
  Math.round(n * Math.pow(10, places)) / Math.pow(10, places);

type Loc = {
  city: string | null;
  country: string | null;
  lat: number | null;
  lng: number | null;
};

export default function PostForm({
  onPosted,
}: {
  onPosted?: () => void;
}) {
  const [tag, setTag] = useState(TAGS[0]);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // location
  const [withLoc, setWithLoc] = useState(false);
  const [loc, setLoc] = useState<Loc>({ city: null, country: null, lat: null, lng: null });
  const [locStatus, setLocStatus] = useState<"idle" | "finding" | "found" | "error">("idle");
  const [locMsg, setLocMsg] = useState<string>("");

  const charsLeft = useMemo(() => MAX_CHARS - text.length, [text]);

  const fetchLocation = async () => {
    try {
      setLocStatus("finding");
      setLocMsg("Asking your browser…");

      // 1) Try precise browser geolocation (user must allow)
      const coords = await new Promise<GeolocationPosition["coords"]>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation unavailable"));
          return;
        }
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos.coords),
          (err) => reject(err),
          { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 }
        );
      }).catch(() => null);

      let lat: number | null = null;
      let lng: number | null = null;

      if (coords) {
        lat = roundCoord(coords.latitude, 2);
        lng = roundCoord(coords.longitude, 2);
        setLocMsg("Got location from browser. Finding city…");
      } else {
        // 2) Fallback: free IP → coarse city (no key)
        setLocMsg("Using IP-based location…");
        const r = await fetch("https://ipapi.co/json/");
        if (r.ok) {
          const j = await r.json();
          if (typeof j.latitude === "number" && typeof j.longitude === "number") {
            lat = roundCoord(j.latitude, 2);
            lng = roundCoord(j.longitude, 2);
          }
        }
      }

      if (lat == null || lng == null) throw new Error("Couldn’t determine a rough location.");

      // Reverse geocode to city/country (free, no key)
      const rev = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      let city: string | null = null;
      let country: string | null = null;
      if (rev.ok) {
        const j = await rev.json();
        city =
          j.city ||
          j.locality ||
          j.principalSubdivision ||
          j.localityInfo?.administrative?.[0]?.name ||
          null;
        country = j.countryName || j.countryCode || null;
      }

      setLoc({ city, country, lat, lng });
      setLocStatus("found");
      setLocMsg(
        `Attached ${city ? city + ", " : ""}${country ?? ""} · ~${lat}, ${lng}`
      );
    } catch (e: any) {
      setLocStatus("error");
      setLocMsg(e?.message || "Couldn’t attach location.");
    }
  };

  useEffect(() => {
    if (!withLoc) {
      setLoc({ city: null, country: null, lat: null, lng: null });
      setLocStatus("idle");
      setLocMsg("");
    }
  }, [withLoc]);

  const submit = async () => {
    if (!text.trim()) {
      alert("Write something first.");
      return;
    }
    if (text.length > MAX_CHARS) {
      alert("Too long.");
      return;
    }

    setSubmitting(true);
    try {
      const payload: any = {
        text: text.trim(),
        tag,
        likes: 0,
        views: 0,
      };

      // Only include location fields if we actually have them
      if (withLoc && loc.lat != null && loc.lng != null) {
        payload.city = loc.city;
        payload.country = loc.country;
        payload.lat = loc.lat;
        payload.lng = loc.lng;
      }

      const { error } = await supabase.from("Posts").insert(payload);
      if (error) throw error;

      setText("");
      setWithLoc(false);
      onPosted?.();
    } catch (e: any) {
      console.error(e);
      alert("Could not post. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card card--padded">
      <div className="flex items-center gap-2 mb-2">
        <select
          className="select"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          {TAGS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>

        <div className="ml-auto text-xs opacity-70">{MAX_CHARS - text.length}/280</div>
      </div>

      <div className="flex gap-3">
        <textarea
          className="textarea flex-1"
          placeholder="What's on your mind?"
          maxLength={MAX_CHARS}
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
        />
        <button
          className="btn btn--primary self-start"
          disabled={submitting}
          onClick={submit}
        >
          {submitting ? "Posting…" : "Post"}
        </button>
      </div>

      {/* Location attach */}
      <div className="mt-3 flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={withLoc}
            onChange={(e) => setWithLoc(e.target.checked)}
          />
          <span>Attach rough location (city only)</span>
        </label>

        {withLoc && (
          <div className="flex items-center gap-2">
            <button
              className="btn btn--soft"
              onClick={fetchLocation}
              type="button"
              disabled={locStatus === "finding"}
            >
              {locStatus === "finding" ? "Finding…" : "Use my location"}
            </button>
            {locStatus !== "idle" && (
              <span
                className={
                  "text-xs " +
                  (locStatus === "found"
                    ? "opacity-80"
                    : locStatus === "error"
                    ? "text-red-600"
                    : "opacity-70")
                }
              >
                {locMsg}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
