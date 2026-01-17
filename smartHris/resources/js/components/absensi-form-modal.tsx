import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import ReusableFormModal from '@/components/ui/reusable-form-modal'; 
import WarningModal from '@/components/warning-modal'; 
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Clock } from 'lucide-react';

export interface AbsensiData {
    id: number;
    nama_karyawan: string;
    jabatan: string;      
    tanggal: string;       
    departemen?: string; 
    
    jam_masuk: string | null;
    jam_pulang: string | null;
    terlambat: number;
    lembur: number;
    catatan: string | null;
}

interface AbsensiForm {
    id?: string;
    jam_masuk: string;
    jam_pulang: string;
    terlambat: number | string;
    lembur: number | string;
    catatan: string;
}

export interface AbsensiFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: AbsensiData | null;
    onSuccess: (message: string) => void;
}

export default function AbsensiFormModal({
    isOpen,
    onClose,
    initialData,
    onSuccess
}: AbsensiFormModalProps) {

    const [isSaveWarningOpen, setIsSaveWarningOpen] = useState(false);
    const [isCancelWarningOpen, setIsCancelWarningOpen] = useState(false);

    const { data, setData, put, processing, errors, reset, clearErrors } = useForm<AbsensiForm>({
        id: '',
        jam_masuk: '',
        jam_pulang: '',
        terlambat: 0,
        lembur: 0,
        catatan: ''
    });

    useEffect(() => {
        if (isOpen) {
            clearErrors();
            if (initialData) {
                setData({
                    id: initialData.id.toString(),
                    jam_masuk: initialData.jam_masuk || '',
                    jam_pulang: initialData.jam_pulang || '',
                    terlambat: initialData.terlambat || 0,
                    lembur: initialData.lembur || 0,
                    catatan: initialData.catatan || ''
                });
            } else {
                reset();
            }
        }
    }, [isOpen, initialData, clearErrors, setData, reset]);

    const handleSaveClick = (e: React.FormEvent) => {
        e.preventDefault(); 
        setIsSaveWarningOpen(true);
    };

    const handleCancelClick = () => {
        setIsCancelWarningOpen(true);
    };

    const executeSubmit = () => {
        const options = {
            onSuccess: () => { 
                onSuccess("Data absensi berhasil diperbarui."); 
                setIsSaveWarningOpen(false);
                onClose(); 
                reset(); 
            },
            preserveScroll: true,
            onError: () => setIsSaveWarningOpen(false)
        };

        if (data.id) {
            put(`/app/absensi/${data.id}`, options);
        }
    };

    const executeCancel = () => {
        setIsCancelWarningOpen(false);
        reset();
        onClose();
    };

    const labelClass = "text-sm font-bold text-gray-700 mb-2 block tracking-tight";
    
    const infoLabelClass = "text-sm font-semibold text-gray-500 w-36 shrink-0";
    const infoValueClass = "text-sm font-bold text-gray-900"; 
    
    const commonInputClass = "w-full rounded-lg border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-600 focus-visible:border-emerald-600 focus-visible:ring-offset-0";
    const inputClass = `${commonInputClass} h-11 px-4 py-2.5`;
    const timeInputClass = `${inputClass} pl-10`;
    const suffixInputClass = `${inputClass} pr-12 text-right`;
    const textareaClass = `${commonInputClass} min-h-[120px] px-4 py-3 resize-none`;

    return (
        <>
            <ReusableFormModal
                isOpen={isOpen}
                onClose={handleCancelClick}
                title="Edit Data Absensi Karyawan"
                onSubmit={handleSaveClick}
                isLoading={processing}
                submitLabel="Update"
                width="sm:max-w-3xl"
            >
                <div className="space-y-8">
                    
                    {initialData && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 pb-6 border-b border-gray-100">
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <span className={infoLabelClass}>Nama Karyawan</span>
                                    <span className="mr-3 text-gray-400">:</span>
                                    <span className={infoValueClass}>{initialData.nama_karyawan}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className={infoLabelClass}>Tanggal</span>
                                    <span className="mr-3 text-gray-400">:</span>
                                    <span className={infoValueClass}>{initialData.tanggal}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <span className={infoLabelClass}>Jabatan</span>
                                    <span className="mr-3 text-gray-400">:</span>
                                    <span className={infoValueClass}>{initialData.jabatan}</span>
                                </div>
                                
                                {initialData.departemen && (
                                    <div className="flex items-center">
                                        <span className={infoLabelClass}>Departemen</span>
                                        <span className="mr-3 text-gray-400">:</span>
                                        <span className={infoValueClass}>{initialData.departemen}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <div>
                            <Label className={labelClass}>Jam Masuk <span className="text-red-500">*</span></Label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input 
                                    type="time" 
                                    value={data.jam_masuk} 
                                    onChange={(e) => setData('jam_masuk', e.target.value)} 
                                    className={timeInputClass} 
                                />
                            </div>
                            {errors.jam_masuk && <p className="mt-1 text-xs text-red-500">{errors.jam_masuk}</p>}
                        </div>

                        <div>
                            <Label className={labelClass}>Jam Pulang <span className="text-red-500">*</span></Label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input 
                                    type="time" 
                                    value={data.jam_pulang} 
                                    onChange={(e) => setData('jam_pulang', e.target.value)} 
                                    className={timeInputClass} 
                                />
                            </div>
                            {errors.jam_pulang && <p className="mt-1 text-xs text-red-500">{errors.jam_pulang}</p>}
                        </div>

                        <div>
                            <Label className={labelClass}>Terlambat</Label>
                            <div className="relative">
                                <Input 
                                    type="number" 
                                    value={data.terlambat} 
                                    onChange={(e) => setData('terlambat', e.target.value)} 
                                    className={suffixInputClass} 
                                    placeholder="0"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium pointer-events-none bg-white pl-1">
                                    mnt
                                </span>
                            </div>
                            {errors.terlambat && <p className="mt-1 text-xs text-red-500">{errors.terlambat}</p>}
                        </div>

                        <div>
                            <Label className={labelClass}>Lembur</Label>
                            <div className="relative">
                                <Input 
                                    type="number" 
                                    value={data.lembur} 
                                    onChange={(e) => setData('lembur', e.target.value)} 
                                    className={suffixInputClass} 
                                    placeholder="0"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium pointer-events-none bg-white pl-1">
                                    mnt
                                </span>
                            </div>
                            {errors.lembur && <p className="mt-1 text-xs text-red-500">{errors.lembur}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <Label className={labelClass}>Catatan</Label>
                            <Textarea 
                                placeholder="Masukkan Catatan" 
                                className={textareaClass} 
                                value={data.catatan} 
                                onChange={(e) => setData('catatan', e.target.value)} 
                            />
                            {errors.catatan && <p className="mt-1 text-xs text-red-500">{errors.catatan}</p>}
                        </div>
                    </div>

                </div>
            </ReusableFormModal>

            <WarningModal
                isOpen={isSaveWarningOpen}
                onClose={() => setIsSaveWarningOpen(false)}
                onConfirm={executeSubmit}
                isLoading={processing}
                title="Konfirmasi Perubahan Data"
                message="Anda yakin ingin menyimpan perubahan data absensi ini? Perubahan akan langsung diterapkan ke sistem."
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