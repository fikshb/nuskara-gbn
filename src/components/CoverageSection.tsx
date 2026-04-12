"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import AnimatedSection from "./AnimatedSection";

/* ── Port data: 21 locations ── */
interface PortData {
  id: string;
  x: number;
  y: number;
  isHQ?: boolean;
  line: 0 | 1 | 2 | 3;
}

const portData: PortData[] = [
  // Line 0 — Main route: Jakarta → Surabaya → NTB → Kupang
  { id: "jakarta", x: 27.6, y: 70.5, isHQ: true, line: 0 },
  { id: "surabaya", x: 36, y: 73, line: 0 },
  { id: "ntb", x: 48.5, y: 82, line: 0 },
  { id: "kupang", x: 55.5, y: 84, line: 0 },

  // Line 1 — Sumatera
  { id: "aceh", x: 11.5, y: 19, line: 1 },
  { id: "medan", x: 14, y: 27, line: 1 },

  // Line 2 — Kalimantan
  { id: "pontianak", x: 33, y: 52, line: 2 },
  { id: "banjarmasin", x: 42.5, y: 58, line: 2 },
  { id: "balikpapan", x: 45, y: 44, line: 2 },
  { id: "samarinda", x: 46, y: 39, line: 2 },
  { id: "bontang", x: 47.5, y: 35, line: 2 },
  { id: "berau", x: 46.5, y: 28, line: 2 },
  { id: "melipau", x: 44, y: 32, line: 2 },
  { id: "tarakan", x: 46, y: 21, line: 2 },

  // Line 2 branch — Papua
  { id: "sorong", x: 74, y: 34, line: 2 },
  { id: "bintuni", x: 72, y: 40, line: 2 },
  { id: "timika", x: 78, y: 50, line: 2 },

  // Line 3 — Sulawesi
  { id: "palu", x: 52, y: 39, line: 3 },
  { id: "makassar", x: 49, y: 58, line: 3 },
  { id: "bitung", x: 56.5, y: 27, line: 3 },
  { id: "kendari", x: 55.5, y: 48, line: 3 },
];

/* ── Shipping route connections ── */
const routes = [
  { path: ["jakarta", "surabaya", "ntb", "kupang"], color: "#8B2232" },
  { path: ["jakarta", "medan", "aceh"], color: "#D4565E" },
  { path: ["jakarta", "pontianak", "banjarmasin", "balikpapan", "samarinda", "bontang", "melipau", "berau", "tarakan"], color: "#A22B3C" },
  { path: ["tarakan", "sorong", "bintuni", "timika"], color: "#A22B3C" },
  { path: ["makassar", "palu", "bitung"], color: "#C44D5E" },
  { path: ["palu", "kendari"], color: "#C44D5E" },
];

const LINE_COLORS = ["#8B2232", "#D4565E", "#A22B3C", "#C44D5E"];

function getPort(id: string) {
  return portData.find((p) => p.id === id)!;
}

/* ── CountUp ── */
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

/* ── Map Dot ── */
function MapDot({
  port,
  index,
  isActive,
  onHover,
  onLeave,
  name,
  hqLabel,
  inView,
}: {
  port: PortData & { name: string };
  index: number;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  name: string;
  hqLabel: string;
  inView: boolean;
}) {
  const dotSize = port.isHQ ? 14 : 10;
  const glowSize = port.isHQ ? 32 : 20;
  const entranceDelay = 0.6 + index * 0.06;
  const dotColor = port.isHQ ? "#8B2232" : LINE_COLORS[port.line];

  return (
    <div
      className="absolute"
      style={{ left: `${port.x}%`, top: `${port.y}%`, transform: "translate(-50%, -50%)" }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Static glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: glowSize,
          height: glowSize,
          left: -glowSize / 2,
          top: -glowSize / 2,
          backgroundColor: `${dotColor}20`,
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: entranceDelay }}
      />

      {/* HQ pulsing ring */}
      {port.isHQ && inView && (
        <>
          <div
            className="absolute rounded-full border-2"
            style={{
              width: dotSize + 16,
              height: dotSize + 16,
              left: -(dotSize + 16) / 2,
              top: -(dotSize + 16) / 2,
              borderColor: "#8B223240",
            }}
          />
          <motion.div
            className="absolute rounded-full border-2 border-[#8B2232]"
            style={{
              width: dotSize,
              height: dotSize,
              left: -dotSize / 2,
              top: -dotSize / 2,
            }}
            animate={{ scale: [1, 2.8], opacity: [0.4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: entranceDelay + 0.5 }}
          />
        </>
      )}

      {/* Dot */}
      <motion.div
        className="relative rounded-full border-2 border-white shadow-lg cursor-pointer"
        style={{
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          backgroundColor: dotColor,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: isActive ? 1.3 : 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 15, delay: isActive ? 0 : entranceDelay },
          opacity: { duration: 0.5, delay: entranceDelay },
        }}
      />

      {/* Persistent label (desktop) */}
      <motion.div
        className="absolute whitespace-nowrap pointer-events-none hidden lg:block left-4 top-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: entranceDelay + 0.4, duration: 0.4 }}
      >
        <span
          className={`px-1.5 py-0.5 text-[8px] font-semibold rounded shadow-sm ${
            port.isHQ
              ? "bg-[#8B2232] text-white tracking-wider font-bold text-[10px]"
              : "bg-white/90 text-neutral-700 border border-neutral-200"
          }`}
        >
          {port.isHQ ? hqLabel : name}
        </span>
      </motion.div>

      {/* Hover tooltip */}
      <motion.div
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 whitespace-nowrap pointer-events-none z-20"
        initial={{ opacity: 0, y: 4 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        transition={{ duration: 0.15 }}
      >
        <span className="px-3 py-1.5 bg-neutral-900/90 text-white text-xs font-semibold rounded-lg shadow-xl backdrop-blur-sm">
          {name}
        </span>
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-neutral-900/90" />
      </motion.div>
    </div>
  );
}

/* ── Main Section ── */
export default function CoverageSection() {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInView = useInView(mapRef, { once: true, margin: "-50px" });

  const ports = portData.map((p, i) => ({
    ...p,
    name: t.map.locations[i] || p.id,
  }));

  return (
    <section id="coverage" className="relative py-16 lg:py-24 bg-neutral-950 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0">
        <img src="/images/bg-dark-1.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,34,50,0.06),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <AnimatedSection>
            <span className="text-[11px] font-bold tracking-[3px] uppercase text-[#D4565E]">
              {t.coverage.overline}
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[36px] font-black text-white leading-[1.2] tracking-[-0.5px] uppercase">
              {t.coverage.headline}{" "}
              <span className="text-[#D4565E]">{t.coverage.headlineHighlight}</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mt-4 text-neutral-400 text-[15px] leading-relaxed">
              {t.coverage.description}
            </p>
          </AnimatedSection>
        </div>

        {/* Indonesia Map with 21 ports */}
        <AnimatedSection delay={0.25}>
          <div ref={mapRef} className="relative w-full overflow-hidden rounded-xl mb-10">
            <img
              src="/images/indonesia-map-transparent.webp"
              alt="Indonesia port coverage map"
              className="w-full h-auto block opacity-80"
            />

            {/* Route lines SVG overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="gbnRouteGlow" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="0.3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Static dashed route lines */}
              {routes.map((route, ri) => {
                const points = route.path.map((id) => getPort(id));
                return (
                  <g key={`route-${ri}`}>
                    {points.slice(1).map((p, si) => {
                      const prev = points[si];
                      return (
                        <motion.line
                          key={`seg-${ri}-${si}`}
                          x1={prev.x}
                          y1={prev.y}
                          x2={p.x}
                          y2={p.y}
                          stroke={route.color}
                          strokeWidth="0.25"
                          strokeDasharray="0.6 0.4"
                          initial={{ opacity: 0 }}
                          animate={mapInView ? { opacity: 0.4 } : { opacity: 0 }}
                          transition={{ duration: 1, delay: 1 + ri * 0.3 + si * 0.12 }}
                        />
                      );
                    })}
                  </g>
                );
              })}

              {/* Animated pulse glow along routes */}
              {routes.map((route, ri) => {
                const points = route.path.map((id) => getPort(id));
                return (
                  <g key={`pulse-${ri}`}>
                    {points.slice(1).map((p, si) => {
                      const prev = points[si];
                      const gradId = `gbn-grad-${ri}-${si}`;
                      return (
                        <g key={`pg-${ri}-${si}`}>
                          <defs>
                            <linearGradient
                              id={gradId}
                              x1={prev.x}
                              y1={prev.y}
                              x2={p.x}
                              y2={p.y}
                              gradientUnits="userSpaceOnUse"
                            >
                              <motion.stop
                                offset="0%"
                                stopColor={route.color}
                                animate={mapInView ? { stopOpacity: [0, 0.7, 0.7, 0] } : { stopOpacity: 0 }}
                                transition={{ duration: 3, repeat: Infinity, delay: 2.5 + ri * 1.2 + si * 0.5, repeatDelay: 5, ease: "easeInOut" }}
                              />
                              <motion.stop
                                offset="50%"
                                stopColor="#D4565E"
                                animate={mapInView ? { stopOpacity: [0, 0.5, 0.5, 0] } : { stopOpacity: 0 }}
                                transition={{ duration: 3, repeat: Infinity, delay: 2.8 + ri * 1.2 + si * 0.5, repeatDelay: 5, ease: "easeInOut" }}
                              />
                              <motion.stop
                                offset="100%"
                                stopColor={route.color}
                                animate={mapInView ? { stopOpacity: [0, 0.4, 0.4, 0] } : { stopOpacity: 0 }}
                                transition={{ duration: 3, repeat: Infinity, delay: 3.1 + ri * 1.2 + si * 0.5, repeatDelay: 5, ease: "easeInOut" }}
                              />
                            </linearGradient>
                          </defs>
                          <line
                            x1={prev.x}
                            y1={prev.y}
                            x2={p.x}
                            y2={p.y}
                            stroke={`url(#${gradId})`}
                            strokeWidth="0.5"
                            filter="url(#gbnRouteGlow)"
                          />
                        </g>
                      );
                    })}
                  </g>
                );
              })}
            </svg>

            {/* Port dots */}
            {ports.map((port, i) => (
              <MapDot
                key={port.id}
                port={port}
                index={i}
                isActive={hovered === port.id}
                onHover={() => setHovered(port.id)}
                onLeave={() => setHovered(null)}
                name={port.name}
                hqLabel={t.map.hqLabel}
                inView={mapInView}
              />
            ))}

            {/* Line legend */}
            <motion.div
              className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md border border-white/10 hidden lg:block"
              initial={{ opacity: 0 }}
              animate={mapInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 2.5, duration: 0.6 }}
            >
              {t.map.lineLabels.map((label, i) => (
                <div key={i} className="flex items-center gap-2 text-[9px] font-semibold text-neutral-300 py-0.5">
                  <span className="w-4 h-[2px] rounded" style={{ backgroundColor: LINE_COLORS[i] }} />
                  {label}
                </div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Stats - 3 columns */}
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
                    className={`font-black text-[#8B2232]/[0.06] leading-none select-none ${isNaN(parseInt(stat.value.replace(/[^0-9]/g, ""))) ? "text-[40px] lg:text-[56px]" : "text-[72px] lg:text-[96px]"}`}
                    initial={{ scale: 2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
                  >
                    {stat.value}
                  </motion.span>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,34,50,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className={`font-black text-[#D4565E] ${isNaN(parseInt(stat.value.replace(/[^0-9]/g, ""))) ? "text-xl lg:text-2xl" : "text-3xl lg:text-4xl"}`}>
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

        {/* Region tags */}
        <AnimatedSection delay={0.4}>
          <div className="flex flex-wrap justify-center gap-2">
            {t.coverage.regions.map((region, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.05 }}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border cursor-default transition-colors ${
                  i === 0
                    ? "bg-[#8B2232]/20 border-[#8B2232]/40 text-[#D4565E]"
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
