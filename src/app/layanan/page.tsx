"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchableSelect } from "@/components/SearchableSelect";
import { KEPERLUAN_OPTIONS } from "@/lib/constants";
import { Loader2 } from "lucide-react";

export default function LayananPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nik: "",
    nama: "",
    alamat: "",
    rt: "",
    rw: "",
    no_hp: "",
    keperluan: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nik) newErrors.nik = "NIK wajib diisi";
    else if (!/^\d{16}$/.test(formData.nik))
      newErrors.nik = "NIK harus 16 digit angka";

    if (!formData.nama) newErrors.nama = "Nama wajib diisi";
    if (!formData.alamat) newErrors.alamat = "Alamat wajib diisi";
    if (!formData.rt) newErrors.rt = "RT wajib diisi";
    if (!formData.rw) newErrors.rw = "RW wajib diisi";

    if (!formData.no_hp) newErrors.no_hp = "No. HP wajib diisi";
    else if (!/^(08|62)\d{8,12}$/.test(formData.no_hp.replace(/[\s-]/g, "")))
      newErrors.no_hp = "Format No. HP tidak valid (08xxx atau 62xxx)";

    if (!formData.keperluan) newErrors.keperluan = "Keperluan wajib dipilih";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/kunjungan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/layanan/sukses");
      } else {
        alert(data.message || "Gagal menyimpan data");
      }
    } catch (error) {
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-6">
        <div className="container mx-auto max-w-2xl">
          {/* Form Box */}
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Form Layanan Kelurahana
              </h2>
              <p className="text-gray-700">
                Isi data diri anda untuk mendapatkan pelayanan
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NIK */}
              <div>
                <Label htmlFor="nik" className="text-gray-900 font-semibold">
                  NIK <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nik"
                  type="text"
                  maxLength={16}
                  placeholder="Masukkan 18 digit NIK"
                  value={formData.nik}
                  onChange={(e) =>
                    setFormData({ ...formData, nik: e.target.value })
                  }
                  className={`bg-white border-2 ${
                    errors.nik ? "border-red-500" : "border-gray-300"
                  } focus:border-green-500 rounded-lg`}
                />
                {errors.nik && (
                  <p className="text-red-500 text-sm mt-1">{errors.nik}</p>
                )}
              </div>

              {/* Nama */}
              <div>
                <Label htmlFor="nama" className="text-gray-900 font-semibold">
                  Nama Lengkap <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nama"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={formData.nama}
                  onChange={(e) =>
                    setFormData({ ...formData, nama: e.target.value })
                  }
                  className={`bg-white border-2 ${
                    errors.nama ? "border-red-500" : "border-gray-300"
                  } focus:border-green-500 rounded-lg`}
                />
                {errors.nama && (
                  <p className="text-red-500 text-sm mt-1">{errors.nama}</p>
                )}
              </div>

              {/* Alamat */}
              <div>
                <Label htmlFor="alamat" className="text-gray-900 font-semibold">
                  Alamat <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="alamat"
                  type="text"
                  placeholder="Masukkan alamat lengkap"
                  value={formData.alamat}
                  onChange={(e) =>
                    setFormData({ ...formData, alamat: e.target.value })
                  }
                  className={`bg-white border-2 ${
                    errors.alamat ? "border-red-500" : "border-gray-300"
                  } focus:border-green-500 rounded-lg`}
                />
                {errors.alamat && (
                  <p className="text-red-500 text-sm mt-1">{errors.alamat}</p>
                )}
              </div>

              {/* RT & RW */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rt" className="text-gray-900 font-semibold">
                    RT <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="rt"
                    type="text"
                    placeholder="001"
                    maxLength={3}
                    value={formData.rt}
                    onChange={(e) =>
                      setFormData({ ...formData, rt: e.target.value })
                    }
                    className={`bg-white border-2 ${
                      errors.rt ? "border-red-500" : "border-gray-300"
                    } focus:border-green-500 rounded-lg`}
                  />
                  {errors.rt && (
                    <p className="text-red-500 text-sm mt-1">{errors.rt}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="rw" className="text-gray-900 font-semibold">
                    RW <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="rw"
                    type="text"
                    placeholder="001"
                    maxLength={3}
                    value={formData.rw}
                    onChange={(e) =>
                      setFormData({ ...formData, rw: e.target.value })
                    }
                    className={`bg-white border-2 ${
                      errors.rw ? "border-red-500" : "border-gray-300"
                    } focus:border-green-500 rounded-lg`}
                  />
                  {errors.rw && (
                    <p className="text-red-500 text-sm mt-1">{errors.rw}</p>
                  )}
                </div>
              </div>

              {/* No HP */}
              <div>
                <Label htmlFor="no_hp" className="text-gray-900 font-semibold">
                  No. HP / WhatsApp <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="no_hp"
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  value={formData.no_hp}
                  onChange={(e) =>
                    setFormData({ ...formData, no_hp: e.target.value })
                  }
                  className={`bg-white border-2 ${
                    errors.no_hp ? "border-red-500" : "border-gray-300"
                  } focus:border-green-500 rounded-lg`}
                />
                {errors.no_hp && (
                  <p className="text-red-500 text-sm mt-1">{errors.no_hp}</p>
                )}
              </div>

              {/* Keperluan */}
              <div>
                <Label htmlFor="keperluan" className="text-gray-900 font-semibold">
                  Keperluan <span className="text-red-500">*</span>
                </Label>
                <SearchableSelect
                  options={KEPERLUAN_OPTIONS}
                  value={formData.keperluan}
                  onChange={(value) =>
                    setFormData({ ...formData, keperluan: value })
                  }
                  placeholder="Cari dan pilih keperluan..."
                />
                {errors.keperluan && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.keperluan}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold text-lg py-6 rounded-lg shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "KIRIM DATA"
                )}
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}