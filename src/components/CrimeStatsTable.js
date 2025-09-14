import React, { useEffect, useState } from 'react';
import { crimeData } from '../data';

export default function CrimeStatsTable() {
  const [widths, setWidths] = useState(crimeData.map(() => 0));

  useEffect(() => {
    const t = [];
    crimeData.forEach((c, i) => {
      t.push(
        setTimeout(() => {
          setWidths((prev) => {
            const cp = [...prev];
            cp[i] = c.percentage;
            return cp;
          });
        }, 200 + i * 100)
      );
    });
    return () => t.forEach((x) => clearTimeout(x));
  }, []);

  return (
    <section
      id="crime-data"
      className="section-scroll mt-6 mb-8 rounded-xl p-4 glass-card border border-white/6 shadow-lg"
    >
      {/* Title back to previous style */}
      <h3 className="text-lg font-semibold text-center border-b pb-3 text-slate-100 border-slate-700/40 mb-4">
        📝 Detailed Crime Statistics
      </h3>

      {/* Desktop / Tablet Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-primary to-accent text-white">
              <th className="p-3 text-left rounded-tl-lg">Category</th>
              <th className="p-3">Code</th>
              <th className="p-3">Cases</th>
              <th className="p-3">%</th>
              <th className="p-3 rounded-tr-lg">Visual</th>
            </tr>
          </thead>
          <tbody>
            {crimeData.map((c, i) => (
              <tr key={i} className="hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-100">{c.class}</td>
                <td className="p-3 text-slate-200">Class {c.code}</td>
                <td className="p-3 text-slate-200">{c.cases.toLocaleString()}</td>
                <td className="p-3 text-slate-200">{c.percentage}%</td>
                <td className="p-3">
                  <div className="w-full bg-slate-600/30 rounded-full h-3 overflow-hidden">
                    <div
                      style={{
                        width: `${widths[i]}%`,
                        transition: 'width 900ms ease',
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards (no bars) */}
      <div className="space-y-4 md:hidden">
        {crimeData.map((c, i) => (
          <div
            key={i}
            className="p-4 rounded-lg glass-card border border-white/10 shadow-sm"
          >
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-slate-100">{c.class}</span>
              <span className="text-slate-400 text-sm">Class {c.code}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-300">
              <span>Cases: {c.cases.toLocaleString()}</span>
              <span>{c.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
