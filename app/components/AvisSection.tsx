// app/components/AvisSection.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';

type Review = {
  id?: string;
  name: string;
  city?: string;
  rating: number;
  message: string;
  createdAt?: string;
};

const staticReviews: Review[] = [
  
];

export default function AvisSection(): React.ReactElement {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    city: '',
    rating: 5,
    message: '',
  });

  useEffect(() => {
    let isMounted = true;
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((json) => {
        const data = json?.success?.data?.reviews;
        if (isMounted && Array.isArray(data)) {
          setReviews(data);
        }
      })
      .catch(() => null)
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const displayedReviews = useMemo(() => {
    return [...reviews, ...staticReviews];
  }, [reviews]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const submitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      const created = json?.success?.data?.review as Review | undefined;

      if (!res.ok || !created) {
        const message =
          json?.error?.message ||
          'Impossible dâ€™enregistrer votre avis. RÃ©essayez plus tard.';
        setSubmitError(message);
        return;
      }

      setReviews((prev) => [created, ...prev]);
      setForm({ name: '', city: '', rating: 5, message: '' });
      setSubmitSuccess(true);
    } catch {
      setSubmitError('Erreur rÃ©seau. Merci de rÃ©essayer.');
    }
  };

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
          Des interventions réalisées autour de Thouaré-sur-Loire, avec un suivi sérieux et un contact humain.          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {(loading ? staticReviews : displayedReviews).map((review, index) => (
            <figure
              key={`${review.name}-${index}`}
              className="group h-full rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-[0_18px_45px_-32px_rgba(15,23,42,1)] transition hover:border-sky-500/70 hover:shadow-[0_20px_60px_-30px_rgba(56,189,248,0.4)]"
            >
              <blockquote className="text-sm leading-relaxed text-slate-200">
                &ldquo;{review.message}&rdquo;
              </blockquote>

              <figcaption className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <div>
                  <p className="font-medium text-slate-100">{review.name}</p>
                  <p className="text-slate-400">{review.city}</p>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400">
                  <span>{'*'.repeat(review.rating || 5)}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowForm((current) => !current)}
            className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_45px_-18px_rgba(56,189,248,1)] transition hover:bg-sky-400"
          >
            {showForm ? 'Fermer le formulaire' : 'Laisser un avis sur le site'}
          </button>
        </div>

        {showForm && (
          <div className="mt-6 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6">
            <h3 className="text-base font-semibold text-slate-100">
              Laisser un avis sur le site
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Votre avis apparaitra apres validation automatique.
            </p>

            <form className="mt-4 grid gap-4 sm:grid-cols-2" onSubmit={submitReview}>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-300">
                  Nom
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  minLength={2}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
                  placeholder="Votre nom"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-300">
                  Ville (optionnel)
                </label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
                  placeholder="Votre ville"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-300">
                  Note
                </label>
                <select
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
                >
                  {[5, 4, 3, 2, 1].map((value) => (
                    <option key={value} value={value}>
                      {value} / 5
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-300">
                  Votre avis
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  rows={4}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
                  placeholder="Decrivez votre experience..."
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_45px_-18px_rgba(56,189,248,1)] transition hover:bg-sky-400"
                >
                  Envoyer mon avis
                </button>
              </div>

              {submitSuccess && (
                <p className="sm:col-span-2 text-xs text-emerald-400">
                  Merci ! Votre avis a bien ete enregistre.
                </p>
              )}

              {submitError && (
                <p className="sm:col-span-2 text-xs text-rose-400">{submitError}</p>
              )}
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
