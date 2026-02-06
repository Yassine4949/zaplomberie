'use client';

import React from 'react';
import Image from 'next/image';

const PARTNERS = [
  {
    name: 'Bilik',
    src: '/partners/logo.png',
  },
  {
    name: 'Cedeo',
    src: '/partners/R.jpeg',
  },
  {
    name: 'Plateforme du Bâtiment',
    src: '/partners/copy.png',
  },
];

export default function PartnersSection() {
  return (
    <section id="partenaires" className="border-b border-slate-800/60 bg-slate-950 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-50">
            Mes partenaires
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Partenaires de confiance pour vos projets de plomberie et chauffage
          </p>
        </div>

        {/* Partners Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-[0_18px_60px_-30px_rgba(15,23,42,1)] transition hover:border-sky-500/40"
            >
              {/* Glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                <div className="absolute -inset-24 bg-gradient-to-r from-sky-500/10 via-cyan-400/5 to-emerald-400/10 blur-2xl" />
              </div>

              <div className="relative flex items-center justify-center">
                <div className="relative h-14 w-[220px] sm:h-16 sm:w-[240px]">
                  <Image
                    src={p.src}
                    alt={p.name}
                    fill
                    className="object-contain opacity-90 transition duration-300 group-hover:opacity-100"
                    sizes="(max-width: 640px) 80vw, 240px"
                  />
                </div>
              </div>

              <p className="relative mt-4 text-center text-xs font-medium text-slate-300">
                {p.name}
              </p>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
