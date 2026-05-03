export const metadata = {
  title: "GG Pay",
};

export default function WalletPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <h1 className="text-2xl font-bold tracking-tight text-brand-dark">GG Pay</h1>
      <p className="mt-3 text-sm leading-relaxed text-brand-muted">
        Saved payment methods and wallet balance will appear here when available.
      </p>
    </div>
  );
}
