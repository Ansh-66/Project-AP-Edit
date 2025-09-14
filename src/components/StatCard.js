import React from 'react';
import * as Icons from 'lucide-react';

export default function StatCard({ value, label, icon }) {
  const Icon = Icons[icon] || Icons.Activity;

  return (
    <div className="p-4 rounded-xl glass-card flex items-center gap-4 hover:-translate-y-1 transition-transform shadow-lg">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
        <Icon size={20} />
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-sm text-slate-300">{label}</div>
      </div>
    </div>
  );
}
