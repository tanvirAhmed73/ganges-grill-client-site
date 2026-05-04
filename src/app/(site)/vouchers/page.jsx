import CustomerPlaceholderPage from "@/components/ui/CustomerPlaceholderPage";

export const metadata = {
  title: "Vouchers",
};

export default function VouchersPage() {
  return (
    <CustomerPlaceholderPage
      title="Vouchers"
      description="Promotional codes and vouchers you can apply at checkout will show up here when your offers are available."
    />
  );
}
