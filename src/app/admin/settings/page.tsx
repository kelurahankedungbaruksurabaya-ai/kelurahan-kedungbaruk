"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Loader2, CheckCircle } from "lucide-react";

export default function AdminSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [settings, setSettings] = useState({
    link_kng: "",
    link_sswalfa: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings");
      const data = await response.json();

      if (data.success) {
        setSettings(data.data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      // Update link_kng
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "link_kng",
          value: settings.link_kng,
        }),
      });

      // Update link_sswalfa
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "link_sswalfa",
          value: settings.link_sswalfa,
        }),
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
              <h1 className="text-xl font-bold text-gray-900">Settings</h1>
              <p className="text-sm text-gray-600">
                Pengaturan link dan konfigurasi sistem
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
              <p className="font-semibold text-green-900">
                Settings berhasil disimpan!
              </p>
            </div>
          )}

          {/* Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Link External
              </h2>
              <p className="text-gray-600">
                Atur link untuk Web KNG dan SSWALFA yang ditampilkan di halaman
                sukses
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Link KNG */}
              <div>
                <Label htmlFor="link_kng">
                  Link Web KNG <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="link_kng"
                  type="url"
                  placeholder="https://example.com/kng"
                  value={settings.link_kng}
                  onChange={(e) =>
                    setSettings({ ...settings, link_kng: e.target.value })
                  }
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  URL lengkap untuk Web KNG (Kelurahan Next Generation)
                </p>
              </div>

              {/* Link SSWALFA */}
              <div>
                <Label htmlFor="link_sswalfa">
                  Link SSWALFA <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="link_sswalfa"
                  type="url"
                  placeholder="https://example.com/sswalfa"
                  value={settings.link_sswalfa}
                  onChange={(e) =>
                    setSettings({ ...settings, link_sswalfa: e.target.value })
                  }
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  URL lengkap untuk SSWALFA (Sistem Informasi Kelurahan)
                </p>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900 font-semibold mb-2">
                  ℹ️ Informasi:
                </p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>
                    • Link ini akan ditampilkan di halaman sukses setelah warga
                    submit form
                  </li>
                  <li>• Pastikan URL lengkap dengan https://</li>
                  <li>
                    • Link akan terbuka di tab baru ketika warga mengkliknya
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <Button type="submit" className="flex-1" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Simpan Settings
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

          {/* Additional Settings Section (Future) */}
          <div className="bg-white rounded-lg shadow-md p-8 mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Settings Lainnya
            </h2>
            <p className="text-gray-600 mb-4">Coming soon...</p>
            <div className="space-y-3 text-sm text-gray-500">
              <p>• Ganti password admin</p>
              <p>• Konfigurasi email notifikasi</p>
              <p>• Backup & restore data</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}