import React from 'react'
import { HomeIcon, UsersIcon, PlayIcon, DocumentIcon, ChatAltIcon, LogoutIcon } from './icons'

const items = [
  { key: 'home', label: 'Home', icon: <HomeIcon/> },
  { key: 'batches', label: 'Batches', icon: <UsersIcon/> },
  { key: 'shorts', label: 'Shorts', icon: <PlayIcon/> },
  { key: 'resume', label: 'Resume', icon: <DocumentIcon/> },
  { key: 'doubt', label: 'Doubt Hub', icon: <ChatAltIcon/> },
]

export default function Sidebar(){
  const [active, setActive] = React.useState('home')
  return (
    <aside className="flex min-h-[calc(100vh-132px)] flex-col gap-4 rounded-[20px] border border-white/[0.08] bg-[#110D2B]/95 p-4 shadow-[0_8px_25px_rgba(0,0,0,0.3)]">
      <div className="flex w-full items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7C5CFF,#A78BFA)] font-bold text-white shadow-[0_0_28px_rgba(124,92,255,0.45)]">QN</div>
      </div>

      <nav className="flex flex-col gap-3">
        {items.map(it => (
          <button key={it.key} onClick={()=>setActive(it.key)} className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-300 ${active===it.key? 'bg-[linear-gradient(135deg,rgba(124,92,255,0.38),rgba(167,139,250,0.18))] text-white shadow-[0_0_26px_rgba(124,92,255,0.28)] ring-1 ring-white/[0.1]':'text-[#B9B9D3] hover:bg-white/[0.06] hover:text-white'}`}>
            <span className={`flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] ${active===it.key ? 'bg-white/[0.13] text-white' : 'bg-white/[0.05] text-[#A78BFA]'}`}>{it.icon}</span>
            <span className="font-semibold">{it.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <button className="flex w-full items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[#B9B9D3] transition-all duration-300 hover:bg-white/[0.07] hover:text-white">{<LogoutIcon/>} <span>Logout</span></button>
      </div>
    </aside>
  )
}
