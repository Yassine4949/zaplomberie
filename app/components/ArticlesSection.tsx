'use client';

import React, { useState } from 'react';

type ArticleCategory = {
  title: string;
  description: string;
  items: string[];
};

const categories: ArticleCategory[] = [
  {
    title: 'Articles plomberie',
    description:
      'Fuites, canalisations, rénovations : des conseils pratiques pour votre installation sanitaire.',
    items: [
      'Comment réparer une fuite d’eau rapidement à Thouaré-sur-Loire',
      'Plombier urgence Thouaré-sur-Loire : intervention dans la journée',
      'Débouchage de canalisation rapide : conseils et solutions',
      'Installer un lavabo ou un évier soi-même : erreurs à éviter',
      'Rénovation plomberie à Thouaré-sur-Loire : guide complet',
      'Les signes d’une canalisation à remplacer',
      'Comment éviter les fuites d’eau dans votre maison',
      'Plombier recommandé Nantes et alentours pour urgences',
    ],
  },
  {
    title: 'Articles chauffage',
    description:
      'Chaudières, radiateurs, entretien : tout pour rester au chaud en toute sécurité.',
    items: [
      'Dépannage chaudière à Thouaré-sur-Loire : quand appeler un professionnel',
      'Intervention chauffage urgent : rétablir la chaleur dans la journée',
      'Installer une chaudière neuve : ce qu’il faut savoir',
      'Entretenir son chauffage avant l’hiver : guide pratique',
      'Réparer un radiateur qui ne chauffe plus : astuces et solutions',
      'Remplacement de pièces de chaudière : quand et pourquoi',
      'Chauffagiste indépendant à Thouaré-sur-Loire : avantages',
    ],
  },
  {
    title: 'Guides & conseils',
    description:
      'Bien choisir son artisan, anticiper les pannes et faire des économies au quotidien.',
    items: [
      'Comment choisir un plombier chauffagiste fiable à Thouaré-sur-Loire',
      'Plomberie et chauffage : entretien régulier pour éviter les urgences',
      'Intervention rapide dans les 20 km autour de Thouaré-sur-Loire : notre zone d’action',
      'Garanties décennales et responsabilité civile : pourquoi c’est important',
      'Plus de 400 clients satisfaits : notre expérience en chiffres',
      'Fuite d’eau ou panne de chauffage : que faire en attendant le professionnel',
      'Installation de salle de bain : conseils pour bien choisir son plombier',
      'Plomberie neuve vs rénovation : quelles différences et coûts',
      'Économiser sur sa consommation d’eau et chauffage avec de bons gestes',
      'Les avantages d’un plombier chauffagiste local pour urgences et travaux',
    ],
  },
];

type CategoryCardProps = {
  category: ArticleCategory;
};

function CategoryCard({ category }: CategoryCardProps) {
  const [expanded, setExpanded] = useState(false);

  const visibleItems = expanded ? category.items : category.items.slice(0, 3);

  const toggle = () => setExpanded((v) => !v);

  return (
    <article className="flex flex-col rounded-3xl border border-slate-800/60 bg-slate-900/60 p-5 shadow-[0_18px_45px_-22px_rgba(15,23,42,1)] backdrop-blur-md">
      <h3 className="text-lg font-semibold text-slate-50">
        {category.title}
      </h3>
      <p className="mt-1 text-xs text-slate-400 sm:text-sm">
        {category.description}
      </p>

      {/* Liste avec animation hauteur / opacité */}
      <div
        className={`mt-4 overflow-hidden transition-all duration-300 ease-out ${
          expanded ? 'max-h-[700px] opacity-100' : 'max-h-[180px] opacity-95'
        }`}
      >
        <ul className="space-y-2.5 text-left">
          {visibleItems.map((item) => (
            <li key={item} className="group flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400/80" />
              <a
                href="#"
                className="text-sm text-slate-200 transition-colors group-hover:text-sky-300"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Bouton Voir tout / Voir moins */}
      {category.items.length > 3 && (
        <button
          type="button"
          onClick={toggle}
          className="mt-4 inline-flex items-center text-xs font-semibold text-sky-300 transition hover:text-sky-200"
        >
          {expanded ? 'Voir moins' : 'Voir tous les articles'}
          <span
            className={`ml-1 inline-block transform text-[0.6rem] transition-transform duration-200 ${
              expanded ? 'rotate-180' : ''
            }`}
          >
            ▼
          </span>
        </button>
      )}
    </article>
  );
}

export default function ArticlesSection() {
  return (
    <section
      id="articles"
      className="relative mx-auto mt-24 max-w-6xl px-4 pb-24 sm:px-6 lg:px-8"
    >
      <div className="mb-10 flex flex-col gap-4 text-center">
        <span className="mx-auto inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-sky-300">
          Articles &amp; conseils
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Articles &amp; conseils pour votre plomberie et chauffage
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
          Des contenus pensés pour les habitants de Thouaré-sur-Loire et des
          communes voisines, pour mieux comprendre vos installations et éviter
          les mauvaises surprises.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((cat) => (
          <CategoryCard key={cat.title} category={cat} />
        ))}
      </div>
    </section>
  );
}
