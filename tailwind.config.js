/**
 * Tailwind configuration — Ganges Grill design system
 *
 * CUSTOM COLORS (single source of truth)
 * Use utility classes like `bg-brand-primary`, `text-brand-muted`.
 * DaisyUI removed — use Tailwind + `brand-*` tokens only.
 *
 * Token map (design intent):
 * | Token              | Hex       | Use case                          |
 * |--------------------|-----------|-----------------------------------|
 * | brand.primary      | #FF6B35   | CTAs, primary buttons, key links |
 * | brand.secondary    | #F7C59F   | Cards, highlights, soft accents   |
 * | brand.background   | #FFF8F3   | Main page / app background        |
 * | brand.dark         | #1A1A1A   | Primary body and heading text    |
 * | brand.muted        | #4A4A4A   | Secondary / helper / captions    |
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/contexts/**/*.{js,jsx,ts,tsx}",
    "./src/providers/**/*.{js,jsx,ts,tsx}",
    "./src/hooks/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          /** Primary brand — CTAs, primary buttons, strong accents */
          primary: "#FF6B35",
          /** Secondary tint — cards, highlighted surfaces, chips */
          secondary: "#F7C59F",
          /** Main canvas — page background (warm off-white) */
          background: "#FFF8F3",
          /** Primary text — headings, body emphasis */
          dark: "#1A1A1A",
          /** Muted text — captions, meta, de-emphasized copy */
          muted: "#4A4A4A",
        },
        /** Restaurant owner portal — teal/slate (distinct from customer orange) */
        vendor: {
          primary: "#0f766e",
          accent: "#14b8a6",
          surface: "#f0fdfa",
          muted: "#64748b",
          sidebar: "#134e4a",
          sidebarHover: "#115e59",
          border: "#99f6e4",
          danger: "#dc2626",
          ink: "#0f172a",
        },
      },
    },
  },
  plugins: [],
};
