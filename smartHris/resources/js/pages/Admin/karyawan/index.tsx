import DynamicTable, { ColumnDef } from '@/components/dynamic-table';
import KaryawanFormModal from '@/components/karyawan-form-modal';
// Import Modal Pelanggaran
import PelanggaranFormModal from '@/components/pelanggaran-form-modal'; 
import ConfirmDeleteModal from '@/components/confirm-delete-modal';
import WarningModal from '@/components/warning-modal';
import SuccessModal from '@/components/success-modal';
import FailureModal from '@/components/failure-modal';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
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
    // Tambahkan prop ini dari Controller
    jenisPelanggaranList: { id: number; nama_pelanggaran: string }[];
};

// Destructure jenisPelanggaranList di sini
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

    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    const [isResetWarningOpen, setIsResetWarningOpen] = useState(false);
    const [karyawanToReset, setKaryawanToReset] = useState<Karyawan | null>(null);
    const [isResetting, setIsResetting] = useState(false);

    // --- STATE UNTUK POPUP PELANGGARAN ---
    const [isSanksiModalOpen, setIsSanksiModalOpen] = useState(false);
    const [karyawanForSanksi, setKaryawanForSanksi] = useState<Karyawan | null>(null);

    // --- LOGIKA BUKA POPUP SANKSI ---
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
            setFailureMessage('Password karyawan ini sudah dalam kondisi default (NIP).');
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
                onSuccess: (page) => {
                    console.log('Success response:', page);
                    setIsResetWarningOpen(false);
                    setKaryawanToReset(null);

                    // Tampilkan Modal Sukses
                    setSuccessTitle('Berhasil');
                    setSuccessMessage('Password karyawan berhasil direset ke NIP.');
                    setShowSuccessModal(true);

                    // Refresh halaman otomatis
                    setTimeout(() => {
                        router.visit(window.location.pathname);
                    }, 1500);
                },
                onError: (errors) => {
                    console.error('Error response:', errors);
                    setIsResetWarningOpen(false);

                    // Ambil pesan error dari response
                    const pesanError = errors.error || errors.message || (typeof errors === 'object' ? Object.values(errors).flat().join(', ') : "Terjadi kesalahan saat mereset password.");

                    // Tampilkan Modal Gagal
                    setFailureTitle('Gagal Reset');
                    setFailureMessage(pesanError);
                    setShowFailureModal(true);
                },
                onFinish: () => {
                    console.log('Finish reset password');
                    setIsResetting(false);
                },
                preserveScroll: true,
            });
        }
    };

    const columns: ColumnDef<Karyawan>[] = [
        {
            header: 'No',
            className: 'w-24 pl-8 text-center',
            render: (_, index) => (
                <span className="text-gray-500">{index + 1}</span>
            )
        },
        {
            header: 'Karyawan',
            render: (item) => (
                <div className="flex flex-col gap-1">
                    <span className="font-medium text-gray-900">
                        {item.karyawan?.nama ?? '-'}
                    </span>
                    {item.karyawan?.nip && (
                        <span className="text-xs text-gray-500">
                            NIP: {item.karyawan.nip}
                        </span>
                    )}
                </div>
            )
        },
        {
            header: 'Jabatan',
            render: (item) => (
                <span className="font-medium text-gray-700">
                    {item.karyawan?.jabatan ?? '-'}
                </span>
            )
        },
        {
            header: 'Departemen',
            render: (item) => (
                <span className="text-gray-600">
                    {item.karyawan?.departemen ?? '-'}
                </span>
            )
        },
        {
            header: 'Pelanggaran',
            render: (item) => (
                <span className="font-medium text-gray-900">
                    {item.jenis_pelanggaran?.nama ?? '-'}
                </span>
            )
        },
        {
            header: 'Tanggal',
            render: (item) => (
                <span className="font-medium text-gray-900">
                    {item.tanggal}
                </span>
            )
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
                            className="h-8 w-8 p-0 text-gray-400 hover:bg-gray-100 hover:text-gray-900
                            focus-visible:ring-0 focus-visible:ring-offset-0
                            data-[state=open]:bg-gray-100"
                        >
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

                        {/* TOMBOL ACTION TAMBAH SANKSI YANG SUDAH AKTIF */}
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
            )
        }
    ]

    return (
        <AppLayout>
            <Head title="Sanksi Karyawan" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">

                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                            Sanksi Karyawan
                        </h2>
                    </div>

                    <DynamicTable
                        title="Data Sanksi Karyawan"
                        data={pelanggaran}
                        columns={columns}
                        searchKeys={[
                            'karyawan.nama',
                            'karyawan.jabatan',
                            'karyawan.departemen',
                            'jenis_pelanggaran.nama'
                        ]}
                    />
                </div>
            </div>

            {/* MODAL FORM */}
            <PelanggaranFormModal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                data={selected}
                karyawan={karyawan}
                jenisPelanggaran={jenisPelanggaran}
            />

            {/* --- MODAL PELANGGARAN DIRENDER DI SINI --- */}
            <PelanggaranFormModal
                isOpen={isSanksiModalOpen}
                onClose={() => {
                    setIsSanksiModalOpen(false);
                    setKaryawanForSanksi(null);
                }}
                karyawanList={karyawan} 
                jenisPelanggaranList={jenisPelanggaranList}
                defaultKaryawanId={karyawanForSanksi?.id}
            />

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                processing={isDeleting}
                inputType="pelanggaran"
            />

            <WarningModal
                isOpen={isResetWarningOpen}
                onClose={() => setIsResetWarningOpen(false)}
                onConfirm={executeResetPassword}
                isLoading={isResetting}
                title="Reset Password?"
                message="Password karyawan akan direset ke password default sistem. Apakah Anda yakin ingin mereset password karyawan ini?"
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
    )
}
    