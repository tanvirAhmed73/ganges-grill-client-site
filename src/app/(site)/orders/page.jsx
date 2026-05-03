export const metadata = {
  title: "Orders",
};

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="text-2xl font-bold tracking-tight text-brand-dark">
        Orders & reordering
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-brand-muted">
        Your past orders and quick reorder will show here when connected to your account.
      </p>
    </div>
  );
}
