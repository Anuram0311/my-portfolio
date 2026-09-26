import { useEffect, useRef, useState } from 'react';
import heroImg from '../assets/Hero-new.png';

/* ─── Tech Stack Ticker Data ───────────────────────────── */
const TECH_STACK = [
  'React.js',
  'JavaScript',
  'Tailwind CSS',
  'Node.js',
  'Express.js',
  'MongoDB',
  'Prisma',
];

/* ─── Typewriter Hook ─────────────────────────────────── */
function useTypewriter(words, speed = 85, pause = 2000) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

/* ─── Animated Counter ────────────────────────────────── */
function Counter({ end, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1800;
          const step = end / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── Main Hero Component ─────────────────────────────── */
export default function Hero() {
  const roles = ['FULL STACK DEVELOPER', 'MERN STACK ENGINEER', 'UI/UX ENTHUSIAST'];
  const typedRole = useTypewriter(roles, 80, 2200);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full bg-brand-dark flex flex-col justify-between overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── Background Layers ──────────────────────────────── */}

      {/* Radial spotlight behind hero figure */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 55% 70% at 50% 80%, rgba(255,255,255,0.04) 0%, transparent 70%),
            radial-gradient(ellipse 40% 55% at 50% 50%, rgba(255,255,255,0.025) 0%, transparent 65%),
            radial-gradient(ellipse 60% 40% at 50% 100%, rgba(212,242,68,0.065) 0%, transparent 80%)
          `,
        }}
      />

      {/* Lime glow — top-left accent */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,242,68,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Subtle grid pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,242,68,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,242,68,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* ── Navbar height spacer ───────────────────────────── */}
      <div className="h-[72px] shrink-0" />

      {/* ── Main Content Container ──────────────────────────── */}
      <div className="relative z-10 flex-1 max-w-[1400px] w-full mx-auto px-6 md:px-10 xl:px-16 flex items-stretch">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1.1fr_1fr_0.8fr] gap-6 lg:gap-8 items-end py-4 lg:py-0">

          {/* ── LEFT: Text Content (Positioned at top area) ── */}
          <div className="flex flex-col justify-start pt-6 lg:pt-12 pb-8 order-2 lg:order-1 z-10">

            {/* Eyebrow badge */}
            <div className="animate-fade-up opacity-0-init mb-4">
              <span
                id="hero-badge"
                className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 text-[0.68rem] font-outfit font-semibold tracking-[0.18em] uppercase text-brand-lime border border-brand-lime/20"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse-glow" />
                Available for opportunities
              </span>
            </div>

            {/* Name heading */}
            <h1
              id="hero-name"
              className="animate-fade-up-delay-1 opacity-0-init font-outfit font-black uppercase leading-none tracking-[-0.02em] mb-3 whitespace-nowrap"
              style={{ fontSize: 'clamp(2.4rem, 5.2vw, 5.2rem)' }}
            >
              <span className="text-white">ANURAM</span>
              <span className="text-gradient-lime"> K</span>
            </h1>

            {/* Typewriter role */}
            <div
              id="hero-role"
              className="animate-fade-up-delay-2 opacity-0-init font-outfit font-semibold tracking-[0.2em] text-white/40 uppercase mb-6"
              style={{ fontSize: 'clamp(0.72rem, 1.2vw, 0.95rem)' }}
              aria-label="Role"
            >
              {typedRole}
              <span className="animate-blink text-brand-lime ml-0.5">|</span>
            </div>

            {/* Expanded Description */}
            <p
              id="hero-description"
              className="animate-fade-up-delay-2 opacity-0-init font-jakarta text-white/60 leading-[1.75] max-w-[480px] mb-8"
              style={{ fontSize: 'clamp(0.875rem, 1.05vw, 0.98rem)' }}
            >
              Building modern, responsive and scalable web experiences with{' '}
              <span className="text-white/90 font-medium">React, Node.js</span> and modern backend
              technologies. I focus on creating clean user interfaces, reliable backend systems and seamless full-stack applications that deliver practical and engaging digital experiences.
            </p>

            {/* CTA Buttons Side-by-Side */}
            <div
              id="hero-ctas"
              className="animate-fade-up-delay-3 opacity-0-init flex items-center gap-3.5 mb-8 flex-row"
            >
              <a
                href="#projects"
                id="cta-view-work"
                className="group relative flex items-center justify-center gap-2 bg-brand-lime text-brand-dark font-outfit font-bold text-[0.74rem] sm:text-[0.78rem] tracking-[0.14em] uppercase px-5 sm:px-7 py-3.5 rounded-full overflow-hidden transition-all duration-300 hover:glow-lime hover:scale-[1.03] active:scale-[0.97] shrink-0"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-white/20 skew-x-12" />
                <span className="relative z-10 whitespace-nowrap">View My Work</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              <a
                href="#contact"
                id="cta-contact"
                className="group flex items-center justify-center gap-2 border border-white/15 text-white/80 font-outfit font-semibold text-[0.74rem] sm:text-[0.78rem] tracking-[0.14em] uppercase px-5 sm:px-7 py-3.5 rounded-full transition-all duration-300 hover:border-brand-lime/40 hover:text-brand-lime hover:bg-brand-lime/5 active:scale-[0.97] shrink-0"
              >
                <span className="whitespace-nowrap">Contact Me</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12 shrink-0"
                >
                  <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                  <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                </svg>
              </a>
            </div>

            {/* Tech stack tags */}
            <div
              id="hero-tech-stack"
              className="animate-fade-up-delay-4 opacity-0-init flex flex-wrap gap-2"
            >
              {TECH_STACK.map((tech) => (
                <span
                  key={tech}
                  className="font-outfit text-[0.68rem] font-medium tracking-[0.08em] text-white/40 border border-white/10 rounded-full px-3 py-1 transition-all duration-200 hover:border-brand-lime/30 hover:text-brand-lime/70 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* ── CENTER: Hero Image ──────────────────────────── */}
          <div
            id="hero-image-container"
            className="order-1 lg:order-2 flex items-end justify-center relative self-end h-[50vh] sm:h-[60vh] lg:h-[70vh] max-h-[640px] w-full max-w-[460px] mx-auto"
          >
            {/* Glow disc behind figure */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[60%] rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 100%, rgba(212,242,68,0.08) 0%, transparent 70%)',
                filter: 'blur(30px)',
              }}
            />

            {/* White light bloom matching studio photo lighting */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[75%] h-[55%] pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 90%, rgba(255,255,255,0.05) 0%, transparent 65%)',
                filter: 'blur(20px)',
              }}
            />

            {/* The hero image with object-position top crop */}
            <img
              src={heroImg}
              alt="Anuram K — Full Stack Developer"
              id="hero-img"
              draggable="false"
              className="relative z-10 w-full h-full object-cover object-top select-none animate-fade-right opacity-0-init"
              style={{
                mixBlendMode: 'luminosity',
                filter: 'contrast(1.08) brightness(0.92)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, black 0%, black 72%, transparent 100%)',
                maskImage:
                  'linear-gradient(to bottom, black 0%, black 72%, transparent 100%)',
              }}
            />

            {/* Floating "Open to Work" badge */}
            <div
              aria-hidden="true"
              className="absolute top-[12%] -left-2 sm:-left-6 z-20 glass border border-brand-lime/20 rounded-2xl px-3 py-2 sm:px-3.5 sm:py-2.5 animate-float shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              <p className="font-outfit font-bold text-[0.62rem] tracking-[0.14em] uppercase text-brand-lime mb-0.5">
                Open to Work
              </p>
              <p className="font-jakarta text-[0.68rem] text-white/60">
                Full-time / Internship
              </p>
            </div>

            {/* Floating "Projects" stat badge */}
            <div
              aria-hidden="true"
              className="absolute top-[35%] -right-2 sm:-right-6 z-20 glass border border-white/[0.08] rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 animate-float shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              style={{ animationDelay: '1.5s' }}
            >
              <p className="font-outfit font-black text-xl sm:text-2xl text-white leading-none mb-0.5">
                10<span className="text-brand-lime">+</span>
              </p>
              <p className="font-jakarta text-[0.65rem] text-white/50 tracking-wide">
                Projects Built
              </p>
            </div>
          </div>

          {/* ── RIGHT: Stats + Scroll ───────────────────────── */}
          <div className="hidden lg:flex flex-col justify-end pb-8 pl-6 order-3">

            {/* Vertical divider line with label */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
              <span className="font-outfit text-[0.6rem] tracking-[0.2em] uppercase text-white/25">
                Stats
              </span>
            </div>

            {/* Stats */}
            <div
              id="hero-stats"
              className="animate-fade-left opacity-0-init flex flex-col gap-6 mb-8"
            >
              <div>
                <p className="font-outfit font-black text-[2.5rem] leading-none text-white mb-1">
                  <Counter end={10} suffix="+" />
                </p>
                <p className="font-outfit text-[0.7rem] tracking-[0.14em] uppercase text-white/40">
                  Projects Delivered
                </p>
              </div>

              <div>
                <p className="font-outfit font-black text-[2.5rem] leading-none text-gradient-lime mb-1">
                  <Counter end={3} suffix="+" />
                </p>
                <p className="font-outfit text-[0.7rem] tracking-[0.14em] uppercase text-white/40">
                  Years Learning
                </p>
              </div>

              <div>
                <p className="font-outfit font-black text-[2.5rem] leading-none text-white mb-1">
                  <Counter end={7} />
                </p>
                <p className="font-outfit text-[0.7rem] tracking-[0.14em] uppercase text-white/40">
                  Tech Stacks
                </p>
              </div>
            </div>

            {/* Scroll down cue */}
            <div
              id="hero-scroll-cue"
              className="animate-fade-left opacity-0-init flex items-center gap-3"
            >
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-[1px] h-10 bg-gradient-to-b from-brand-lime to-transparent"
                  style={{ animation: 'pulse_glow 2s ease-in-out infinite' }}
                />
                <div className="w-[1px] h-2 bg-brand-lime/20" />
              </div>
              <span className="font-outfit text-[0.6rem] tracking-[0.2em] uppercase text-white/25 [writing-mode:vertical-rl] rotate-180">
                Scroll Down
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scrolling Tech Ticker (PRESERVED) ─────────────── */}
      <div
        id="hero-ticker"
        className="relative z-10 border-t border-white/[0.06] overflow-hidden py-3.5 mt-auto bg-brand-dark/80 backdrop-blur-sm shrink-0"
        aria-hidden="true"
      >
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-brand-dark to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-brand-dark to-transparent pointer-events-none" />

        <div className="flex animate-scroll-text whitespace-nowrap">
          {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, i) => (
            <span
              key={i}
              className="font-outfit font-semibold text-[0.7rem] tracking-[0.22em] uppercase inline-flex items-center gap-5 px-6"
              style={{ color: i % 3 === 1 ? '#D4F244' : 'rgba(255,255,255,0.2)' }}
            >
              {tech}
              <span className="text-brand-lime/30">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Bottom gradient bleed ──────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(12,12,14,0.9) 0%, transparent 100%)',
        }}
      />
    </section>
  );
}
