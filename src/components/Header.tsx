'use client';
import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="bg-gradient-to-r from-yellow-100 to-green-100 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-24">
            {/* Logo & Title */}
            <Link href="/" className="flex items-center gap-4">
              <div className="w-20 h-20 relative">
                <Image 
                  src="/logo.kbk.png" 
                  alt="Logo Kelurahan Kedung Baruk" 
                  width={80} 
                  height={80}
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 uppercase tracking-wide">
                  KELURAHAN KEDUNG BARUK
                </h1>
                <p className="text-sm text-gray-700 font-medium">SURABAYA</p>
              </div>
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-gray-800 hover:text-green-600 font-semibold transition-colors text-base"
              >
                home
              </Link>
              <Link
                href="/layanan"
                className="text-gray-800 hover:text-green-600 font-semibold transition-colors text-base"
              >
                layanan kelurahan
              </Link>
              <Link
                href="/umkm"
                className="text-gray-800 hover:text-green-600 font-semibold transition-colors text-base"
              >
                umkm
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-white/50 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                // Icon Close (X)
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Icon Hamburger
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Overlay gelap ketika sidebar terbuka */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Mobile */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-yellow-50 to-green-50 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Close button di dalam sidebar */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 hover:bg-white/50 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Logo di sidebar */}
          <div className="flex flex-col items-center mb-8 mt-8">
            <div className="w-16 h-16 relative mb-3">
              <Image 
                src="/logo.kbk.png" 
                alt="Logo Kelurahan" 
                width={64} 
                height={64}
                className="object-contain"
              />
            </div>
            <h2 className="text-sm font-bold text-gray-900 text-center">
              KELURAHAN<br />KEDUNG BARUK
            </h2>
          </div>

          {/* Menu Links */}
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-gray-800 hover:text-green-600 hover:bg-white/50 font-semibold transition-all text-base py-3 px-4 rounded-lg"
            >
              🏠 Home
            </Link>
            <Link
              href="/layanan"
              onClick={() => setIsOpen(false)}
              className="text-gray-800 hover:text-green-600 hover:bg-white/50 font-semibold transition-all text-base py-3 px-4 rounded-lg"
            >
              📋 Layanan Kelurahan
            </Link>
            <Link
              href="/umkm"
              onClick={() => setIsOpen(false)}
              className="text-gray-800 hover:text-green-600 hover:bg-white/50 font-semibold transition-all text-base py-3 px-4 rounded-lg"
            >
              🏪 UMKM
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}