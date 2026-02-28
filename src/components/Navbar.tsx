"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";

export default function Navbar() {
  const { locale, setLocale, t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scroll spy */
  useEffect(() => {
    const ids = t.nav.links.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [t.nav.links]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <a href="#" className="shrink-0">
          <img
            src="/images/gbn-logo.webp"
            alt="Garuda Bakti Nusantara"
            className="h-10 w-auto"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {t.nav.links.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-[13px] font-medium tracking-wide transition-colors duration-200 ${
                  isActive
                    ? "text-[#C41E2A]"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="navUnderline"
                    className="h-[2px] bg-[#C41E2A] mt-1 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => setLocale(locale === "en" ? "id" : "en")}
            className="text-xs font-bold tracking-widest text-neutral-500 hover:text-neutral-900 transition-colors border border-neutral-300 rounded px-2.5 py-1"
          >
            {locale === "en" ? "ID" : "EN"}
          </button>
          <button
            onClick={() => scrollTo("#contact")}
            className="bg-[#C41E2A] hover:bg-[#D42030] text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors"
          >
            {t.nav.cta}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-neutral-700 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-neutral-200 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {t.nav.links.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.href)}
                  className={`block w-full text-left py-2.5 text-sm font-medium transition-colors ${
                    activeSection === link.href.replace("#", "")
                      ? "text-[#C41E2A]"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="flex items-center gap-3 pt-3 border-t border-neutral-200">
                <button
                  onClick={() => setLocale(locale === "en" ? "id" : "en")}
                  className="text-xs font-bold text-neutral-500 border border-neutral-300 rounded px-2.5 py-1"
                >
                  {locale === "en" ? "ID" : "EN"}
                </button>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="bg-[#C41E2A] text-white text-sm font-semibold px-5 py-2.5 rounded flex-1"
                >
                  {t.nav.cta}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
