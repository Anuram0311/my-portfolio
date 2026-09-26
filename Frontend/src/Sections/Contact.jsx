import { useEffect, useRef, useState } from "react";
import { FiPhone, FiMail, FiGithub, FiLinkedin, FiArrowUpRight } from "react-icons/fi";

/* ─── Contact links ─────────────────────────────────── */
const CONTACT_LINKS = [
  {
    id: "phone",
    label: "Mobile",
    value: "+91 9042698793",
    href: "tel:+919042698793",
    icon: FiPhone,
    display: "+91 9042698793",
  },
  {
    id: "email",
    label: "Email",
    value: "anuramk0311@gmail.com",
    href: "mailto:anuramk0311@gmail.com",
    icon: FiMail,
    display: "anuramk0311@gmail.com",
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/Anuram0311",
    href: "https://github.com/Anuram0311",
    icon: FiGithub,
    display: "Anuram0311",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/anuram-k-b7462638a",
    href: "https://linkedin.com/in/anuram-k-b7462638a",
    icon: FiLinkedin,
    display: "anuram-k-b7462638a",
  },
];

/* ─── Fade-in hook ────────────────────────────────────── */
function useFadeIn(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Main Contact Component ──────────────────────────── */
export default function Contact() {
  const { ref: sectionRef, visible } = useFadeIn(0.06);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-brand-dark overflow-hidden"
      aria-label="Contact section"
    >
      {/* ── Background accents ─────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(212,242,68,0.055) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,242,68,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,242,68,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Top separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── Content ──────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 md:px-10 xl:px-16 py-20 lg:py-28">

        {/* ── Main grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">

          {/* ═══ LEFT: Heading block ═════════════════════ */}
          <div
            className={`transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
            style={{ transitionDelay: "60ms" }}
          >
            {/* Section badge */}
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 text-[0.68rem] font-outfit font-semibold tracking-[0.18em] uppercase text-brand-lime border border-brand-lime/20">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
                Get In Touch
              </span>
              <div className="h-px bg-gradient-to-r from-white/[0.07] to-transparent w-24" />
            </div>

            {/* Large heading */}
            <h2
              className="font-outfit font-black uppercase leading-none tracking-[-0.03em] text-white mb-8"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 5.2rem)" }}
            >
              LET&apos;S
              <br />
              <span className="text-gradient-lime">CONNECT</span>
            </h2>

            {/* Vertical lime rule + blurb */}
            <div className="flex gap-5 items-start">
              <div className="w-[2px] shrink-0 self-stretch bg-gradient-to-b from-brand-lime/60 via-brand-lime/20 to-transparent rounded-full mt-1" />
              <p
                className="font-jakarta text-white/50 leading-[1.85] font-light max-w-sm"
                style={{ fontSize: "clamp(0.875rem, 1vw, 0.95rem)" }}
              >
                I am currently open to internships and full-time opportunities.
                Whether you have a project, an idea or just want to say hello —
                my inbox is always open.
              </p>
            </div>

            {/* Availability indicator */}
            <div className="mt-10 inline-flex items-center gap-3 border border-brand-lime/15 rounded-full pl-3 pr-5 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-lime opacity-60 animate-ping" style={{ animationDuration: "2.5s" }} />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-lime" />
              </span>
              <span className="font-outfit text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-brand-lime/80">
                Available for work
              </span>
            </div>
          </div>

          {/* ═══ RIGHT: Contact links ════════════════════ */}
          <div
            className={`transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
            style={{ transitionDelay: "180ms" }}
          >
            {/* Links list */}
            <div className="space-y-0">
              {CONTACT_LINKS.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.id}
                    id={`contact-${link.id}`}
                    href={link.href}
                    target={link.id === "github" || link.id === "linkedin" ? "_blank" : undefined}
                    rel={link.id === "github" || link.id === "linkedin" ? "noopener noreferrer" : undefined}
                    className={`group flex items-center justify-between gap-4 py-5 border-b border-white/[0.07] transition-all duration-200 hover:border-brand-lime/25 ${
                      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${260 + index * 80}ms` }}
                    aria-label={`${link.label}: ${link.value}`}
                  >
                    {/* Left: icon + label + value */}
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Icon box */}
                      <div className="shrink-0 w-10 h-10 rounded-xl border border-white/[0.07] bg-white/[0.025] flex items-center justify-center transition-all duration-200 group-hover:border-brand-lime/25 group-hover:bg-brand-lime/[0.06]">
                        <Icon
                          className="w-4 h-4 text-white/40 transition-colors duration-200 group-hover:text-brand-lime/80"
                          aria-hidden="true"
                        />
                      </div>

                      <div className="min-w-0">
                        {/* Label */}
                        <p className="font-outfit text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-white/25 mb-0.5">
                          {link.label}
                        </p>
                        {/* Value */}
                        <p className="font-jakarta font-medium text-white/70 text-sm truncate transition-colors duration-200 group-hover:text-white">
                          {link.display}
                        </p>
                      </div>
                    </div>

                    {/* Right: arrow */}
                    <FiArrowUpRight
                      className="shrink-0 w-4 h-4 text-white/15 transition-all duration-200 group-hover:text-brand-lime group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                );
              })}

              {/* First entry top border */}
              <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.07]" />
            </div>

            {/* Footer note */}
            <p className="mt-8 font-outfit text-[0.62rem] tracking-[0.18em] uppercase text-white/15 text-right select-none">
              Response within 24 hours
            </p>
          </div>

        </div>
      </div>

      {/* Bottom separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
    </section>
  );
}
