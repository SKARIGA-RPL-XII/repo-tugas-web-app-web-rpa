import ConfirmDeleteModal from '@/components/confirm-delete-modal';
import DynamicTable, { ColumnDef } from '@/components/dynamic-table';
import KaryawanFormModal from '@/components/karyawan-form-modal';
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

export type Karyawan = {
    id: number;
    nama: string;
    nip: string;
    email: string;
    jabatan: string;
    departemen: string;
    alamat: string;
    tanggal_lahir: string;
    tanggal_masuk: string;
    jenis_kelamin: string;
};

type PageProps = {
    karyawan: Karyawan[];
};

export default function DataKaryawan({ karyawan }: PageProps) {

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [karyawanToDelete, setKaryawanToDelete] = useState<Karyawan | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
    const [selectedKaryawan, setSelectedKaryawan] = useState<Karyawan | null>(null);


    const handleAddClick = () => {
        setFormMode('create');
        setSelectedKaryawan(null);
        setIsFormOpen(true);
    };

    const handleEdit = (item: Karyawan) => {
        setFormMode('edit');
        setSelectedKaryawan(item);
        setIsFormOpen(true);
    };

    const handleFormSuccess = (msg: string) => {
        setSuccessMessage(msg);
        setShowSuccessModal(true);
    };

    const handleDeleteClick = (item: Karyawan) => {
        setKaryawanToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (karyawanToDelete && karyawanToDelete.id) {
            router.visit(`/app/karyawan/${karyawanToDelete.id}`, {
                method: 'delete',
                onBefore: () => setIsDeleting(true),
                onSuccess: () => {
                    setIsDeleteModalOpen(false);
                    setKaryawanToDelete(null);
                },
                onFinish: () => setIsDeleting(false),
                preserveScroll: true,
            });
        }
    };
    const columns: ColumnDef<Karyawan>[] = [
        {
            header: 'No',
            accessorKey: 'id',
            sortable: true,
            className: 'w-24 pl-8 text-center',
            render: (_, index) => <span className="text-gray-500">{index + 1}</span>,
        },
        {
            header: 'Karyawan',
            accessorKey: 'nama',
            render: (item) => (
                <div className="flex flex-col gap-1">
                    <span className="font-medium text-gray-900">{item.nama}</span>
                    <span className="text-xs text-gray-500">NIP: {item.nip}</span>
                </div>
            ),
        },
        {
            header: 'Data Pribadi',
            render: (item) => (
                <div className="flex flex-col gap-1 text-sm text-gray-600">
                    <span>
                        {new Date(item.tanggal_lahir).toLocaleDateString('id-ID', {
                            day: 'numeric', month: 'long', year: 'numeric',
                        })}
                    </span>
                    <span className="text-xs text-gray-500">
                        {item.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                    </span>
                </div>
            ),
        },
        {
            header: 'Jabatan',
            accessorKey: 'jabatan',
            className: 'font-medium text-gray-700',
        },
        {
            header: 'Departemen',
            accessorKey: 'departemen',
            className: 'text-gray-600',
        },
        {
            header: 'Tanggal Masuk',
            accessorKey: 'tanggal_masuk',
            render: (item) => (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    {new Date(item.tanggal_masuk).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric',
                    })}
                </div>
            ),
        },
        {
            header: 'Alamat',
            accessorKey: 'alamat',
            render: (item) => (
                <div className="flex max-w-62.5 gap-2 text-sm text-gray-600">
                    <span className="line-clamp-2 leading-relaxed">{item.alamat}</span>
                </div>
            ),
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
                        <DropdownMenuItem onClick={() => handleEdit(item)} className="cursor-pointer gap-3 rounded-lg px-3 py-2.5 text-gray-600 focus:bg-gray-50 focus:text-gray-900">
                            <Pencil className="h-4 w-4" />
                            <span className="font-medium">Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(item)} className="cursor-pointer gap-3 rounded-lg px-3 py-2.5 text-red-600 focus:bg-red-50 focus:text-red-700">
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
            <Head title="Data Karyawan" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                                Data Karyawan
                            </h2>
                        </div>
                    </div>

                    <DynamicTable
                        title="List Karyawan"
                        data={karyawan}
                        columns={columns}
                        searchKeys={['nama', 'nip']}
                        onAddClick={handleAddClick}
                        addButtonLabel="Tambah Karyawan"
                    />
                </div>
            </div>

            <KaryawanFormModal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                mode={formMode}
                initialData={selectedKaryawan}
                onSuccess={handleFormSuccess}
            />

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                processing={isDeleting}
                inputType="karyawan"
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