"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const onFeed = pathname?.startsWith("/feed");

  return (
    <header className="nav sticky top-0 z-40">
      <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="OurSpace" className="h-7 w-auto" />
        </Link>

        {/* Show CTA everywhere EXCEPT on /feed */}
        {!onFeed && (
          <Link href="/feed" className="btn-outline text-sm">
            Enter the Feed
          </Link>
        )}
      </div>
    </header>
  );
}
