import Link from "next/link";
import { MarketingHelpTopic } from "@/components/marketing/MarketingBlocks";
import MarketingShell from "@/components/marketing/MarketingShell";

export const metadata = {
  title: "Help center",
};

export default function HelpCenterPage() {
  return (
    <MarketingShell
      eyebrow="Support"
      title="Help center"
      intro="Quick answers about ordering, payments, and delivery. Still stuck? Contact us with your order ID."
    >
      <div className="not-prose space-y-3">
        <MarketingHelpTopic
          title="Browse the menu"
          description="Search dishes, categories, and prices before you sign in."
          href="/ourMenu"
          actionLabel="Open menu"
        />
        <MarketingHelpTopic
          title="Order online"
          description="Shop by category, search items, and add to cart."
          href="/order/popular"
          actionLabel="Start ordering"
        />
        <MarketingHelpTopic
          title="Contact & refunds"
          description="Wrong item or late delivery — reach us with your order reference."
          href="/contact"
          actionLabel="Contact"
        />
      </div>

      <h2>Ordering & menu</h2>
      <p>
        Prices and availability may change during peak hours. What you see at checkout is what we
        charge once your order is confirmed.
      </p>

      <h2>Payments</h2>
      <p>
        Supported methods appear at checkout. If a charge looks incorrect, contact us with a
        screenshot of your receipt and order ID.
      </p>

      <h2>Legal</h2>
      <p>
        <Link href="/termsAndCondition" className="text-brand-primary">
          Terms & conditions
        </Link>
        ,{" "}
        <Link href="/privacyPolicy" className="text-brand-primary">
          Privacy policy
        </Link>
        , and{" "}
        <Link href="/refundPolicy" className="text-brand-primary">
          Refund policy
        </Link>
        .
      </p>
    </MarketingShell>
  );
}
