import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";

/* ─── Social links ──────────────────────────────────── */
const SOCIALS = [
  {
    id: "footer-github",
    label: "GitHub",
    href: "https://github.com/Anuram0311",
    icon: FiGithub,
  },
  {
    id: "footer-linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/anuram-k-b7462638a",
    icon: FiLinkedin,
  },
  {
    id: "footer-email",
    label: "Email",
    href: "mailto:anuramk0311@gmail.com",
    icon: FiMail,
  },
];

/* ─── Back to top ───────────────────────────────────── */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ─── Footer Component ──────────────────────────────── */
export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative w-full bg-brand-dark overflow-hidden"
      aria-label="Site footer"
    >
      {/* Subtle bottom-center lime bloom */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[560px] h-[220px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(212,242,68,0.045) 0%, transparent 70%)",
          filter: "blur(32px)",
        }}
      />

      {/* Top separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

      {/* ── Main content ─────────────────────────────── */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 md:px-10 xl:px-16 pt-12 pb-8">

        {/* ── Top row: brand · socials · back-to-top ── */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-10">

          {/* ── Brand block ─────────────────────────── */}
          <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
            {/* Logotype — mirrors Navbar mark */}
            <a
              href="#home"
              id="footer-logo"
              className="group flex items-center gap-2 select-none"
              aria-label="Back to top — Anuram K"
            >
              <span className="font-outfit font-black text-[1.05rem] tracking-[0.14em] text-white uppercase transition-colors duration-300 group-hover:text-brand-lime">
                ANURAM
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-lime shrink-0" />
              <span className="font-outfit font-thin text-[1.05rem] tracking-[0.2em] text-white/55 uppercase transition-colors duration-300 group-hover:text-brand-lime/60">
                K
              </span>
            </a>

            {/* Role tag */}
            <p className="font-outfit text-[0.62rem] font-semibold tracking-[0.22em] uppercase text-brand-lime/60">
              MERN STACK DEVELOPER
            </p>

            {/* Tagline */}
            <p
              className="font-jakarta text-white/35 font-light leading-relaxed max-w-[260px]"
              style={{ fontSize: "clamp(0.78rem, 0.9vw, 0.85rem)" }}
            >
              Building modern, responsive and scalable full-stack web experiences.
            </p>
          </div>

          {/* ── Right: socials + back to top ─────────── */}
          <div className="flex flex-col items-center md:items-end gap-6">
            {/* Social icon row */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ id, label, href, icon: Icon }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  className="group w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.025] flex items-center justify-center transition-all duration-200 hover:border-brand-lime/30 hover:bg-brand-lime/[0.07]"
                >
                  <Icon
                    className="w-[15px] h-[15px] text-white/35 transition-colors duration-200 group-hover:text-brand-lime/80"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>

            {/* Back to top */}
            <button
              id="footer-back-to-top"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group inline-flex items-center gap-2 font-outfit text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-white/25 transition-all duration-200 hover:text-brand-lime/80"
            >
              <span>Back to top</span>
              <span className="w-6 h-6 rounded-full border border-white/[0.1] flex items-center justify-center transition-all duration-200 group-hover:border-brand-lime/30 group-hover:bg-brand-lime/[0.07]">
                <FiArrowUp
                  className="w-3 h-3 transition-all duration-200 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </button>
          </div>
        </div>

        {/* ── Divider ──────────────────────────────── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent mb-7" />

        {/* ── Bottom row: copyright · nav links ─────── */}
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left">

          {/* Copyright */}
          <p className="font-outfit text-[0.62rem] tracking-[0.14em] text-white/20 select-none">
            © 2026 Anuram K. All rights reserved.
          </p>

          {/* Quick nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex items-center justify-center md:justify-end gap-5 flex-wrap">
              {["About", "Skills", "Experience", "Projects", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="font-outfit text-[0.62rem] font-medium tracking-[0.14em] uppercase text-white/25 transition-colors duration-200 hover:text-brand-lime/70"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
