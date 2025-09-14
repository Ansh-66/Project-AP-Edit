import React from 'react';
export default function Hero(){
  return (
    <header className="mt-6 mb-8 p-6 rounded-2xl glass-card">
      <div className="flex items-center justify-between flex-col md:flex-row gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">FIR Analytics</h1>
          <p className="mt-2 text-slate-200">CCTNS Database - Crime and Criminal Tracking Network & Systems</p>
        </div>
      </div>
    </header>
  )
}