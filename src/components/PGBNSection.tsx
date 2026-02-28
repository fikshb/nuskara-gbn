"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";

/* PGBN Teal palette */
const TEAL = "#1A5C5A";
const TEAL_LIGHT = "#2D8B86";
const TEAL_ACCENT = "#4DB8B0";

/* Port locations - user-verified coordinates via map-tool */
const ports = [
  { x: 27.7, y: 70.5, name: "Jakarta", main: true },
  { x: 47.8, y: 44.1, name: "Balikpapan", main: false },
  { x: 23.2, y: 54.2, name: "Palembang", main: false },
  { x: 43.2, y: 53.7, name: "Banjarmasin", main: false },
  { x: 54.4, y: 64.6, name: "Makassar", main: false },
  { x: 39.4, y: 74.1, name: "Surabaya", main: false },
  { x: 79.3, y: 41.6, name: "Sorong", main: false },
];

/* Sea routes - multi-segment curves avoiding landmass, following real waterways */
const seaRoutes = [
  {
    // Jakarta → Balikpapan: north into Java Sea, then NE along east Kalimantan coast
    path: "M 27.7 70.5 C 30 66, 34 62, 38 60 C 42 58, 46 52, 47.8 44.1",
    dur: "6s",
    delay: 0,
  },
  {
    // Jakarta → Palembang: NW through Sunda Strait, hugging west coast
    path: "M 27.7 70.5 C 25 67, 22 62, 23.2 54.2",
    dur: "4.5s",
    delay: 1.5,
  },
  {
    // Banjarmasin → Makassar: south through Makassar Strait (water between Kalimantan & Sulawesi)
    path: "M 43.2 53.7 C 45 57, 48 62, 50 65 C 51 66, 53 66, 54.4 64.6",
    dur: "4.5s",
    delay: 3,
  },
  {
    // Surabaya → Sorong: east past Java, south of Sulawesi, through Banda Sea, up to Papua
    path: "M 39.4 74.1 C 44 76, 50 75, 55 73 C 60 71, 63 67, 66 63 C 70 57, 75 49, 79.3 41.6",
    dur: "9s",
    delay: 2,
  },
];

const serviceIcons = [
  // Ship/cargo
  <svg key="0" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>,
  // Barge
  <svg key="1" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
  </svg>,
  // Port/anchor
  <svg key="2" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z" />
  </svg>,
];

/* Wave SVG path */
function WaveBorder({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`absolute left-0 right-0 overflow-hidden h-12 ${flip ? "top-0 rotate-180" : "bottom-0"}`}>
      <svg
        className="absolute w-[200%] h-full"
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,24 C180,8 360,40 540,24 C720,8 900,40 1080,24 C1260,8 1440,40 1440,24 L1440,48 L0,48 Z"
          fill={TEAL}
          fillOpacity={0.08}
          animate={{ x: [0, -720] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M0,28 C200,12 400,44 600,28 C800,12 1000,44 1200,28 C1400,12 1440,28 1440,28 L1440,48 L0,48 Z"
          fill={TEAL_LIGHT}
          fillOpacity={0.05}
          animate={{ x: [0, -720] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}

/* Animated maritime route map over real Indonesia - full width */
function ShippingRouteMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative w-full rounded-xl overflow-hidden bg-[#071918]">
      {/* Ocean gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(26,92,90,0.15),transparent_70%)]" />

      {/* Real Indonesia map - determines container height */}
      <motion.img
        src="/images/indonesia-map-transparent.webp"
        alt="Indonesia maritime routes"
        className="relative w-full h-auto block"
        style={{ filter: "brightness(0.25) sepia(1) hue-rotate(130deg) saturate(0.5)" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.5 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
      />

      {/* SVG overlay - viewBox 0 0 100 100 stretched to fill, coords in % */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="pgbnGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sea route lines */}
        {seaRoutes.map((route, i) => (
          <g key={`route-${i}`}>
            {/* Base route - draws in */}
            <motion.path
              d={route.path}
              fill="none"
              stroke={TEAL_LIGHT}
              strokeWidth="0.3"
              strokeOpacity={0.3}
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 2, delay: 0.5 + i * 0.4 }}
            />
            {/* Animated flowing dashes */}
            {inView && (
              <path
                d={route.path}
                fill="none"
                stroke={TEAL_ACCENT}
                strokeWidth="0.4"
                strokeDasharray="1.5 3"
                opacity={0.6}
                filter="url(#pgbnGlow)"
                vectorEffect="non-scaling-stroke"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-18"
                  dur={`${4 + i}s`}
                  repeatCount="indefinite"
                />
              </path>
            )}
            {/* Ship icon moving along route */}
            {inView && (
              <g>
                <g>
                  <polygon
                    points="-1.2,-0.6 1.2,-0.6 1.6,0 1.2,0.6 -1.2,0.6 -1.4,0"
                    fill={TEAL_ACCENT}
                    opacity={0.9}
                  />
                  <rect x="-0.3" y="-1.1" width="0.9" height="0.5" rx="0.1" fill={TEAL_ACCENT} opacity={0.7} />
                  <animateMotion
                    path={route.path}
                    dur={route.dur}
                    begin={`${route.delay}s`}
                    repeatCount="indefinite"
                    rotate="auto"
                    fill="freeze"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0;1;1;1;0;0"
                    keyTimes="0;0.02;0.08;0.5;0.92;0.98;1"
                    dur={route.dur}
                    begin={`${route.delay}s`}
                    repeatCount="indefinite"
                  />
                </g>
              </g>
            )}
          </g>
        ))}
      </svg>

      {/* Port dots - HTML positioned with CSS % for perfect circles */}
      {ports.map((port, i) => (
        <div
          key={`port-${i}`}
          className="absolute"
          style={{ left: `${port.x}%`, top: `${port.y}%`, transform: "translate(-50%, -50%)" }}
        >
          {/* Outer glow */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: port.main ? 32 : 20,
              height: port.main ? 32 : 20,
              left: -(port.main ? 16 : 10),
              top: -(port.main ? 16 : 10),
              backgroundColor: `${TEAL_ACCENT}15`,
            }}
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.8 + i * 0.12, type: "spring" }}
          />
          {/* Port dot */}
          <motion.div
            className="relative rounded-full border-2"
            style={{
              width: port.main ? 14 : 10,
              height: port.main ? 14 : 10,
              marginLeft: -(port.main ? 7 : 5),
              marginTop: -(port.main ? 7 : 5),
              backgroundColor: port.main ? TEAL_ACCENT : TEAL_LIGHT,
              borderColor: port.main ? TEAL_ACCENT : `${TEAL_LIGHT}80`,
              boxShadow: `0 0 ${port.main ? 12 : 6}px ${port.main ? TEAL_ACCENT : TEAL_LIGHT}60`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ delay: 0.6 + i * 0.12, duration: 0.4, type: "spring" }}
          />
          {/* Sonar pulse for main port */}
          {port.main && inView && (
            <>
              <motion.div
                className="absolute rounded-full border-2"
                style={{
                  width: 14, height: 14, left: -7, top: -7,
                  borderColor: TEAL_ACCENT,
                }}
                animate={{ scale: [1, 3], opacity: [0.5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.div
                className="absolute rounded-full border"
                style={{
                  width: 14, height: 14, left: -7, top: -7,
                  borderColor: TEAL_ACCENT,
                }}
                animate={{ scale: [1, 3], opacity: [0.3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
              />
            </>
          )}
          {/* City label */}
          <motion.span
            className="absolute whitespace-nowrap text-[10px] sm:text-xs font-bold"
            style={{
              color: TEAL_ACCENT,
              left: port.main ? 14 : 10,
              top: port.main ? -14 : (i % 2 === 0 ? -16 : 6),
              textShadow: `0 0 8px ${TEAL}`,
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.85 } : { opacity: 0 }}
            transition={{ delay: 1.2 + i * 0.12, duration: 0.5 }}
          >
            {port.name}
          </motion.span>
          {/* HQ badge */}
          {port.main && (
            <motion.span
              className="absolute whitespace-nowrap text-[8px] sm:text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded"
              style={{
                color: TEAL_ACCENT,
                backgroundColor: `${TEAL}cc`,
                border: `1px solid ${TEAL_ACCENT}40`,
                left: 14,
                top: 0,
              }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              HQ PORT
            </motion.span>
          )}
        </div>
      ))}

      {/* Edge vignette for depth */}
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 60px 20px #071918" }} />
    </div>
  );
}

export default function PGBNSection() {
  const { t } = useTranslation();

  return (
    <section id="pgbn" className="relative py-16 lg:py-24 overflow-hidden" style={{ backgroundColor: "#0A1E1D" }}>
      {/* Maritime background image */}
      <div className="absolute inset-0">
        <img src="/images/pgbn-maritime.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
      </div>

      {/* Wave borders */}
      <WaveBorder flip />
      <WaveBorder />

      {/* Ambient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(26,92,90,0.2),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(77,184,176,0.06),transparent_50%)]" />

      {/* Flowing particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 3 + i * 0.5,
              height: 3 + i * 0.5,
              backgroundColor: TEAL_ACCENT,
              opacity: 0.12,
              top: `${15 + i * 12}%`,
            }}
            animate={{ x: ["-5%", "105%"] }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <AnimatedSection>
            <span
              className="text-[11px] font-bold tracking-[3px] uppercase"
              style={{ color: TEAL_ACCENT }}
            >
              {t.pgbn.overline}
            </span>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[36px] font-black text-white leading-[1.2] tracking-[-0.5px] uppercase">
              {t.pgbn.headline}{" "}
              <span style={{ color: TEAL_ACCENT }}>{t.pgbn.headlineHighlight}</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <p className="mt-2 text-sm font-medium tracking-widest uppercase" style={{ color: `${TEAL_LIGHT}99` }}>
              {t.pgbn.tagline}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="mt-4 text-neutral-400 text-[15px] leading-relaxed max-w-2xl mx-auto">
              {t.pgbn.description}
            </p>
          </AnimatedSection>
        </div>

        {/* Full-width Maritime Route Map */}
        <AnimatedSection delay={0.25}>
          <ShippingRouteMap />

          {/* Route labels */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {t.pgbn.routes.map((route, i) => (
              <span
                key={i}
                className="text-[11px] font-medium px-3 py-1 rounded-full border"
                style={{
                  borderColor: `${TEAL_LIGHT}40`,
                  color: TEAL_ACCENT,
                  backgroundColor: `${TEAL}20`,
                }}
              >
                {route}
              </span>
            ))}
          </div>
        </AnimatedSection>

        {/* Stats + Company badge row */}
        <AnimatedSection delay={0.35}>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-5 gap-4">
            {t.pgbn.stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3 }}
                className="rounded-lg p-5 text-center border"
                style={{
                  backgroundColor: `${TEAL}15`,
                  borderColor: `${TEAL_LIGHT}20`,
                }}
              >
                <div className="text-2xl lg:text-3xl font-black" style={{ color: TEAL_ACCENT }}>
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] font-semibold tracking-wider uppercase text-neutral-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}

            {/* Company badge as 5th card */}
            <div
              className="col-span-2 lg:col-span-1 rounded-lg p-5 border flex items-center justify-center lg:flex-col gap-3"
              style={{
                backgroundColor: `${TEAL}10`,
                borderColor: `${TEAL_LIGHT}15`,
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${TEAL}40`, border: `1px solid ${TEAL_LIGHT}30` }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={TEAL_ACCENT} strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.03a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                </svg>
              </div>
              <div className="text-center lg:text-center">
                <div className="text-sm font-bold text-white">{t.pgbn.companyName}</div>
                <div className="text-[10px] text-neutral-500">{t.pgbn.tagline}</div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="mt-10" />

        {/* Service cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5" staggerDelay={0.12}>
          {t.pgbn.services.map((service, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                className="group h-full rounded-lg p-6 border transition-all duration-300"
                style={{
                  backgroundColor: `${TEAL}08`,
                  borderColor: `${TEAL_LIGHT}15`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${TEAL}18`;
                  e.currentTarget.style.borderColor = `${TEAL_ACCENT}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `${TEAL}08`;
                  e.currentTarget.style.borderColor = `${TEAL_LIGHT}15`;
                }}
              >
                {/* Top accent line */}
                <div
                  className="w-12 h-[2px] rounded-full mb-5 opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: TEAL_ACCENT }}
                />

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: `${TEAL}30`,
                    border: `1px solid ${TEAL_LIGHT}25`,
                    color: TEAL_ACCENT,
                  }}
                >
                  {serviceIcons[i]}
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
