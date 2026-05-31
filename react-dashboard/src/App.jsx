import React from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import DashboardMain from './components/DashboardMain'

export default function App(){
  return (
    <div className="min-h-screen w-full overflow-hidden font-sans bg-[linear-gradient(135deg,#0F0C29_0%,#1B1333_52%,#2A1E5C_100%)] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(124,92,255,0.24),transparent_32%),radial-gradient(circle_at_82%_16%,rgba(167,139,250,0.16),transparent_28%),radial-gradient(circle_at_72%_92%,rgba(124,92,255,0.13),transparent_34%)]" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-6">
        <Header />
        <div className="mt-6 grid grid-cols-[220px_minmax(0,1fr)_360px] gap-6">
          <Sidebar />
          <DashboardMain />
        </div>
      </div>
    </div>
  )
}
