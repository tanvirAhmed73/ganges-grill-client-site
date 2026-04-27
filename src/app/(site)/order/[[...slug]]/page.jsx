import OrderShopView from "@/components/order/OrderShopView";

export const metadata = {
  title: "Our Shop",
};

export default function OrderPage({ params }) {
  const slug = params.slug;
  const categorySlug = Array.isArray(slug) ? slug[0] : slug;

  return <OrderShopView categorySlug={categorySlug} />;
}
