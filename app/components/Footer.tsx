export default function Footer(): React.ReactElement {
  const phones = [
    { raw: '0675612080', display: '06 75 61 20 80' },
    { raw: '0963561574', display: '09 63 56 15 74' },
  ];
  const email = 'zaplomberie.pro@gmail.com';

  return (
    <footer className="border-t border-slate-800/60 bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} ZA Plomberie — Tous droits réservés.</p>

        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <span>Thouaré-sur-Loire et environs</span>

          {/* Click-to-call (both numbers) */}
          {phones.map((p) => (
            <a
              key={p.raw}
              href={`tel:${p.raw}`}
              className="text-slate-300 hover:text-sky-300 transition"
              aria-label={`Appeler ${p.display}`}
            >
              Tel : {p.display}
            </a>
          ))}

          {/* Click-to-email */}
          <a
            href={`mailto:${email}`}
            className="text-slate-300 hover:text-sky-300 transition"
            aria-label={`Envoyer un email à ${email}`}
          >
            Email : {email}
          </a>
        </div>
      </div>
    </footer>
  );
}
