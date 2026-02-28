"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";

const clientLogos: Record<string, string> = {
  "Berau Coal": "/images/client-berau-coal.webp",
  "BME": "/images/client-bme.webp",
  "Dyno Nobel": "/images/client-dyno-nobel.webp",
  "Dahana": "/images/client-dahana.webp",
  "DAN": "/images/client-dan.webp",
  "Orica": "/images/client-orica.webp",
  "Mexis": "/images/client-mexis.webp",
};

export default function ClientsSection() {
  const { t } = useTranslation();

  return (
    <section id="clients" className="relative py-16 lg:py-24 bg-[#FAF6F5] overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0">
        <img src="/images/bg-light-1.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(196,30,42,0.04),transparent_65%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <AnimatedSection>
            <span className="text-[11px] font-bold tracking-[3px] uppercase text-[#C41E2A]">
              {t.clients.overline}
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[36px] font-black text-neutral-900 leading-[1.2] tracking-[-0.5px] uppercase">
              {t.clients.headline}{" "}
              <span className="text-[#C41E2A]">{t.clients.headlineHighlight}</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mt-4 text-neutral-600 text-[15px] leading-relaxed">
              {t.clients.description}
            </p>
          </AnimatedSection>
        </div>

        {/* Client grid */}
        <StaggerContainer
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          staggerDelay={0.08}
        >
          {t.clients.names.map((name, i) => {
            const logo = clientLogos[name];
            return (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="group bg-white rounded-lg border border-neutral-200 p-6 flex items-center justify-center min-h-[100px] hover:border-[#C41E2A]/30 hover:shadow-md transition-all duration-300"
                >
                  {logo ? (
                    <img
                      src={logo}
                      alt={name}
                      className="max-h-14 max-w-[160px] object-contain grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300"
                    />
                  ) : (
                    <span className="text-sm font-bold text-neutral-700 group-hover:text-[#C41E2A] transition-colors text-center">
                      {name}
                    </span>
                  )}
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
