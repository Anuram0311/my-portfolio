import { useEffect, useRef, useState } from "react";

/* --- Project data ------------------------------------- */
const PROJECTS = [
  {
    id: "01",
    title: "CareerGenie",
    role: "Frontend Developer",
    url: null,
    stack: ["React.js", "Tailwind CSS", "REST APIs", "Responsive Design"],
    description:
      "A career guidance platform designed to help users explore career paths and access relevant guidance through a clean, responsive and user-friendly interface. Built the frontend with a focus on intuitive navigation, responsive layouts and engaging user experiences.",
    accent: "from-brand-lime/10 to-transparent",
    labelColor: "text-brand-lime",
    borderAccent: "border-brand-lime/20",
    index: 0,
  },
  {
    id: "02",
    title: "Crunchy Club",
    role: "Frontend Developer",
    url: null,
    stack: ["React.js", "Tailwind CSS", "Component Design", "Mobile-First"],
    description:
      "A responsive web platform focused on delivering a modern and engaging digital experience. Developed the frontend with responsive layouts, clean UI components and a mobile-friendly design across different screen sizes.",
    accent: "from-white/[0.04] to-transparent",
    labelColor: "text-white/40",
    borderAccent: "border-white/[0.08]",
    index: 1,
  },
];

/* --- Fade-in hook -------------------------------------- */
function useFadeIn(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* --- Single project entry ----------------------------- */
function ProjectEntry({ project, visible }) {
  const isEven = project.index % 2 === 0;

  return (
    <article
      className={`group relative transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${120 + project.index * 160}ms` }}
      aria-label={`Project: ${project.title}`}
    >
      {/* Full-width top border */}
      <div className="w-full h-px bg-gradient-to-r from-white/[0.07] via-white/[0.1] to-white/[0.07]" />

      {/* Main project grid */}
      <div className={`grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-0 ${isEven ? "" : "lg:grid-cols-[1fr_auto]"}`}>

        {/* -- NUMBER COLUMN (always left on desktop for 01, right for 02) -- */}
        {!isEven && (
          /* Spacer column for 02 on desktop — pushes number to the right */
          <div className="hidden lg:block" />
        )}

        {/* -- CONTENT -------------------------------------- */}
        <div className={`py-12 md:py-16 lg:py-20 ${isEven ? "lg:pr-16 xl:pr-24" : "lg:pl-16 xl:pl-24"}`}>

          {/* Number + role row */}
          <div className={`flex items-center gap-4 mb-6 ${!isEven ? "lg:justify-end" : ""}`}>
            <span
              className={`font-outfit font-black leading-none select-none ${project.labelColor}`}
              style={{ fontSize: "clamp(4rem, 8vw, 7rem)", opacity: 0.12, letterSpacing: "-0.04em", lineHeight: 1 }}
              aria-hidden="true"
            >
              {project.id}
            </span>
            <div className={`flex-1 h-px bg-gradient-to-r ${isEven ? "from-white/[0.06] to-transparent" : "from-transparent to-white/[0.06]"}`} />
            {/* Role badge */}
            <span className="shrink-0 font-outfit text-[0.62rem] font-semibold tracking-[0.2em] uppercase text-brand-lime/60 border border-brand-lime/15 rounded-full px-3 py-1">
              {project.role}
            </span>
          </div>

          {/* Project title */}
          <h3
            className={`font-outfit font-black uppercase leading-none tracking-[-0.03em] text-white mb-8 ${!isEven ? "lg:text-right" : ""}`}
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 5rem)" }}
          >
            {project.title}
          </h3>

          {/* Two-column: description + meta */}
          <div className={`grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-start ${!isEven ? "lg:text-right" : ""}`}>

            {/* Description */}
            <div className={`${!isEven ? "lg:order-2" : ""}`}>
              {/* Vertical lime accent + text */}
              <div className={`flex gap-4 items-start ${!isEven ? "lg:flex-row-reverse" : ""}`}>
                <div className="w-[2px] shrink-0 self-stretch bg-gradient-to-b from-brand-lime/40 via-brand-lime/10 to-transparent rounded-full mt-1" />
                <p
                  className="font-jakarta text-white/50 leading-[1.85] font-light"
                  style={{ fontSize: "clamp(0.875rem, 1vw, 0.95rem)" }}
                >
                  {project.description}
                </p>
              </div>

              {/* Tech stack */}
              <div className={`mt-6 flex flex-wrap gap-2 ${!isEven ? "lg:justify-end" : ""}`}>
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-outfit text-[0.62rem] font-medium tracking-[0.1em] uppercase text-white/25 border border-white/[0.07] rounded-sm px-2.5 py-1"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* View Project UI button */}
              <div className={`mt-8 flex ${!isEven ? "lg:justify-end" : ""}`}>
                <button
                  type="button"
                  id={`project-btn-${project.id}`}
                  className="group/btn inline-flex items-center gap-2 font-outfit font-semibold text-[0.72rem] tracking-[0.14em] uppercase text-brand-lime border border-brand-lime/25 rounded-full px-5 py-2.5 transition-all duration-200 hover:bg-brand-lime/[0.07] hover:border-brand-lime/50 cursor-pointer"
                >
                  <span>VIEW PROJECT</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-3 h-3 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* -- IMAGE SLOT — reserved, empty for now ------- */}
        {/* When project images are ready, uncomment and populate this slot:
        <div className="hidden lg:flex items-center justify-center py-16 pl-8">
          <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/[0.08]">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
        </div>
        */}

      </div>

    </article>
  );
}

/* --- Main Projects Component --------------------------- */
export default function Projects() {
  const { ref: sectionRef, visible } = useFadeIn(0.06);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-brand-dark overflow-hidden"
      aria-label="Projects section"
    >
      {/* -- Background accents --------------------------- */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(212,242,68,0.04) 0%, transparent 65%)",
          filter: "blur(64px)",
          transform: "translate(30%, -20%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(212,242,68,0.03) 0%, transparent 65%)",
          filter: "blur(52px)",
          transform: "translate(-20%, 20%)",
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

      {/* -- Content ---------------------------------------- */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 md:px-10 xl:px-16 pt-20 pb-4 lg:pt-28 lg:pb-8">

        {/* -- Section header ------------------------------- */}
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-4 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Left: badge + heading */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 text-[0.68rem] font-outfit font-semibold tracking-[0.18em] uppercase text-brand-lime border border-brand-lime/20">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
                Selected Work
              </span>
              <div className="h-px bg-gradient-to-r from-white/[0.07] to-transparent w-24" />
            </div>
            <h2
              className="font-outfit font-black uppercase leading-none tracking-[-0.02em] text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)" }}
            >
              PROJECTS
            </h2>
          </div>

          {/* Right: caption */}
          <p
            className="font-jakarta text-white/30 font-light leading-relaxed max-w-xs md:text-right"
            style={{ fontSize: "clamp(0.8rem, 0.9vw, 0.875rem)" }}
          >
            A selection of frontend projects built with care, focused on clean interfaces and solid user experiences.
          </p>
        </div>
      </div>

      {/* -- Project list ----------------------------------- */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 md:px-10 xl:px-16 pb-20 lg:pb-28">
        {PROJECTS.map((project) => (
          <ProjectEntry key={project.id} project={project} visible={visible} />
        ))}

        {/* Final bottom rule */}
        <div className="w-full h-px bg-gradient-to-r from-white/[0.07] via-white/[0.1] to-white/[0.07]" />

        {/* Footer note */}
        <p className="mt-8 font-outfit text-[0.65rem] tracking-[0.2em] uppercase text-white/15 text-right select-none">
          More projects coming soon
        </p>
      </div>

      {/* Bottom separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
    </section>
  );
}
