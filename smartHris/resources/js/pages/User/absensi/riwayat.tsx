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
        user: {
            id: number;
            name: string;
            role?: 'admin' | 'user';
        };
    };
    absensi: {
        data: AbsensiData[];
        links: PaginationLink[];
    };
    filters: {
        bulan?: string;
        status?: string;
        search?: string;
        keterangan?: string;
    };
}

export default function RiwayatAbsensi({ absensi, filters }: AbsensiProps) {
    // Inisialisasi state dengan data dari props filters (agar filter tetap terpilih setelah reload)
    const [params, setParams] = useState({
        bulan: filters.bulan || '',
        status: filters.status || '',
        search: filters.search || '',
        keterangan: filters.keterangan || '',
    });

    const baseUrl = '/absensi/riwayat';

    const daftarBulan = [
        { val: '01', label: 'Januari' },
        { val: '02', label: 'Februari' },
        { val: '03', label: 'Maret' },
        { val: '04', label: 'April' },
        { val: '05', label: 'Mei' },
        { val: '06', label: 'Juni' },
        { val: '07', label: 'Juli' },
        { val: '08', label: 'Agustus' },
        { val: '09', label: 'September' },
        { val: '10', label: 'Oktober' },
        { val: '11', label: 'November' },
        { val: '12', label: 'Desember' },
    ];
    const currentYear = new Date().getFullYear();
    const handleFilter = () => {
        // Membersihkan parameter kosong sebelum dikirim
        const filteredParams = Object.fromEntries(
            Object.entries(params).filter(([_, value]) => value !== ''),
        );

        router.get(baseUrl, filteredParams, {
            preserveState: true,
            replace: true,
        });
    };

    const handleReset = () => {
        setParams({ bulan: '', status: '', search: '', keterangan: '' });
        router.get(baseUrl);
    };

    const removeFilter = (key: keyof typeof params) => {
        const newParams = { ...params, [key]: '' };
        setParams(newParams);

        const filteredParams = Object.fromEntries(
            Object.entries(newParams).filter(([_, value]) => value !== ''),
        );
        router.get(baseUrl, filteredParams);
    };

    const getMonthLabel = (value: string) => {
        if (!value) return '';
        const [year, month] = value.split('-');
        const bulanObj = daftarBulan.find((b) => b.val === month);
        return bulanObj ? `${bulanObj.label} ${year}` : value;
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Absensi', href: '/absensi' }]}>
            <Head title="Riwayat Absensi" />

            <main className="min-h-screen bg-[#F2F7F5] py-10">
                <div className="mx-auto max-w-6xl space-y-6 px-6">
                    {/* Filter Section */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-wrap items-center gap-2">
                            {/* Dropdown Bulan Lengkap */}
                            <div className="relative">
                                <select
                                    value={params.bulan}
                                    onChange={(e) =>
                                        setParams({
                                            ...params,
                                            bulan: e.target.value,
                                        })
                                    }
                                    className="appearance-none rounded-lg border-none bg-[#0D4838] py-2 pr-10 pl-4 text-sm font-medium text-white focus:ring-2 focus:ring-[#0D4838]/50"
                                >
                                    <option value="">Bulan</option>
                                    {daftarBulan.map((b) => (
                                        <option value={`${currentYear}-${b.val}`}>
                                            {b.label}
                                        </option>

                                    ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute top-2.5 right-3 h-4 w-4 text-white" />
                            </div>

                            {/* Dropdown Status */}
                            <div className="relative">
                                <select
                                    value={params.status}
                                    onChange={(e) =>
                                        setParams({
                                            ...params, status: e.target.value,
                                        })
                                    }
                                    className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pr-10 pl-4 text-sm text-gray-600 focus:ring-2 focus:ring-[#0D4838]/20"
                                >
                                    <option value="">Semua Status</option>
                                    <option value="hadir">Hadir</option>
                                    <option value="alpha">Alpha</option>
                                    <option value="cuti">Cuti</option>
                                    <option value="sakit">Sakit</option>
                                </select>
                                <ChevronDown className="pointer-events-none absolute top-2.5 right-3 h-4 w-4 text-gray-400" />
                            </div>

                            {/* Dropdown Keterangan */}
                           

                            <button
                                onClick={handleFilter}
                                className="rounded-lg bg-[#0D4838] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0a3a2d]"
                            >
                                Terapkan
                            </button>

                            <button
                                onClick={handleReset}
                                className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-100"
                            >
                                Reset
                            </button>
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder="Cari..."
                                value={params.search}
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        search: e.target.value,
                                    })
                                }
                                onKeyPress={(e) =>
                                    e.key === 'Enter' && handleFilter()
                                }
                                className="w-full rounded-full border border-gray-200 bg-white py-2 pr-4 pl-10 text-sm shadow-sm focus:border-[#0D4838] focus:ring-2 focus:ring-[#0D4838]/20"
                            />
                            <Search className="absolute top-2.5 left-3 h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Active Filter Badges */}
                    <div className="flex flex-wrap gap-2">
                        {params.bulan && (
                            <span className="flex items-center gap-2 rounded-full border border-[#0D4838]/40 bg-white px-3 py-1 text-xs font-medium text-[#0D4838]">
                                {getMonthLabel(params.bulan)}
                                <X
                                    onClick={() => removeFilter('bulan')}
                                    className="h-3 w-3 cursor-pointer hover:text-red-500"
                                />
                            </span>
                        )}
                        {params.status && (
                            <span className="flex items-center gap-2 rounded-full border border-[#0D4838]/40 bg-white px-3 py-1 text-xs font-medium text-[#0D4838] uppercase">
                                {params.status}
                                <X
                                    onClick={() => removeFilter('status')}
                                    className="h-3 w-3 cursor-pointer hover:text-red-500"
                                />
                            </span>
                        )}
                        {params.keterangan && (
                            <span className="flex items-center gap-2 rounded-full border border-[#0D4838]/40 bg-white px-3 py-1 text-xs font-medium text-[#0D4838]">
                                {params.keterangan}
                                <X
                                    onClick={() => removeFilter('keterangan')}
                                    className="h-3 w-3 cursor-pointer hover:text-red-500"
                                />
                            </span>
                        )}
                    </div>

                    {/* Table Section */}
                    <div className="overflow-hidden rounded-xl border border-[#0D4838]/40 bg-white shadow-sm">
                        <table className="w-full text-sm">
                            <thead className="bg-[#0D4838] text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left font-semibold">
                                        Tanggal
                                    </th>
                                    <th className="px-6 py-4 text-left font-semibold">
                                        Jam Datang
                                    </th>
                                    <th className="px-6 py-4 text-left font-semibold">
                                        Jam Pulang
                                    </th>
                                    <th className="px-6 py-4 text-left font-semibold">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left font-semibold">
                                        Keterangan
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {absensi.data.length > 0 ? (
                                    absensi.data.map((item, i) => (
                                        <tr
                                            key={item.id}
                                            className={
                                                i % 2
                                                    ? 'bg-[#EDF3F1]/50'
                                                    : 'bg-white transition-colors hover:bg-gray-50'
                                            }
                                        >
                                            <td className="px-6 py-4 font-medium">
                                                {item.tanggal}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {item.jam_masuk || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {item.jam_pulang || '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase ${item.status === 'HADIR'
                                                        ? 'bg-green-100 text-green-700'
                                                        : item.status ===
                                                            'ALPHA'
                                                            ? 'bg-red-100 text-red-700'
                                                            : 'bg-orange-100 text-orange-700'
                                                        }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {item.keterangan}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-12 text-center text-gray-400"
                                        >
                                            Tidak ada data absensi yang
                                            ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center gap-2 pt-4">
                        {absensi.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url || link.active}
                                onClick={() =>
                                    link.url && router.get(link.url, params, { preserveState: true })

                                }
                                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${link.active
                                    ? 'bg-[#0D4838] text-white shadow-md'
                                    : 'border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50'
                                    } `}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
