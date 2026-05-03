"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FiFacebook, FiInstagram, FiMapPin, FiPhone, FiTwitter } from "react-icons/fi";

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: FiFacebook },
  { label: "Instagram", href: "https://instagram.com", icon: FiInstagram },
  { label: "Twitter", href: "https://x.com", icon: FiTwitter },
];

export default function Footer() {
  const { t } = useTranslation("common");
  const year = new Date().getFullYear();

  const footerGroups = [
    {
      title: t("footer.discover"),
      links: [
        { label: t("footer.home"), href: "/" },
        { label: t("footer.allRestaurants"), href: "/" },
        { label: t("footer.ourMenu"), href: "/ourMenu" },
        { label: t("footer.popularDeals"), href: "/" },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { label: t("footer.aboutUs"), href: "/about" },
        { label: t("footer.contact"), href: "/contact" },
        { label: t("footer.careers"), href: "/contact" },
        { label: t("footer.partnerWithUs"), href: "/contact" },
      ],
    },
    {
      title: t("footer.support"),
      links: [
        { label: t("footer.helpCenter"), href: "/contact" },
        { label: t("footer.termsConditions"), href: "/termsAndCondition" },
        { label: t("footer.privacyPolicy"), href: "/privacyPolicy" },
        { label: t("footer.refundPolicy"), href: "/refundPolicy" },
      ],
    },
  ];

  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-[1340px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.8fr)] lg:gap-12">
          <section>
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="https://png.pngtree.com/png-clipart/20220903/ourmid/pngtree-chef-restaurant-logo-png-image_6136204.png"
                alt="Ganges Grill"
                width={44}
                height={44}
                className="h-11 w-auto object-contain"
              />
              <span className="text-lg font-bold text-brand-dark">
                Ganges <span className="text-brand-primary">Grill</span>
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-brand-muted">
              {t("footer.tagline")}
            </p>

            <div className="mt-5 space-y-2.5 text-sm text-brand-muted">
              <p className="inline-flex items-center gap-2">
                <FiMapPin className="text-brand-primary" />
                {t("footer.address")}
              </p>
              <p className="inline-flex items-center gap-2">
                <FiPhone className="text-brand-primary" />
                {t("footer.phone")}
              </p>
            </div>

            <div className="mt-5 flex items-center gap-2.5">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-brand-muted transition-colors hover:border-brand-primary hover:bg-brand-primary hover:text-white"
                >
                  <Icon className="text-base" />
                </a>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-dark">
                  {group.title}
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-brand-muted transition-colors hover:text-brand-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </section>
        </div>

        <div className="mt-8 border-t border-black/5 pt-4">
          <p className="text-xs text-brand-muted sm:text-sm">
            {t("footer.copyright", { year })}
          </p>
        </div>
      </div>
    </footer>
  );
}
