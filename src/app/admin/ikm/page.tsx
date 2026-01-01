"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, Loader2, CheckCircle } from "lucide-react";

export default function AdminIkmPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [bulan, setBulan] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    // Set default bulan to current month
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}`;
    setBulan(currentMonth);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch("/api/ikm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: imageUrl,
          bulan: bulan,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setImageUrl("");
        setTimeout(() => {
          router.push("/admin");
        }, 2000);
      } else {
        alert(data.message || "Gagal upload IKM");
      }
    } catch (error) {
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Upload IKM</h1>
              <p className="text-sm text-gray-600">
                Upload gambar Indeks Kepuasan Masyarakat
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-semibold text-green-900">
                  IKM berhasil diupload!
                </p>
                <p className="text-sm text-green-700">
                  Mengalihkan ke dashboard...
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Upload Gambar IKM
              </h2>
              <p className="text-gray-600">
                Upload gambar hasil survey Indeks Kepuasan Masyarakat untuk
                ditampilkan di halaman publik
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Bulan */}
              <div>
                <Label htmlFor="bulan">
                  Bulan <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="bulan"
                  type="month"
                  value={bulan}
                  onChange={(e) => setBulan(e.target.value)}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Pilih bulan untuk IKM ini
                </p>
              </div>

              {/* Image URL */}
              <div>
                <Label htmlFor="imageUrl">
                  URL Gambar <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://example.com/ikm-image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Upload gambar ke hosting (seperti Imgur, ImgBB, atau Google
                  Drive) lalu paste URL-nya di sini
                </p>
              </div>

              {/* Preview */}
              {imageUrl && (
                <div>
                  <Label>Preview Gambar</Label>
                  <div className="mt-2 border rounded-lg p-4">
                    <img
                      src={imageUrl}
                      alt="Preview IKM"
                      className="w-full h-auto rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f3f4f6' width='400' height='300'/%3E%3Ctext fill='%236b7280' font-family='sans-serif' font-size='18' dy='10.5' font-weight='bold' x='50%25' y='50%25' text-anchor='middle'%3EGagal memuat gambar%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900 font-semibold mb-2">
                  💡 Tips Upload Gambar:
                </p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>
                    1. Upload gambar ke{" "}
                    <a
                      href="https://imgur.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Imgur
                    </a>{" "}
                    atau{" "}
                    <a
                      href="https://imgbb.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      ImgBB
                    </a>
                  </li>
                  <li>2. Copy URL gambar (klik kanan → Copy image address)</li>
                  <li>3. Paste URL di form di atas</li>
                  <li>4. Pastikan gambar terlihat di preview</li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mengupload...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload IKM
                    </>
                  )}
                </Button>
                <Link href="/admin">
                  <Button type="button" variant="outline">
                    Batal
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}