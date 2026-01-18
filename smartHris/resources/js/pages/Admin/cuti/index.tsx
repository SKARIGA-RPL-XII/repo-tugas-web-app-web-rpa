import React from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import DynamicTable, { ColumnDef } from '@/components/dynamic-table';
import { Check, X } from 'lucide-react';

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

export default function CutiKaryawan({ cutiData }: PageProps) {

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });

    const handleAction = (id: number, action: 'approve' | 'reject') => {
        const message = action === 'approve' ? 'menyetujui' : 'menolak';
        if (confirm(`Apakah Anda yakin ingin ${message} pengajuan cuti ini?`)) {
            router.post(`/app/cuti/${id}/${action}`);
        }
    };

    const columns: ColumnDef<CutiData>[] = [
        {
            header: 'No',
            accessorKey: 'id',
            sortable: true,
            className: 'w-24 pl-8 text-center',
            render: (_, index) => <span className="text-gray-500">{index + 1}</span>,
        },
        {
            header: 'Karyawan',
            accessorKey: 'karyawan_nama',
            render: (item) => (
                <div className="flex flex-col gap-1">
                    <span className="font-medium text-gray-900">{item.karyawan_nama}</span>
                    <span className="text-xs text-gray-500">NIP: {item.karyawan_nip}</span>
                </div>
            ),
        },
        {
            header: 'Jabatan',
            accessorKey: 'karyawan_jabatan',
            render: (item) => (
                <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-gray-700">{item.karyawan_jabatan}</span>
                </div>
            )
        },
        {
            header: 'Departemen',
            accessorKey: 'karyawan_departemen',
            render: (item) => (
                <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-gray-700">{item.karyawan_departemen}</span>
                </div>
            )
        },
        {
            header: 'Tanggal Cuti',
            accessorKey: 'tanggal_mulai',
            render: (item) => (
                <div className="flex flex-col gap-1">
                    <div className="flex items-center text-sm">
                        {/* w-12 (48px) cukup untuk 'Selesai', jadi 'Mulai' ga kejauhan */}
                        <span className="w-12 text-xs font-medium text-gray-500">Mulai</span>
                        <span className="mr-1 text-gray-400">:</span>
                        <span className="text-gray-700 font-medium">{formatDate(item.tanggal_mulai)}</span>
                    </div>

                    <div className="flex items-center text-sm">
                        <span className="w-12 text-xs font-medium text-gray-500">Selesai</span>
                        <span className="mr-1 text-gray-400">:</span>
                        <span className="text-gray-700 font-medium">{formatDate(item.tanggal_selesai)}</span>
                    </div>
                </div>
            ),
        },
        {
            header: 'Durasi',
            accessorKey: 'jumlah_hari',
            render: (item) => (
                <div className="">
                    <p className="text-sm text-gray-600 font-medium">
                        {item.jumlah_hari} Hari
                    </p>
                </div>
            ),
        },
        {
            header: 'Keterangan',
            accessorKey: 'alasan',
            render: (item) => (
                <div className="max-w-45">
                    <p className="text-sm text-gray-600" title={item.alasan}>
                        {item.alasan}
                    </p>
                </div>
            ),
        },
        {
            header: '',
            className: 'text-center w-28',
            render: (item) =>
                item.status === 'pending' ? (
                    <div className="flex justify-center items-center gap-2">
                        <button
                            onClick={() => handleAction(item.id, 'approve')}
                            className="group flex items-center justify-center w-8 h-8 rounded-full bg-white text-emerald-600 border border-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-200 shadow-sm"
                            title="Setujui Pengajuan"
                        >
                            <Check size={16} strokeWidth={2.5} />
                        </button>
                        <button
                            onClick={() => handleAction(item.id, 'reject')}
                            className="group flex items-center justify-center w-8 h-8 rounded-full bg-white text-red-600 border border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 shadow-sm"
                            title="Tolak Pengajuan"
                        >
                            <X size={16} strokeWidth={2.5} />
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <span className="text-xs text-gray-400 font-medium">- Selesai -</span>
                    </div>
                ),
        },
    ];

    return (
        <AppLayout>
            <Head title="Manajemen Cuti" />

            <div className="p-6 max-w-7xl mx-auto space-y-6">

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Pengajuan Cuti</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Kelola daftar permohonan cuti karyawan yang masuk.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <DynamicTable
                        title="Data Cuti Karyawan"
                        data={cutiData}
                        columns={columns}
                        searchKeys={[
                            'karyawan_nama',
                            'karyawan_nip',
                            'karyawan_departemen',
                            'jenis_cuti'
                        ]}
                    />
                </div>
            </div>
        </AppLayout>
    );
}