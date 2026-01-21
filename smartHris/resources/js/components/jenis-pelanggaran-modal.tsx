import { router } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

type JenisPelanggaranFormData = {
    nama_pelanggaran: string;
    tingkat: 'ringan' | 'sedang' | 'berat' | '';
    keterangan: string;
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (message: string) => void;
    editData?: {
        id: number;
        nama_pelanggaran: string;
        tingkat: string;
        keterangan?: string;
    } | null;
};

export default function JenisPelanggaranFormModal({
    isOpen,
    onClose,
    onSuccess,
    editData = null,
}: Props) {
    const [formData, setFormData] = useState<JenisPelanggaranFormData>({
        nama_pelanggaran: '',
        tingkat: '',
        keterangan: '',
    });
    const [errors, setErrors] = useState<Partial<Record<keyof JenisPelanggaranFormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            if (editData) {
                setFormData({
                    nama_pelanggaran: editData.nama_pelanggaran || '',
                    tingkat: editData.tingkat as 'ringan' | 'sedang' | 'berat',
                    keterangan: editData.keterangan || '',
                });
            } else {
                setFormData({
                    nama_pelanggaran: '',
                    tingkat: '',
                    keterangan: '',
                });
            }
            setErrors({});
            setIsSubmitting(false);
        }
    }, [isOpen, editData]);

    const handleChange = (
        field: keyof JenisPelanggaranFormData,
        value: string,
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const validate = () => {
        const newErrors: Partial<Record<keyof JenisPelanggaranFormData, string>> = {};

        if (!formData.nama_pelanggaran.trim()) {
            newErrors.nama_pelanggaran = 'Nama pelanggaran harus diisi';
        }

        if (!formData.tingkat) {
            newErrors.tingkat = 'Tingkat pelanggaran harus dipilih';
        }

        if (!formData.keterangan.trim()) {
            newErrors.keterangan = 'Keterangan harus diisi';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        
        if (!validate()) return;

        setIsSubmitting(true);

        const dataToSend = {
            nama_pelanggaran: formData.nama_pelanggaran,
            tingkat: formData.tingkat,
            keterangan: formData.keterangan,
        };

        if (editData) {
            router.put(`/jenis-pelanggaran/${editData.id}`, dataToSend, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSubmitting(false);
                    onClose();
                    onSuccess('Jenis pelanggaran berhasil diperbarui');
                },
                onError: (errors) => {
                    setIsSubmitting(false);
                    console.error('Error updating:', errors);
                    if (errors && typeof errors === 'object') {
                        setErrors(errors as any);
                    }
                },
            });
        } else {
            router.post('/jenis-pelanggaran', dataToSend, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSubmitting(false);
                    onClose();
                    onSuccess('Jenis pelanggaran berhasil ditambahkan');
                },
                onError: (errors) => {
                    setIsSubmitting(false);
                    console.error('Error creating:', errors);
                    if (errors && typeof errors === 'object') {
                        setErrors(errors as any);
                    }
                },
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 transition-colors hover:text-gray-600"
                    disabled={isSubmitting}
                >
                    <X className="h-5 w-5" />
                </button>

                <h2 className="mb-6 text-xl font-semibold text-gray-900">
                    {editData ? 'Edit Jenis Pelanggaran' : 'Tambah Jenis Pelanggaran'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nama Pelanggaran */}
                    <div>
                        <Label htmlFor="nama_pelanggaran" className="text-sm font-medium text-gray-700">
                            Pelanggaran <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="nama_pelanggaran"
                            value={formData.nama_pelanggaran}
                            onChange={(e) => handleChange('nama_pelanggaran', e.target.value)}
                            placeholder="Masukkan Nama Pelanggaran"
                            className={`mt-1 ${errors.nama_pelanggaran ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                            disabled={isSubmitting}
                        />
                        {errors.nama_pelanggaran && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.nama_pelanggaran}
                            </p>
                        )}
                    </div>

                    {/* Tingkat Pelanggaran */}
                    <div>
                        <Label htmlFor="tingkat" className="text-sm font-medium text-gray-700">
                            Tingkat Pelanggaran <span className="text-red-500">*</span>
                        </Label>
                        <Select
                            value={formData.tingkat}
                            onValueChange={(value) => handleChange('tingkat', value)}
                            disabled={isSubmitting}
                        >
                            <SelectTrigger
                                className={`mt-1 ${errors.tingkat ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                            >
                                <SelectValue placeholder="--Pilih--" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ringan">Ringan</SelectItem>
                                <SelectItem value="sedang">Sedang</SelectItem>
                                <SelectItem value="berat">Berat</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.tingkat && (
                            <p className="mt-1 text-sm text-red-500">{errors.tingkat}</p>
                        )}
                    </div>

                    {/* Keterangan */}
                    <div>
                        <Label htmlFor="keterangan" className="text-sm font-medium text-gray-700">
                            Keterangan <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                            id="keterangan"
                            value={formData.keterangan}
                            onChange={(e) => handleChange('keterangan', e.target.value)}
                            placeholder="Masukkan Keterangan"
                            rows={4}
                            className={`mt-1 resize-none ${errors.keterangan ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                            disabled={isSubmitting}
                        />
                        {errors.keterangan && (
                            <p className="mt-1 text-sm text-red-500">{errors.keterangan}</p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                            disabled={isSubmitting}
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 bg-[#114F38] text-white hover:bg-[#0d3f2d]"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? 'Menyimpan...'
                                : editData
                                  ? 'Update'
                                  : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}