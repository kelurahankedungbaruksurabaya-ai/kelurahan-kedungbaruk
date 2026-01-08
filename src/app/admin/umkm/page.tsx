"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KATEGORI_UMKM } from "@/lib/constants";
import {
  ArrowLeft,
  Edit,
  Plus,
  Trash2,
  X,
} from "lucide-react";

interface UmkmData {
  id: number;
  nama_produk: string;
  jenis_usaha: string;
  nama_pemilik: string;
  kategori: string;
  harga_min?: number | null;
  harga_max?: number | null;
  no_wa?: string | null;
  deskripsi?: string | null;
  alamat?: string | null;
  foto_url?: string | null;
  created_at: string;
}

export default function AdminUMKMPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<UmkmData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    nama_produk: "",
    jenis_usaha: "",
    nama_pemilik: "",
    kategori: "",
    harga_min: "",
    harga_max: "",
    no_wa: "",
    deskripsi: "",
    alamat: "",
    foto_url: "",
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Check auth
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/umkm");
      const result = await response.json();

      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item?: UmkmData) => {
    if (item) {
      setEditMode(true);
      setCurrentId(item.id);
      setFormData({
        nama_produk: item.nama_produk,
        jenis_usaha: item.jenis_usaha,
        nama_pemilik: item.nama_pemilik,
        kategori: item.kategori,
        harga_min: item.harga_min?.toString() || "",
        harga_max: item.harga_max?.toString() || "",
        no_wa: item.no_wa || "",
        deskripsi: item.deskripsi || "",
        alamat: item.alamat || "",
        foto_url: item.foto_url || "",
      });
      setPreviewUrl(item.foto_url || null);
    } else {
      setEditMode(false);
      setCurrentId(null);
      setFormData({
        nama_produk: "",
        jenis_usaha: "",
        nama_pemilik: "",
        kategori: "",
        harga_min: "",
        harga_max: "",
        no_wa: "",
        deskripsi: "",
        alamat: "",
        foto_url: "",
      });
      setPreviewUrl(null);
    }
    setSelectedFile(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setCurrentId(null);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Buat preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
  if (!selectedFile) return formData.foto_url || null;

  setUploadingImage(true);
  try {
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', selectedFile);
    cloudinaryFormData.append('upload_preset', 'ikm_uploads'); // Pakai preset yang sama dengan IKM
    cloudinaryFormData.append('folder', 'umkm'); // Folder terpisah untuk UMKM
    
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dgfs2wh8a/image/upload', // Cloud name yang sama
      {
        method: 'POST',
        body: cloudinaryFormData,
      }
    );

    const data = await response.json();

    if (data.secure_url) {
      return data.secure_url;
    } else {
      alert('Gagal upload gambar ke server. Silakan coba lagi.');
      return null;
    }
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    alert('Gagal upload gambar. Silakan coba lagi.');
    return null;
  } finally {
    setUploadingImage(false);
  }
};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Upload image dulu kalau ada file baru
    const uploadedUrl = await uploadImage();
    if (selectedFile && !uploadedUrl) {
      return; // Kalau upload gagal, jangan lanjut
    }

    try {
      const url = editMode ? `/api/umkm/${currentId}` : "/api/umkm";
      const method = editMode ? "PUT" : "POST";

      const submitData = {
        ...formData,
        foto_url: uploadedUrl || formData.foto_url,
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (result.success) {
        alert(editMode ? "Data berhasil diupdate!" : "Data berhasil ditambahkan!");
        handleCloseModal();
        fetchData();
      } else {
        alert(result.error || "Terjadi kesalahan");
      }
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;

    try {
      const response = await fetch(`/api/umkm/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        alert("Data berhasil dihapus!");
        fetchData();
      } else {
        alert(result.error || "Gagal menghapus data");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Terjadi kesalahan saat menghapus data");
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Kelola UMKM
                </h1>
                <p className="text-sm text-gray-600">Manajemen Produk UMKM</p>
              </div>
            </div>

            <Button onClick={() => handleOpenModal()}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Produk
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">Total Produk UMKM</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{data.length}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Foto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Nama Produk
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Pemilik
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Alamat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      Belum ada data produk UMKM
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        {item.foto_url ? (
                          <img
                            src={item.foto_url}
                            alt={item.nama_produk}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                            Foto
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.nama_produk}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.kategori}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.nama_pemilik}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.alamat}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenModal(item)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editMode ? "Edit Produk" : "Tambah Produk"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <Label>Nama Produk *</Label>
                <Input
                  value={formData.nama_produk}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_produk: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label>Jenis Usaha *</Label>
                <Input
                  value={formData.jenis_usaha}
                  onChange={(e) =>
                    setFormData({ ...formData, jenis_usaha: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label>Nama Pemilik *</Label>
                <Input
                  value={formData.nama_pemilik}
                  onChange={(e) =>
                    setFormData({ ...formData, nama_pemilik: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label>Kategori *</Label>
                <Select
                  value={formData.kategori}
                  onValueChange={(value) =>
                    setFormData({ ...formData, kategori: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {KATEGORI_UMKM.map((kat) => (
                      <SelectItem key={kat} value={kat}>
                        {kat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Harga Min (Rp)</Label>
                  <Input
                    type="number"
                    value={formData.harga_min}
                    onChange={(e) =>
                      setFormData({ ...formData, harga_min: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Harga Max (Rp)</Label>
                  <Input
                    type="number"
                    value={formData.harga_max}
                    onChange={(e) =>
                      setFormData({ ...formData, harga_max: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label>No. WhatsApp</Label>
                <Input
                  value={formData.no_wa}
                  onChange={(e) =>
                    setFormData({ ...formData, no_wa: e.target.value })
                  }
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              <div>
                <Label>Alamat</Label>
                <Input
                  value={formData.alamat}
                  onChange={(e) =>
                    setFormData({ ...formData, alamat: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Foto Produk</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload gambar (JPG, PNG, WEBP - Max 5MB)
                </p>
                
                {/* Preview gambar */}
                {previewUrl && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded border"
                    />
                  </div>
                )}
              </div>

              <div>
                <Label>Deskripsi</Label>
                <Textarea
                  value={formData.deskripsi}
                  onChange={(e) =>
                    setFormData({ ...formData, deskripsi: e.target.value })
                  }
                  rows={4}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1" disabled={uploadingImage}>
                  {uploadingImage ? "Uploading..." : editMode ? "Update" : "Simpan"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                  className="flex-1"
                  disabled={uploadingImage}
                >
                  Batal
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}