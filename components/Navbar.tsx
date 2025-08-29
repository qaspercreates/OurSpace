"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const onFeed = pathname?.startsWith("/feed");

  return (
    <header className="nav">
      <div className="container h-14 flex items-center justify-between">
        <Link href="/" className="brand flex items-center gap-2">
          <img src="/logo.svg" alt="OurSpace" />
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/map" className="btn-outline text-sm">Map</Link>
          {!(isHome || onFeed) && (
            <Link href="/feed" className="btn-outline text-sm">Enter the Feed</Link>
          )}
        </div>
      </div>
    </header>
  );
}
