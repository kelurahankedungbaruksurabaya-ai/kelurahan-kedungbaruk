'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { KATEGORI_UMKM } from '@/lib/constants';

export default function UMKMPage() {
  const [umkmData, setUmkmData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKategori, setSelectedKategori] = useState('');

  useEffect(() => {
    fetchUMKM();
  }, []);

  const fetchUMKM = async () => {
    try {
      const response = await fetch('/api/umkm');
      if (response.ok) {
        const data = await response.json();
        setUmkmData(data.data);
      }
    } catch (error) {
      console.error('Error fetching UMKM:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm && !selectedKategori) {
      fetchUMKM();
      return;
    }

    setLoading(true);
    try {
      let url = '/api/umkm?';
      if (searchTerm) url += `search=${encodeURIComponent(searchTerm)}&`;
      if (selectedKategori) url += `kategori=${encodeURIComponent(selectedKategori)}`;
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setUmkmData(data.data);
      }
    } catch (error) {
      console.error('Error searching UMKM:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (kategori) => {
    const icons = {
      'Makanan': '🍜',
      'Minuman': '🥤',
      'Fashion': '👕',
      'Jasa': '⚙️',
      'Kerajinan': '🎨',
      'Lainnya': '🪑'
    };
    return icons[kategori] || '📦';
  };

  const formatHarga = (min, max) => {
    if (!min && !max) return 'Hubungi penjual';
    if (min && max && min !== max) {
      return `Rp ${min.toLocaleString('id-ID')} - Rp ${max.toLocaleString('id-ID')}`;
    }
    const harga = min || max;
    return `Rp ${harga.toLocaleString('id-ID')}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-green-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
            UMKM Kelurahan Kedung Baruk
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Website ini memuat informasi tentang produk-produk unggulan kelurahan kami.
            <br />
            Silakan telusuri dan dukung produk lokal!
          </p>

          {/* Search & Filter */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cari Nama Produk
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Masukkan nama produk..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  value={selectedKategori}
                  onChange={(e) => setSelectedKategori(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Semua Kategori</option>
                  {KATEGORI_UMKM.map((kat, index) => (
                    <option key={index} value={kat}>
                      {kat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transform hover:scale-105 transition-all w-full md:w-auto"
              >
                🔍 Cari
              </button>
            </div>
          </div>

          {/* UMKM Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : umkmData.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {umkmData.map((umkm) => (
                <div
                  key={umkm.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-1"
                >
                  {/* Header Card dengan Foto */}
                  <div className="relative h-48 bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 overflow-hidden">
                    {umkm.foto_url ? (
                      <img
                        src={umkm.foto_url}
                        alt={umkm.nama_produk}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      // Fallback ke icon kalau ga ada foto
                      <div className="flex items-center justify-center h-full">
                        {/* Dots Pattern di 4 pojok */}
                        <div className="absolute top-4 left-4 grid grid-cols-3 gap-1">
                          {[...Array(9)].map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                          ))}
                        </div>
                        <div className="absolute top-4 right-4 grid grid-cols-3 gap-1">
                          {[...Array(9)].map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                          ))}
                        </div>
                        <div className="absolute bottom-4 left-4 grid grid-cols-3 gap-1">
                          {[...Array(9)].map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                          ))}
                        </div>
                        <div className="absolute bottom-4 right-4 grid grid-cols-3 gap-1">
                          {[...Array(9)].map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                          ))}
                        </div>
                        {/* Icon Besar */}
                        <span className="text-8xl z-10">{getIcon(umkm.kategori)}</span>
                      </div>
                    )}
                  </div>

                  {/* Content Card */}
                  <div className="p-6 bg-gray-50">
                    {/* Nama Produk */}
                    <h3 className="font-bold text-xl text-gray-800 mb-3 min-h-[3rem] line-clamp-2">
                      {umkm.nama_produk || umkm.jenis_usaha}
                    </h3>
                    
                    {/* Harga */}
                    <div className="bg-green-600 text-white text-center py-2 rounded-lg mb-4">
                      <p className="text-2xl font-bold">
                        {formatHarga(umkm.harga_min, umkm.harga_max)}
                      </p>
                    </div>

                    {/* Info Detail */}
                    <div className="space-y-3 text-sm">
                      {/* Kategori */}
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getIcon(umkm.kategori)}</span>
                        <div>
                          <span className="text-gray-500 text-xs">Kategori:</span>
                          <p className="font-semibold text-gray-800">{umkm.kategori || 'Lainnya'}</p>
                        </div>
                      </div>

                      {/* Pemilik */}
                      <div className="flex items-center gap-2">
                        <span className="text-xl">👤</span>
                        <div>
                          <span className="text-gray-500 text-xs">Pemilik:</span>
                          <p className="font-semibold text-gray-800">{umkm.nama_pemilik}</p>
                        </div>
                      </div>

                      {/* Alamat */}
                      <div className="flex items-start gap-2">
                        <span className="text-xl">📍</span>
                        <div className="flex-1">
                          <span className="text-gray-500 text-xs">Alamat:</span>
                          <p className="font-semibold text-gray-800 leading-snug">
                            {umkm.alamat}
                            {umkm.rt && umkm.rw && (
                              <span className="text-gray-600"> (RT {umkm.rt}/RW {umkm.rw})</span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* No. WA */}
                      {umkm.no_wa && (
                        <div className="flex items-center gap-2">
                          <span className="text-xl">📞</span>
                          <div>
                            <span className="text-gray-500 text-xs">No. WA:</span>
                            <p className="font-semibold text-gray-800">{umkm.no_wa}</p>
                          </div>
                        </div>
                      )}

                      {/* Deskripsi */}
                      {umkm.deskripsi && (
                        <div className="pt-3 border-t border-gray-200">
                          <span className="text-gray-500 text-xs">Deskripsi:</span>
                          <p className="text-gray-700 text-sm leading-relaxed mt-1 line-clamp-3">
                            {umkm.deskripsi}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Tidak Ada Produk Ditemukan
              </h3>
              <p className="text-gray-600">
                Coba ubah kata kunci pencarian atau kategori
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}