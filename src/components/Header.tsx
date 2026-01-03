import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-yellow-100 to-green-100 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo & Title */}
          <Link href="/" className="flex items-center gap-4">
            <div className="w-20 h-20 relative">
              {/* Placeholder for logo - user will replace with actual logo */}
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md">
                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-green-500 bg-clip-text text-transparent">
                  KBK
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 uppercase tracking-wide">
                KELURAHAN KEDUNG BARUK
              </h1>
              <p className="text-sm text-gray-700 font-medium">SURABAYA</p>
            </div>
          </Link>

          {/* Navigation */}
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
          <button className="md:hidden p-2">
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
          </button>
        </div>
      </div>
    </header>
  );
}