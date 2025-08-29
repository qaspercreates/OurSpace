"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="header">
      <div className="container navbar">
        <Link href="/" className="brand" aria-label="OurSpace home">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#6b8cff"/><stop offset="1" stopColor="#33cabb"/>
              </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="10" stroke="url(#g)" strokeWidth="2" fill="none"/>
            <path d="M12 7v10M7 12h10" stroke="url(#g)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="brand-name">OurSpace</span>
        </Link>

        <nav className="flex items-center gap-3">
          <Link href="/feed" className="btn-primary" style={{padding:"8px 12px"}}>Enter the Feed</Link>
        </nav>
      </div>
    </header>
  );
}
