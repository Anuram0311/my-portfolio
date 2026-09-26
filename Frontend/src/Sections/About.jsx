import { useEffect, useRef, useState } from 'react';
import aboutPhoto from '../assets/about-photo.jpeg';

/* ─── Skills list ────────────────────────────────────── */
const SKILLS = [
  'JavaScript (ES6+)',
  'React.js',
  'Tailwind CSS',
  'Node.js',
  'Express.js',
  'MongoDB',
  'Prisma ORM',
  'REST APIs',
  'Git & GitHub',
];

/* ─── Intersection-observer fade-in hook ─────────────── */
function useFadeIn(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ─── Main About Component ────────────────────────────── */
export default function About() {
  const { ref: sectionRef, visible } = useFadeIn(0.1);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-brand-dark overflow-hidden"
      aria-label="About section"
    >
      {/* ── Background accents matching Hero ─────────────── */}

      {/* Lime glow — top-right accent */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,242,68,0.055) 0%, transparent 70%)',
          filter: 'blur(48px)',
        }}
      />

      {/* Subtle bottom-left lime bleed */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 -left-32 w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,242,68,0.04) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Subtle grid pattern — same as Hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,242,68,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,242,68,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Top separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 md:px-10 xl:px-16 pt-8 md:pt-10 lg:pt-12 pb-20 lg:pb-28">

        {/* Section badge */}
        <div
          className={`flex items-center gap-4 mb-8 lg:mb-10 transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 text-[0.68rem] font-outfit font-semibold tracking-[0.18em] uppercase text-brand-lime border border-brand-lime/20">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
            About Me
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-white/[0.07] to-transparent max-w-[200px]" />
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1fr] gap-12 lg:gap-20 items-start">

          {/* ── LEFT: Image ─────────────────────────────────── */}
          <div
            className={`relative mt-5 transition-all duration-700 ease-out ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {/* Decorative corner accents */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-brand-lime/40 rounded-tl-lg pointer-events-none z-10" />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-brand-lime/40 rounded-br-lg pointer-events-none z-10" />

            {/* Subtle lime glow behind image */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 100%, rgba(212,242,68,0.08) 0%, transparent 65%)',
                filter: 'blur(24px)',
                transform: 'translateY(8px)',
              }}
            />

            {/* Image frame */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
              {/* Inner border overlay */}
              <div className="absolute inset-0 rounded-2xl border border-white/[0.06] z-10 pointer-events-none" />

              <img
                src={aboutPhoto}
                alt="Anuram K — Full Stack Developer"
                draggable="false"
                className="w-full object-cover object-top select-none"
                style={{
                  maxHeight: '520px',
                  filter: 'contrast(1.06) brightness(0.93)',
                }}
              />

              {/* Bottom gradient fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(12,12,14,0.55) 0%, transparent 100%)',
                }}
              />
            </div>

            {/* Floating availability badge */}
            <div className="absolute -bottom-5 left-6 z-20 glass border border-brand-lime/20 rounded-2xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <p className="font-outfit font-bold text-[0.62rem] tracking-[0.14em] uppercase text-brand-lime mb-0.5">
                Open to Work
              </p>
              <p className="font-jakarta text-[0.68rem] text-white/60">
                Full-time / Internship
              </p>
            </div>
          </div>

          {/* ── RIGHT: Content ───────────────────────────────── */}
          <div
            className={`transition-all duration-700 ease-out ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {/* Heading */}
            <h2
              className="font-outfit font-black uppercase leading-none tracking-[-0.02em] text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)' }}
            >
              About{' '}
              <span className="text-gradient-lime">Me</span>
            </h2>

            {/* Introduction */}
            <div className="space-y-4 mb-8">
              <p
                className="font-jakarta text-white/70 leading-[1.8]"
                style={{ fontSize: 'clamp(0.875rem, 1vw, 0.95rem)' }}
              >
                I&apos;m{' '}
                <span className="text-white font-semibold">Anuram K</span>, a Full Stack Developer
                focused on building modern, responsive and scalable web applications. I work across
                both frontend and backend development, with a strong focus on creating clean user
                interfaces and reliable web solutions.
              </p>
              <p
                className="font-jakarta text-white/70 leading-[1.8]"
                style={{ fontSize: 'clamp(0.875rem, 1vw, 0.95rem)' }}
              >
                I am currently working as a{' '}
                <span className="text-white font-semibold">
                  MERN Stack Developer Intern at Imaggar Technologies Pvt. Ltd.
                </span>
                , where I contribute to production-oriented web applications and full-stack features.
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-white/[0.08] to-transparent mb-8" />

            {/* Technical focus */}
            <div className="mb-8">
              <p className="font-outfit text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-brand-lime/80 mb-4">
                Technical Focus
              </p>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="font-outfit text-[0.68rem] font-medium tracking-[0.06em] text-white/60 border border-white/[0.09] rounded-full px-3.5 py-1.5 transition-all duration-200 hover:border-brand-lime/35 hover:text-brand-lime/80 hover:bg-brand-lime/[0.04] cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-white/[0.08] to-transparent mb-8" />

            {/* Additional experience + education */}
            <div className="space-y-5">
              {/* UI/UX Internship */}
              <div className="flex gap-3.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-lime/60 shrink-0 mt-[0.45rem]" />
                <p
                  className="font-jakarta text-white/60 leading-[1.75]"
                  style={{ fontSize: 'clamp(0.82rem, 0.95vw, 0.9rem)' }}
                >
                  I also have experience in{' '}
                  <span className="text-white/80 font-medium">UI/UX fundamentals</span> from my
                  internship at{' '}
                  <span className="text-white/80 font-medium">I Life Technologies, Trichy</span>,
                  which helps me approach development with attention to responsive design and user
                  experience.
                </p>
              </div>

              {/* Education */}
              <div className="flex gap-3.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-lime/60 shrink-0 mt-[0.45rem]" />
                <p
                  className="font-jakarta text-white/60 leading-[1.75]"
                  style={{ fontSize: 'clamp(0.82rem, 0.95vw, 0.9rem)' }}
                >
                  <span className="text-white/80 font-semibold">B.Sc. Computer Science</span>{' '}
                  — Jamal Mohamed College, Trichy{' '}
                  <span className="text-white/35">(2023–2026)</span>
                </p>
              </div>
            </div>

            {/* CTA button */}
            <div className="mt-10">
              <a
                href="#contact"
                id="about-cta-contact"
                className="group relative inline-flex items-center justify-center gap-2 bg-brand-lime text-brand-dark font-outfit font-bold text-[0.74rem] tracking-[0.14em] uppercase px-7 py-3.5 rounded-full overflow-hidden transition-all duration-300 hover:glow-lime hover:scale-[1.03] active:scale-[0.97]"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-white/20 skew-x-12" />
                <span className="relative z-10">Get In Touch</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 shrink-0"
                >
                  <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                  <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
    </section>
  );
}

