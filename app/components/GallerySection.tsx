'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

type CategoryKey =
  | 'salle-de-bain'
  | 'cuisine'
  | 'wc-suspendus'
  | 'plancher-chauffant'
  | 'desembouage'
  | 'remplacement'
  | 'recreation'
  | 'reparation'
  | 'chaudiere';

type Category = {
  key: CategoryKey;
  label: string;
  items: { src: string }[];
};

const CATEGORY_LABELS: Record<string, string> = {
  'salle-de-bain': 'Renovation salle de bain',
  cuisine: 'Amenagement cuisine',
  'wc-suspendus': 'Installation de WC suspendus',
  'plancher-chauffant': 'Installation de plancher chauffant',
  desembouage: 'Desembouage reseau chauffage',
  remplacement: 'Remplacement chaudiere',
  recreation: 'Reamenagement reseau des eaux usees',
  reparation: 'Reparation fuite',
  chaudiere: 'Chaudiere',
};

const CATEGORIES: Category[] = [
  {
    key: 'salle-de-bain',
    label: 'Renovation salle de bain',
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
    key: 'desembouage',
    label: 'Desembouage reseau chauffage',
    items: [
      { src: '/gallery/Desembouage/Desembouage1.jpg' },
      { src: '/gallery/Desembouage/Desembouage2.jpg' },
      { src: '/gallery/Desembouage/Desembouage3.jpg' },
      { src: '/gallery/Desembouage/Desembouage4.jpg' },
    ],
  },
  {
    key: 'recreation',
    label: 'Reamenagement reseau des eaux usees',
    items: [
      { src: '/gallery/Recreation/Recreation1.jpg' },
      { src: '/gallery/Recreation/Recreation2.jpg' },
      { src: '/gallery/Recreation/Recreation3.jpg' },
      { src: '/gallery/Recreation/Recreation4.jpg' },
      { src: '/gallery/Recreation/Recreation5.jpg' },
      { src: '/gallery/Recreation/Recreation6.jpg' },
      { src: '/gallery/Recreation/Recreation7.jpg' },
      { src: '/gallery/Recreation/Recreation8.jpg' },
    ],
  },
  {
    key: 'remplacement',
    label: 'Remplacement chaudiere',
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
    label: 'Amenagement cuisine',
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
    label: 'Installation de plancher chauffant',
    items: [
      { src: '/gallery/plancher-chauffant/plancher1.png' },
      { src: '/gallery/plancher-chauffant/plancher2.png' },
      { src: '/gallery/plancher-chauffant/plancher3.png' },
    ],
  },
  {
    key: 'chaudiere',
    label: 'Chaudiere',
    items: [
      { src: '/gallery/chaudiere/chaudiere1.png' },
      { src: '/gallery/chaudiere/chaudiere2.png' },
      { src: '/gallery/chaudiere/chaudiere3.png' },
    ],
  },
  {
    key: 'reparation',
    label: 'Reparation fuite',
    items: [
      { src: '/gallery/Reparation/Reparation1.jpg' },
      { src: '/gallery/Reparation/Reparation2.jpg' },
      { src: '/gallery/Reparation/Reparation3.jpg' },
      { src: '/gallery/Reparation/Reparation4.jpg' },
    ],
  },
];

export default function GallerySection() {
  const [active, setActive] = useState<CategoryKey>('salle-de-bain');
  const [lightbox, setLightbox] = useState<{ src: string } | null>(null);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    if (!baseUrl) return;

    const url = `${baseUrl.replace(/\/$/, '')}/api/gallery-items?populate=image&filters[isActive][$eq]=true&sort=position:asc`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const data = Array.isArray(json?.data) ? json.data : [];
        if (!data.length) return;

        const grouped: Record<string, { src: string }[]> = {};
        for (const item of data) {
          const attrs = item.attributes || {};
          const categoryKey = attrs.category as string | undefined;
          const imageUrl = attrs?.image?.data?.attributes?.url as string | undefined;
          if (!categoryKey || !imageUrl) continue;

          if (!grouped[categoryKey]) grouped[categoryKey] = [];
          grouped[categoryKey].push({
            src: imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`,
          });
        }

        const nextCategories: Category[] = Object.entries(grouped).map(([key, items]) => ({
          key: key as CategoryKey,
          label: CATEGORY_LABELS[key] || key,
          items,
        }));

        if (nextCategories.length) {
          setCategories(nextCategories);
          if (!nextCategories.find((c) => c.key === active)) {
            setActive(nextCategories[0].key);
          }
        }
      })
      .catch(() => null);
  }, []);

  const category = useMemo(
    () => categories.find((c) => c.key === active) ?? categories[0],
    [active, categories],
  );

  return (
    <section className="border-b border-slate-800/60 bg-slate-950 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-50">Galerie</h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
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
                  alt="Realisation ZA Plomberie"
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
              <p className="text-sm font-semibold text-slate-50">Apercu</p>
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
                alt="Realisation ZA Plomberie"
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
