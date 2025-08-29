"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const onFeed = pathname?.startsWith("/feed");

  return (
    <header className="nav relative">
      {/* thin gradient band */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(90deg,rgba(124,58,237,.32),rgba(59,130,246,.22),rgba(6,182,212,.22))]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/15" />
      </div>

      {/* short header; big logo inside */}
      <div className="container relative h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* bumped up: h-12 inside a 56px bar */}
          <img src="/logo.svg" alt="OurSpace" className="h-12 w-auto drop-shadow" />
        </Link>

        {/* hide CTA on home & feed */}
        {!(isHome || onFeed) && (
          <Link href="/feed" className="btn-outline text-sm md:text-base">
            Enter the Feed
          </Link>
        )}
      </div>
    </header>
  );
}
