import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-yellow-200 via-green-200 to-green-300 py-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Selamat Datang di Kelurahan Kedung Baruk
            </h2>
            <p className="text-lg text-gray-800 mb-6 leading-relaxed">
              Sistem pelayanan administrasi kelurahan yang cepat, mudah, dan transparan untuk masyarakat Kedung Baruk
            </p>
            <Link
              href="/layanan"
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-bold text-lg hover:shadow-lg transition-shadow"
            >
              Akses Layanan &gt;
            </Link>
          </div>
        </section>

        {/* Layanan Kami Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Layanan Kami
            </h3>
            <p className="text-center text-gray-700 mb-8">
              Berbagai layanan administrasi kependudukan dan pelayanan umum untuk memudahkan masyarakat
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-t-4 border-green-500">
                <div className="text-4xl mb-4">📄</div>
                <h4 className="text-xl font-bold mb-4 text-gray-900">
                  Administrasi Kependudukan
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Pembuatan KTP & KK</li>
                  <li>• Akta Kelahiran & Kematian</li>
                  <li>• Surat Keterangan</li>
                  <li>• Legalisir Dokumen</li>
                </ul>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-t-4 border-orange-500">
                <div className="text-4xl mb-4">👥</div>
                <h4 className="text-xl font-bold mb-4 text-gray-900">
                  Pelayanan Umum
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Surat Pengantar Nikah</li>
                  <li>• Surat Domisili</li>
                  <li>• SKTM</li>
                  <li>• Surat Keterangan Usaha</li>
                </ul>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-t-4 border-blue-500">
                <div className="text-4xl mb-4">🏢</div>
                <h4 className="text-xl font-bold mb-4 text-gray-900">
                  UMKM & Ekonomi
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Pendaftaran UMKM</li>
                  <li>• Promosi Produk Lokal</li>
                  <li>• Informasi Bantuan Usaha</li>
                  <li>• Pelatihan Wirausaha</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Maklumat Pelayanan */}
        <section className="py-16 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Maklumat Pelayanan
            </h3>
            <p className="text-center text-xl text-green-700 font-semibold mb-12">
              "Kami Berjanji Melakukan Pelayanan Terbaik"
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Standar Pelayanan */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-md">
                <h4 className="text-xl font-bold mb-4 text-gray-900">
                  Standar Pelayanan
                </h4>
                <ul className="space-y-3 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Melayani dengan ramah dan profesional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Proses cepat sesuai SOP</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Tidak memungut biaya di luar ketentuan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Transparan dan akuntabel</span>
                  </li>
                </ul>
              </div>

              {/* Hak Masyarakat */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-md">
                <h4 className="text-xl font-bold mb-4 text-gray-900">
                  Hak Masyarakat
                </h4>
                <ul className="space-y-3 text-gray-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Mendapat pelayanan yang baik</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Informasi yang jelas dan akurat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Menyampaikan keluhan dan saran</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Mendapat kepastian waktu penyelesaian</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}