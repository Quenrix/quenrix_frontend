import React from 'react'

export default function Header(){
  return (
    <header className="glass px-4 py-3 rounded-2xl flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-white/[0.07] border border-white/[0.08] flex items-center justify-center text-[#A78BFA]">🔎</div>
        <input className="w-[540px] bg-transparent text-white outline-none placeholder:text-[#B9B9D3]/70" placeholder="Search Courses, Assignments..." />
      </div>
      <div>
        <button className="rounded-full bg-[linear-gradient(135deg,#7C5CFF,#A78BFA)] px-5 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(124,92,255,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_34px_rgba(167,139,250,0.45)]">Setup Profile</button>
      </div>
    </header>
  )
}
