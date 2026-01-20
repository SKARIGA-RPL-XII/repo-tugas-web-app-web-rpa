
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { ChevronDown, Search, X } from 'lucide-react';
import { useState } from 'react';

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
    auth: {
        user: AuthUser
    }
    absensi: {
        data: AbsensiData[]
        links: PaginationLink[]
    }
    filters: {
        bulan?: string
        status?: string
        search?: string
    }
}

type AuthUser = {
    id: number
    name: string
    email?: string
    role?: 'admin' | 'user'
}

export default function RiwayatAbsensi({ absensi, filters }: AbsensiProps) {
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

    const removeFilter = (key: keyof typeof params) => {
        const newParams = { ...params, [key]: '' };
        setParams(newParams);
        router.get(baseUrl, newParams);
    };

    const getMonthName = (value: string) => {
        if (value === '2026-12') return 'Desember';
        if (value === '2026-11') return 'November';
        return value;
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Absensi', href: '/absensi' }]}>
            <Head title="Riwayat Absensi" />

            <main className="bg-[#F2F7F5] min-h-screen py-10">
                <div className="mx-auto max-w-6xl px-6 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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
                                    value={params.status}
                                    onChange={(e) =>
                                        setParams({ ...params, status: e.target.value })
                                    }
                                    className="appearance-none bg-white text-gray-600 pl-4 pr-10 py-2 rounded-lg text-sm border border-gray-200"
                                >
                                    <option value="">Status</option>
                                    <option value="hadir">Hadir</option>
                                    <option value="alpha">Alpha</option>
                                    <option value="cuti">Cuti</option>
                                    <option value="izin">Izin</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>

                            <button
                                onClick={handleFilter}
                                className="px-5 py-2 border border-[#0D4838] text-[#0D4838] rounded-lg text-sm font-semibold hover:bg-[#0D4838]/10"
                            >
                                Terapkan
                            </button>

                            <button
                                onClick={handleReset}
                                className="px-5 py-2 border border-gray-300 text-gray-500 rounded-lg text-sm font-semibold hover:bg-gray-100"
                            >
                                Reset
                            </button>
                        </div>

                        <div className="relative w-full md:w-72">
                            <input
                                type="text"
                                placeholder="Cari..."
                                value={params.search}
                                onChange={(e) =>
                                    setParams({ ...params, search: e.target.value })
                                }
                                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm shadow-sm"
                            />
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {params.bulan && (
                            <span className="flex items-center gap-2 px-3 py-1 bg-white border border-[#0D4838]/40 rounded-full text-xs font-medium text-[#0D4838]">
                                {getMonthName(params.bulan)}
                                <X
                                    onClick={() => removeFilter('bulan')}
                                    className="w-3 h-3 cursor-pointer"
                                />
                            </span>
                        )}
                        {params.status && (
                            <span className="flex items-center gap-2 px-3 py-1 bg-white border border-[#0D4838]/40 rounded-full text-xs font-medium text-[#0D4838] uppercase">
                                {params.status}
                                <X
                                    onClick={() => removeFilter('status')}
                                    className="w-3 h-3 cursor-pointer"
                                />
                            </span>
                        )}
                    </div>

                    <div className="bg-white rounded-xl overflow-hidden border border-[#0D4838]/40">
                        <table className="w-full text-sm">
                            <thead className="bg-[#0D4838] text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left">Tanggal</th>
                                    <th className="px-6 py-4 text-left">Jam Datang</th>
                                    <th className="px-6 py-4 text-left">Jam Pulang</th>
                                    <th className="px-6 py-4 text-left">Status</th>
                                    <th className="px-6 py-4 text-left">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {absensi.data.map((item, i) => (
                                    <tr
                                        key={item.id}
                                        className={i % 2 ? 'bg-[#EDF3F1]' : 'bg-white'}
                                    >
                                        <td className="px-6 py-4">{item.tanggal}</td>
                                        <td className="px-6 py-4">{item.jam_masuk || '-'}</td>
                                        <td className="px-6 py-4">{item.jam_pulang || '-'}</td>
                                        <td className="px-6 py-4 font-semibold uppercase text-xs">
                                            {item.status}
                                        </td>
                                        <td className="px-6 py-4">{item.keterangan}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center gap-2 pt-4">
                        {absensi.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url, params)}
                                className={`px-3 py-1 rounded-lg text-xs font-semibold
                                ${link.active
                                        ? 'bg-[#0D4838] text-white'
                                        : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}
                            `}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>

                </div>
            </main>
        </AppLayout>
    );

}