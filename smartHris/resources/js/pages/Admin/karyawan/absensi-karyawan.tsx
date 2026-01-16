import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Calendar as CalendarIcon, MoreHorizontal, Trash2 } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import DynamicTable, { ColumnDef } from '@/components/dynamic-table';
import EmptyState from '@/components/empty-state';
import FilterTanggalModal from '@/components/filter-tanggal-modal';
import ConfirmDeleteModal from '@/components/confirm-delete-modal';
import SuccessModal from '@/components/success-modal';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type Absensi = {
    id: number;
    nama: string;
    jabatan: string;
    departemen: string;
    tanggal: string;
    jam_masuk: string | null;
    jam_pulang: string | null;
    status: string;
    keterangan: string | null;
    terlambat?: number;
    lembur?: number;
    catatan?: string;
};

type PageProps = {
    absensi: Absensi[];
    tanggal?: string;
};

export default function AbsensiKaryawan({ absensi, tanggal }: PageProps) {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [selectedAbsensi, setSelectedAbsensi] = useState<Absensi | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleOpenCalendar = () => {
        setIsCalendarOpen(true);
    };

    const handleDateConfirm = (date: Date) => {
        setIsCalendarOpen(false);
        const formattedDate = format(date, 'yyyy-MM-dd');

        router.get('/app/absensi', {
            tanggal: formattedDate
        }, {
            preserveState: true,
            preserveScroll: true,
            only: ['absensi', 'tanggal'],
        });
    };

    const handleDeleteClick = (item: Absensi) => {
        setSelectedAbsensi(item);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (!selectedAbsensi) return;

        router.delete(`/app/absensi/${selectedAbsensi.id}`, {
            onBefore: () => setIsDeleting(true),
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setSelectedAbsensi(null);
                setSuccessMessage('Data absensi berhasil dihapus.');
                setShowSuccessModal(true);
            },
            onFinish: () => setIsDeleting(false),
            preserveScroll: true,
        });
    };

    const columns: ColumnDef<Absensi>[] = [
        {
            header: 'No',
            className: 'w-20 text-center',
            render: (_, index) => <span className="text-gray-500">{index + 1}</span>,
        },
        {
            header: 'Karyawan',
            accessorKey: 'nama',
            className: 'font-medium text-gray-900',
        },
        {
            header: 'Jabatan',
            accessorKey: 'jabatan',
            className: 'text-gray-700',
        },
        {
            header: 'Departemen',
            accessorKey: 'departemen',
            className: 'text-gray-600',
        },
        {
            header: 'Jam Absen',
            render: (item) => (
                <div className="grid grid-cols-[60px_10px_1fr] gap-x-1 text-sm text-gray-600">
                    <span>Masuk</span><span>:</span><span className="font-medium text-gray-900">{item.jam_masuk ? item.jam_masuk.substring(0, 5) : '-'}</span>
                    <span>Pulang</span><span>:</span><span className="font-medium text-gray-900">{item.jam_pulang ? item.jam_pulang.substring(0, 5) : '-'}</span>
                </div>
            ),
        },
        {
            header: 'Keterangan',
            render: (item) => {
                const keterangan = item.keterangan ?? '-';
                return (
                    <span className="font-medium">
                        {keterangan}
                    </span>
                );
            },
        },
        {
            header: '',
            id: 'actions',
            className: 'w-10 px-0',
            render: (item) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=open]:bg-gray-100">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 rounded-xl border border-gray-100 bg-white p-1 shadow-lg">
                        <DropdownMenuItem onClick={() => handleDeleteClick(item)} className="cursor-pointer gap-3 rounded-lg px-3 py-2.5 text-red-600 focus:bg-red-50 focus:text-red-700">
                            <Trash2 className="h-4 w-4" /> <span className="font-medium">Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    const displayDate = tanggal
        ? format(new Date(tanggal), "d MMMM yyyy", { locale: id })
        : "";

    return (
        <AppLayout>
            <Head title="Absensi Karyawan" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">

                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Absensi Karyawan
                        </h2>

                        {tanggal && (
                            <Button onClick={handleOpenCalendar} variant="outline" className="gap-2 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-500">
                                <CalendarIcon className="h-4 w-4" />
                                {displayDate}
                            </Button>
                        )}
                    </div>

                    {!tanggal ? (
                        <EmptyState
                            title="Belum ada tanggal absensi yang dipilih"
                            description="Silakan pilih tanggal pada kalender untuk menampilkan riwayat absensi seluruh karyawan pada hari tersebut."
                            action={
                                <Button
                                    onClick={handleOpenCalendar}
                                    className="bg-[#114F38] hover:bg-[#0d3f2d] text-white px-6 gap-2 h-11 rounded-lg shadow-sm"
                                >
                                    <CalendarIcon className="h-4 w-4" />
                                    Tampilkan Kalender
                                </Button>
                            }
                        />
                    ) : (
                        <DynamicTable
                            title={`Data Absensi: ${displayDate}`}
                            data={absensi}
                            columns={columns}
                            searchKeys={['nama', 'jabatan', 'departemen']}
                        />
                    )}

                </div>
            </div>

            {isCalendarOpen && (
                <FilterTanggalModal
                    isOpen={isCalendarOpen}
                    onClose={() => setIsCalendarOpen(false)}
                    onConfirm={handleDateConfirm}
                    initialDate={tanggal}
                />
            )}

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                processing={isDeleting}
                inputType="absensi"
            />

            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                title="Berhasil"
                message={successMessage}
            />
        </AppLayout>
    );
}