import Link from "next/link";
import { MarketingFeatureGrid } from "@/components/marketing/MarketingBlocks";
import MarketingShell from "@/components/marketing/MarketingShell";

export const metadata = {
  title: "About us",
};

export default function AboutPage() {
  return (
    <MarketingShell
      eyebrow="Our story"
      title="About Ganges Grill"
      intro="We connect hungry customers with great local food — curated restaurants, fair pricing, and reliable delivery across Dhaka."
    >
      <p>
        Ganges Grill started as a simple idea: ordering food online should feel effortless. We work
        with trusted kitchens and riders so your meals arrive hot, on time, and exactly what you
        ordered.
      </p>

      <MarketingFeatureGrid
        items={[
          { title: "Transparent pricing", description: "Clear menus, fees, and ETAs before you pay." },
          { title: "Local partners", description: "Independent kitchens and brands you can discover." },
          { title: "Built for speed", description: "Smooth flows on web so reordering takes seconds." },
        ]}
      />

      <h2>What we care about</h2>
      <ul>
        <li>Fair treatment of restaurants and delivery partners</li>
        <li>Supportive customer care when something goes wrong</li>
        <li>A warm, modern experience — not a cluttered form factory</li>
      </ul>

      <p>
        Questions?{" "}
        <Link href="/contact" className="text-brand-primary">
          Contact our team
        </Link>{" "}
        — we read every message.
      </p>
    </MarketingShell>
  );
}
