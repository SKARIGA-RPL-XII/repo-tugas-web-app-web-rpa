import React, { useEffect, useMemo } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import InputError from '@/components/input-error';

interface Karyawan {
    id: number;
    nama: string;
    nip: string;
    jabatan?: string;
    departemen?: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    karyawanList?: Karyawan[];
    jenisPelanggaranList: { id: number; nama_pelanggaran: string }[];
    defaultKaryawanId?: number | null;
    onSuccess?: (message: string) => void;
    onError?: (message: string) => void;
}

export default function PelanggaranFormModal({
    isOpen,
    onClose,
    karyawanList = [],
    jenisPelanggaranList = [],
    defaultKaryawanId,
    onSuccess,
    onError
}: Props) {
    const selectedKaryawan = useMemo(() => {
        return karyawanList.find(k => k.id === defaultKaryawanId);
    }, [karyawanList, defaultKaryawanId]);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        karyawan_id: '',
        jenis_pelanggaran_id: '',
        sp: '',
        catatan: '',
    });

    useEffect(() => {
        if (isOpen) {
            if (defaultKaryawanId) {
                setData('karyawan_id', defaultKaryawanId.toString());
            }
        } else {
            reset();
            clearErrors();
        }
    }, [isOpen, defaultKaryawanId, setData, reset, clearErrors]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/app/pelanggaran', {
            onSuccess: () => {
                reset();
                onClose();
                if (onSuccess) {
                    onSuccess('Sanksi karyawan berhasil ditambahkan');
                }
            },
            onError: (errors) => {
                const errorMessage = Object.values(errors).flat().join(', ') || 'Gagal menambahkan sanksi';
                if (onError) {
                    onError(errorMessage);
                }
            }
        });
    };

    const inputClass = "w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-[#144435] focus:ring-2 focus:ring-[#144435]/20 focus:outline-none disabled:bg-gray-50";
    const labelClass = "text-sm font-semibold text-[#144435] mb-1.5 block";

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-150 p-0 overflow-hidden rounded-2xl border-0 shadow-lg">
                <div className="bg-white px-8 py-6 border-b border-gray-100">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-[#144435]">
                            Tambah Sanksi Karyawan
                        </DialogTitle>
                        <p className="text-sm text-gray-500 mt-1">
                            Isi formulir di bawah ini untuk memberikan sanksi.
                        </p>
                    </DialogHeader>
                </div>

                <div className="px-8 py-6 space-y-6">
                    {selectedKaryawan && (
                        <div className="bg-gray-50/50 rounded-xl p-5 border border-gray-100 space-y-3">
                            <div className="grid grid-cols-[140px_10px_1fr] items-center text-sm">
                                <span className="font-medium text-gray-500">Nama Karyawan</span>
                                <span className="text-gray-400">:</span>
                                <span className="font-bold text-gray-800 text-base">{selectedKaryawan.nama}</span>
                            </div>
                            <div className="grid grid-cols-[140px_10px_1fr] items-center text-sm">
                                <span className="font-medium text-gray-500">Jabatan</span>
                                <span className="text-gray-400">:</span>
                                <span className="font-medium text-gray-800">{selectedKaryawan.jabatan || '-'}</span>
                            </div>
                            <div className="grid grid-cols-[140px_10px_1fr] items-center text-sm">
                                <span className="font-medium text-gray-500">Departemen</span>
                                <span className="text-gray-400">:</span>
                                <span className="font-medium text-gray-800">{selectedKaryawan.departemen || '-'}</span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="jenis" className={labelClass}>
                                    Jenis Pelanggaran <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <select
                                        id="jenis"
                                        className={`${inputClass} appearance-none`}
                                        value={data.jenis_pelanggaran_id}
                                        onChange={(e) => setData('jenis_pelanggaran_id', e.target.value)}
                                    >
                                        <option value="" disabled>Pilih Pelanggaran</option>
                                        {jenisPelanggaranList.map((jp) => (
                                            <option key={jp.id} value={jp.id}>
                                                {jp.nama_pelanggaran}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                                <InputError message={errors.jenis_pelanggaran_id} />
                            </div>

                            <div>
                                <Label htmlFor="sp" className={labelClass}>
                                    Tingkat SP
                                </Label>
                                <div className="relative">
                                    <select
                                        id="sp"
                                        className={`${inputClass} appearance-none`}
                                        value={data.sp}
                                        onChange={(e) => setData('sp', e.target.value)}
                                    >
                                        <option value="" disabled>Pilih SP</option>
                                        <option value="SP1">SP1 - Peringatan 1</option>
                                        <option value="SP2">SP2 - Peringatan 2</option>
                                        <option value="SP3">SP3 - Peringatan 3</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>
                                <InputError message={errors.sp} />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="catatan" className={labelClass}>
                                Catatan / Keterangan <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="catatan"
                                className={`${inputClass} min-h-30 resize-none`}
                                placeholder="Tuliskan kronologi atau detail pelanggaran di sini..."
                                value={data.catatan}
                                onChange={(e) => setData('catatan', e.target.value)}
                            />
                            <InputError message={errors.catatan} />
                        </div>

                        <DialogFooter className="flex items-center justify-between gap-4 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                className="flex-1 rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 h-11"
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="flex-1 rounded-xl bg-[#144435] hover:bg-[#0f3629] text-white shadow-md shadow-green-900/10 h-11 transition-all hover:scale-[1.02]"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Data'}
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
