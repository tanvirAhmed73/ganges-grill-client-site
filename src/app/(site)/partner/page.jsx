import MarketingShell from "@/components/marketing/MarketingShell";

export const metadata = {
  title: "Partner with us",
};

export default function PartnerPage() {
  return (
    <MarketingShell
      eyebrow="For restaurants"
      title="Partner with us"
      intro="Reach customers who order every day. We onboard kitchens that meet our quality bar and help you grow with fair tools and reporting."
    >
      <p>
        Listing on Ganges Grill means menu management, promotion slots on our home feed, and clear
        settlement reporting — without drowning you in opaque fees.
      </p>

      <h2>What we look for</h2>
      <ul>
        <li>Consistent prep times and packaging suitable for delivery</li>
        <li>Valid business registration and documentation where applicable</li>
        <li>A commitment to accurate menus and real-time availability</li>
      </ul>

      <h2>Get in touch</h2>
      <p>
        Write to{" "}
        <a href="mailto:partners@gangesgrill.com" className="text-brand-primary">
          partners@gangesgrill.com
        </a>{" "}
        with your restaurant name, neighbourhood, and average weekly orders. Our partnerships team
        will follow up with next steps.
      </p>
    </MarketingShell>
  );
}
