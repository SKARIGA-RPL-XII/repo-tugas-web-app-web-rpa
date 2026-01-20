import Sidebar from '@/components/sidebar';
import UserHeader from '@/components/user/UserHeader';
import { Head, router } from '@inertiajs/react';
import { ChevronDown, Search, Inbox, X } from 'lucide-react'; 
import { useState } from 'react';

// --- Interface ---
interface AbsensiData {
    id: number;
    tanggal: string;
    jam_masuk: string;
    jam_pulang: string;
    status: string;
    keterangan: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface AbsensiProps {
    auth: { user: any };
    absensi: {
        data: AbsensiData[];
        links: PaginationLink[];
    };
    filters: {
        bulan?: string;
        status?: string;
        search?: string;
    };
}

export default function RiwayatAbsensi({ auth, absensi, filters }: AbsensiProps) {
    const [params, setParams] = useState({
        bulan: filters.bulan || '',
        status: filters.status || '',
        search: filters.search || '',
    });

    const baseUrl = '/riwayat-absensi';

    const handleFilter = () => {
        router.get(baseUrl, params, {
            preserveState: true,
            replace: true,
        });
    };

    const handleReset = () => {
        setParams({ bulan: '', status: '', search: '' });
        router.get(baseUrl);
    };

    // Fungsi untuk menghapus salah satu filter (Tag)
    const removeFilter = (key: keyof typeof params) => {
        const newParams = { ...params, [key]: '' };
        setParams(newParams);
        router.get(baseUrl, newParams);
    };

    // Helper untuk menampilkan nama bulan yang lebih cantik di Tag
    const getMonthName = (value: string) => {
        if (value === '2026-12') return 'Desember';
        if (value === '2026-11') return 'November';
        return value;
    };

    return (
        <div className="flex min-h-screen bg-gray-50 text-[#111827]">
            <Head title="Riwayat Absensi" />
            <Sidebar />

            <div className="ml-64 flex flex-1 flex-col">
                <UserHeader  />

                <main className="p-8 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="relative">
                                <select
                                    value={params.bulan}
                                    onChange={(e) => setParams({ ...params, bulan: e.target.value })}
                                    className="appearance-none bg-[#0D4838] text-white pl-4 pr-10 py-2 rounded-lg text-sm border-none focus:ring-0 cursor-pointer font-medium"
                                >
                                    <option value="">Bulan</option>
                                    <option value="2026-12">Desember</option>
                                    <option value="2026-11">November</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-white pointer-events-none" />
                            </div>

                            <div className="relative">
                                <select
                                    value={params.status}
                                    onChange={(e) => setParams({ ...params, status: e.target.value })}
                                    className="appearance-none bg-gray-100 text-gray-600 pl-4 pr-10 py-2 rounded-lg text-sm border border-gray-200 focus:ring-0 cursor-pointer"
                                >
                                    <option value="">Status</option>
                                    <option value="hadir">Hadir</option>
                                    <option value="alpha">Alpha</option>
                                    <option value="cuti">Cuti</option>
                                    <option value="izin">Izin</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>

                            <button onClick={handleFilter} className="px-5 py-2 border border-[#0D4838] text-[#0D4838] rounded-lg text-sm font-semibold hover:bg-green-50 transition-colors">
                                Terapkan
                            </button>
                            <button onClick={handleReset} className="px-5 py-2 border border-gray-300 text-gray-500 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                                Reset
                            </button>
                        </div>

                        <div className="relative w-full md:w-72">
                            <input
                                type="text"
                                placeholder="Cari..."
                                value={params.search}
                                onChange={(e) => setParams({ ...params, search: e.target.value })}
                                onKeyUp={(e) => e.key === 'Enter' && handleFilter()}
                                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:ring-[#0D4838] focus:border-[#0D4838] shadow-sm shadow-black/5"
                            />
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Filter Tags (Muncul di bawah dropdown) */}
                    <div className="flex flex-wrap gap-2">
                        {params.bulan && (
                            <div className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-[11px] font-medium text-gray-600 shadow-sm">
                                {getMonthName(params.bulan)} <X onClick={() => removeFilter('bulan')} className="w-3 h-3 cursor-pointer text-gray-400 hover:text-red-500" />
                            </div>
                        )}
                        {params.status && (
                            <div className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-[11px] font-medium text-gray-600 shadow-sm uppercase">
                                {params.status} <X onClick={() => removeFilter('status')} className="w-3 h-3 cursor-pointer text-gray-400 hover:text-red-500" />
                            </div>
                        )}
                    </div>

                    {/* Table Section */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-[#0D4838] text-white">
                                <tr>
                                    <th className="px-6 py-4 font-bold tracking-wide">Tanggal</th>
                                    <th className="px-6 py-4 font-bold tracking-wide">Jam Datang</th>
                                    <th className="px-6 py-4 font-bold tracking-wide">Jam Pulang</th>
                                    <th className="px-6 py-4 font-bold tracking-wide">Status</th>
                                    <th className="px-6 py-4 font-bold tracking-wide">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {absensi.data.length > 0 ? (
                                    absensi.data.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className={`${index % 2 === 1 ? 'bg-[#E8EFED]' : 'bg-white'} border-b border-gray-50 transition-colors hover:bg-gray-100/50`}
                                        >
                                            <td className="px-6 py-5 text-gray-800 font-medium">{item.tanggal}</td>
                                            <td className="px-6 py-5 text-gray-600">{item.jam_masuk || '-'}</td>
                                            <td className="px-6 py-5 text-gray-600">{item.jam_pulang || '-'}</td>
                                            <td className="px-6 py-5 text-gray-800 font-semibold uppercase text-xs">{item.status}</td>
                                            <td className="px-6 py-5 text-gray-600">{item.keterangan || 'Tanpa Keterangan'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-400">
                                                <Inbox className="mb-4 h-12 w-12 opacity-20" />
                                                <p className="text-lg font-medium">Data tidak ditemukan</p>
                                                <p className="text-sm">Coba ubah filter atau kata kunci pencarian Anda.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {absensi.data.length > 0 && (
                        <div className="flex items-center justify-center gap-2 mt-4">
                            {absensi.links.map((link, i) => (
                                <button
                                    key={i}
                                    disabled={!link.url || link.active}
                                    onClick={() => link.url && router.get(link.url, params)}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm
                                        ${link.active ? 'bg-[#0D4838] text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}
                                        ${!link.url ? 'opacity-30 cursor-not-allowed' : ''}
                                    `}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}