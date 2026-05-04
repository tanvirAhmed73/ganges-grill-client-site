import Link from "next/link";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { MarketingInfoCard } from "@/components/marketing/MarketingBlocks";
import MarketingShell from "@/components/marketing/MarketingShell";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <MarketingShell
      eyebrow="We're listening"
      title="Contact us"
      intro="Order issue, partnership question, or feedback — pick the channel that fits. We typically reply within one business day."
    >
      <div className="not-prose grid gap-4 sm:grid-cols-3">
        <MarketingInfoCard icon={<FiMapPin className="h-6 w-6" aria-hidden />} title="Address">
          <p>Gulshan Avenue, Dhaka, Bangladesh</p>
        </MarketingInfoCard>
        <MarketingInfoCard icon={<FiPhone className="h-6 w-6" aria-hidden />} title="Phone">
          <a
            href="tel:+8801234567890"
            className="font-semibold text-brand-primary hover:underline"
          >
            +880 1234-567890
          </a>
          <p className="mt-2 text-xs text-brand-muted/90">Daily · 9am – 11pm (BST)</p>
        </MarketingInfoCard>
        <MarketingInfoCard icon={<FiMail className="h-6 w-6" aria-hidden />} title="Email">
          <a
            href="mailto:hello@gangesgrill.com"
            className="break-all font-semibold text-brand-primary hover:underline"
          >
            hello@gangesgrill.com
          </a>
        </MarketingInfoCard>
      </div>

      <div className="not-prose mt-8 flex gap-4 rounded-2xl border border-brand-primary/20 bg-gradient-to-r from-brand-primary/8 to-brand-secondary/20 px-5 py-4 sm:items-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary/15 text-brand-primary">
          <FiClock className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <p className="font-semibold text-brand-dark">Faster help with orders</p>
          <p className="mt-1 text-sm text-brand-muted">
            Include your order ID and phone number. For common questions, see the{" "}
            <Link href="/help" className="font-semibold text-brand-primary hover:underline">
              Help center
            </Link>
            .
          </p>
        </div>
      </div>
    </MarketingShell>
  );
}
