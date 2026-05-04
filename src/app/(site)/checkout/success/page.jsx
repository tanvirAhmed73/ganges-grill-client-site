import OrderConfirmationView from "@/components/checkout/OrderConfirmationView";

export const metadata = {
  title: "Order confirmed",
};

export default function CheckoutSuccessPage() {
  return <OrderConfirmationView />;
}
