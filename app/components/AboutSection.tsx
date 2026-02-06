'use client';

import React from 'react';
import { motion } from 'framer-motion';
import WhyChooseSection from './WhyChooseSection';


const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutSection() {
  return (
    <section id="apropos" className="py-20 bg-slate-950 border-b border-slate-800/60">
      <div className="mx-auto max-w-4xl px-4 space-y-10">
        {/* Accroche */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 text-center"
        >
          <p className="text-xl md:text-2xl font-semibold text-slate-50 leading-relaxed">
            Vous avez besoin d’un plombier professionnel pour
            l’installation complète de votre plomberie ou pour
            une rénovation ?
          </p>
        </motion.div>

        {/* Texte principal */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.05 }}
          className="space-y-6 text-slate-300 text-base leading-relaxed text-justify"
        >
          <p>
            Je suis Anes ZAIBI, plombier-chauffagiste diplômé
            depuis 8 ans. J’ai créé ma société ZA Plomberie
            pour répondre à toutes vos demandes :
            dépannages d’urgence, fuites, débouchage de
            canalisations, installation et dépannage de votre
            installation de chauffage, installation et rénovation
            de tous vos appareils sanitaires (lavabo,
            robinetterie, baignoire, douche, WC…) dans un
            rayon de 100 kms autour de Thouaré sur Loire.
          </p>

          <p>
            En faisant appel à une entreprise expérimentée,
            professionnelle et qualifiée vous vous assurez un
            travail de qualité. Je m’adapte à vos demandes et à
            vos besoins. N’hésitez pas à prendre contact 
            pour toutes demandes et recevez votre devis
            gratuit et des conseils personnalisés.
          </p>
        </motion.div>

        {/* Message fort / expertise */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-6"
        >
          <p className="text-slate-100 text-base leading-relaxed text-justify">
            Parce que la réalisation de travaux de plomberie ne
            s’improvise pas, il est important pour un cadre de
            vie optimal, un confort et un bien-être intérieur de
            réaliser au mieux ces prestations.
          </p>
        </motion.div>
        <WhyChooseSection />
      </div>
    </section>
  );
}
