import { FiChevronRight } from "react-icons/fi";

export default function SectionTitle({ title, actionLabel = "See all" }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-xl font-semibold tracking-tight text-brand-dark sm:text-2xl">
        {title}
      </h2>
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-full border border-brand-secondary/80 px-3 py-1.5 text-sm font-medium text-brand-muted transition-colors hover:border-brand-primary hover:text-brand-dark"
      >
        {actionLabel}
        <FiChevronRight className="text-base" />
      </button>
    </div>
  );
}
