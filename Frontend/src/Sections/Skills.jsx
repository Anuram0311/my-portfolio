import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

/* ─── Intersection-observer fade-in hook ─────────────── */
function useFadeIn(targetRef, threshold = 0.1) {
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
    if (targetRef.current) observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [targetRef, threshold]);

  return visible;
}

/* ─── Skill list — each item individually targetable for GSAP later ─ */
const SKILLS = [
  'JavaScript',
  'React.js',
  'Tailwind CSS',
  'HTML5',
  'CSS3',
  'Node.js',
  'Express.js',
  'MongoDB',
  'Prisma ORM',
  'REST APIs',
  'Git',
  'GitHub',
  'Postman',
  'VS Code',
];

/* ─── Main Skills Component ───────────────────────────── */
export default function Skills() {
  const sectionRef = useRef(null);
  const skillsRef = useRef([]);
  const visible = useFadeIn(sectionRef, 0.08);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Create GSAP context scoped to sectionRef for clean lifecycle management
    const ctx = gsap.context(() => {
      const validSkillElements = skillsRef.current.filter(Boolean);
      if (validSkillElements.length === 0) return;

      // Use SplitText on each skill span to target individual words
      const split = new SplitText(validSkillElements, {
        type: 'words',
        tag: 'span',
        wordsClass: 'inline-block',
      });

      // Layered Z-depths and initial scales for words positioned deep in 3D space:
      // The motion is purely depth-driven (Z-axis + scale + opacity), travelling straight toward the camera/viewer.
      const depthConfigs = [
        { z: -950,  scale: 0.24, rotationX: 12,  rotationY: -8,  opacity: 0 },
        { z: -1250, scale: 0.16, rotationX: -10, rotationY: 10,  opacity: 0 },
        { z: -780,  scale: 0.32, rotationX: 14,  rotationY: 6,   opacity: 0 },
        { z: -1100, scale: 0.20, rotationX: -12, rotationY: -10, opacity: 0 },
        { z: -1380, scale: 0.14, rotationX: 8,   rotationY: 12,  opacity: 0 },
        { z: -880,  scale: 0.28, rotationX: -14, rotationY: -6,  opacity: 0 },
        { z: -1180, scale: 0.18, rotationX: 12,  rotationY: -10, opacity: 0 },
        { z: -700,  scale: 0.36, rotationX: -8,  rotationY: 8,   opacity: 0 },
      ];

      // Scroll-linked scrub timeline: progress is directly tied to the scroll position
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'center 45%',
          scrub: 1,
        },
      });

      // Words travel straight forward from deep 3D depth toward the camera/viewer into their exact 3-line layout
      split.words.forEach((word, index) => {
        const c = depthConfigs[index % depthConfigs.length];
        tl.fromTo(
          word,
          {
            z: c.z,
            scale: c.scale,
            rotationX: c.rotationX,
            rotationY: c.rotationY,
            opacity: 0,
            transformPerspective: 1000,
          },
          {
            z: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            opacity: 1,
            ease: 'power2.out',
            duration: 1,
          },
          index * 0.045 // progressive depth reveal as user scrolls
        );
      });

      // Dot separators fly in from 3D depth and settle alongside words
      tl.fromTo(
        '.skill-dot',
        {
          z: -800,
          scale: 0.2,
          opacity: 0,
          transformPerspective: 1000,
        },
        {
          z: 0,
          scale: 1,
          opacity: 1,
          ease: 'power1.out',
          duration: 0.7,
          stagger: 0.03,
        },
        0.1
      );

      // Cleanup SplitText DOM changes when context is reverted
      return () => {
        split.revert();
      };
    }, sectionRef);

    // Clean up all GSAP animations and ScrollTriggers on unmount
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full bg-brand-dark overflow-hidden"
      aria-label="Skills section"
    >
      {/* ── Background accents ─────────────────────────── */}

      {/* Lime glow — bottom-right */}
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,242,68,0.05) 0%, transparent 70%)',
          filter: 'blur(52px)',
        }}
      />

      {/* Lime glow — top-left */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,242,68,0.035) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Subtle grid pattern — matching Hero/About */}
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

      {/* ── Content ──────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 md:px-10 xl:px-16 py-20 lg:py-28">

        {/* ── Two-column layout ──────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 items-start">

          {/* ── LEFT: Heading + description ────────────────── */}
          <div
            className={`lg:sticky lg:top-24 transition-all duration-700 ease-out ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
            style={{ transitionDelay: '80ms' }}
          >
            {/* Section badge */}
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 text-[0.68rem] font-outfit font-semibold tracking-[0.18em] uppercase text-brand-lime border border-brand-lime/20">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
                Tech Stack
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/[0.07] to-transparent max-w-[140px]" />
            </div>

            {/* Section heading — matches About Me hierarchy */}
            <h2
              className="font-outfit font-black uppercase leading-none tracking-[-0.02em] text-white mb-10"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)' }}
            >
              SKILLS
            </h2>

            {/* Vertical lime rule + paragraph */}
            <div className="flex gap-5 items-start">
              {/* Lime vertical accent line */}
              <div className="w-[2px] shrink-0 self-stretch bg-gradient-to-b from-brand-lime/60 via-brand-lime/20 to-transparent rounded-full mt-1" />
              <p className="font-jakarta text-white/50 text-base md:text-lg leading-relaxed font-light max-w-sm">
                I build modern full-stack applications by combining thoughtful frontend experiences
                with reliable backend systems. My focus is on writing clean, reusable code and
                creating responsive, scalable solutions across the stack.
              </p>
            </div>

            {/* Bottom stat strip */}
            <div
              className={`mt-14 pt-8 border-t border-white/[0.06] flex items-center gap-8 transition-all duration-700 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '350ms' }}
            >
              <div>
                <p className="font-outfit font-bold text-2xl text-white">{SKILLS.length}</p>
                <p className="font-outfit text-[0.68rem] tracking-[0.15em] uppercase text-brand-muted mt-0.5">
                  Technologies
                </p>
              </div>
              <div className="w-px h-8 bg-white/[0.08]" />
              <div>
                <p className="font-outfit font-bold text-2xl text-white">2+</p>
                <p className="font-outfit text-[0.68rem] tracking-[0.15em] uppercase text-brand-muted mt-0.5">
                  Years Building
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Skills — 3 flowing typography lines with 3D perspective ── */}
          <div
            id="skills-list"
            className="w-full"
            style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
            aria-label="List of technical skills"
          >
            {/* ── Line 1: Frontend core ─────────────────────── */}
            <div
              className="skill-line py-5 md:py-6 border-b border-white/[0.06] flex flex-wrap items-baseline gap-x-3 gap-y-2"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <span ref={(el) => (skillsRef.current[0] = el)} className="skill-name font-outfit font-semibold text-2xl md:text-3xl lg:text-[2rem] text-white/80 tracking-[-0.01em]" data-skill="JavaScript">JavaScript</span>
              <span aria-hidden="true" className="skill-dot text-brand-lime/40 font-outfit font-light text-xl select-none">·</span>
              <span ref={(el) => (skillsRef.current[1] = el)} className="skill-name font-outfit font-semibold text-2xl md:text-3xl lg:text-[2rem] text-white/80 tracking-[-0.01em]" data-skill="React.js">React.js</span>
              <span aria-hidden="true" className="skill-dot text-brand-lime/40 font-outfit font-light text-xl select-none">·</span>
              <span ref={(el) => (skillsRef.current[2] = el)} className="skill-name font-outfit font-semibold text-2xl md:text-3xl lg:text-[2rem] text-white/80 tracking-[-0.01em]" data-skill="Tailwind CSS">Tailwind CSS</span>
              <span aria-hidden="true" className="skill-dot text-brand-lime/40 font-outfit font-light text-xl select-none">·</span>
              <span ref={(el) => (skillsRef.current[3] = el)} className="skill-name font-outfit font-semibold text-2xl md:text-3xl lg:text-[2rem] text-white/80 tracking-[-0.01em]" data-skill="HTML5">HTML5</span>
              <span aria-hidden="true" className="skill-dot text-brand-lime/40 font-outfit font-light text-xl select-none">·</span>
              <span ref={(el) => (skillsRef.current[4] = el)} className="skill-name font-outfit font-semibold text-2xl md:text-3xl lg:text-[2rem] text-white/80 tracking-[-0.01em]" data-skill="CSS3">CSS3</span>
            </div>

            {/* ── Line 2: Backend ───────────────────────────── */}
            <div
              className="skill-line py-5 md:py-6 border-b border-white/[0.06] flex flex-wrap items-baseline gap-x-3 gap-y-2"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <span ref={(el) => (skillsRef.current[5] = el)} className="skill-name font-outfit font-semibold text-2xl md:text-3xl lg:text-[2rem] text-white/80 tracking-[-0.01em]" data-skill="Node.js">Node.js</span>
              <span aria-hidden="true" className="skill-dot text-brand-lime/40 font-outfit font-light text-xl select-none">·</span>
              <span ref={(el) => (skillsRef.current[6] = el)} className="skill-name font-outfit font-semibold text-2xl md:text-3xl lg:text-[2rem] text-white/80 tracking-[-0.01em]" data-skill="Express.js">Express.js</span>
              <span aria-hidden="true" className="skill-dot text-brand-lime/40 font-outfit font-light text-xl select-none">·</span>
              <span ref={(el) => (skillsRef.current[7] = el)} className="skill-name font-outfit font-semibold text-2xl md:text-3xl lg:text-[2rem] text-white/80 tracking-[-0.01em]" data-skill="MongoDB">MongoDB</span>
              <span aria-hidden="true" className="skill-dot text-brand-lime/40 font-outfit font-light text-xl select-none">·</span>
              <span ref={(el) => (skillsRef.current[8] = el)} className="skill-name font-outfit font-semibold text-2xl md:text-3xl lg:text-[2rem] text-white/80 tracking-[-0.01em]" data-skill="Prisma ORM">Prisma ORM</span>
              <span aria-hidden="true" className="skill-dot text-brand-lime/40 font-outfit font-light text-xl select-none">·</span>
              <span ref={(el) => (skillsRef.current[9] = el)} className="skill-name font-outfit font-semibold text-2xl md:text-3xl lg:text-[2rem] text-white/80 tracking-[-0.01em]" data-skill="REST APIs">REST APIs</span>
            </div>

            {/* ── Line 3: Tooling ───────────────────────────── */}
            <div
              className="skill-line py-5 md:py-6 flex flex-wrap items-baseline gap-x-3 gap-y-2"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <span ref={(el) => (skillsRef.current[10] = el)} className="skill-name font-outfit font-semibold text-2xl md:text-3xl lg:text-[2rem] text-white/80 tracking-[-0.01em]" data-skill="Git">Git</span>
              <span aria-hidden="true" className="skill-dot text-brand-lime/40 font-outfit font-light text-xl select-none">·</span>
              <span ref={(el) => (skillsRef.current[11] = el)} className="skill-name font-outfit font-semibold text-2xl md:text-3xl lg:text-[2rem] text-white/80 tracking-[-0.01em]" data-skill="GitHub">GitHub</span>
              <span aria-hidden="true" className="skill-dot text-brand-lime/40 font-outfit font-light text-xl select-none">·</span>
              <span ref={(el) => (skillsRef.current[12] = el)} className="skill-name font-outfit font-semibold text-2xl md:text-3xl lg:text-[2rem] text-white/80 tracking-[-0.01em]" data-skill="Postman">Postman</span>
              <span aria-hidden="true" className="skill-dot text-brand-lime/40 font-outfit font-light text-xl select-none">·</span>
              <span ref={(el) => (skillsRef.current[13] = el)} className="skill-name font-outfit font-semibold text-2xl md:text-3xl lg:text-[2rem] text-white/80 tracking-[-0.01em]" data-skill="VS Code">VS Code</span>
            </div>

            {/* Trailing note */}
            <p className="mt-8 font-outfit text-[0.67rem] tracking-[0.18em] uppercase text-white/20 text-right select-none">
              Always learning &nbsp;·&nbsp; Always building
            </p>
          </div>

        </div>
      </div>

      {/* Bottom separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
    </section>
  );
}
