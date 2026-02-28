"use client";

import { useTranslation } from "@/i18n/LanguageContext";
import AnimatedSection from "./AnimatedSection";

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="relative py-16 lg:py-24 bg-neutral-950 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0">
        <img src="/images/bg-dark-1.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" />
      </div>
      {/* Subtle radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(196,30,42,0.08),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <AnimatedSection>
            <span className="text-[11px] font-bold tracking-[3px] uppercase text-[#E63946]">
              {t.contact.overline}
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[36px] font-black text-white leading-[1.2] tracking-[-0.5px] uppercase">
              {t.contact.headline}{" "}
              <span className="text-[#E63946]">{t.contact.headlineHighlight}</span>
            </h2>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-8">
              {/* Main Office */}
              <div>
                <h3 className="text-sm font-bold text-[#E63946] uppercase tracking-wider mb-3">
                  Head Office
                </h3>
                <div className="space-y-1">
                  {t.contact.info.address.map((line, i) => (
                    <p key={i} className="text-neutral-400 text-[15px]">{line}</p>
                  ))}
                </div>
              </div>

              {/* Operational Office */}
              <div>
                <h3 className="text-sm font-bold text-[#E63946] uppercase tracking-wider mb-3">
                  {t.contact.info.operationalLabel}
                </h3>
                <div className="space-y-1">
                  {t.contact.info.operationalAddress.map((line, i) => (
                    <p key={i} className="text-neutral-400 text-[15px]">{line}</p>
                  ))}
                </div>
              </div>

              {/* Contact details */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C41E2A]/20 border border-[#C41E2A]/30 flex items-center justify-center text-[#E63946]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <span className="text-neutral-300 text-[15px]">{t.contact.info.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C41E2A]/20 border border-[#C41E2A]/30 flex items-center justify-center text-[#E63946]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <span className="text-neutral-300 text-[15px]">{t.contact.info.phone}</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Form */}
          <AnimatedSection delay={0.3} direction="right">
            <form
              className="space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t.contact.form.name}
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#C41E2A]/50 transition-colors"
                />
                <input
                  type="email"
                  placeholder={t.contact.form.email}
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#C41E2A]/50 transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder={t.contact.form.company}
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#C41E2A]/50 transition-colors"
              />
              <textarea
                rows={5}
                placeholder={t.contact.form.message}
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#C41E2A]/50 transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full bg-[#C41E2A] hover:bg-[#D42030] text-white text-sm font-semibold py-3.5 rounded-lg transition-colors"
              >
                {t.contact.form.submit}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
