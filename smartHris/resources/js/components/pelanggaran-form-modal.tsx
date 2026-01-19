import { router } from '@inertiajs/react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

type FormData = {
    karyawan_id: string
    jenis_pelanggaran_id: string
    tanggal: string
    catatan: string
}

type Props = {
    isOpen: boolean
    onClose: () => void
    data?: any
    karyawan?: any[]
    jenisPelanggaran?: any[]
}

export default function PelanggaranFormModal({
    isOpen,
    onClose,
    data,
    karyawan = [],
    jenisPelanggaran = []
}: Props) {
    const [form, setForm] = useState<FormData>({
        karyawan_id: '',
        jenis_pelanggaran_id: '',
        tanggal: '',
        catatan: ''
    })

    const isEdit = Boolean(data)

    useEffect(() => {
        if (data) {
            setForm({
                karyawan_id: String(data.karyawan_id ?? ''),
                jenis_pelanggaran_id: String(data.jenis_pelanggaran_id ?? ''),
                tanggal: data.tanggal ?? '',
                catatan: data.catatan ?? ''
            })
        }
    }, [data])

    if (!isOpen) return null

    const submit = () => {
        if (!form.karyawan_id || !form.jenis_pelanggaran_id || !form.tanggal) {
            alert('Lengkapi data wajib')
            return
        }

        if (isEdit) {
            router.put(`/app/pelanggaran/${data.id}`, form, {
                preserveScroll: true
            })
        } else {
            router.post('/app/pelanggaran', form, {
                preserveScroll: true
            })
        }

        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="mb-6 text-lg font-bold text-gray-900">
                    {isEdit ? 'Edit Pelanggaran' : 'Tambah Pelanggaran'}
                </h2>

                {/* Karyawan */}
                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Karyawan
                    </label>
                    <select
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#114F38] focus:outline-none"
                        value={form.karyawan_id}
                        onChange={(e) =>
                            setForm({ ...form, karyawan_id: e.target.value })
                        }
                    >
                        <option value="">Pilih Karyawan</option>
                        {karyawan.map((k) => (
                            <option key={k.id} value={k.id}>
                                {k.nama}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Jenis Pelanggaran */}
                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Jenis Pelanggaran
                    </label>
                    <select
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#114F38] focus:outline-none"
                        value={form.jenis_pelanggaran_id}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                jenis_pelanggaran_id: e.target.value
                            })
                        }
                    >
                        <option value="">Pilih Jenis</option>
                        {jenisPelanggaran.map((j) => (
                            <option key={j.id} value={j.id}>
                                {j.nama}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tanggal */}
                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Tanggal
                    </label>
                    <input
                        type="date"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#114F38] focus:outline-none"
                        value={form.tanggal}
                        onChange={(e) =>
                            setForm({ ...form, tanggal: e.target.value })
                        }
                    />
                </div>

                {/* Catatan */}
                <div className="mb-6">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Catatan
                    </label>
                    <textarea
                        rows={3}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#114F38] focus:outline-none"
                        placeholder="Catatan tambahan (opsional)"
                        value={form.catatan}
                        onChange={(e) =>
                            setForm({ ...form, catatan: e.target.value })
                        }
                    />
                </div>

                {/* Action */}
                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="border-gray-200 text-gray-700"
                    >
                        Batal
                    </Button>

                    <Button
                        onClick={submit}
                        className="bg-[#114F38] hover:bg-[#0d3f2d]"
                    >
                        Simpan
                    </Button>
                </div>
            </div>
        </div>
    )
}
