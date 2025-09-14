// src/components/Navbar.js
import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { id: 'stats', label: 'Stats' },
  { id: 'charts', label: 'Charts' },
  { id: 'crime-data', label: 'Crime Data' },
  { id: 'news', label: 'Updates' },
];

export default function Navbar() {
  const [active, setActive] = useState('stats');
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const tickingRef = useRef(false);

  function handleNavClick(e, id) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(id);
    setMenuOpen(false); 
  }

  useEffect(() => {
    const updateActiveByViewport = () => {
      const sections = NAV_LINKS.map((l) =>
        document.getElementById(l.id)
      ).filter(Boolean);
      if (!sections.length) return;
      const triggerY = window.innerHeight / 4;
      let bestId = active;
      let bestDist = Infinity;

      for (const sec of sections) {
        const rect = sec.getBoundingClientRect();
        const dist = Math.abs(rect.top - triggerY);

        if (dist < bestDist) {
          bestDist = dist;
          bestId = sec.id;
        }
      }

      if (bestId !== active) setActive(bestId);
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        window.requestAnimationFrame(() => {
          updateActiveByViewport();
          tickingRef.current = false;
        });
      }
    };

    setTimeout(updateActiveByViewport, 50);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [active]);

  const linkClass = (id) =>
    `block px-3 py-2 rounded-md transition-colors ${
      active === id
        ? 'text-cyan-400 font-semibold'
        : 'text-slate-200 hover:text-white'
    }`;

  return (
    <nav
      ref={navRef}
      className="w-full bg-gradient-to-r from-slate-800 to-slate-900 shadow-md sticky top-0 z-40"
    >
      <div className="container-max flex items-center justify-between h-20 px-4 md:px-8">
        <div className="flex items-center gap-3">
          <img
            src="/AP-Police-banner.png"
            alt="AP Police Logo"
            className="h-12 w-12 rounded-md object-cover shadow-md"
          />
          <span className="text-white font-extrabold text-xl md:text-2xl tracking-tight">
            AP Police FIR Dashboard
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className={linkClass(link.id)}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-slate-200 hover:text-white focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      <div
        className={`md:hidden bg-slate-800/95 border-t border-slate-700 overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-3 space-y-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className={linkClass(link.id)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
