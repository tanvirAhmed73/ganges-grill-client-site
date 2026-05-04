import CustomerPlaceholderPage from "@/components/ui/CustomerPlaceholderPage";

export const metadata = {
  title: "Orders",
};

export default function OrdersPage() {
  return (
    <CustomerPlaceholderPage
      title="Orders & reordering"
      description="When your account is connected to order history, your past orders and one-tap reorder will appear here. We’re building a full order timeline next."
    />
  );
}
