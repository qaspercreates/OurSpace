import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "OurSpace",
  description: "Say anything. Read everything."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <footer>OurSpace — The internet, unfiltered.</footer>
      </body>
    </html>
  );
}
