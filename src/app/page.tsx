import { DashboardPreview } from "@/components/dashboard/DashboardPreview";
import { InsightFlow } from "@/components/flow/InsightFlow";
import { Hero } from "@/components/hero/Hero";
import { Navbar } from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <main id="main-content" className="relative bg-(--ink-0)">
      <Navbar />
      <Hero />
      <div id="flow">
        <InsightFlow />
      </div>
      <div id="dashboard">
        <DashboardPreview />
      </div>
    </main>
  );
}
