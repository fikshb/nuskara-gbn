"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import AnimatedSection from "./AnimatedSection";

function CountUp({ target }: { target: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const num = parseInt(target.replace(/[^0-9]/g, ""));
  const hasPlus = target.includes("+");
  const isText = isNaN(num);

  useEffect(() => {
    if (!inView || isText) return;
    let start = 0;
    const duration = 2000;
    const step = duration / num;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= num) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [inView, num, isText]);

  if (isText) return <span ref={ref}>{target}</span>;
  return (
    <span ref={ref}>
      {count}
      {hasPlus ? "+" : ""}
    </span>
  );
}

export default function CoverageSection() {
  const { t } = useTranslation();

  return (
    <section id="coverage" className="relative py-16 lg:py-24 bg-neutral-950 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0">
        <img src="/images/bg-dark-1.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" />
      </div>
      {/* Subtle radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,30,42,0.06),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header - centered */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <AnimatedSection>
            <span className="text-[11px] font-bold tracking-[3px] uppercase text-[#E63946]">
              {t.coverage.overline}
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[36px] font-black text-white leading-[1.2] tracking-[-0.5px] uppercase">
              {t.coverage.headline}{" "}
              <span className="text-[#E63946]">{t.coverage.headlineHighlight}</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mt-4 text-neutral-400 text-[15px] leading-relaxed">
              {t.coverage.description}
            </p>
          </AnimatedSection>
        </div>

        {/* Stats - large animated cards, 3 columns */}
        <AnimatedSection delay={0.3}>
          <div className="grid grid-cols-3 gap-4 lg:gap-6 max-w-3xl mx-auto mb-10">
            {t.coverage.stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="relative text-center p-6 lg:p-8 rounded-xl border border-white/[0.06] bg-white/[0.03] overflow-hidden group"
              >
                {/* Watermark number */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.span
                    className={`font-black text-[#E63946]/[0.04] leading-none select-none ${isNaN(parseInt(stat.value.replace(/[^0-9]/g, ""))) ? "text-[40px] lg:text-[56px]" : "text-[72px] lg:text-[96px]"}`}
                    initial={{ scale: 2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
                  >
                    {stat.value}
                  </motion.span>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,30,42,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className={`font-black text-[#E63946] ${isNaN(parseInt(stat.value.replace(/[^0-9]/g, ""))) ? "text-xl lg:text-2xl" : "text-3xl lg:text-4xl"}`}>
                    <CountUp target={stat.value} />
                  </div>
                  <div className="mt-2 text-[11px] font-semibold tracking-wider uppercase text-neutral-500">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Region tags - centered */}
        <AnimatedSection delay={0.4}>
          <div className="flex flex-wrap justify-center gap-2">
            {t.coverage.regions.map((region, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.05 }}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border cursor-default transition-colors ${
                  i === 0
                    ? "bg-[#C41E2A]/20 border-[#C41E2A]/40 text-[#E63946]"
                    : "bg-white/[0.04] border-white/[0.08] text-neutral-400 hover:border-white/[0.15] hover:text-neutral-300"
                }`}
              >
                {region}
              </motion.span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
