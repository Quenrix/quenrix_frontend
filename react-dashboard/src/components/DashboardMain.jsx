import React from 'react'
import Card from './Card'
import CalendarPanel from './CalendarPanel'

const quick = [
  {title:'Start Session', subtitle:'Host live lecture', icon:'🎥'},
  {title:'Open Lab', subtitle:'Review student work', icon:'🤖'},
  {title:'Resolve Doubts', subtitle:'Help your students', icon:'💬'},
]

export default function DashboardMain(){
  return (
    <>
      <main className="space-y-6">
        <div className="glass flex items-center gap-6 rounded-[20px] p-6 transition-all duration-300 hover:shadow-[0_14px_34px_rgba(0,0,0,0.34),0_0_30px_rgba(124,92,255,0.18)]">
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.07] text-3xl font-bold text-[#A78BFA] shadow-[inset_0_0_30px_rgba(167,139,250,0.08),0_0_30px_rgba(124,92,255,0.22)]">NF</div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Not Found</h2>
            <p className="mt-1 text-[#B9B9D3]">Good Evening, Trainer!</p>
            <div className="mt-3 inline-block rounded-full border border-white/[0.08] bg-white/[0.06] px-3 py-1 text-sm text-[#B9B9D3]">📅 Tuesday, 28 April</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {quick.map((q,i)=>(<Card key={i} title={q.title} subtitle={q.subtitle} icon={q.icon}/>))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="glass rounded-[20px] p-6 text-[#B9B9D3] transition-all duration-300 hover:shadow-[0_14px_34px_rgba(0,0,0,0.34),0_0_28px_rgba(167,139,250,0.18)]">Additional Content Placeholder</div>
          <div className="glass rounded-[20px] p-6 text-[#B9B9D3] transition-all duration-300 hover:shadow-[0_14px_34px_rgba(0,0,0,0.34),0_0_28px_rgba(167,139,250,0.18)]">More Widgets</div>
        </div>
      </main>
      <aside className="">
        <CalendarPanel />
      </aside>
    </>
  )
}
