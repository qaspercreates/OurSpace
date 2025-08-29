"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="logo">
          OurSpace
        </Link>
        <nav className="flex gap-4">
          <Link href="/feed" className="btn btn-ghost">
            Enter the Feed
          </Link>
          <Link href="/map" className="btn btn-ghost">
            Map
          </Link>
        </nav>
      </div>
    </header>
  );
}
