import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { ChevronDown, Search, X, AlertCircle, Info } from 'lucide-react';
import { useState } from 'react';

interface PelanggaranData {
    id: number;
    tanggal: string;
    status: string;
    tingkat_pelanggaran: string;
    sanksi: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

type AuthUser = {
    id: number
    name: string
    email?: string
    role?: 'admin' | 'user'
}

interface PelanggaranProps {
    auth: {
        user: AuthUser
    }
    summary: {
        total: number
        ringan: number
        berat: number
    }
    pelanggaran: {
        data: PelanggaranData[]
        links: PaginationLink[]
    }
    filters: {
        bulan?: string
        tingkat_pelanggaran?: string
        search?: string
    }
}

export default function Pelanggaran({ summary, pelanggaran, filters }: PelanggaranProps) {
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
        <AppLayout breadcrumbs={[{ title: 'Pelanggaran', href: '/pelanggaran' }]}>
            <Head title="Pelanggaran Karyawan" />

            <main className="p-8 space-y-6 bg-gray-50 min-h-screen text-[#111827]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-2 bg-[#0D4838]/10 rounded-lg">
                                    <Info className="w-5 h-5 text-[#0D4838]" />
                                </div>
                                <span className="font-semibold text-gray-700">
                                    Jumlah Pelanggaran
                                </span>
                            </div>
                            <div className="text-3xl font-bold">
                                {summary.total} Kali
                            </div>
                            <p className="text-xs text-gray-400 mt-1 italic">
                                Pada Bulan Ini
                            </p>
                        </div>
                        <span className="bg-[#0D4838] text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase">
                            Desember
                        </span>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-2 bg-[#0D4838]/10 rounded-lg">
                                    <AlertCircle className="w-5 h-5 text-[#0D4838]" />
                                </div>
                                <span className="font-semibold text-gray-700">
                                    Pelanggaran Ringan
                                </span>
                            </div>
                            <div className="text-3xl font-bold">
                                {summary.ringan} Kali
                            </div>
                            <p className="text-xs text-gray-400 mt-1 italic">
                                Pada Bulan Ini
                            </p>
                        </div>
                        <span className="bg-[#0D4838] text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase">
                            Desember
                        </span>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-2 bg-red-100 rounded-lg text-red-600">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                                <span className="font-semibold text-gray-700">
                                    Pelanggaran Berat
                                </span>
                            </div>
                            <div className="text-3xl font-bold">
                                {summary.berat} Kali
                            </div>
                            <p className="text-xs text-gray-400 mt-1 italic">
                                Pada Bulan Ini
                            </p>
                        </div>
                        <span className="bg-[#0D4838] text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase">
                            Desember
                        </span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="relative">
                            <select
                                value={params.bulan}
                                onChange={(e) =>
                                    setParams({ ...params, bulan: e.target.value })
                                }
                                className="appearance-none bg-[#0D4838] text-white pl-4 pr-10 py-2 rounded-lg text-sm font-medium"
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
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        tingkat_pelanggaran: e.target.value,
                                    })
                                }
                                className="appearance-none bg-gray-100 text-gray-600 pl-4 pr-10 py-2 rounded-lg text-sm border border-gray-200"
                            >
                                <option value="">Tingkat Pelanggaran</option>
                                <option value="ringan">Ringan</option>
                                <option value="berat">Berat</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>

                        <button
                            onClick={handleFilter}
                            className="px-5 py-2 border border-[#0D4838] text-[#0D4838] rounded-lg text-sm font-semibold hover:bg-green-50"
                        >
                            Terapkan
                        </button>
                        <button
                            onClick={handleReset}
                            className="px-5 py-2 border border-gray-300 text-gray-500 rounded-lg text-sm font-semibold hover:bg-gray-50"
                        >
                            Reset
                        </button>
                    </div>

                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari..."
                            value={params.search}
                            onChange={(e) =>
                                setParams({ ...params, search: e.target.value })
                            }
                            onKeyUp={(e) => e.key === 'Enter' && handleFilter()}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {params.bulan && (
                        <div className="flex items-center gap-2 px-3 py-1 bg-white border rounded-full text-[11px]">
                            Desember
                            <X
                                onClick={() => removeFilter('bulan')}
                                className="w-3 h-3 cursor-pointer hover:text-red-500"
                            />
                        </div>
                    )}
                    {params.tingkat_pelanggaran && (
                        <div className="flex items-center gap-2 px-3 py-1 bg-white border rounded-full text-[11px] uppercase">
                            {params.tingkat_pelanggaran}
                            <X
                                onClick={() =>
                                    removeFilter('tingkat_pelanggaran')
                                }
                                className="w-3 h-3 cursor-pointer hover:text-red-500"
                            />
                        </div>
                    )}
                </div>
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[#0D4838] text-white">
                            <tr>
                                <th className="px-6 py-4">Tanggal</th>
                                <th className="px-6 py-4">Jenis Pelanggaran</th>
                                <th className="px-6 py-4">Tingkat</th>
                                <th className="px-6 py-4">Sanksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pelanggaran.data.length > 0 ? (
                                pelanggaran.data.map((item, i) => (
                                    <tr
                                        key={item.id}
                                        className={`${i % 2
                                                ? 'bg-[#E8EFED]'
                                                : 'bg-white'
                                            } border-b`}
                                    >
                                        <td className="px-6 py-5 font-medium">
                                            {item.tanggal}
                                        </td>
                                        <td className="px-6 py-5">
                                            {item.status}
                                        </td>
                                        <td className="px-6 py-5 uppercase text-xs font-semibold">
                                            {item.tingkat_pelanggaran}
                                        </td>
                                        <td className="px-6 py-5">
                                            {item.sanksi}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-6 py-20 text-center text-gray-400 italic"
                                    >
                                        Data pelanggaran tidak ditemukan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-center gap-2 mt-4">
                    {pelanggaran.links.map((link, i) => (
                        <button
                            key={i}
                            disabled={!link.url || link.active}
                            onClick={() =>
                                link.url && router.get(link.url, params)
                            }
                            className={`px-4 py-2 rounded-lg text-xs font-bold
                            ${link.active
                                    ? 'bg-[#0D4838] text-white'
                                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                }
                            ${!link.url
                                    ? 'opacity-30 cursor-not-allowed'
                                    : ''
                                }
                        `}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </main>
        </AppLayout>
    );
}