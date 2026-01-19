import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

interface Props {
    isOpen: boolean;
    onClose: () => void;
    // List karyawan untuk dropdown (opsional jika dibuka dari tabel karyawan)
    karyawanList?: { id: number; nama: string; nip: string }[]; 
    jenisPelanggaranList: { id: number; nama_pelanggaran: string }[];
    // ID karyawan yang dipilih dari tombol aksi
    defaultKaryawanId?: number | null; 
}

export default function PelanggaranFormModal({ 
    isOpen, 
    onClose, 
    karyawanList = [], 
    jenisPelanggaranList = [], 
    defaultKaryawanId 
}: Props) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        karyawan_id: '',
        jenis_pelanggaran_id: '',
        tanggal: new Date().toISOString().split('T')[0], // Default hari ini
        catatan: '', // Sesuaikan dengan controller (catatan/keterangan)
    });

    useEffect(() => {
        if (isOpen) {
            // Jika dibuka dari tombol "Tambah Sanksi" di baris karyawan tertentu
            if (defaultKaryawanId) {
                setData('karyawan_id', defaultKaryawanId.toString());
            }
        } else {
            // Reset form saat modal ditutup
            reset();
            clearErrors();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, defaultKaryawanId]); 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Gunakan URL manual sesuai route di web.php
        post('/admin/pelanggaran', {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>Tambah Sanksi / Pelanggaran</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Input Karyawan (Readonly jika dipilih dari tabel) */}
                    <div className="space-y-2">
                        <Label htmlFor="karyawan">Nama Karyawan</Label>
                        <select
                            id="karyawan"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={data.karyawan_id}
                            onChange={(e) => setData('karyawan_id', e.target.value)}
                            // Disable jika sudah ada default ID agar tidak salah pilih orang
                            disabled={!!defaultKaryawanId} 
                        >
                            <option value="">-- Pilih Karyawan --</option>
                            {karyawanList.map((k) => (
                                <option key={k.id} value={k.id}>
                                    {k.nama} ({k.nip})
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.karyawan_id} />
                    </div>

                    {/* Jenis Pelanggaran */}
                    <div className="space-y-2">
                        <Label htmlFor="jenis">Jenis Pelanggaran</Label>
                        <select
                            id="jenis"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={data.jenis_pelanggaran_id}
                            onChange={(e) => setData('jenis_pelanggaran_id', e.target.value)}
                        >
                            <option value="">-- Pilih Jenis Pelanggaran --</option>
                            {jenisPelanggaranList.map((jp) => (
                                <option key={jp.id} value={jp.id}>
                                    {jp.nama_pelanggaran}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.jenis_pelanggaran_id} />
                    </div>

                    {/* Tanggal */}
                    <div className="space-y-2">
                        <Label htmlFor="tanggal">Tanggal Kejadian</Label>
                        <Input
                            id="tanggal"
                            type="date"
                            value={data.tanggal}
                            onChange={(e) => setData('tanggal', e.target.value)}
                        />
                        <InputError message={errors.tanggal} />
                    </div>

                    {/* Catatan */}
                    <div className="space-y-2">
                        <Label htmlFor="catatan">Catatan / Keterangan</Label>
                        <Textarea
                            id="catatan"
                            placeholder="Kronologi atau detail tambahan..."
                            value={data.catatan}
                            onChange={(e) => setData('catatan', e.target.value)}
                        />
                        <InputError message={errors.catatan} />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}