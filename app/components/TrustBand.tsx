import React from 'react';

const bandData = [
  { icon: '⭐️', label: '8 ans d’expérience' },
  { icon: '📍', label: '100 kms autour de Thouaré-sur-Loire' },
  { icon: '💶', label: '95 € HT = déplacement + 1h' },
  { icon: '🔧', label: '400+ interventions réalisées' },
];

export default function TrustBand() {
  return (
    <div className="bg-slate-950 border-b border-slate-800/60 py-3 px-2">
      <div className="mx-auto max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-6 items-center">
        {bandData.map((item, i) => (
          <div key={i} className="flex items-center gap-2 rounded-xl bg-slate-900/90 px-3 py-2 shadow shadow-sky-500/10 border border-slate-800">
            <span className="text-lg md:text-xl">{item.icon}</span>
            <span className="text-xs md:text-sm font-medium text-slate-200 ">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
