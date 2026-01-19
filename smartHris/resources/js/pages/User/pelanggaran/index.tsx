import Sidebar from '@/components/sidebar';
import UserHeader from '@/components/user/UserHeader';
import { Head, router } from '@inertiajs/react';
import { ChevronDown, Search, X, AlertCircle, Info } from 'lucide-react';
import { useState } from 'react';

// --- Interface untuk TypeScript ---
interface PelanggaranData {
    id: number;
    tanggal: string;
    status: string; // Jenis Pelanggaran (contoh: Alpha/Terlambat)
    tingkat_pelanggaran: string; // Ringan/Berat
    sanksi: string; // Diambil dari keterangan sanksi
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PelanggaranProps {
    auth: { user: any };
    summary: {
        total: number;
        ringan: number;
        berat: number;
    };
    pelanggaran: {
        data: PelanggaranData[];
        links: PaginationLink[];
    };
    filters: {
        bulan?: string;
        tingkat_pelanggaran?: string;
        search?: string;
    };
}

export default function Pelanggaran({ auth, summary, pelanggaran, filters }: PelanggaranProps) {
    const [params, setParams] = useState({
        bulan: filters.bulan || '',
        tingkat_pelanggaran: filters.tingkat_pelanggaran || '',
        search: filters.search || '',
    });

    const baseUrl = '/pelanggaran';

    const handleFilter = () => {
        router.get(baseUrl, params, { preserveState: true, replace: true });
    };

    const handleReset = () => {
        setParams({ bulan: '', tingkat_pelanggaran: '', search: '' });
        router.get(baseUrl);
    };

    const removeFilter = (key: keyof typeof params) => {
        const newParams = { ...params, [key]: '' };
        setParams(newParams);
        router.get(baseUrl, newParams);
    };

    return (
        <div className="flex min-h-screen bg-gray-50 text-[#111827]">
            <Head title="Pelanggaran Karyawan" />
            <Sidebar />

            <div className="ml-64 flex flex-1 flex-col">
                <UserHeader  />

                <main className="p-8 space-y-6">
                    {/* Summary Cards Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Total Pelanggaran */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between relative overflow-hidden">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-[#0D4838]/10 rounded-lg">
                                        <Info className="w-5 h-5 text-[#0D4838]" />
                                    </div>
                                    <span className="font-semibold text-gray-700">Jumlah Pelanggaran</span>
                                </div>
                                <div className="text-3xl font-bold">{summary.total} Kali</div>
                                <p className="text-xs text-gray-400 mt-1 font-medium italic">Pada Bulan Ini</p>
                            </div>
                            <span className="bg-[#0D4838] text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">Desember</span>
                        </div>

                        {/* Pelanggaran Ringan */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-[#0D4838]/10 rounded-lg">
                                        <AlertCircle className="w-5 h-5 text-[#0D4838]" />
                                    </div>
                                    <span className="font-semibold text-gray-700">Pelanggaran Ringan</span>
                                </div>
                                <div className="text-3xl font-bold">{summary.ringan} Kali</div>
                                <p className="text-xs text-gray-400 mt-1 font-medium italic">Pada Bulan Ini</p>
                            </div>
                            <span className="bg-[#0D4838] text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">Desember</span>
                        </div>

                        {/* Pelanggaran Berat */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-[#0D4838]/10 rounded-lg text-red-600">
                                        <AlertCircle className="w-5 h-5" />
                                    </div>
                                    <span className="font-semibold text-gray-700">Pelanggaran Berat</span>
                                </div>
                                <div className="text-3xl font-bold">{summary.berat} Kali</div>
                                <p className="text-xs text-gray-400 mt-1 font-medium italic">Pada Bulan Ini</p>
                            </div>
                            <span className="bg-[#0D4838] text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">Desember</span>
                        </div>
                    </div>

                    {/* Filter & Search Bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="relative">
                                <select 
                                    value={params.bulan}
                                    onChange={(e) => setParams({...params, bulan: e.target.value})}
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
                                    value={params.tingkat_pelanggaran}
                                    onChange={(e) => setParams({...params, tingkat_pelanggaran: e.target.value})}
                                    className="appearance-none bg-gray-100 text-gray-600 pl-4 pr-10 py-2 rounded-lg text-sm border border-gray-200 focus:ring-0 cursor-pointer"
                                >
                                    <option value="">Tingkat Pelanggaran</option>
                                    <option value="ringan">Ringan</option>
                                    <option value="berat">Berat</option>
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
                                onChange={(e) => setParams({...params, search: e.target.value})}
                                onKeyUp={(e) => e.key === 'Enter' && handleFilter()}
                                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:ring-[#0D4838] focus:border-[#0D4838] shadow-sm shadow-black/5"
                            />
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Filter Tags */}
                    <div className="flex flex-wrap gap-2">
                        {params.bulan && (
                            <div className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-[11px] font-medium text-gray-600 shadow-sm">
                                Desember <X onClick={() => removeFilter('bulan')} className="w-3 h-3 cursor-pointer text-gray-400 hover:text-red-500" />
                            </div>
                        )}
                        {params.tingkat_pelanggaran && (
                            <div className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-[11px] font-medium text-gray-600 shadow-sm uppercase">
                                {params.tingkat_pelanggaran} <X onClick={() => removeFilter('tingkat_pelanggaran')} className="w-3 h-3 cursor-pointer text-gray-400 hover:text-red-500" />
                            </div>
                        )}
                    </div>

                    {/* Table Section */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-[#0D4838] text-white">
                                <tr>
                                    <th className="px-6 py-4 font-bold tracking-wide">Tanggal</th>
                                    <th className="px-6 py-4 font-bold tracking-wide">Jenis Pelanggaran</th>
                                    <th className="px-6 py-4 font-bold tracking-wide">Tingkat Pelanggaran</th>
                                    <th className="px-6 py-4 font-bold tracking-wide">Sanksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pelanggaran.data.length > 0 ? (
                                    pelanggaran.data.map((item, index) => (
                                        <tr 
                                            key={item.id} 
                                            className={`${index % 2 === 1 ? 'bg-[#E8EFED]' : 'bg-white'} border-b border-gray-50 transition-colors hover:bg-gray-100/50`}
                                        >
                                            <td className="px-6 py-5 text-gray-800 font-medium">{item.tanggal}</td>
                                            <td className="px-6 py-5 text-gray-600">{item.status}</td>
                                            <td className="px-6 py-5 text-gray-800 font-semibold uppercase text-xs">{item.tingkat_pelanggaran}</td>
                                            <td className="px-6 py-5 text-gray-600">{item.sanksi}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-20 text-center text-gray-400 italic">
                                            Data pelanggaran tidak ditemukan
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-2 mt-4">
                        {pelanggaran.links.map((link, i) => (
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
                </main>
            </div>
        </div>
    );
}