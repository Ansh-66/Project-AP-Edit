import React from 'react';
import StatCard from './StatCard';

export default function StatsGrid({ items }) {
  return (
    <section
      id="stats"
      className="section-scroll mt-6 mb-8 rounded-xl p-4 glass-card border border-white/6 shadow-lg"
    >
      <h3 className="text-lg font-semibold text-center border-b pb-3 text-slate-100 border-slate-700/40 mb-4">
        📊 Key Statistics
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((it, idx) => (
          <StatCard
            key={idx}
            value={it.value}
            label={it.label}
            icon={it.icon}
          />
        ))}
      </div>
    </section>
  );
}
