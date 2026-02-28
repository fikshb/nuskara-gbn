"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import AnimatedSection from "./AnimatedSection";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.max(duration / target, 10);
    const increment = Math.ceil(target / (duration / step));
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function VisionMissionTimeline({
  vision,
  mission,
}: {
  vision: { title: string; text: string };
  mission: { title: string; items: string[] };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const ease = [0.25, 0.4, 0.25, 1] as [number, number, number, number];

  return (
    <div ref={ref} className="relative">
      {/* Desktop: horizontal layout */}
      <div className="hidden lg:block">
        {/* Connecting line row - above cards */}
        <div className="flex items-center mb-4 px-[calc(25%-12px)]">
          {/* Vision node */}
          <div className="relative shrink-0">
            <motion.div
              className="w-8 h-8 rounded-full bg-[#FAF6F5] border-[2.5px] border-[#C41E2A] flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 350, damping: 15 }}
            >
              <motion.div
                className="w-2.5 h-2.5 rounded-full bg-[#C41E2A]"
                animate={inView ? { scale: [1, 1.4, 1], opacity: [1, 0.5, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
              />
            </motion.div>
            {inView && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#C41E2A]"
                animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
              />
            )}
          </div>

          {/* Line */}
          <div className="flex-1 relative h-[2px] mx-2">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C41E2A] via-[#E63946] to-[#C41E2A] origin-left"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, delay: 0.5, ease }}
              style={{ width: "100%", height: "100%" }}
            />
            {inView && (
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-12 h-[4px] rounded-full pointer-events-none"
                style={{ background: "linear-gradient(to right, transparent, #E63946, transparent)" }}
                animate={{ left: ["-10%", "100%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.5 }}
              />
            )}
          </div>

          {/* Mission node */}
          <motion.div
            className="w-8 h-8 rounded-full bg-[#FAF6F5] border-[2.5px] border-[#C41E2A] flex items-center justify-center shrink-0"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 350, damping: 15 }}
          >
            <svg className="w-3.5 h-3.5 text-[#C41E2A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </motion.div>
        </div>

        {/* Vertical drop lines + cards */}
        <div className="grid grid-cols-2 gap-8">
          {/* Vision card */}
          <div className="relative">
            {/* Drop line from node to card */}
            <div className="absolute left-1/2 -top-4 w-[2px] h-4 overflow-hidden">
              <motion.div
                className="w-full h-full bg-[#C41E2A]/30 origin-top"
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ delay: 0.6, duration: 0.3, ease }}
              />
            </div>
            <motion.div
              className="relative bg-white rounded-xl border border-neutral-200 p-6 shadow-sm overflow-hidden h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.6, ease }}
            >
              <motion.div
                className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#C41E2A] via-[#E63946] to-transparent"
                initial={{ width: "0%" }}
                animate={inView ? { width: "50%" } : { width: "0%" }}
                transition={{ delay: 0.6, duration: 0.8, ease }}
              />
              <div className="flex items-center gap-2.5 mb-3">
                <motion.div
                  className="w-8 h-8 rounded-lg bg-[#C41E2A]/10 border border-[#C41E2A]/20 flex items-center justify-center text-[#C41E2A]"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={inView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 15 }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </motion.div>
                <h3 className="text-sm font-bold text-[#C41E2A] uppercase tracking-wider">
                  {vision.title}
                </h3>
              </div>
              <p className="text-neutral-600 text-sm leading-relaxed">{vision.text}</p>
            </motion.div>
          </div>

          {/* Mission card */}
          <div className="relative">
            {/* Drop line from node to card */}
            <div className="absolute left-1/2 -top-4 w-[2px] h-4 overflow-hidden">
              <motion.div
                className="w-full h-full bg-[#C41E2A]/30 origin-top"
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ delay: 0.9, duration: 0.3, ease }}
              />
            </div>
            <motion.div
              className="relative bg-white rounded-xl border border-neutral-200 p-6 shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7, duration: 0.6, ease }}
            >
              <motion.div
                className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#C41E2A] via-[#E63946] to-transparent"
                initial={{ width: "0%" }}
                animate={inView ? { width: "40%" } : { width: "0%" }}
                transition={{ delay: 0.9, duration: 0.8, ease }}
              />
              <div className="flex items-center gap-2.5 mb-3.5">
                <motion.div
                  className="w-8 h-8 rounded-lg bg-[#C41E2A]/10 border border-[#C41E2A]/20 flex items-center justify-center text-[#C41E2A]"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={inView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 0.85, type: "spring", stiffness: 300, damping: 15 }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </motion.div>
                <h3 className="text-sm font-bold text-[#C41E2A] uppercase tracking-wider">
                  {mission.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {mission.items.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -15 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                    transition={{ delay: 1 + i * 0.2, duration: 0.5, ease }}
                  >
                    <motion.span
                      className="mt-0.5 w-5 h-5 rounded-full bg-[#C41E2A] flex items-center justify-center shrink-0"
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 1.1 + i * 0.2, type: "spring", stiffness: 400, damping: 15 }}
                    >
                      <span className="text-[10px] font-bold text-white">{i + 1}</span>
                    </motion.span>
                    <span className="text-neutral-600 text-sm leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked vertical */}
      <div className="lg:hidden space-y-4">
        <motion.div
          className="relative bg-white rounded-xl border border-neutral-200 p-5 shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.6, ease }}
        >
          <motion.div
            className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#C41E2A] via-[#E63946] to-transparent"
            initial={{ width: "0%" }}
            animate={inView ? { width: "50%" } : { width: "0%" }}
            transition={{ delay: 0.6, duration: 0.8, ease }}
          />
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C41E2A]/10 border border-[#C41E2A]/20 flex items-center justify-center text-[#C41E2A]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-[#C41E2A] uppercase tracking-wider">{vision.title}</h3>
          </div>
          <p className="text-neutral-600 text-sm leading-relaxed">{vision.text}</p>
        </motion.div>

        <motion.div
          className="relative bg-white rounded-xl border border-neutral-200 p-5 shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6, ease }}
        >
          <motion.div
            className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#C41E2A] via-[#E63946] to-transparent"
            initial={{ width: "0%" }}
            animate={inView ? { width: "40%" } : { width: "0%" }}
            transition={{ delay: 0.8, duration: 0.8, ease }}
          />
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#C41E2A]/10 border border-[#C41E2A]/20 flex items-center justify-center text-[#C41E2A]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-[#C41E2A] uppercase tracking-wider">{mission.title}</h3>
          </div>
          <ul className="space-y-2.5">
            {mission.items.map((item, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -15 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                transition={{ delay: 0.9 + i * 0.15, duration: 0.5, ease }}
              >
                <span className="mt-0.5 w-5 h-5 rounded-full bg-[#C41E2A] flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-white">{i + 1}</span>
                </span>
                <span className="text-neutral-600 text-sm leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default function CompanyOverviewSection() {
  const { t } = useTranslation();

  return (
    <section id="overview" className="relative py-16 lg:py-24 bg-[#FAF6F5] overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0">
        <img src="/images/bg-light-1.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(196,30,42,0.05),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Text */}
          <div>
            <AnimatedSection>
              <span className="text-[11px] font-bold tracking-[3px] uppercase text-[#C41E2A]">
                {t.overview.overline}
              </span>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[36px] font-black text-neutral-900 leading-[1.2] tracking-[-0.5px] uppercase text-center lg:text-left">
                {t.overview.headline}{" "}
                <span className="text-[#C41E2A]">{t.overview.headlineHighlight}</span>
              </h2>
            </AnimatedSection>

            {t.overview.description.map((p, i) => (
              <AnimatedSection key={i} delay={0.2 + i * 0.1}>
                <p className="mt-4 text-neutral-600 text-[15px] leading-relaxed">
                  {p}
                </p>
              </AnimatedSection>
            ))}
          </div>

          {/* Right: Stats */}
          <div>
            <AnimatedSection delay={0.3} direction="right">
              <div className="grid grid-cols-2 gap-4">
                {t.overview.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -3 }}
                    className="relative bg-white rounded-lg border border-neutral-200 p-6 text-center overflow-hidden group"
                  >
                    {/* Watermark number */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <motion.span
                        className="text-[80px] font-black text-[#C41E2A]/[0.04] leading-none select-none"
                        initial={{ scale: 2, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
                      >
                        {stat.value}
                      </motion.span>
                    </div>

                    <div className="relative z-10">
                      <div className="text-3xl lg:text-4xl font-black text-[#C41E2A]">
                        <CountUp target={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="mt-2 text-xs font-semibold tracking-wider uppercase text-neutral-500">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Vision & Mission - Full-width horizontal layout */}
        <div className="mt-12 lg:mt-16">
          <VisionMissionTimeline
            vision={t.overview.vision}
            mission={t.overview.mission}
          />
        </div>
      </div>
    </section>
  );
}
