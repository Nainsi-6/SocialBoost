'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="h-14 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-950 sticky top-0 z-50">

        {/* Logo */}
        <div className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          ✨ SocialBoost
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">

          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span>ENG</span>
            <div className="w-9 h-4 bg-slate-700 rounded-full relative">
              <div className="absolute left-1 top-0.5 w-3 h-3 bg-white rounded-full" />
            </div>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="p-1.5 hover:bg-slate-800 rounded-md transition"
          >
            <Menu size={20} />
          </button>

        </div>
      </header>

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}