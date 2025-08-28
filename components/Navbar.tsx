"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const onFeed = pathname?.startsWith("/feed");

  return (
    <header className="nav relative">
      {/* gradient band that fills the header */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(90deg,rgba(124,58,237,.35),rgba(59,130,246,.25),rgba(6,182,212,.25))]" />
      </div>

      <div className="container h-16 md:h-20 flex items-center justify-between relative">
        {/* BIGGER logo in the nav */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="OurSpace"
            className="h-8 md:h-10 w-auto drop-shadow"
          />
        </Link>

        {/* CTA appears everywhere EXCEPT on /feed */}
        {!onFeed && (
          <Link href="/feed" className="btn-outline text-sm md:text-base">
            Enter the Feed
          </Link>
        )}
      </div>
    </header>
  );
}
