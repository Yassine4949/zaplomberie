'use client';

import React, { useState } from 'react';

type FormData = {
  name: string;
  phone: string;
  email: string;
  address: string;
  type: string;
  urgency: string;
  description: string;
};

type ApiSuccess<T> = { success?: { data?: T } };
type ApiError = { error?: { message?: string } };
type JsonRecord = Record<string, unknown>;

function getString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

async function postJson<T>(
  url: string,
  body: unknown
): Promise<{ ok: boolean; data?: T; errorMessage?: string }> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    const json = (text ? JSON.parse(text) : {}) as ApiSuccess<T> & ApiError & JsonRecord;

    // supports your jsonOk format: { success: { data: ... } }
    const data = (json?.success?.data ?? json) as T;

    if (!res.ok) {
      const rawError = (json as { error?: unknown }).error;
      const rawMessage = (json as { message?: unknown }).message;
      const msg =
        json?.error?.message ||
        getString(rawError) ||
        getString(rawMessage) ||
        `Erreur serveur (${res.status})`;
      return { ok: false, errorMessage: msg };
    }

    return { ok: true, data };
  } catch {
    return { ok: false, errorMessage: 'Erreur réseau. Veuillez réessayer.' };
  }
}

const BookingSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    type: 'Fuite d’eau',
    urgency: 'Sous 2 à 3 jours',
    description: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle'
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);

  // ✅ extra: show booking reference (premium + pro)
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!accepted) {
      setErrorMessage('Merci de cocher "J’accepte" avant d’envoyer la demande.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMessage(null);
    setWarningMessage(null);
    setBookingId(null);

    // ✅ Map your form fields to /api/bookings schema
    const bookingPayload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      address: formData.address.trim() || undefined,

      // Your API expects serviceType + message
      serviceType: `${formData.type} — ${formData.urgency}`,
      message: formData.description?.trim() || undefined,

      // optional (you don't have it in the UI)
      preferredDate: undefined as string | undefined,
    };

    // basic client-side guard (server still validates)
    if (bookingPayload.name.length < 2) {
      setStatus('error');
      setErrorMessage('Veuillez saisir votre nom (min. 2 caractères).');
      return;
    }
    if (bookingPayload.phone.length < 6) {
      setStatus('error');
      setErrorMessage('Veuillez saisir un numéro de téléphone valide.');
      return;
    }

    try {
      // ✅ 1) Save booking in DB
      const bookingRes = await postJson<{ id: string; status?: string }>(
        '/api/bookings',
        bookingPayload
      );

      if (!bookingRes.ok || !bookingRes.data?.id) {
        setStatus('error');
        setErrorMessage(
          bookingRes.errorMessage || 'Impossible d’enregistrer la demande.'
        );
        return;
      }

      const createdId = bookingRes.data.id;
      setBookingId(createdId);

      // ✅ 2) Send email notification (include bookingId)
      const emailRes = await postJson<{ ok?: boolean }>(
        '/api/email',
        {
          bookingId: createdId,
          formData, // keep your current email route compatibility
          // also send a clean payload (useful if you update the email route later)
          payload: bookingPayload,
        }
      );

      if (!emailRes.ok) {
        // Booking saved ✅ but email failed ⚠️
        setStatus('success');
        setWarningMessage(
          `Votre demande est bien enregistrée (réf. ${createdId}), mais l’envoi email automatique a échoué.`
        );
      } else {
        setStatus('success');
      }

      // reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        type: 'Fuite d’eau',
        urgency: 'Sous 2 à 3 jours',
        description: '',
      });
      setAccepted(false);
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : 'Impossible d’envoyer la demande.';
      setStatus('error');
      setErrorMessage(message);
    }
  };

  return (
    <section
      id="reservation"
      className="mx-auto mb-24 mt-24 max-w-6xl px-4 sm:px-6 lg:px-8"
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
          Demande d&apos;intervention ou de devis
        </h2>
        <p className="mt-2 text-sm text-slate-300 sm:text-base">
          Merci de bien vouloir remplir tous les champs pour permettre une prise
          en charge plus efficace de la demande.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6 shadow-[0_18px_60px_-30px_rgba(15,23,42,1)] sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Nom */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-xs font-medium uppercase tracking-wide text-slate-300"
              >
                Nom complet
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Votre nom complet"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-sky-500/0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
              />
            </div>

            {/* Téléphone */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-xs font-medium uppercase tracking-wide text-slate-300"
              >
                Téléphone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Votre téléphone"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-sky-500/0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs font-medium uppercase tracking-wide text-slate-300"
              >
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Votre e-mail"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-sky-500/0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
              />
            </div>

            {/* Adresse */}
            <div className="space-y-2">
              <label
                htmlFor="address"
                className="text-xs font-medium uppercase tracking-wide text-slate-300"
              >
                Adresse (ville, code postal)
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Adresse complète"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-sky-500/0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
              />
            </div>

            {/* Type d’intervention */}
            <div className="space-y-2">
              <label
                htmlFor="type"
                className="text-xs font-medium uppercase tracking-wide text-slate-300"
              >
                Type d&apos;intervention
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-sky-500/0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
              >
                <option>Fuite d’eau</option>
                <option>Dégat des eaux</option>
                <option>Recherche de fuite</option>
                <option>Débouchage</option>
                <option>Chauffage</option>
                <option>Pompe à chaleur</option>
                <option>Entretien</option>
                <option>Rénovation</option>
                <option>Neuf</option>
                <option>Chauffe-eau (ballon d&apos;eau)</option>
                <option>Autre</option>
              </select>
            </div>

            {/* Urgence */}
            <div className="space-y-2">
              <label
                htmlFor="urgency"
                className="text-xs font-medium uppercase tracking-wide text-slate-300"
              >
                Niveau d&apos;urgence
              </label>
              <select
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-sky-500/0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
              >
                <option>Urgent (dans les 24h)</option>
                <option>Sous 2 à 3 jours</option>
                <option>Demande de devis / Pas d&apos;urgence</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-xs font-medium uppercase tracking-wide text-slate-300"
            >
              Votre demande
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              placeholder="Décrivez le problème ou la demande (localisation, durée, type de matériel, etc.)"
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-sky-500/0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/40"
            />

            <p className="mt-4 text-[11px] font-light leading-relaxed text-slate-400 text-justify">
              En soumettant ce formulaire, j’accepte les conditions
              particulières** : Les données personnelles communiquées sont
              nécessaires aux fins de vous contacter. Elles sont destinées à ZA
              Plomberie. Vous disposez de droits d’accès, de rectification,
              d’effacement, de portabilité, de limitation, d’opposition, de
              retrait de votre consentement à tout moment et du droit
              d’introduire une réclamation auprès d’une autorité de contrôle,
              ainsi que d’organiser le sort de vos données post-mortem. Vous
              pouvez exercer ces droits par voie postale à l&apos;adresse 10 Route de
              la Barre 44470 Thouaré sur Loire, ou par courrier électronique à
              l&apos;adresse zaplomberie.pro@gmail.com. Un justificatif d&apos;identité pourra
              vous être demandé. Nous conservons vos données pendant la période
              de prise de contact puis pendant la durée de prescription légale
              aux fins probatoires et de gestion des contentieux.
            </p>
          </div>

          {/* Messages */}
          {status === 'success' && (
            <div className="space-y-2">
              <p className="text-sm text-emerald-400">
                ✅ Votre demande a bien été envoyée. Je vous recontacte
                rapidement.
              </p>
              {bookingId && (
                <p className="text-xs text-slate-400">
                  Référence :{' '}
                  <span className="font-semibold text-slate-200">
                    {bookingId}
                  </span>
                </p>
              )}
              {warningMessage && (
                <p className="text-xs text-amber-300">{warningMessage}</p>
              )}
            </div>
          )}

          {status === 'error' && (
            <p className="text-sm text-rose-400">
              ❌ Une erreur est survenue. {errorMessage || 'Réessayez plus tard.'}
            </p>
          )}

          <div className="pt-4">
            <label className="flex items-start gap-2 text-xs text-slate-300">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-slate-900 text-sky-500 focus:ring-sky-500"
              />
              <span>J’accepte les conditions ci-dessus.</span>
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={status === 'sending' || !accepted}
              className="w-full rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_45px_-18px_rgba(56,189,248,1)] transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'sending' ? 'Envoi en cours...' : 'Envoyer la demande'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingSection;
