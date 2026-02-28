"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";

const systemIcons: Record<string, ReactNode> = {
  warehouse: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z" />
    </svg>
  ),
  data: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
  ),
  tracking: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  network: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
  ),
};

export default function FleetTechSection() {
  const { t } = useTranslation();

  return (
    <section id="fleet" className="relative py-16 lg:py-24 bg-[#FAF6F5] overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0">
        <img src="/images/bg-light-1.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,30,42,0.03),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <AnimatedSection>
            <span className="text-[11px] font-bold tracking-[3px] uppercase text-[#C41E2A]">
              {t.fleet.overline}
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[36px] font-black text-neutral-900 leading-[1.2] tracking-[-0.5px] uppercase">
              {t.fleet.headline}{" "}
              <span className="text-[#C41E2A]">{t.fleet.headlineHighlight}</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mt-4 text-neutral-600 text-[15px] leading-relaxed">
              {t.fleet.description}
            </p>
          </AnimatedSection>
        </div>

        {/* Fleet showcase image */}
        <AnimatedSection delay={0.25}>
          <div className="relative rounded-xl overflow-hidden mb-12 h-64 lg:h-80">
            <img
              src="/images/fleet-showcase.webp"
              alt="Fleet showcase"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F5] via-[#FAF6F5]/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6F5]/40 via-transparent to-[#FAF6F5]/40" />
          </div>
        </AnimatedSection>

        {/* Stats bar */}
        <AnimatedSection delay={0.3}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {t.fleet.stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-lg border border-neutral-200 p-5 text-center">
                <div className="text-2xl font-black text-[#C41E2A]">{stat.value}</div>
                <div className="mt-1 text-xs font-semibold tracking-wider uppercase text-neutral-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Systems grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5" staggerDelay={0.12}>
          {t.fleet.systems.map((system, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="group bg-white rounded-xl border border-neutral-200 p-6 hover:border-[#C41E2A]/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-lg bg-[#C41E2A]/10 border border-[#C41E2A]/20 flex items-center justify-center text-[#C41E2A] shrink-0 group-hover:bg-[#C41E2A]/15 transition-colors">
                    {systemIcons[system.icon]}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 mb-1.5">
                      {system.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {system.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
