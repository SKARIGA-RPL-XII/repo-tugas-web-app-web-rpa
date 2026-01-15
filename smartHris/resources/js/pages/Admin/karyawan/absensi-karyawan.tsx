import ConfirmDeleteModal from '@/components/ConfirmDeleteModal';
import DynamicTable, { ColumnDef } from '@/components/DynamicTable';
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
import SuccessModal from '@/components/SuccessModal';

type Absensi = {
    id: number;
    nama: string;
    jabatan: string;
    departemen: string;
    tanggal: string;
    jam_masuk: string | null;
    jam_pulang: string | null;
    status: string;
    keterangan: string;
};

type PageProps = {
    absensi: Absensi[];
};

export default function AbsensiKaryawan({ absensi }: PageProps) {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selected, setSelected] = useState<Absensi | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = (item: Absensi) => {
        setSelected(item);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (!selected) return;

        router.delete(`/admin/absensi/${selected.id}`, {
            onBefore: () => setIsDeleting(true),
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setSelected(null);
                setShowSuccessModal(true);
            },
            onFinish: () => setIsDeleting(false),
            preserveScroll: true,
        });
    };

    const columns: ColumnDef<Absensi>[] = [
        {
            header: 'No',
            render: (_, index) => (
                <span className="text-gray-500">{index + 1}</span>
            ),
            className: 'w-20 text-center',
        },
        {
            header: 'Karyawan',
            render: (item) => (
                <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                        {item.nama}
                    </span>
                    <span className="text-xs text-gray-500">
                        {item.jabatan}
                    </span>
                </div>
            ),
        },
        {
            header: 'Departemen',
            accessorKey: 'departemen',
            className: 'text-gray-600',
        },
        {
            header: 'Jam Absen',
            render: (item) => (
                <div className="text-sm text-gray-600">
                    <div>
                        Masuk :{' '}
                        <span className="font-medium text-gray-900">
                            {item.jam_masuk ?? '-'}
                        </span>
                    </div>
                    <div>
                        Pulang :{' '}
                        <span className="font-medium text-gray-900">
                            {item.jam_pulang ?? '-'}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            header: 'Keterangan',
            render: (item) => {
                const isLate = item.keterangan.includes('Terlambat');

                return (
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium
                            ${
                                isLate
                                    ? 'bg-red-100 text-red-700'
                                    : item.keterangan === 'Tepat waktu'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 text-gray-600'
                            }
                        `}
                    >
                        {item.keterangan}
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
                        <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 text-gray-400 hover:bg-gray-100"
                        >
                            <MoreHorizontal className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        className="w-40 rounded-xl border bg-white p-1 shadow-lg"
                    >
                        <DropdownMenuItem
                            className="gap-3"
                            onClick={() =>
                                router.get(`/admin/absensi/${item.id}/edit`)
                            }
                        >
                            <Pencil className="h-4 w-4" />
                            Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="gap-3 text-red-600"
                            onClick={() => handleDeleteClick(item)}
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete
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
                message="Data absensi berhasil dihapus."
            />
        </AppLayout>
    );
}
