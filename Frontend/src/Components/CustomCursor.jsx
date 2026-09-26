import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default'); // 'default' | 'pointer' | 'image' | 'crosshair'
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Position references
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  // DOM elements refs for direct animation updates (max performance 60fps)
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    // Detect touch / coarse pointer devices
    const touchCheck = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(touchCheck);
    if (touchCheck) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) setIsVisible(true);

      // Instant update center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      // Detect element hover state
      const target = e.target;
      if (!target) return;

      const isInteractive = target.closest(
        'a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor="pointer"]'
      );
      const isImage = target.closest('#hero-img, #hero-image-container');
      const isTicker = target.closest('#hero-ticker');

      if (isInteractive) {
        setCursorVariant('pointer');
        setIsHovered(true);
      } else if (isImage) {
        setCursorVariant('image');
        setIsHovered(true);
      } else if (isTicker) {
        setCursorVariant('crosshair');
        setIsHovered(true);
      } else {
        setCursorVariant('default');
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth lerp loop for outer ring
    const render = () => {
      // Lerp formula: current + (target - current) * ease
      const ease = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible]);

  // Don't render cursor component on mobile / touch screen devices
  if (isTouchDevice) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* ── Center Precision Dot ────────────────────────────── */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full transition-all duration-300 ease-out pointer-events-none ${
          cursorVariant === 'image'
            ? 'w-2 h-2 bg-brand-lime shadow-[0_0_10px_#D4F244]'
            : cursorVariant === 'crosshair'
            ? 'w-1.5 h-1.5 bg-brand-lime shadow-[0_0_8px_#D4F244]'
            : isHovered
            ? 'w-2 h-2 bg-brand-lime shadow-[0_0_10px_#D4F244]'
            : 'w-1.5 h-1.5 bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.6)]'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* ── Trailing Smooth Outer Ring ─────────────────────── */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none flex items-center justify-center rounded-full transition-all duration-300 ease-out ${
          cursorVariant === 'image'
            ? 'w-14 h-14 border border-brand-lime/60 bg-brand-lime/[0.06] shadow-[0_0_20px_rgba(212,242,68,0.2)]'
            : cursorVariant === 'crosshair'
            ? 'w-10 h-10 border border-brand-lime/40 bg-brand-lime/10 shadow-[0_0_12px_rgba(212,242,68,0.2)]'
            : cursorVariant === 'pointer'
            ? 'w-12 h-12 border border-brand-lime/70 bg-brand-lime/[0.06] shadow-[0_0_16px_rgba(212,242,68,0.25)]'
            : 'w-9 h-9 border border-white/20 bg-white/[0.02] shadow-[0_0_8px_rgba(255,255,255,0.05)]'
        } ${isPressed ? 'scale-75' : ''}`}
        style={{ willChange: 'transform' }}
      >
        {/* Crosshair indicator lines for marquee */}
        {cursorVariant === 'crosshair' && (
          <div className="relative w-full h-full flex items-center justify-center">
            <span className="absolute w-2.5 h-[1px] bg-brand-lime/80" />
            <span className="absolute h-2.5 w-[1px] bg-brand-lime/80" />
          </div>
        )}
      </div>
    </div>
  );
}
