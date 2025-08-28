import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "OurSpace — The internet, unfiltered.",
  description: "Say anything. Read everything. Anonymous X-style feed with likes, views, and share."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container min-h-[70vh] py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
