import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Building2 } from "lucide-react";

export default function UmkmPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-12 h-12 text-primary" />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              UMKM Kedung Baruk
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Halaman ini sedang dalam pengembangan
            </p>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-gray-700">
                Kami sedang menyiapkan informasi lengkap tentang UMKM di wilayah Kelurahan Kedung Baruk.
              </p>
              <p className="text-gray-700 mt-4">
                Mohon tunggu update selanjutnya. 🚀
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}