'use client';

import React from 'react';

import Header from './components/Header';
import ServicesSection from './components/ServicesSection';
import TarifsSection from './components/TarifsSection';
import BookingSection from './components/BookingSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import AvisSection from './components/AvisSection';
import GallerySection from './components/GallerySection';
import PartnersSection from './components/PartnersSection';

function TrustChip(props: {
  dotClassName: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-900/35 px-4 py-2 text-xs text-slate-300 backdrop-blur">
      <span className={`h-1.5 w-1.5 rounded-full ${props.dotClassName}`} />
      <span>{props.children}</span>
    </div>
  );
}

function HeroBadge(): React.ReactElement {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-4 py-2 text-xs font-medium text-sky-300 ring-1 ring-slate-700/70 backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      <span>Intervention dans un rayon de 100 kms • 8 ans d&apos;expérience</span>
    </div>
  );
}

export default function Home(): React.ReactElement {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950 text-slate-50">
      <Header />

      <main>
        {/* HERO / ACCUEIL (Centered, clean, symmetric, premium) */}
        <section
          id="accueil"
          className="relative overflow-hidden border-b border-slate-800/60 bg-slate-950/80 scroll-mt-24"
        >
          {/* Premium symmetric background accents (same theme) */}
          <div className="pointer-events-none absolute inset-0">
            {/* left glow */}
            <div className="absolute -left-40 top-16 h-[520px] w-[520px] rounded-full bg-sky-500/10 blur-[110px]" />
            {/* right glow */}
            <div className="absolute -right-40 top-16 h-[520px] w-[520px] rounded-full bg-emerald-400/10 blur-[110px]" />
            {/* top center glow */}
            <div className="absolute left-1/2 top-0 h-[320px] w-[900px] -translate-x-1/2 bg-[radial-gradient(55%_65%_at_50%_0%,rgba(56,189,248,0.14),transparent_65%)]" />

            {/* subtle grid texture */}
            <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(148,163,184,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.35)_1px,transparent_1px)] [background-size:72px_72px]" />
          </div>

          <div className="relative mx-auto flex w-full max-w-7xl min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6 pb-24 pt-16 sm:px-8 lg:px-12">
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center gap-8">
              <HeroBadge />

              {/* Senior typography: controlled width + intentional line breaks */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.03] tracking-tight">
                <span className="block text-slate-50">Dépannage plomberie &amp; chauffage</span>
                <span className="mt-2 block bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                  rapide, transparent, professionnel.
                </span>
              </h1>

              <p className="max-w-2xl text-slate-200 text-base sm:text-lg leading-relaxed">
                Intervention rapide à Thouaré-sur-Loire et alentours. Devis annoncé avant toute intervention
                complémentaire — pas de surprise.
              </p>

              {/* CTAs (symmetric, clean) */}
              <div className="flex w-full flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="#reservation"
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_45px_-18px_rgba(56,189,248,1)] transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
                >
                  Prendre contact / demande de devis
                </a>

                <a
                  href="#tarifs"
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-slate-700/70 bg-slate-900/35 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-400/60 hover:text-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
                >
                  Voir les tarifs
                </a>
              </div>

              {/* Trust chips (premium replacement for removed blocks) */}
              <div className="flex flex-wrap justify-center gap-3 pt-1">
                <TrustChip dotClassName="bg-emerald-400">Urgences 7j/7 (créneaux)</TrustChip>
                <TrustChip dotClassName="bg-sky-400">+400 interventions réalisées</TrustChip>
                <TrustChip dotClassName="bg-sky-400">Devis annoncé avant travaux</TrustChip>
              </div>

              {/* Micro reassurance line (very subtle) */}
              <p className="text-xs text-slate-500">
                Intervention selon disponibilité • Transparence sur le prix avant toute prestation complémentaire
              </p>
            </div>
          </div>
        </section>

        {/* À PROPOS */}
        <section id="apropos" className="scroll-mt-24">
          <AboutSection />
        </section>

        {/* SERVICES */}
        <section id="services" className="scroll-mt-24">
          <ServicesSection />
        </section>

        {/* ARTICLES / CONSEILS */}
        {/*<section id="articles" className="scroll-mt-24">
          <ArticlesSection />
        </section>*/}

        {/* TARIFS */}
        <section id="tarifs" className="scroll-mt-24">
          <TarifsSection />
        </section>

        {/* AVIS CLIENTS */}
        <section id="avis" className="scroll-mt-24">
          <AvisSection />
        </section>

        {/* PARTENAIRES */}
        <section id="partenaires" className="scroll-mt-24">
          <PartnersSection />
        </section>

        {/* GALERIE */}
        <section id="galerie" className="scroll-mt-24">
          <GallerySection />
        </section>

        {/* RÉSERVATION / URGENCE */}
        <section id="reservation" className="scroll-mt-24">
          <BookingSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}
