"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, Loader2, CheckCircle, Image as ImageIcon } from "lucide-react";

export default function AdminIkmPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [bulan, setBulan] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi tipe file
    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar!');
      return;
    }

    // Validasi ukuran file (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Ukuran file maksimal 10MB!');
      return;
    }

    setSelectedFile(file);

    // Buat preview lokal
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload ke Cloudinary
    await uploadToCloudinary(file);
  };

  const uploadToCloudinary = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ikm_uploads'); // Ganti dengan upload preset kamu
      
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dgfs2wh8a/image/upload', // Ganti YOUR_CLOUD_NAME
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setImageUrl(data.secure_url);
      } else {
        alert('Gagal upload gambar ke server. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      alert('Gagal upload gambar. Silakan coba lagi.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageUrl) {
      alert('Silakan pilih gambar terlebih dahulu');
      return;
    }

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
        setSelectedFile(null);
        setPreviewUrl("");
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

              {/* File Upload */}
              <div>
                <Label htmlFor="fileUpload">
                  Pilih Gambar <span className="text-red-500">*</span>
                </Label>
                <div className="mt-2">
                  <input
                    id="fileUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={uploading}
                  />
                  <label
                    htmlFor="fileUpload"
                    className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                      uploading
                        ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                        : 'border-gray-300 hover:border-primary hover:bg-primary/5'
                    }`}
                  >
                    {uploading ? (
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin text-primary" />
                        <p className="text-sm text-gray-600">Mengupload gambar...</p>
                        <p className="text-xs text-gray-500 mt-1">Harap tunggu</p>
                      </div>
                    ) : selectedFile ? (
                      <div className="text-center">
                        <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                        <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                        <p className="text-xs text-gray-500 mt-1">Klik untuk ganti gambar</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm font-medium text-gray-900">
                          Klik untuk pilih gambar
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, atau JPEG (Max 10MB)
                        </p>
                      </div>
                    )}
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Gambar akan otomatis diupload ke cloud storage
                </p>
              </div>

              {/* Preview */}
              {previewUrl && (
                <div>
                  <Label>Preview Gambar</Label>
                  <div className="mt-2 border rounded-lg p-4 bg-gray-50">
                    <img
                      src={previewUrl}
                      alt="Preview IKM"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  {imageUrl && (
                    <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Upload berhasil! Gambar siap disimpan
                    </p>
                  )}
                </div>
              )}

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900 font-semibold mb-2">
                  💡 Cara Upload:
                </p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>1. Klik area upload di atas</li>
                  <li>2. Pilih gambar dari perangkat kamu</li>
                  <li>3. Tunggu hingga upload selesai (muncul centang hijau)</li>
                  <li>4. Klik tombol "Upload IKM" untuk menyimpan</li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <Button 
                  type="submit" 
                  className="flex-1" 
                  disabled={loading || uploading || !imageUrl}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload IKM
                    </>
                  )}
                </Button>
                <Link href="/admin">
                  <Button type="button" variant="outline" disabled={loading || uploading}>
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