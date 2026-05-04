import Link from "next/link";
import MarketingShell from "@/components/marketing/MarketingShell";

export const metadata = {
  title: "Terms & conditions",
};

export default function TermsPage() {
  return (
    <MarketingShell
      eyebrow="Legal"
      title="Terms & conditions"
      intro="These terms govern your use of the Ganges Grill website and ordering services. Last updated April 2026."
    >
      <h2>1. Service</h2>
      <p>
        Ganges Grill provides an online marketplace that connects you with independent restaurants
        and delivery partners. We facilitate orders; restaurants prepare food and partners may
        deliver unless otherwise stated at checkout.
      </p>
      <h2>2. Accounts</h2>
      <p>
        You agree to provide accurate contact and delivery information. You are responsible for
        activity under your account and must keep credentials confidential.
      </p>
      <h2>3. Pricing & availability</h2>
      <p>
        Menu prices, fees, and ETAs are shown before you pay and may change without notice until
        your order is confirmed. Promotions are subject to eligibility and campaign rules shown in
        the app or on this site.
      </p>
      <h2>4. Cancellations & refunds</h2>
      <p>
        Cancellation and refund rules depend on order status and restaurant policy. See our{" "}
        <Link href="/refundPolicy" className="text-brand-primary">
          Refund policy
        </Link>{" "}
        for details.
      </p>
      <h2>5. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Ganges Grill is not liable for indirect or
        consequential losses arising from use of the service. Nothing in these terms excludes
        liability that cannot be excluded under applicable law.
      </p>
      <h2>6. Contact</h2>
      <p>
        Questions about these terms:{" "}
        <Link href="/contact" className="text-brand-primary">
          Contact us
        </Link>
        .
      </p>
    </MarketingShell>
  );
}
