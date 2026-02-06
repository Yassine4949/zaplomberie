import React from "react";

export default function HeroSection(): React.ReactElement {
  return (
    <section className="pt-12 pb-10 md:pt-20 md:pb-20 bg-slate-950 border-b border-slate-800/60">
      <div className="mx-auto max-w-6xl px-4">
        {/* Full-width hero (no right card) */}
        <div className="space-y-8">
          <h1 className="w-full text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-slate-50">
            Dépannage plomberie & chauffage
            <span className="block bg-gradient-to-r from-sky-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              rapide, transparent, professionnel.
            </span>
          </h1>

          <p className="text-slate-200 text-base md:text-lg max-w-3xl">
            Moi, c&apos;est <span className="font-semibold">Zaibi Anes</span>, plombier chauffagiste depuis 8 ans à
            Thouaré-sur-Loire. Urgences, fuites, dépannage, installations et rénovations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#reservation"
              className="rounded-full bg-sky-500 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-sky-500/40 hover:bg-sky-400 transition text-center"
            >
              Réserver un dépannage
            </a>
            <a
              href="#tarifs"
              className="rounded-full border border-slate-600 px-6 py-3 text-base font-semibold text-slate-100 hover:bg-slate-900/60 transition text-center"
            >
              Voir les tarifs
            </a>
          </div>

          {/* Optional: small trust line (NOT the removed blocks) */}
          <div className="text-sm text-slate-400">
            Intervention rapide • Devis annoncé avant toute intervention complémentaire
          </div>
        </div>
      </div>
    </section>
  );
}
