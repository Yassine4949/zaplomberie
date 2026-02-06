// app/components/AvisSection.tsx
import React from 'react';

const reviews = [
  {
    name: 'Céline D.',
    city: 'Thouaré-sur-Loire',
    text: "Intervention rapide pour une fuite dans la salle de bain. Explications claires, travail propre, et le tarif annoncé a été respecté.",
  },
  {
    name: 'Marc L.',
    city: 'Sainte-Luce-sur-Loire',
    text: "Panne de chaudière en plein week-end, il a pu se déplacer rapidement et remettre le chauffage. Très professionnel et rassurant.",
  },
  {
    name: 'Julie R.',
    city: 'Carquefou',
    text: "Remplacement de WC et robinetterie. De bons conseils, ponctuel, et très soigneux sur la finition. Je recommande sans hésiter.",
  },
  {
    name: 'Nicolas P.',
    city: 'Thouaré-sur-Loire',
    text: "Canalisation bouchée dans la cuisine, problème réglé rapidement. Le chantier a été laissé propre et les explications étaient claires.",
  },
  // Avis Bilik
  {
    name: 'Client Bilik',
    city: 'Thouaré-sur-Loire',
    text: 'Excellent service, intervention rapide et professionnelle. Je recommande vivement ZA Plomberie.',
  },
  {
    name: 'Client Bilik',
    city: 'Nantes',
    text: "Très satisfait de l'intervention. Travail soigné et tarif transparent. Service au top !",
  },
  {
    name: 'Client Bilik',
    city: 'Carquefou',
    text: 'Plombier sérieux et compétent. Intervention dans les délais annoncés. Je recommande.',
  },
  {
    name: 'Client Bilik',
    city: 'Sainte-Luce-sur-Loire',
    text: 'Service de qualité, professionnel et réactif. Très bon rapport qualité-prix.',
  },
];

export default function AvisSection(): React.ReactElement {
  const googleMapsReviewUrl =
    'https://www.google.com/maps/place/za+plomberie/@43.3251777,0.2901846,6z/data=!4m12!1m2!2m1!1sza+plomberie!3m8!1s0x12c9c1cb1f66b18d:0xca8e8f91782c7ad6!8m2!3d43.29885!4d5.3678622!9m1!1b1!15sCgx6YSBwbG9tYmVyaWVaDiIMemEgcGxvbWJlcmllkgEHcGx1bWJlcpoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyMU9TV05zU2xkVmFtaE5UbXRTVGxReVpFdFNWRkpJV2pKV1NXTkhZeEFC4AEA-gEECAAQQg!16s%2Fg%2F11y1vfv65l?entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoASAFQAw%3D%3D';

  return (
    <section id="avis" className="border-t border-slate-800/60 bg-slate-950 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
            Avis clients
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
            Ce que disent les clients
          </h2>

          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            Des interventions réalisées autour de Thouaré-sur-Loire, avec un suivi sérieux et un contact humain.
          </p>

          
          

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review, index) => (
            <figure
              key={`${review.name}-${index}`}
              className="group h-full rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-[0_18px_45px_-32px_rgba(15,23,42,1)] transition hover:border-sky-500/70 hover:shadow-[0_20px_60px_-30px_rgba(56,189,248,0.4)]"
            >
              <blockquote className="text-sm leading-relaxed text-slate-200">
                &ldquo;{review.text}&rdquo;
              </blockquote>

              <figcaption className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <div>
                  <p className="font-medium text-slate-100">{review.name}</p>
                  <p className="text-slate-400">{review.city}</p>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400">
                  <span>★★★★★</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>  
        {/* ✅ Google Maps review button */}
        <div className="mt-6 flex justify-center">
            <a
              href={googleMapsReviewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_-18px_rgba(56,189,248,1)] transition hover:bg-sky-400"
            >
              Laisser un avis sur Google
            </a>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            Vous serez redirigé vers Google Maps pour publier votre avis.
          </p>
        </div>
      </div>
    </section>
  );
}
