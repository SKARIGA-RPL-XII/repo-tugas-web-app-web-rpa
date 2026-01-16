import ConfirmDeleteModal from '@/components/confirm-delete-modal';
import DynamicTable, { ColumnDef } from '@/components/dynamic-table';
import SuccessModal from '@/components/success-modal';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

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
};

type PageProps = {
    absensi: Absensi[];
};

export default function AbsensiKaryawan({ absensi }: PageProps) {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAbsensi, setSelectedAbsensi] = useState<Absensi | null>(
        null,
    );
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = (item: Absensi) => {
        setSelectedAbsensi(item);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (!selectedAbsensi) return;

        router.delete(`/admin/absensi/${selectedAbsensi.id}`, {
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
            className: 'w-16 text-center',
            render: (_, index) => (
                <span className="text-gray-500">{index + 1}</span>
            ),
        },
        {
            header: 'Karyawan',
            accessorKey: 'nama',
            className: 'font-medium text-gray-900',
        },
        {
            header: 'Jabatan',
            accessorKey: 'jabatan',
            className: 'text-gray-600',
        },
        {
            header: 'Departemen',
            accessorKey: 'departemen',
            className: 'text-gray-600',
        },
        {
            header: 'Jam Absen',
            render: (item) => (
                <div className="grid grid-cols-[60px_10px_auto] gap-x-1 text-sm text-gray-700">
                    <span>Masuk</span>
                    <span>:</span>
                    <span className="font-medium text-gray-900">
                        {item.jam_masuk ?? '-'}
                    </span>

                    <span>Pulang</span>
                    <span>:</span>
                    <span className="font-medium text-gray-900">
                        {item.jam_pulang ?? '-'}
                    </span>
                </div>
            ),
        },
        {
            header: 'Keterangan',
            render: (item) => {
                const keterangan = item.keterangan ?? '-';
                const isLate = keterangan.toLowerCase().includes('terlambat');

                return <span>{keterangan}</span>;
            },
        },
        {
            header: '',
            id: 'actions',
            className: 'w-10 px-0',
            render: (item) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 text-gray-400 hover:bg-gray-100 hover:text-gray-900"
                        >
                            <MoreHorizontal className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        className="w-40 rounded-xl border border-gray-100 bg-white p-1 shadow-lg"
                    >
                        <DropdownMenuItem
                            onClick={() => handleEdit(item)}
                            className="cursor-pointer gap-3 rounded-lg px-3 py-2.5 text-gray-600 focus:bg-gray-50 focus:text-gray-900"
                        >
                            <Pencil className="h-4 w-4" />
                            <span className="font-medium">Edit</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() => handleDeleteClick(item)}
                            className="cursor-pointer gap-3 rounded-lg px-3 py-2.5 text-red-600 focus:bg-red-50 focus:text-red-700"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="font-medium">Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    return (
        <AppLayout>
            <Head title="Absensi Karyawan" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Absensi Karyawan
                    </h2>

                    <DynamicTable
                        title="Data Absensi Karyawan"
                        data={absensi}
                        columns={columns}
                        searchKeys={['nama', 'departemen']}
                    />
                </div>
            </div>

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
function handleEdit(item: Absensi): void {
    throw new Error('Function not implemented.');
}
