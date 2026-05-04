import CustomerPlaceholderPage from "@/components/ui/CustomerPlaceholderPage";

export const metadata = {
  title: "GG Pay",
};

export default function WalletPage() {
  return (
    <CustomerPlaceholderPage
      title="GG Pay"
      description="Save payment methods and use wallet balance for faster checkout. This area will light up as soon as payments are enabled on the backend."
    />
  );
}
