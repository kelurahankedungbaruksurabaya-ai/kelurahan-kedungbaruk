import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1a2332] text-white mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Logo & Tagline */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 relative flex-shrink-0">
              <Image 
                src="/logo.kbk.png" 
                alt="Logo Kelurahan Kedung Baruk" 
                width={64} 
                height={64}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Kelurahan Kedung Baruk</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Melayani dengan sepenuh hati untuk masyarakat Kedung Baruk
              </p>
            </div>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Kontak</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-lg">📍</span>
                <span>Jl. Raya Kedung Asem No. 59 Surabaya, Surabaya, Jawa Timur, Indonesia</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-lg">📞</span>
                <span>085168605002</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-lg">✉️</span>
                <span>kel_kedungbaruk@surabaya.go.id</span>
              </div>
            </div>
          </div>

          {/* Jam Pelayanan */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Jam Pelayanan</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p><strong className="text-white">Senin - Kamis:</strong> 08.00 - 16.00 WIB</p>
              <p><strong className="text-white">Jumat:</strong> 08.00 - 16.30 WIB</p>
              <p><strong className="text-white">Sabtu:</strong> 09.00 - 12.00 WIB</p>
              <p className="text-red-400 font-semibold mt-3">Minggu: Libur</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© 2025 Kelurahan Kedung Baruk Surabaya. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}