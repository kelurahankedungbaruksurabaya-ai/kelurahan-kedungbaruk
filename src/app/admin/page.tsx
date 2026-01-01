"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KEPERLUAN_OPTIONS } from "@/lib/constants";
import { formatDateIndonesia } from "@/lib/utils";
import {
  Download,
  FileText,
  Filter,
  LogOut,
  Search,
  Settings,
  Upload,
  Users,
} from "lucide-react";

interface Kunjungan {
  id: number;
  nik: string;
  nama: string;
  alamat: string;
  rt: string;
  rw: string;
  no_hp: string;
  keperluan: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Kunjungan[]>([]);
  const [filteredData, setFilteredData] = useState<Kunjungan[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisMonth: 0,
  });

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    keperluan: "all",
    startDate: "",
    endDate: "",
  });

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
      const response = await fetch("/api/kunjungan");
      const result = await response.json();

      if (result.success) {
        setData(result.data);
        setFilteredData(result.data);
        calculateStats(result.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: Kunjungan[]) => {
    const today = new Date().toDateString();
    const thisMonth = new Date().getMonth();

    setStats({
      total: data.length,
      today: data.filter(
        (item) => new Date(item.created_at).toDateString() === today
      ).length,
      thisMonth: data.filter(
        (item) => new Date(item.created_at).getMonth() === thisMonth
      ).length,
    });
  };

  const applyFilters = () => {
    let filtered = [...data];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (item) =>
          item.nama.toLowerCase().includes(filters.search.toLowerCase()) ||
          item.nik.includes(filters.search) ||
          item.no_hp.includes(filters.search)
      );
    }

    // Keperluan filter
    if (filters.keperluan !== "all") {
      filtered = filtered.filter((item) => item.keperluan === filters.keperluan);
    }

    // Date range filter
    if (filters.startDate) {
      filtered = filtered.filter(
        (item) => new Date(item.created_at) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(
        (item) => new Date(item.created_at) <= endDate
      );
    }

    setFilteredData(filtered);
  };

  const handleExport = () => {
    const params = new URLSearchParams();
    if (filters.keperluan !== "all") params.set("keperluan", filters.keperluan);
    if (filters.startDate) params.set("startDate", filters.startDate);
    if (filters.endDate) params.set("endDate", filters.endDate);

    window.location.href = `/api/kunjungan/export?${params.toString()}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    router.push("/admin/login");
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
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                KBK
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600">Kelurahan Kedung Baruk</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/admin/ikm">
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload IKM
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Kunjungan</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Hari Ini</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.today}
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-accent" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Bulan Ini</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.thisMonth}
                </p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold">Filter Data</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div>
              <Label>Cari (Nama/NIK/HP)</Label>
              <Input
                placeholder="Ketik untuk mencari..."
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
            </div>

            {/* Keperluan */}
            <div>
              <Label>Keperluan</Label>
              <Select
                value={filters.keperluan}
                onValueChange={(value) =>
                  setFilters({ ...filters, keperluan: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Keperluan</SelectItem>
                  {KEPERLUAN_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Start Date */}
            <div>
              <Label>Dari Tanggal</Label>
              <Input
                type="date"
                value={filters.startDate}
                onChange={(e) =>
                  setFilters({ ...filters, startDate: e.target.value })
                }
              />
            </div>

            {/* End Date */}
            <div>
              <Label>Sampai Tanggal</Label>
              <Input
                type="date"
                value={filters.endDate}
                onChange={(e) =>
                  setFilters({ ...filters, endDate: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={applyFilters}>
              <Search className="w-4 h-4 mr-2" />
              Terapkan Filter
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    NIK
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Alamat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    RT/RW
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    No. HP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Keperluan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tanggal
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      Tidak ada data
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-mono">
                        {item.nik}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.nama}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.alamat}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.rt}/{item.rw}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                        {item.no_hp}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {item.keperluan}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDateIndonesia(new Date(item.created_at))}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}