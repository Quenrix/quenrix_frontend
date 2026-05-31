import React from 'react'

export default function CalendarPanel(){
  const days = new Array(30).fill(0).map((_,i)=>i+1)
  const selected = 28
  return (
    <div className="glass w-full rounded-[20px] p-6">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-[#B9B9D3]">Good Morning ✨</div>
        <div className="text-lg font-bold text-white">06:22 PM</div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button className="h-8 w-8 rounded-full border border-white/[0.08] bg-white/[0.05] text-[#B9B9D3] transition-all duration-300 hover:bg-white/[0.09] hover:text-white">◀</button>
        <div className="text-sm font-bold text-white">April 2026</div>
        <button className="h-8 w-8 rounded-full border border-white/[0.08] bg-white/[0.05] text-[#B9B9D3] transition-all duration-300 hover:bg-white/[0.09] hover:text-white">▶</button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-2 text-sm text-[#B9B9D3]">
        {days.map(d=> (
          <div key={d} className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${d===selected? 'bg-[linear-gradient(135deg,#7C5CFF,#A78BFA)] text-white shadow-[0_0_24px_rgba(124,92,255,0.6)]':'hover:bg-white/[0.08] hover:text-white'}`}>{d}</div>
        ))}
      </div>

      <div className="mt-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#A78BFA]">Today's Schedule</div>
      <div className="mt-3 rounded-2xl border border-white/[0.08] bg-white/[0.05] p-3 text-sm text-[#B9B9D3]">No live sessions for today.</div>
    </div>
  )
}
