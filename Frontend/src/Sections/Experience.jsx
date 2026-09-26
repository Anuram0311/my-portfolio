import { useEffect, useRef, useState } from "react";
import imaggarLogo from "../assets/Imaggar logo.png";
import ilifeLogo from "../assets/ILIFE LOGO.png";

const EXPERIENCES = [
  {
    id: "01",
    company: "Imaggar Technologies Pvt. Ltd.",
    logo: imaggarLogo,
    logoAlt: "Imaggar Technologies logo",
    role: "MERN Stack Developer Intern",
    period: "June 2026 – Present",
    location: null,
    description:
      "Working across frontend and backend development using React, Node.js, Express.js, MongoDB and Prisma, contributing to production-oriented full-stack applications and REST APIs.",
  },
  {
    id: "02",
    company: "I Life Technologies",
    logo: ilifeLogo,
    logoAlt: "I Life Technologies logo",
    role: "UI/UX Intern",
    period: null,
    location: "Trichy",
    description:
      "Worked on UI/UX design and contributed to creating user-focused digital interfaces and experiences.",
  },
];

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

export default function Experience() {
  const { ref: sectionRef, visible } = useFadeIn(0.08);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full bg-brand-dark overflow-hidden"
      aria-label="Experience section"
    >
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(212,242,68,0.05) 0%, transparent 70%)",
          filter: "blur(52px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 -right-32 w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(212,242,68,0.035) 0%, transparent 70%)",
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
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 md:px-10 xl:px-16 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          <div
            className={`transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
            style={{ transitionDelay: "80ms" }}
          >
            <div className="relative">
              <div
                className="absolute left-[19px] top-0 w-px pointer-events-none"
                style={{
                  height: "100%",
                  background:
                    "linear-gradient(to bottom, rgba(212,242,68,0.35) 0%, rgba(212,242,68,0.12) 60%, transparent 100%)",
                }}
              />
              <div className="space-y-0">
                {EXPERIENCES.map((exp, index) => (
                  <div
                    key={exp.id}
                    className={`relative pl-12 transition-all duration-700 ease-out ${
                      index < EXPERIENCES.length - 1 ? "pb-12" : "pb-0"
                    } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                    style={{ transitionDelay: `${140 + index * 120}ms` }}
                  >
                    <div className="absolute left-0 top-[22px] flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full border border-brand-lime/20 bg-brand-dark flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-brand-lime/70" />
                      </div>
                    </div>

                    <div className="pt-1">
                      <p className="font-outfit text-[0.62rem] font-semibold tracking-[0.2em] uppercase text-brand-lime/50 mb-3">
                        {exp.id}
                      </p>

                      <div className="flex items-center gap-3.5 mb-3">
                        <div className="w-11 h-11 shrink-0 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center overflow-hidden p-1.5">
                          <img
                            src={exp.logo}
                            alt={exp.logoAlt}
                            draggable="false"
                            className="w-full h-full object-contain select-none"
                          />
                        </div>
                        <div>
                          <p className="font-outfit font-semibold text-white/55 text-[0.8rem] leading-snug">
                            {exp.company}
                          </p>
                          {(exp.period || exp.location) && (
                            <p className="font-jakarta text-[0.7rem] text-white/30 mt-0.5 leading-none">
                              {exp.period ?? exp.location}
                            </p>
                          )}
                        </div>
                      </div>

                      <h3
                        className="font-outfit font-bold text-white leading-tight mb-3"
                        style={{ fontSize: "clamp(1rem, 1.6vw, 1.25rem)" }}
                      >
                        {exp.role}
                      </h3>

                      <div className="w-8 h-px bg-brand-lime/30 mb-3" />

                      <p
                        className="font-jakarta text-white/50 leading-[1.8]"
                        style={{ fontSize: "clamp(0.8rem, 0.95vw, 0.88rem)" }}
                      >
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`lg:sticky lg:top-28 transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 text-[0.68rem] font-outfit font-semibold tracking-[0.18em] uppercase text-brand-lime border border-brand-lime/20">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
                Career
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/[0.07] to-transparent max-w-[140px]" />
            </div>

            <h2
              className="font-outfit font-black uppercase leading-none tracking-[-0.02em] text-white mb-10"
              style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)" }}
            >
              EXPERIENCE
            </h2>

            <div className="flex gap-5 items-start">
              <div className="w-[2px] shrink-0 self-stretch bg-gradient-to-b from-brand-lime/60 via-brand-lime/20 to-transparent rounded-full mt-1" />
              <p className="font-jakarta text-white/50 text-base md:text-lg leading-relaxed font-light max-w-sm">
                A collection of roles where I have contributed to real-world products,
                honed my craft, and grown as a developer — from designing interfaces
                to building full-stack applications.
              </p>
            </div>

            <div
              className={`mt-14 pt-8 border-t border-white/[0.06] flex items-center gap-8 transition-all duration-700 ease-out ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div>
                <p className="font-outfit font-bold text-2xl text-white">2</p>
                <p className="font-outfit text-[0.68rem] tracking-[0.15em] uppercase text-brand-muted mt-0.5">
                  Internships
                </p>
              </div>
              <div className="w-px h-8 bg-white/[0.08]" />
              <div>
                <p className="font-outfit font-bold text-2xl text-white">2+</p>
                <p className="font-outfit text-[0.68rem] tracking-[0.15em] uppercase text-brand-muted mt-0.5">
                  Domains
                </p>
              </div>
              <div className="w-px h-8 bg-white/[0.08]" />
              <div>
                <p className="font-outfit font-bold text-2xl text-white">8</p>
                <p className="font-outfit text-[0.68rem] tracking-[0.15em] uppercase text-brand-muted mt-0.5">
                  Learning
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
    </section>
  );
}
