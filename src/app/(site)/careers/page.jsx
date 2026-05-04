import MarketingShell from "@/components/marketing/MarketingShell";

export const metadata = {
  title: "Careers",
};

export default function CareersPage() {
  return (
    <MarketingShell
      eyebrow="Join us"
      title="Careers"
      intro="Help us build the future of food delivery in Bangladesh. We hire across operations, support, partnerships, and product."
    >
      <p>
        We&apos;re growing our team in Dhaka. Whether you love keeping riders on schedule, talking
        to restaurants, or shipping product improvements — there may be a role for you.
      </p>

      <h2>How to apply</h2>
      <p>
        Email{" "}
        <a href="mailto:careers@gangesgrill.com" className="text-brand-primary">
          careers@gangesgrill.com
        </a>{" "}
        with your CV and a short note about what you&apos;d like to work on. Use the position title
        or &quot;General application&quot; in the subject line.
      </p>
      <p>
        We aim to reply within two weeks. For agency recruiters: please only reach out for roles we
        post publicly.
      </p>
    </MarketingShell>
  );
}
