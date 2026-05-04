import Link from "next/link";
import MarketingShell from "@/components/marketing/MarketingShell";

export const metadata = {
  title: "Refund policy",
};

export default function RefundPolicyPage() {
  return (
    <MarketingShell
      eyebrow="Legal"
      title="Refund policy"
      intro="How refunds and adjustments work for orders placed through Ganges Grill."
    >
      <h2>1. Before the restaurant accepts</h2>
      <p>
        If you cancel before the kitchen confirms your order, we will void or refund the payment
        according to your bank or wallet provider timelines (typically 3–10 business days).
      </p>
      <h2>2. After preparation starts</h2>
      <p>
        Once the restaurant accepts and begins preparation, cancellation may not be possible. Contact
        support immediately if there is an error — we will coordinate with the restaurant on a
        case-by-case basis.
      </p>
      <h2>3. Wrong or missing items</h2>
      <p>
        Report issues within 24 hours through{" "}
        <Link href="/contact" className="text-brand-primary">
          Contact
        </Link>{" "}
        with your order ID and photos if applicable. We may offer a partial refund, credit, or
        redelivery depending on the situation.
      </p>
      <h2>4. Quality concerns</h2>
      <p>
        Food safety and quality are taken seriously. Refunds for quality are assessed with the
        restaurant and may require verification.
      </p>
      <h2>5. Payment disputes</h2>
      <p>
        For duplicate charges or processing errors, contact us first with your receipt so we can
        resolve before you dispute with your bank.
      </p>
    </MarketingShell>
  );
}
