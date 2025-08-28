"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const onFeed = pathname?.startsWith("/feed");

  return (
    <header className="nav sticky top-0 z-40">
      <div className="container h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* small in nav only */}
          <img src="/logo.svg" alt="OurSpace" className="h-7 w-auto" />
        </Link>

        {!onFeed && (
          <Link href="/feed" className="btn-outline text-sm">
            Enter the Feed
          </Link>
        )}
      </div>
    </header>
  );
}
