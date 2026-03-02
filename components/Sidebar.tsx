'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Share2, Phone, Info, X } from 'lucide-react';

const menuItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/my-orders', label: 'My Orders', icon: ShoppingBag },
  { href: '/refer', label: 'Refer', icon: Share2 },
  { href: '/contact', label: 'Contact Us', icon: Phone },
  { href: '/about', label: 'About', icon: Info },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-screen
        w-64 sm:w-72
        bg-gradient-to-b from-slate-900 to-slate-800
        border-l border-slate-700
        flex flex-col shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Close button */}
        <div className="flex justify-end p-4 sm:p-6 border-b border-slate-700">
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3 sm:p-4 space-y-1 sm:space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3
                  px-3 sm:px-4
                  py-2.5 sm:py-3
                  rounded-lg
                  text-sm sm:text-base
                  transition-all
                  ${
                    active
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }
                `}
              >
                <Icon size={18} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}