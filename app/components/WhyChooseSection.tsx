'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  BadgeCheck,
  Wrench,
  ClipboardCheck,
  HeartHandshake,
  MapPin,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

type IconType = React.ComponentType<{ className?: string }>;

const cards: Array<{ title: string; desc: string; Icon: IconType }> = [
  // Existing (keep same look)
  {
    title: 'Réactivité & disponibilité',
    desc: 'Intervention rapide et suivi clair de votre demande.',
    Icon: Zap,
  },
  {
    title: 'Professionnalisme',
    desc: 'Travail propre, respect du lieu, explications avant intervention.',
    Icon: BadgeCheck,
  },
  {
    title: 'Expertise',
    desc: '8 ans d’expérience en plomberie & chauffage, solutions efficaces.',
    Icon: Wrench,
  },

  // New (same design)
  {
    title: 'Engagements',
    desc: 'Transparence sur les prix, propreté après travaux, conseils pour éviter le retour du problème.',
    Icon: ClipboardCheck,
  },
  {
    title: 'Valeurs',
    desc: 'Disponible, réactif, à l’écoute — objectif : répondre au mieux à votre besoin avec un travail propre.',
    Icon: HeartHandshake,
  },
  {
    title: "Zone d’intervention",
    desc: 'déplacement dans un rayon de 100 kms autour de Thouaré sur Loire',
    Icon: MapPin,
  },
];

export default function WhyChooseSection(): React.ReactElement {
  return (
    <section className="py-14 md:py-16">
      <div className="mx-auto max-w-4xl px-4">
        {/* Title */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center"
        >
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-300/90">
            POURQUOI NOUS CHOISIR ?
          </p>
          <h3 className="mt-2 text-2xl md:text-3xl font-semibold text-slate-50">
            Pourquoi choisir ZA Plomberie ?
          </h3>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
        </motion.div>

        {/* Cards (all same design) */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cards.map(({ title, desc, Icon }, idx) => (
            <motion.div
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: idx * 0.06 }}
              className="group rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 text-center shadow-[0_18px_60px_-35px_rgba(15,23,42,1)]"
            >
              {/* Icon bubble */}
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-slate-700/70 bg-slate-950/70 transition group-hover:border-sky-500/60 group-hover:bg-slate-950">
                <Icon className="h-6 w-6 text-sky-300 transition group-hover:text-sky-200" />
              </div>

              <h4 className="text-base font-semibold text-slate-50">{title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {desc}
              </p>

              {/* subtle bottom accent */}
              <div className="mx-auto mt-5 h-1 w-10 rounded-full bg-slate-800 transition group-hover:bg-sky-500/70" />
            </motion.div>
          ))}
        </div>

        {/* Closing text (keep same style you had but cleaner) */}
        <div className="mt-12 flex justify-center">
          <p className="max-w-3xl text-center text-sm text-slate-200 leading-relaxed">
            Nous vous conseillerons toujours des{' '}
            <span className="inline-flex rounded-md bg-slate-900/60 px-1.5 py-0.5 font-medium text-slate-100 ring-1 ring-slate-800/60">
              matériaux de qualité
            </span>{' '}
            à des{' '}
            <span className="inline-flex rounded-md bg-slate-900/60 px-1.5 py-0.5 font-medium text-slate-100 ring-1 ring-slate-800/60">
              prix raisonnables
            </span>{' '}
            en respectant{' '}
            <span className="inline-flex rounded-md bg-slate-900/60 px-1.5 py-0.5 font-medium text-slate-100 ring-1 ring-slate-800/60">
              vos besoins et styles
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
