import { Hero } from "@/components/hero/Hero";
import { Navbar } from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <main id="main-content" className="relative bg-(--ink-0)">
      <Navbar />
      <Hero />
    </main>
  );
}
