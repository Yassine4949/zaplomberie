import React from 'react';

const services = [
  {
    icon: '🚨',
    title: "Dépannage d'urgence",
    items: [
      "Fuites d’eau : intervention rapide pour détecter et réparer les fuites visibles ou non.",
      "Canalisations bouchées : débouchage rapide afin de rétablir l’écoulement normal de vos canalisations d’éviers, toilettes, douches ou baignoires.",
      'Chauffe-eau en panne',
      'Chaudière en panne',
      "Remplacement d’équipements sanitaires",
    ],
  },
  {
    icon: '🛁',
    title: 'Salle de bain & cuisine',
    items: [
      'Création et rénovation de votre salle de bain clé en main',
      'Aménagement de salle de bain pour PMR (sécurité et confort pour les personnes à mobilité réduite)',
      'Installation de sanitaires (lavabos, douches, baignoires …)',
      'Pose ou remplacement de WC : traditionnels (réputés comme plus robustes) ou suspendus (apportent la modernité à votre intérieur et une facilité de nettoyage au sol)',
      'Pose d’évier ou vasques',
      'Remplacement de robinetterie (usée, défectueuse ou changement de style)',
      'Changement de mécanisme de WC ou de robinet de WC',
      'Réparation de canalisations',
    ],
  },
  {
    icon: '🔥',
    title: 'Chauffage & eau chaude',
    items: [
      'Installation et dépannage de chaudière au gaz, à condensation ou à cheminée',
      'Installation et dépannage chauffe-eau (électriques ou à gaz)',
      'Purge et entretien de radiateurs',
      'Désembouage : nettoyage de circuit chauffage (radiateur, plancher chauffant ou toute autre installation de chauffage). Il permet d’éviter la surconsommation d’énergie et d’améliorer la longévité de l’installation.',
      'Installation de plancher chauffant',
    ],
  },
];

export default function ServicesSection(): React.ReactElement {
  return (
    <section className="py-16 md:py-20 bg-slate-950 border-b border-slate-800/60">
      <div className="mx-auto max-w-5xl px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mb-2">
            Services de plomberie & chauffage
          </h2>
          <p className="text-base text-slate-400">
            Dépannage, installation et rénovation pour particuliers et
            professionnels. Intervention rapide et travail soigné.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3 mt-12">
          {services.map((srv) => (
            <div
              key={srv.title}
              className="flex flex-col items-start rounded-2xl border border-slate-800 bg-slate-900/70 p-6 group shadow-lg shadow-slate-900/50 transition hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-sky-500/20"
            >
              <span className="text-2xl mb-4">{srv.icon}</span>

              {/* ✅ Bigger titles */}
              <h3 className="mb-4 text-2xl md:text-[26px] font-semibold tracking-tight text-slate-50">
                {srv.title}
              </h3>

              <ul className="space-y-3">
                {srv.items.map((item) => {
                  const hasColon = item.includes(':');

                  // Split on colon (if any)
                  const [mainPart, ...afterColon] = item.split(':');
                  const afterColonText = afterColon.join(':');

                  // Extract parentheses
                  const parts = mainPart.split(/(\(.*?\))/g);

                  return (
                    <li key={item} className="flex gap-3 items-start">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-400 shrink-0" />

                      <span className="leading-relaxed">
                        {/* Main title (big) */}
                        <span className="block text-base font-semibold text-slate-100">
                          {parts.map((part) => (part.startsWith('(') ? null : part))}
                          {hasColon && ' :'}
                        </span>

                        {/* Parentheses (always small) */}
                        {parts.map(
                          (part, i) =>
                            part.startsWith('(') && (
                              <span key={i} className="block text-sm text-slate-300">
                                {part}
                              </span>
                            )
                        )}

                        {/* Description after colon */}
                        {hasColon && afterColonText && (
                          <span className="block text-sm text-slate-300">
                            {afterColonText}
                          </span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
