import DynamicTable, { ColumnDef } from '@/components/dynamic-table';
import KaryawanFormModal from '@/components/karyawan-form-modal';
import PelanggaranFormModal from '@/components/pelanggaran-form-modal';
import ConfirmDeleteModal from '@/components/confirm-delete-modal';
import WarningModal from '@/components/warning-modal';
import SuccessModal from '@/components/success-modal';
import FailureModal from '@/components/failure-modal';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Head, router } from '@inertiajs/react';
import { Key, MoreHorizontal, Pencil, Plus, Trash2 } from 'lucide-react';
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
    is_password_default?: boolean;
};

type PageProps = {
    karyawan: Karyawan[];
    jenisPelanggaranList: { id: number; nama_pelanggaran: string }[];
};

export default function DataKaryawan({ karyawan, jenisPelanggaranList = [] }: PageProps) {

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [successTitle, setSuccessTitle] = useState('Berhasil');

    const [showFailureModal, setShowFailureModal] = useState(false);
    const [failureMessage, setFailureMessage] = useState('');
    const [failureTitle, setFailureTitle] = useState('Gagal');

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [karyawanToDelete, setKaryawanToDelete] = useState<Karyawan | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
    const [selectedKaryawan, setSelectedKaryawan] = useState<Karyawan | null>(null);

    const [isResetWarningOpen, setIsResetWarningOpen] = useState(false);
    const [karyawanToReset, setKaryawanToReset] = useState<Karyawan | null>(null);
    const [isResetting, setIsResetting] = useState(false);

    const [isSanksiModalOpen, setIsSanksiModalOpen] = useState(false);
    const [karyawanForSanksi, setKaryawanForSanksi] = useState<Karyawan | null>(null);

    const handleAddSanksi = (item: Karyawan) => {
        setKaryawanForSanksi(item);
        setIsSanksiModalOpen(true);
    };

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
        setSuccessTitle('Berhasil');
        setSuccessMessage(msg);
        setShowSuccessModal(true);
    };

    const handleDeleteClick = (item: Karyawan) => {
        setKaryawanToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (karyawanToDelete && karyawanToDelete.id) {
            router.delete(`/app/karyawan/${karyawanToDelete.id}`, {
                onBefore: () => setIsDeleting(true),
                onSuccess: () => {
                    setIsDeleteModalOpen(false);
                    setKaryawanToDelete(null);
                    setSuccessTitle('Dihapus');
                    setSuccessMessage('Data karyawan berhasil dihapus.');
                    setShowSuccessModal(true);
                },
                onError: (errors) => {
                    setIsDeleteModalOpen(false);
                    setFailureTitle('Gagal Menghapus');
                    setFailureMessage(Object.values(errors).flat().join(', ') || 'Gagal menghapus data.');
                    setShowFailureModal(true);
                },
                onFinish: () => setIsDeleting(false),
                preserveScroll: true,
            });
        }
    };

    const handleResetPasswordClick = (item: Karyawan) => {
        if (item.is_password_default) {
            setFailureTitle('Info');
            setFailureMessage('Password karyawan ini sudah dalam kondisi default (Tanggal Lahir).');
            setShowFailureModal(true);
            return;
        }
        setKaryawanToReset(item);
        setIsResetWarningOpen(true);
    };

    const executeResetPassword = () => {
        if (karyawanToReset && karyawanToReset.id) {
            router.put(`/app/karyawan/${karyawanToReset.id}/reset-password`, {}, {
                onBefore: () => setIsResetting(true),
                onSuccess: () => {
                    setIsResetWarningOpen(false);
                    setKaryawanToReset(null);

                    setSuccessTitle('Berhasil');
                    setSuccessMessage('Password karyawan berhasil direset ke Tanggal lahir.');
                    setShowSuccessModal(true);

                    setTimeout(() => {
                        router.visit(window.location.pathname);
                    }, 1500);
                },
                onError: (errors) => {
                    setIsResetWarningOpen(false);

                    const pesanError = errors.error || errors.message || (typeof errors === 'object' ? Object.values(errors).flat().join(', ') : "Terjadi kesalahan saat mereset password.");

                    setFailureTitle('Gagal Reset');
                    setFailureMessage(pesanError);
                    setShowFailureModal(true);
                },
                onFinish: () => {
                    setIsResetting(false);
                },
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
            hidden: 'mobile',
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
            hidden: 'mobile',
        },
        {
            header: 'Jabatan',
            accessorKey: 'jabatan',
            className: 'font-medium text-gray-700',
            hidden: 'tablet',
        },
        {
            header: 'Departemen',
            accessorKey: 'departemen',
            className: 'text-gray-600',
            hidden: 'tablet',
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
            hidden: 'mobile',
        },
        {
            header: 'Alamat',
            accessorKey: 'alamat',
            render: (item) => (
                <div className="flex max-w-62.5 gap-2 text-sm text-gray-600">
                    <span className="line-clamp-2 leading-relaxed">{item.alamat}</span>
                </div>
            ),
            hidden: 'tablet',
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

                    <DropdownMenuContent align="end" className="w-48 rounded-xl border border-gray-100 bg-white p-1 shadow-lg">

                        <DropdownMenuItem onClick={() => handleEdit(item)} className="cursor-pointer gap-3 rounded-lg px-3 py-2.5 text-gray-600 focus:bg-gray-50 focus:text-gray-900">
                            <Pencil className="h-4 w-4" />
                            <span className="font-medium">Edit Karyawan</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => handleResetPasswordClick(item)} className="cursor-pointer gap-3 rounded-lg px-3 py-2.5 text-gray-600 focus:bg-gray-50 focus:text-gray-900" disabled={item.is_password_default}>
                            <Key className="h-4 w-4" />
                            <span className="font-medium">
                                {item.is_password_default ? 'Password sudah default' : 'Reset Password'}
                            </span>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => handleAddSanksi(item)} className="cursor-pointer gap-3 rounded-lg px-3 py-2.5 text-gray-600 focus:bg-gray-50 focus:text-gray-900">
                            <Plus className="h-4 w-4" />
                            <span className="font-medium">Tambah Sanksi</span>
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
            <div className="py-6 sm:py-12">
                <div className="mx-auto w-full max-w-7xl space-y-4 px-4 sm:space-y-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
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

            <PelanggaranFormModal
                isOpen={isSanksiModalOpen}
                onClose={() => {
                    setIsSanksiModalOpen(false);
                    setKaryawanForSanksi(null);
                }}
                karyawanList={karyawan}
                jenisPelanggaranList={jenisPelanggaranList}
                defaultKaryawanId={karyawanForSanksi?.id}
                onSuccess={(message) => {
                    setIsSanksiModalOpen(false);
                    setKaryawanForSanksi(null);
                    setSuccessTitle('Berhasil');
                    setSuccessMessage(message);
                    setShowSuccessModal(true);
                    setTimeout(() => {
                        router.visit(window.location.pathname);
                    }, 1500);
                }}
                onError={(message) => {
                    setFailureTitle('Gagal Menambahkan Sanksi');
                    setFailureMessage(message);
                    setShowFailureModal(true);
                }}
            />

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                processing={isDeleting}
                inputType="karyawan"
            />

            <WarningModal
                isOpen={isResetWarningOpen}
                onClose={() => setIsResetWarningOpen(false)}
                onConfirm={executeResetPassword}
                isLoading={isResetting}
                title="Reset Password?"
                message="Password karyawan akan direset ke tanggal lahir. Apakah Anda yakin ingin mereset password karyawan ini?"
                confirmLabel="Konfirmasi"
                cancelLabel="Batal"
            />

            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                title={successTitle}
                message={successMessage}
            />

            <FailureModal
                isOpen={showFailureModal}
                onClose={() => setShowFailureModal(false)}
                title={failureTitle}
                message={failureMessage}
            />
        </AppLayout>
    );
}