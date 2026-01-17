import React from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import DynamicTable, { ColumnDef } from '@/components/dynamic-table';
import { Check, X } from 'lucide-react';

// ================= TYPES =================
export type CutiData = {
    id: number;
    karyawan_nama: string;
    karyawan_nip: string;
    karyawan_jabatan: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    karyawan_departemen: string;
    jumlah_hari: number;
    jenis_cuti: string;
    alasan: string;
    status: 'pending' | 'approved' | 'rejected';
};

interface PageProps {
    cutiData: CutiData[];
}

// ================= PAGE =================
export default function CutiKaryawan({ cutiData }: PageProps) {

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });

    const handleAction = (id: number, action: 'approve' | 'reject') => {
        const message = action === 'approve' ? 'setujui' : 'tolak';
        if (confirm(`Apakah Anda yakin ingin ${message} cuti ini?`)) {
            router.post(`/admin/cuti/${id}/${action}`);
        }
    };

    const columns: ColumnDef<CutiData>[] = [
        { header: 'No', render: (_, index) => index + 1, className: 'w-12' },
        {
            header: 'Karyawan',
            render: (item) => (
                <div>
                    <div className="font-semibold text-gray-900">
                        {item.karyawan_nama}
                    </div>
                    <div className="text-xs text-gray-500">
                        {item.karyawan_nip}
                    </div>
                </div>
            ),
        },
        { header: 'Jabatan', accessorKey: 'karyawan_jabatan' },
        {
            header: 'Tanggal Cuti',
            render: (item) => (
                <div className="text-xs">
                    <div>{formatDate(item.tanggal_mulai)} -</div>
                    <div>{formatDate(item.tanggal_selesai)}</div>
                </div>
            ),
        },
         {
            header: 'Departemen',
            accessorKey: 'karyawan_departemen', // 🔥 LANGSUNG DARI BACKEND
        },
        { header: 'Durasi', render: (item) => `${item.jumlah_hari} Hari` },
        {
            header: 'Alasan',
            render: (item) => (
                <span className="text-xs italic">"{item.alasan}"</span>
            ),
        },
        {
            header: 'Status',
            className: 'text-center',
            render: (item) => {
                const colors = {
                    pending: 'bg-yellow-100 text-yellow-700',
                    approved: 'bg-green-100 text-green-700',
                    rejected: 'bg-red-100 text-red-700',
                };
                return (
                    <span
                        className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${colors[item.status]}`}
                    >
                        {item.status}
                    </span>
                );
            },
        },
        {
            header: '',
            className: 'text-center',
            render: (item) =>
                item.status === 'pending' ? (
                    <div className="flex gap-2 justify-center">
                        <button
                            onClick={() => handleAction(item.id, 'approve')}
                            className="p-1.5 bg-emerald-50 text-emerald-600 rounded-md hover:bg-emerald-100"
                        >
                            <Check size={16} />
                        </button>
                        <button
                            onClick={() => handleAction(item.id, 'reject')}
                            className="p-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    '-'
                ),
        },
    ];

    return (
        <AppLayout>
            <Head title="Manajemen Cuti" />
            <div className="p-6">
                <DynamicTable
                    title="Daftar Pengajuan Cuti"
                    data={cutiData}
                    columns={columns}
                    searchKeys={[
                        'karyawan_nama',
                        'karyawan_nip',
                        'jenis_cuti',
                    ]}
                />
            </div>
        </AppLayout>
    );
}
