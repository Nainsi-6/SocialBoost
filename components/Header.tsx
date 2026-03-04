'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="h-14 border-b border-amber-200/60 flex items-center justify-between px-6 bg-white sticky top-0 z-50 shadow-sm">

        {/* Logo */}
        <div className="text-lg font-bold text-amber-600">
          ⚡ SocialBoost
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="p-1.5 hover:bg-amber-50 rounded-md transition text-gray-700"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}