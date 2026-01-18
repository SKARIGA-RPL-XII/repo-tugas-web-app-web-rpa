import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import ReusableFormModal from '@/components/ui/reusable-form-modal';
import WarningModal from '@/components/warning-modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from 'lucide-react';

interface KaryawanForm {
    id?: string;
    nama: string;
    jenis_kelamin: string;
    tanggal_lahir: string;
    jabatan: string;
    departemen: string;
    alamat: string;
    email: string;
}

export interface KaryawanData {
    id: number;
    nip: string;
    nama: string;
    jenis_kelamin: string;
    tanggal_lahir: string;
    jabatan: string;
    departemen: string;
    alamat: string;
    email: string;
}

export interface KaryawanFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'create' | 'edit';
    initialData?: KaryawanData | null;
    onSuccess: (message: string) => void;
}

const generateEmail = (nama: string) => {
    if (!nama) return 'auto-generate@smarthris.com';

    return (
        nama
            .toLowerCase()
            .replace(/[^a-z\s]/g, '')
            .trim()
            .replace(/\s+/g, '.') +
        '@smarthris.com'
    );
};

export default function KaryawanFormModal({
    isOpen,
    onClose,
    mode,
    initialData,
    onSuccess,
}: KaryawanFormModalProps) {
    const [isSaveWarningOpen, setIsSaveWarningOpen] = useState(false);
    const [isCancelWarningOpen, setIsCancelWarningOpen] = useState(false);

    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm<KaryawanForm>({
            id: '',
            nama: '',
            jenis_kelamin: '',
            tanggal_lahir: '',
            jabatan: '',
            departemen: '',
            alamat: '',
            email: '',
        });

    useEffect(() => {
        if (!isOpen) return;
        clearErrors();

        if (mode === 'edit' && initialData) {
            setData({
                id: initialData.id.toString(),
                nama: initialData.nama,
                jenis_kelamin: initialData.jenis_kelamin,
                tanggal_lahir: initialData.tanggal_lahir,
                jabatan: initialData.jabatan,
                departemen: initialData.departemen,
                alamat: initialData.alamat,
                email: initialData.email || '',
            });
        } else {
            reset();
        }
    }, [isOpen, mode, initialData, clearErrors, setData, reset]);

    useEffect(() => {
        if (mode === 'create') {
            setData('email', generateEmail(data.nama));
        }
    }, [data.nama, mode, setData]);

    const handleSaveClick = (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !data.nama ||
            !data.jenis_kelamin ||
            !data.tanggal_lahir ||
            !data.jabatan ||
            !data.departemen ||
            !data.alamat ||
            !data.email
        ) {
            alert("Mohon lengkapi seluruh field bertanda bintang (*) sebelum menyimpan.");
            return;
        }

        setIsSaveWarningOpen(true);
    };

    const handleCancelClick = () => {
        setIsCancelWarningOpen(true);
    };

    const executeSubmit = () => {
        const options = {
            onSuccess: () => {
                onSuccess(
                    mode === 'edit'
                        ? 'Data karyawan berhasil diperbarui.'
                        : 'Data karyawan berhasil disimpan.'
                );
                setIsSaveWarningOpen(false);
                onClose();
                reset();
            },
            preserveScroll: true,
            onError: () => setIsSaveWarningOpen(false),
        };

        if (mode === 'edit') {
            put(`/app/karyawan/${data.id}`, options);
        } else {
            post('/app/karyawan', options);
        }
    };

    const executeCancel = () => {
        setIsCancelWarningOpen(false);
        reset();
        onClose();
    };

    const labelClass =
        'text-sm font-bold text-gray-700 mb-2 block tracking-tight';

    return (
        <>
            <ReusableFormModal
                isOpen={isOpen}
                onClose={handleCancelClick}
                title={mode === 'edit' ? 'Edit Karyawan' : 'Tambah Karyawan'}
                onSubmit={handleSaveClick}
                isLoading={processing}
                submitLabel={mode === 'edit' ? 'Update' : 'Simpan'}
            >
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                    <div className="md:col-span-3">
                        <Label className={labelClass}>
                            NIP <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            disabled
                            value={
                                mode === 'edit'
                                    ? initialData?.nip ?? '-'
                                    : 'Auto generate'
                            }
                            className="form-control form-readonly"
                        />
                        {mode === 'create' && (
                            <p className="mt-1 text-xs text-gray-500">
                                NIP akan dibuat otomatis oleh sistem
                            </p>
                        )}
                    </div>

                    <div className="md:col-span-3">
                        <Label className={labelClass}>
                            Nama Lengkap <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            value={data.nama}
                            onChange={(e) => setData('nama', e.target.value)}
                            placeholder="Masukkan Nama Lengkap"
                            className="form-control"
                            required
                        />
                        {errors.nama && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.nama}
                            </p>
                        )}
                    </div>

                    <div className="md:col-span-3">
                        <Label className={labelClass}>
                            Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Masukkan Email"
                            className="form-control"
                            required
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="md:col-span-3">
                        <Label className={labelClass}>
                            Jenis Kelamin <span className="text-red-500">*</span>
                        </Label>
                        <div className="form-select-wrapper">
                            <select
                                className="form-select"
                                value={data.jenis_kelamin}
                                required
                                onChange={(e) =>
                                    setData('jenis_kelamin', e.target.value)
                                }
                            >
                                <option value="">--Pilih--</option>
                                <option value="L">Laki-laki</option>
                                <option value="P">Perempuan</option>
                            </select>
                        </div>
                        {errors.jenis_kelamin && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.jenis_kelamin}
                            </p>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <Label className={labelClass}>
                            Tanggal Lahir <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                required
                                id="tanggal_lahir"
                                type="date"
                                value={data.tanggal_lahir}
                                onChange={(e) =>
                                    setData('tanggal_lahir', e.target.value)
                                }
                                className="form-control pr-12"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    (
                                        document.getElementById(
                                            'tanggal_lahir'
                                        ) as HTMLInputElement
                                    )?.showPicker()
                                }
                                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-md bg-emerald-700 text-white hover:bg-emerald-800"
                            >
                                <Calendar className="h-4 w-4" />
                            </button>
                        </div>
                        {errors.tanggal_lahir && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.tanggal_lahir}
                            </p>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <Label className={labelClass}>
                            Jabatan <span className="text-red-500">*</span>
                        </Label>
                        <div className="form-select-wrapper">
                            <select
                                required
                                className="form-select"
                                value={data.jabatan}
                                onChange={(e) =>
                                    setData('jabatan', e.target.value)
                                }
                            >
                                <option value="">--Pilih Jabatan--</option>
                                <option value="Store Manager">Store Manager</option>
                                <option value="Supervisor">Supervisor</option>
                                <option value="Admin">Admin</option>
                                <option value="Kasir">Kasir</option>
                                <option value="Staff">Staff</option>
                            </select>
                        </div>
                        {errors.jabatan && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.jabatan}
                            </p>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <Label className={labelClass}>
                            Departemen <span className="text-red-500">*</span>
                        </Label>
                        <div className="form-select-wrapper">
                            <select
                                required
                                className="form-select"
                                value={data.departemen}
                                onChange={(e) =>
                                    setData('departemen', e.target.value)
                                }
                            >
                                <option value="">--Pilih Departemen--</option>
                                <option value="IT">IT</option>
                                <option value="HRD">HRD</option>
                                <option value="Finance">Finance</option>
                                <option value="Operasional">Operasional</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                        </div>
                        {errors.departemen && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.departemen}
                            </p>
                        )}
                    </div>

                    <div className="md:col-span-6">
                        <Label className={labelClass}>
                            Alamat <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            required
                            value={data.alamat}
                            onChange={(e) => setData('alamat', e.target.value)}
                            placeholder="Masukkan Alamat Lengkap"
                            className="form-textarea"
                        />
                    </div>
                </div>
            </ReusableFormModal>

            <WarningModal
                isOpen={isSaveWarningOpen}
                onClose={() => setIsSaveWarningOpen(false)}
                onConfirm={executeSubmit}
                isLoading={processing}
                title={
                    mode === 'edit'
                        ? 'Konfirmasi Perubahan Data'
                        : 'Konfirmasi Simpan Data'
                }
                message="Pastikan seluruh data sudah benar."
                confirmLabel="Konfirmasi"
                cancelLabel="Batal"
            />

            <WarningModal
                isOpen={isCancelWarningOpen}
                onClose={() => setIsCancelWarningOpen(false)}
                onConfirm={executeCancel}
                title="Batalkan Perubahan?"
                message="Data belum disimpan. Yakin ingin keluar?"
                confirmLabel="Ya, Batalkan"
                cancelLabel="Kembali"
            />
        </>
    );
}