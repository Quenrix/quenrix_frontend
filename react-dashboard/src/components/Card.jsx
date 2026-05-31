import React from 'react'

export default function Card({title, subtitle, icon}){
  return (
    <div className="glass group relative overflow-hidden rounded-[20px] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(0,0,0,0.34),0_0_32px_rgba(167,139,250,0.24)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.015))] opacity-80"></div>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#A78BFA]">Class Meeting</p>
          <h3 className="mt-2 text-xl font-extrabold text-white">{title}</h3>
          <p className="mt-4 text-sm text-[#B9B9D3]">{subtitle}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#7C5CFF,#A78BFA)] text-lg text-white shadow-[0_0_24px_rgba(124,92,255,0.35)] transition-transform duration-300 group-hover:scale-105">{icon}</div>
      </div>
    </div>
  )
}
