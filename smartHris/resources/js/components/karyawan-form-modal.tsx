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
    nip: string;
    nama: string;
    jenis_kelamin: string;
    tanggal_lahir: string;
    jabatan: string;
    departemen: string;
    tanggal_masuk: string;
    alamat: string;
    email?: string;
    password?: string;
}

export interface KaryawanData {
    id: number;
    nip: string;
    nama: string;
    jenis_kelamin: string;
    tanggal_lahir: string;
    jabatan: string;
    departemen: string;
    tanggal_masuk: string;
    alamat: string;
}

export interface KaryawanFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'create' | 'edit';
    initialData?: KaryawanData | null;
    onSuccess: (message: string) => void;
}

export default function KaryawanFormModal({
    isOpen,
    onClose,
    mode,
    initialData,
    onSuccess
}: KaryawanFormModalProps) {

    const [isSaveWarningOpen, setIsSaveWarningOpen] = useState(false);
    const [isCancelWarningOpen, setIsCancelWarningOpen] = useState(false);

    const { data, setData, post, put, processing, errors, reset, clearErrors, transform } = useForm<KaryawanForm>({
        id: '', nip: '', nama: '', jenis_kelamin: '', tanggal_lahir: '', jabatan: '', departemen: '', tanggal_masuk: '', alamat: ''
    });

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            if (mode === 'edit' && initialData) {
                setData({
                    id: initialData.id.toString(),
                    nip: initialData.nip,
                    nama: initialData.nama,
                    jenis_kelamin: initialData.jenis_kelamin,
                    tanggal_lahir: initialData.tanggal_lahir,
                    jabatan: initialData.jabatan,
                    departemen: initialData.departemen,
                    tanggal_masuk: initialData.tanggal_masuk,
                    alamat: initialData.alamat
                });
            } else {
                reset();
            }
        }
    }, [isOpen, mode, initialData, clearErrors, setData, reset]); 

    const handleSaveClick = (e: React.FormEvent) => {
        e.preventDefault(); 
        setIsSaveWarningOpen(true);
    };

    const handleCancelClick = () => {
        setIsCancelWarningOpen(true);
    };

    const executeSubmit = () => {
        
        transform((data) => ({
            ...data,
            email: `${data.nip.toLowerCase()}@smarthris.com`,
            password: 'password123',
        }));

        const successText = mode === 'edit' 
            ? "Data karyawan berhasil diperbarui." 
            : "Data karyawan berhasil disimpan.";

        const options = {
            onSuccess: () => { 
                onSuccess(successText); 
                
                setIsSaveWarningOpen(false);
                onClose(); 
                reset(); 
            },
            preserveScroll: true,
            onError: () => {
                setIsSaveWarningOpen(false);
            }
        };

        if (mode === 'edit') {
            put(`/admin/karyawan/${data.id}`, options);
        } else {
            post('/admin/karyawan', options);
        }
    };

    const executeCancel = () => {
        setIsCancelWarningOpen(false);
        reset();
        onClose();
    };

    const labelClass = "text-sm font-bold text-gray-700 mb-2 block tracking-tight";
    const commonInputClass = "w-full rounded-lg border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600 focus-visible:border-emerald-600 focus-visible:ring-offset-0";
    const inputClass = `${commonInputClass} h-11 px-4 py-2.5`;
    const dateInputClass = `${inputClass} pl-10`; 
    const textareaClass = `${commonInputClass} min-h-[120px] px-4 py-3 resize-none`;
    const readOnlyClass = "w-full h-11 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed focus-visible:ring-0";

    return (
        <>
            <ReusableFormModal
                isOpen={isOpen}
                onClose={handleCancelClick}
                title={mode === 'edit' ? "Edit Karyawan" : "Tambah Karyawan"}
                onSubmit={handleSaveClick}
                isLoading={processing}
                submitLabel={mode === 'edit' ? "Update" : "Simpan"}
            >
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                    <div className="md:col-span-3">
                        <Label className={labelClass}>NIP <span className="text-red-500">*</span></Label>
                        <Input value={data.nip} onChange={(e) => setData('nip', e.target.value)} placeholder="Contoh: 2211001" readOnly={mode === 'edit'} className={mode === 'edit' ? readOnlyClass : inputClass} />
                        {errors.nip && <p className="mt-1 text-xs text-red-500">{errors.nip}</p>}
                    </div>
                    <div className="md:col-span-3">
                        <Label className={labelClass}>Nama Lengkap <span className="text-red-500">*</span></Label>
                        <Input value={data.nama} onChange={(e) => setData('nama', e.target.value)} placeholder="Masukkan Nama Lengkap" className={inputClass} />
                        {errors.nama && <p className="mt-1 text-xs text-red-500">{errors.nama}</p>}
                    </div>
                    <div className="md:col-span-3">
                        <Label className={labelClass}>Jenis Kelamin <span className="text-red-500">*</span></Label>
                        <div className="relative">
                            <select className={`${inputClass} appearance-none cursor-pointer`} value={data.jenis_kelamin} onChange={(e) => setData('jenis_kelamin', e.target.value)}>
                                <option value="">--Pilih--</option><option value="L">Laki-laki</option><option value="P">Perempuan</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                            </div>
                        </div>
                        {errors.jenis_kelamin && <p className="mt-1 text-xs text-red-500">{errors.jenis_kelamin}</p>}
                    </div>
                    <div className="md:col-span-3">
                        <Label className={labelClass}>Tanggal Lahir <span className="text-red-500">*</span></Label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input type="date" value={data.tanggal_lahir} onChange={(e) => setData('tanggal_lahir', e.target.value)} className={dateInputClass} />
                        </div>
                        {errors.tanggal_lahir && <p className="mt-1 text-xs text-red-500">{errors.tanggal_lahir}</p>}
                    </div>
                    <div className="md:col-span-2">
                        <Label className={labelClass}>Jabatan <span className="text-red-500">*</span></Label>
                        <div className="relative">
                            <select className={`${inputClass} appearance-none cursor-pointer`} value={data.jabatan} onChange={(e) => setData('jabatan', e.target.value)}>
                                <option value="">--Pilih--</option><option value="Store Manager">Store Manager</option><option value="Staff">Staff</option>
                            </select>
                             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500"><svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg></div>
                        </div>
                        {errors.jabatan && <p className="mt-1 text-xs text-red-500">{errors.jabatan}</p>}
                    </div>
                    <div className="md:col-span-2">
                        <Label className={labelClass}>Departemen <span className="text-red-500">*</span></Label>
                        <div className="relative">
                            <select className={`${inputClass} appearance-none cursor-pointer`} value={data.departemen} onChange={(e) => setData('departemen', e.target.value)}>
                                <option value="">--Pilih--</option><option value="IT">IT</option><option value="HRD">HRD</option>
                            </select>
                             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500"><svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg></div>
                        </div>
                         {errors.departemen && <p className="mt-1 text-xs text-red-500">{errors.departemen}</p>}
                    </div>
                    <div className="md:col-span-2">
                        <Label className={labelClass}>Tanggal Masuk <span className="text-red-500">*</span></Label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input type="date" value={data.tanggal_masuk} onChange={(e) => setData('tanggal_masuk', e.target.value)} className={dateInputClass} />
                        </div>
                        {errors.tanggal_masuk && <p className="mt-1 text-xs text-red-500">{errors.tanggal_masuk}</p>}
                    </div>
                    <div className="md:col-span-6">
                        <Label className={labelClass}>Alamat <span className="text-red-500">*</span></Label>
                        <Textarea placeholder="Masukkan Alamat Lengkap" className={textareaClass} value={data.alamat} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('alamat', e.target.value)} />
                        {errors.alamat && <p className="mt-1 text-xs text-red-500">{errors.alamat}</p>}
                    </div>
                </div>
            </ReusableFormModal>

            <WarningModal
                isOpen={isSaveWarningOpen}
                onClose={() => setIsSaveWarningOpen(false)}
                onConfirm={executeSubmit}
                isLoading={processing}
                title={mode === 'edit' ? "Konfirmasi Perubahan Data" : "Konfirmasi Simpan Data"}
                message={
                    mode === 'edit' 
                    ? "Anda yakin ingin menyimpan perubahan data karyawan ini? Perubahan akan langsung diterapkan ke sistem."
                    : "Anda yakin ingin menyimpan data karyawan ini? Pastikan seluruh data yang diinput sudah benar."
                }
                confirmLabel="Konfirmasi"
                cancelLabel="Batal"
            />

            <WarningModal
                isOpen={isCancelWarningOpen}
                onClose={() => setIsCancelWarningOpen(false)}
                onConfirm={executeCancel}
                title="Batalkan Perubahan?"
                message="Data yang telah Anda isi belum disimpan. Anda yakin ingin membatalkan dan keluar dari form ini?"
                confirmLabel="Ya, Batalkan"
                cancelLabel="Kembali"
            />
        </>
    );
}