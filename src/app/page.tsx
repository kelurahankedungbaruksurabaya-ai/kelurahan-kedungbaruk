import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Modern Green Gradient */}
        <section className="relative bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 py-20 px-6 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="max-w-3xl">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <p className="text-white text-sm font-medium">🏛️ Pelayanan Publik Terpercaya</p>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Selamat Datang di<br />
                <span className="text-yellow-300">Kelurahan Kedung Baruk</span>
              </h1>
              
              <p className="text-lg md:text-xl text-green-50 mb-8 leading-relaxed">
                Sistem pelayanan administrasi yang cepat, mudah, dan transparan untuk masyarakat Kedung Baruk
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/layanan"
                  className="bg-white text-green-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  Akses Layanan →
                </Link>
                <Link
                  href="/umkm"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all"
                >
                  Lihat UMKM
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* Maklumat Pelayanan */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-block bg-green-100 text-green-700 px-6 py-2 rounded-full font-semibold text-sm mb-4">
                KOMITMEN KAMI
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Maklumat Pelayanan
              </h2>
              <p className="text-xl text-green-600 font-semibold italic">
                "Kami Berjanji Melakukan Pelayanan Terbaik"
              </p>
            </div>

            {/* Maklumat Box - Format Baru */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border-l-8 border-yellow-500 relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 opacity-10 rounded-bl-full"></div>
              
              <ol className="space-y-6 text-gray-800 text-base md:text-lg leading-relaxed relative z-10">
                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                  <span className="pt-1">
                    Kami berjanji dan sanggup untuk melaksanakan pelayanan sesuai dengan standar pelayanan;
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                  <span className="pt-1">
                    Kami berjanji dan sanggup untuk memberikan pelayanan sesuai dengan kewajiban dan akan melakukan perbaikan secara terus menerus;
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                  <span className="pt-1">
                    Kami bersedia untuk menerima sanksi, dan/atau memberikan kompensasi apabila pelayanan yang diberikan tidak sesuai standar.
                  </span>
                </li>
              </ol>
            </div>

            {/* Standar Pelayanan & Hak Masyarakat - 2 Kolom */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Standar Pelayanan */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-green-600 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📋</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Standar Pelayanan
                  </h3>
                </div>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                    <span>Melayani dengan ramah dan profesional</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                    <span>Proses cepat sesuai SOP</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                    <span>Tidak memungut biaya di luar ketentuan</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                    <span>Transparan dan akuntabel</span>
                  </li>
                </ul>
              </div>

              {/* Hak Masyarakat */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-teal-600 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Hak Masyarakat
                  </h3>
                </div>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                    <span>Mendapat pelayanan yang baik</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                    <span>Informasi yang jelas dan akurat</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                    <span>Menyampaikan keluhan dan saran</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                    <span>Mendapat kepastian waktu penyelesaian</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-green-600 to-teal-600">
          <div className="container mx-auto max-w-4xl text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Siap Menggunakan Layanan Kami?
            </h3>
            <p className="text-green-50 text-lg mb-8">
              Akses berbagai layanan administrasi dengan mudah dan cepat
            </p>
            <Link
              href="/layanan"
              className="inline-block bg-white text-green-700 px-10 py-4 rounded-lg font-bold text-lg hover:bg-green-50 hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Lihat Semua Layanan →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}