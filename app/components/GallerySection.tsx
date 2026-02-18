'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';

type CategoryKey =
  | 'salle-de-bain'
  | 'cuisine'
  | 'wc-suspendus'
  | 'plancher-chauffant'
  | 'Désembouage'
  | 'Remplacement'
  | 'Récréation'
  | 'Réparation' 
  | 'chaudiere';

type Category = {
  key: CategoryKey;
  label: string;
  items: { src: string }[];
};

const CATEGORIES: Category[] = [
  {
    key: 'salle-de-bain',
    label: 'Rénovation d’une salle de bain ',
    items: [
      { src: '/gallery/salle-de-bain/Salle de bain9.jpg' },
      { src: '/gallery/salle-de-bain/Salle de bain7.jpg' },
      { src: '/gallery/salle-de-bain/Salle de bain8.jpg' },
      { src: '/gallery/salle-de-bain/Salle de bain4.jpg' },
      { src: '/gallery/salle-de-bain/Salle de bain5.jpg' },
      { src: '/gallery/salle-de-bain/Salle de bain6.jpg' },
      { src: '/gallery/salle-de-bain/Salle de bain1.png' },
      { src: '/gallery/salle-de-bain/Salle de bain2.png' },
      { src: '/gallery/salle-de-bain/Salle de bain3.png' },
    ],
  },
  {
    key: 'Désembouage',
    label: 'Désembouage d’un réseau chauffage',
    items: [
      { src: '/gallery/Désembouage/Désembouage1.jpg' },
      { src: '/gallery/Désembouage/Désembouage2.jpg' },
      { src: '/gallery/Désembouage/Désembouage3.jpg' },
      { src: '/gallery/Désembouage/Désembouage4.jpg' },
    ],
  },
  {
    key: 'Récréation',
    label: "Réaménagement du réseau des eaux usées d’un bar",
    items: [
      { src: '/gallery/Récréation/Récréation1.jpg' },
      { src: '/gallery/Récréation/Récréation2.jpg' },
      { src: '/gallery/Récréation/Récréation3.jpg' },
      { src: '/gallery/Récréation/Récréation4.jpg' },
      { src: '/gallery/Récréation/Récréation5.jpg' },
      { src: '/gallery/Récréation/Récréation6.jpg' },
      { src: '/gallery/Récréation/Récréation7.jpg' },
      { src: '/gallery/Récréation/Récréation8.jpg' },
    ],
  },
  {
    key: 'Remplacement',
    label: "Remplacement d’une chaudière gaz à cheminée",
    items: [
      { src: '/gallery/Remplacement/Remplacement1.jpg' },
      { src: '/gallery/Remplacement/Remplacement2.jpg' },
      { src: '/gallery/Remplacement/Remplacement3.jpg' },
      { src: '/gallery/Remplacement/Remplacement4.jpg' },
      { src: '/gallery/Remplacement/Remplacement5.jpg' },
    ],
  },
  {
    key: 'cuisine',
    label: 'Aménagement d’une cuisine',
    items: [
      { src: '/gallery/cuisine/Cuisine1.png' },
      { src: '/gallery/cuisine/Cuisine2.png' },
      { src: '/gallery/cuisine/Cuisine3.png' },
      { src: '/gallery/cuisine/Cuisine4.png' },
      { src: '/gallery/cuisine/Cuisine5.png' },
    ],
  },
  {
    key: 'wc-suspendus',
    label: 'Installation de WC suspendus',
    items: [
      { src: '/gallery/wc-suspendus/WC suspendus1.png' },
      { src: '/gallery/wc-suspendus/WC suspendus2.png' },
      { src: '/gallery/wc-suspendus/WC suspendus3.png' },
    ],
  },
  {
    key: 'plancher-chauffant',
    label: 'Installation d’un plancher chauffant',
    items: [
      { src: '/gallery/plancher-chauffant/plancher1.png' },
      { src: '/gallery/plancher-chauffant/plancher2.png' },
      { src: '/gallery/plancher-chauffant/plancher3.png' },
    ],
  },
  {
    key: 'chaudiere',
    label: 'Remplacement d’une chaudière',
    items: [
      { src: '/gallery/chaudiere/chaudière1.png' },
      { src: '/gallery/chaudiere/chaudière2.png' },
      { src: '/gallery/chaudiere/chaudière3.png' },
  
    ],
  },
  {
    key: 'Réparation',
    label: 'Réparation d’une fuite dans le sol',
    items: [
      { src: '/gallery/Réparation/Réparation1.jpg' },
      { src: '/gallery/Réparation/Réparation2.jpg' },
      { src: '/gallery/Réparation/Réparation3.jpg' },
      { src: '/gallery/Réparation/Réparation4.jpg' },
  
    ],
  },
];

export default function GallerySection() {
  const [active, setActive] = useState<CategoryKey>('salle-de-bain');
  const [lightbox, setLightbox] = useState<{ src: string } | null>(null);

  const category = useMemo(
    () => CATEGORIES.find((c) => c.key === active) ?? CATEGORIES[0],
    [active],
  );

  return (
    <section className="border-b border-slate-800/60 bg-slate-950 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-50">Galerie</h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const isActive = c.key === active;
            return (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={[
                  'rounded-full px-4 py-2 text-sm font-medium transition',
                  'ring-1 ring-slate-800/70',
                  isActive
                    ? 'bg-sky-500 text-slate-950 ring-sky-400/40'
                    : 'bg-slate-900/60 text-slate-200 hover:bg-slate-900 hover:text-sky-200',
                ].join(' ')}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {category.items.map((img) => (
            <button
              key={img.src}
              onClick={() => setLightbox(img)}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 text-left shadow-[0_18px_60px_-30px_rgba(15,23,42,1)]"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={img.src}
                  alt="Réalisation ZA Plomberie"
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="rounded-xl bg-slate-950/60 p-3 ring-1 ring-slate-800/70 backdrop-blur">
                  <p className="text-xs text-slate-200">Cliquez pour agrandir</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-950"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
              <p className="text-sm font-semibold text-slate-50">Aperçu</p>
              <button
                onClick={() => setLightbox(null)}
                className="rounded-full border border-slate-700 px-3 py-1 text-xs font-medium text-slate-200 hover:text-sky-300"
              >
                Fermer
              </button>
            </div>

            <div className="relative aspect-[16/9] w-full">
              <Image
                src={lightbox.src}
                alt="Réalisation ZA Plomberie"
                fill
                className="object-contain bg-black"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
