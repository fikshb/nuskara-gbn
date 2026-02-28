"use client";

import { useTranslation } from "@/i18n/LanguageContext";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#FAF6F5] border-t-2 border-[#C41E2A]">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Brand column - spans 2 */}
          <div className="lg:col-span-2">
            <img
              src="/images/gbn-logo.webp"
              alt="Garuda Bakti Nusantara"
              className="h-10 w-auto mb-4"
            />
            <p className="text-neutral-500 text-sm leading-relaxed max-w-sm">
              {t.footer.description}
            </p>
          </div>

          {/* Link columns */}
          {t.footer.columns.map((col, i) => (
            <div key={i}>
              <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.href}
                      className="footer-link text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400">
            &copy; {year} {t.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">
              {t.footer.privacyPolicy}
            </a>
            <a href="#" className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">
              {t.footer.termsOfService}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
