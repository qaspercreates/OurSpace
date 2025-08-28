"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const onFeed = pathname?.startsWith("/feed");

  return (
    <header className="nav relative">
      {/* filled gradient band + soft side glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(90deg,rgba(124,58,237,.35),rgba(59,130,246,.25),rgba(6,182,212,.25))]" />
        <div className="absolute -left-16 top-0 h-full w-64 rounded-full blur-3xl opacity-40 bg-purple-600/30" />
        <div className="absolute -right-16 top-0 h-full w-64 rounded-full blur-3xl opacity-40 bg-cyan-500/30" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/15" />
      </div>

      <div
        className={clsx(
          "container relative flex items-center justify-between",
          isHome ? "h-24 md:h-28" : "h-16 md:h-20"
        )}
      >
        <Link href="/" className="flex items-center gap-2">
          {/* Bigger on homepage, smaller elsewhere */}
          <img
            src="/logo.svg"
            alt="OurSpace"
            className={clsx(
              "w-auto drop-shadow",
              isHome ? "h-12 md:h-14" : "h-8 md:h-10"
            )}
          />
        </Link>

        {/* Hide CTA on both / and /feed */}
        {!(isHome || onFeed) && (
          <Link href="/feed" className="btn-outline text-sm md:text-base">
            Enter the Feed
          </Link>
        )}
      </div>
    </header>
  );
}
