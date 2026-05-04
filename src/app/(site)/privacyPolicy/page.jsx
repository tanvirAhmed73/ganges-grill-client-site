import Link from "next/link";
import MarketingShell from "@/components/marketing/MarketingShell";

export const metadata = {
  title: "Privacy policy",
};

export default function PrivacyPolicyPage() {
  return (
    <MarketingShell
      eyebrow="Legal"
      title="Privacy policy"
      intro="How we collect, use, and protect your information when you use Ganges Grill."
    >
      <h2>1. Information we collect</h2>
      <p>
        We collect information you provide (name, email, phone, delivery address), order history,
        device and log data, and communications with support. Payment card data is handled by our
        payment processors; we do not store full card numbers on our servers.
      </p>
      <h2>2. How we use information</h2>
      <p>
        We use your data to process orders, improve our services, send transactional messages,
        detect fraud, and comply with law. With your consent, we may send marketing you can opt out
        of at any time.
      </p>
      <h2>3. Sharing</h2>
      <p>
        We share information with restaurants fulfilling your order, delivery partners when
        applicable, and service providers who assist our operations (hosting, analytics, payments)
        under strict confidentiality.
      </p>
      <h2>4. Retention & security</h2>
      <p>
        We retain data as needed for legitimate business purposes and legal obligations. We use
        industry-standard safeguards; no method of transmission over the internet is 100% secure.
      </p>
      <h2>5. Your rights</h2>
      <p>
        Depending on applicable law, you may request access, correction, or deletion of your
        personal data. Contact us through our{" "}
        <Link href="/contact" className="text-brand-primary">
          Contact
        </Link>{" "}
        page.
      </p>
    </MarketingShell>
  );
}
