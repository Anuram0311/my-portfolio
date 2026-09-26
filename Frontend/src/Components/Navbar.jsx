import { useState, useEffect, useRef } from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [menuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (label, href) => {
    setActiveLink(label);
    setMenuOpen(false);
    // Smooth scroll
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-6 md:px-10 xl:px-16 h-[72px] flex items-center justify-between">

          {/* Logo / Brand */}
          <a
            href="#home"
            id="nav-logo"
            className="group flex items-center gap-2 select-none"
            onClick={() => setActiveLink('Home')}
          >
            <span className="font-outfit font-black text-[1.1rem] tracking-[0.12em] text-white uppercase transition-all duration-300 group-hover:text-brand-lime">
              ANURAM
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse-glow" />
            <span className="font-outfit font-thin text-[1.1rem] tracking-[0.18em] text-white/60 uppercase transition-all duration-300 group-hover:text-brand-lime/60">
              K
            </span>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  id={`nav-${label.toLowerCase()}`}
                  onClick={() => handleNavClick(label, href)}
                  className={`relative font-outfit font-medium text-[0.8rem] tracking-[0.12em] uppercase px-4 py-2 rounded-full transition-all duration-300 group
                    ${activeLink === label
                      ? 'text-brand-lime'
                      : 'text-white/55 hover:text-white'
                    }`}
                >
                  {label}
                  {/* Active / hover underline */}
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-brand-lime transition-all duration-300
                      ${activeLink === label ? 'w-4' : 'w-0 group-hover:w-3'}`}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              id="nav-cta"
              onClick={() => handleNavClick('Contact', '#contact')}
              className="group relative flex items-center gap-2 bg-brand-lime text-brand-dark font-outfit font-bold text-[0.75rem] tracking-[0.14em] uppercase px-5 py-2.5 rounded-full overflow-hidden transition-all duration-300 hover:glow-lime hover:scale-[1.04] active:scale-[0.97]"
            >
              {/* Shine sweep on hover */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-white/20 skew-x-12" />
              <span className="relative z-10">Let&apos;s Connect</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            id="nav-menu-toggle"
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] group"
          >
            <span
              className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${
                menuOpen ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6'
              }`}
            />
            <span
              className={`block h-[2px] bg-brand-lime rounded-full transition-all duration-300 ${
                menuOpen ? 'w-0 opacity-0' : 'w-4 group-hover:w-6'
              }`}
            />
            <span
              className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${
                menuOpen ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-6'
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`lg:hidden fixed inset-0 z-40 flex flex-col transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          background: 'rgba(12, 12, 14, 0.97)',
          backdropFilter: 'blur(24px)',
        }}
      >
        {/* Top spacer for navbar height */}
        <div className="h-[72px] shrink-0" />

        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8">
          {NAV_LINKS.map(({ label, href }, i) => (
            <a
              key={label}
              href={href}
              id={`mobile-nav-${label.toLowerCase()}`}
              onClick={() => handleNavClick(label, href)}
              className={`font-outfit font-semibold text-3xl tracking-[0.1em] uppercase transition-all duration-200
                ${activeLink === label ? 'text-brand-lime' : 'text-white/70 hover:text-white'}`}
              style={{
                transitionDelay: menuOpen ? `${i * 60}ms` : '0ms',
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: menuOpen ? 1 : 0,
              }}
            >
              {label}
            </a>
          ))}

          <a
            href="#contact"
            id="mobile-nav-cta"
            onClick={() => handleNavClick('Contact', '#contact')}
            className="mt-6 bg-brand-lime text-brand-dark font-outfit font-bold text-sm tracking-[0.16em] uppercase px-8 py-3.5 rounded-full glow-lime-sm hover:scale-[1.04] transition-all duration-300"
            style={{
              transitionDelay: menuOpen ? `${NAV_LINKS.length * 60}ms` : '0ms',
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: menuOpen ? 1 : 0,
            }}
          >
            Let&apos;s Connect ↗
          </a>
        </div>

        {/* Footer line */}
        <div className="pb-8 text-center font-outfit text-xs tracking-widest text-white/20 uppercase">
          Anuram K · Full Stack Developer
        </div>
      </div>
    </>
  );
}
