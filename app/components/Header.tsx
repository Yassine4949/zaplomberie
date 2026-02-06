'use client';

import React from 'react';

export default function Header(): React.ReactElement {
  const email = 'zaplomberie.pro@gmail.com';
  const phoneDisplay = '06 75 61 20 80';
  const phoneRaw = '0675612080';

  const navLinks = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'À propos', href: '#apropos' },
    { label: 'Services', href: '#services' },
    { label: 'Tarifs', href: '#tarifs' },
    { label: 'Avis', href: '#avis' },
    { label: 'Galeries', href: '#galeries' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Logo / Brand */}
        <a href="#accueil" className="flex items-center gap-3">
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-50">ZA Plomberie</p>
            <p className="text-xs text-slate-400">Plomberie & Chauffage</p>
          </div>
        </a>

        {/* Center: Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-200">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition hover:text-sky-200"
            >
              {l.label}
            </a>
          ))}

          {/* ✅ Urgence button (blue bg + white text) */}
          <a
            href={`tel:${phoneRaw}`}
            className="inline-flex items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_45px_-22px_rgba(56,189,248,0.75)] transition hover:bg-sky-500"
            aria-label="Urgence - appeler"
          >
            Urgence
          </a>
        </nav>

        {/* Right: Contact info + CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex flex-col items-end text-xs text-slate-300 leading-tight">
            <a
              href={`mailto:${email}`}
              className="hover:text-sky-200 transition"
            >
              {email}
            </a>
            <a
              href={`tel:${phoneRaw}`}
              className="hover:text-sky-200 transition"
            >
              {phoneDisplay}
            </a>
          </div>

          {/* ✅ Contact button (text WHITE) */}
          <a
            href="#reservation"
            className="inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_45px_-18px_rgba(56,189,248,1)] transition hover:bg-sky-400"
          >
            Prendre contact – demande de devis
          </a>
        </div>
      </div>

      {/* Mobile bottom row: show Urgence button */}
      <div className="md:hidden border-t border-slate-800/60 bg-slate-950/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <div className="text-xs text-slate-400">
            <a href={`tel:${phoneRaw}`} className="hover:text-sky-200 transition">
              {phoneDisplay}
            </a>
          </div>

          <a
            href={`tel:${phoneRaw}`}
            className="inline-flex items-center justify-center rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-sky-500"
          >
            Urgence
          </a>
        </div>
      </div>
    </header>
  );
}
