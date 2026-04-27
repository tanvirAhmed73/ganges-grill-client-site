import AppProviders from "@/providers/AppProviders";
import "./globals.css";

export const metadata = {
  title: {
    default: "Ganges Grill Restaurant",
    template: "%s | Ganges Grill",
  },
  description: "Ganges Grill Restaurant — order delicious food online.",
  icons: {
    icon:
      "https://png.pngtree.com/png-clipart/20220903/ourmid/pngtree-chef-restaurant-logo-png-image_6136204.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
