"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, ExternalLink, Loader2 } from "lucide-react";

interface IkmData {
  image_url: string;
  bulan: string;
}

export default function SuksesPage() {
  const [settings, setSettings] = useState({
    link_kng: "",
    link_sswalfa: "",
  });
  const [ikmImage, setIkmImage] = useState<IkmData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch settings (link KNG & SSWALFA)
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSettings(data.data);
        }
      })
      .catch((err) => console.error("Error fetching settings:", err));

    // Fetch IKM image
    fetch("/api/ikm")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setIkmImage(data.data);
        }
      })
      .catch((err) => console.error("Error fetching IKM:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Success Message */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Data Berhasil Dikirim!
              </h1>
              <p className="text-gray-600 mb-6">
                Terima kasih telah mengisi data kunjungan. Data Anda telah tersimpan di sistem kelurahan.
              </p>

              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-medium">
                  Silakan datang ke kelurahan sesuai jadwal pelayanan
                </span>
              </div>
            </div>

            {/* Link Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Layanan Lainnya
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Akses layanan tambahan melalui link di bawah ini
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Link KNG */}
                <a
                  href={settings.link_kng || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full h-auto py-6 flex flex-col items-center gap-2 hover:bg-primary hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-6 h-6" />
                    <span className="font-semibold">Web KNG</span>
                    <span className="text-xs opacity-70">
                      Kelurahan Next Generation
                    </span>
                  </Button>
                </a>

                {/* Link SSWALFA */}
                <a
                  href={settings.link_sswalfa || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full h-auto py-6 flex flex-col items-center gap-2 hover:bg-secondary hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-6 h-6" />
                    <span className="font-semibold">SSWALFA</span>
                    <span className="text-xs opacity-70">
                      Sistem Informasi Kelurahan
                    </span>
                  </Button>
                </a>
              </div>
            </div>

            {/* IKM Section */}
            {loading ? (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                <p className="text-gray-600 mt-4">Memuat IKM...</p>
              </div>
            ) : ikmImage ? (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  Indeks Kepuasan Masyarakat (IKM)
                </h2>
                <p className="text-gray-600 text-center mb-6">
                  Hasil survey kepuasan masyarakat bulan ini
                </p>

                <div className="relative w-full max-w-2xl mx-auto">
                  <img
                    src={ikmImage.image_url}
                    alt={`IKM Bulan ${ikmImage.bulan}`}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <p className="text-gray-500">
                  Belum ada data IKM untuk bulan ini
                </p>
              </div>
            )}

            {/* Back Button */}
            <div className="mt-8 text-center">
              <Link href="/">
                <Button variant="outline" size="lg">
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}