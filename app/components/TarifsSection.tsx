import React from "react";

type TrustItemProps = {
  title: string;
  desc: string;
};

function TrustItem({ title, desc }: TrustItemProps) {
  return (
    <div className="flex items-start gap-3">
      {/* Icon chip */}
      <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-500/20 bg-sky-500/10">
        {/* check icon (no libs) */}
        <svg
          className="h-5 w-5 text-sky-300"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M20 6L9 17l-5-5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-100 leading-snug">
          {title}
        </p>
        <p className="text-sm text-slate-300 leading-snug">{desc}</p>
      </div>
    </div>
  );
}

export default function TarifsSection(): React.ReactElement {
  return (
    <section className="py-16 md:py-24 bg-slate-950 border-b border-slate-800/60">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/15 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold text-sky-300">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            Tarif annoncé à l’avance
          </div>

          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-slate-50">
            Tarifs
          </h2>

          <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
            Un prix clair, validé avant intervention — et une facturation transparente selon la durée.
          </p>
        </div>

        {/* Module container (premium surface) */}
        <div className="relative rounded-3xl border border-slate-800/70 bg-gradient-to-b from-slate-900/30 to-slate-950/30 p-4 md:p-6 shadow-2xl">
          {/* soft top glow */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(70%_55%_at_50%_0%,rgba(56,189,248,0.18),transparent_60%)]" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            {/* LEFT: Price card */}
            <div className="lg:col-span-7 rounded-2xl border border-sky-500/15 bg-gradient-to-br from-sky-500/10 via-slate-900 to-slate-950 p-7 md:p-8 transition hover:border-sky-400/25">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  Tarif de base
                </span>

                <span className="text-xs text-slate-400">
                  Déplacement + intervention
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-extrabold text-slate-50 leading-tight">
                Déplacement + 1ère heure d’intervention<span className="text-sky-300">*</span>
              </h3>

              <p className="mt-3 text-sm text-slate-300">
                * À Thouaré-sur-Loire — Pour les autres communes, tarifs sur demande.
              </p>

              {/* Price row */}
              <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
                <div className="flex items-end gap-3">
                  <div className="leading-none">
                    <p className="text-xs text-slate-400 mb-1">Prix</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl md:text-6xl font-extrabold text-sky-300 tracking-tight">
                        95€
                      </span>
                      <span className="text-sm font-semibold text-slate-200">HT</span>
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex h-10 items-center rounded-xl border border-slate-700/70 bg-slate-900/50 px-3 text-xs text-slate-300">
                    Validation avant intervention
                  </span>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xs text-slate-400">Besoin d’un devis ?</p>
                  <p className="text-sm text-slate-200">
                    Réponse rapide par téléphone.
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="tel:0675612080"
                  className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_45px_-18px_rgba(56,189,248,1)] transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
                >
                  Appeler maintenant
                </a>

                <a
                  href="#reservation"
                  className="inline-flex items-center justify-center rounded-full border border-slate-600/70 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-400/70 hover:text-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
                >
                  Demande de devis
                </a>
              </div>

              {/* Micro reassurance line */}
              <p className="mt-5 text-xs text-slate-400">
                Pour toute demande, le tarif est communiqué et validé avant intervention.
              </p>
            </div>

            {/* RIGHT: Transparency card */}
            <div className="lg:col-span-5 rounded-2xl border border-slate-800/70 bg-slate-900/40 p-7 md:p-8 transition hover:border-slate-700/80">
              <div className="flex items-start justify-between gap-3 mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-slate-100">
                    Clarté & transparence
                  </h4>
                </div>

                {/* subtle badge */}
                <span className="shrink-0 inline-flex items-center rounded-full border border-slate-700/70 bg-slate-950/30 px-3 py-1 text-xs text-slate-300">
                  Sans surprise
                </span>
              </div>

              <div className="space-y-4">
                <TrustItem
                  title="Tarif annoncé à l’avance"
                  desc="Validation systématique avant intervention."
                />
                <TrustItem
                  title="Au-delà de la 1re heure"
                  desc="Facturation au temps ou au forfait selon la situation."
                />
                <TrustItem
                  title="Travaux plus importants"
                  desc="Devis détaillé pour une visibilité totale."
                />
                <TrustItem
                  title="Explications claires"
                  desc="Pendant l’appel ou avant travaux."
                />
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800/70">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Devis clair présenté{" "}
                  <span className="text-slate-200 font-semibold">AVANT</span>{" "}
                  chaque intervention importante. Approche efficace, durable et adaptée à votre budget.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
