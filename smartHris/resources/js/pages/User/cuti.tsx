import AppLayout from '@/layouts/app-layout'
import { Head, router, useForm } from '@inertiajs/react'
import { Search, Inbox, X, Plus, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

type AuthUser = {
    id: number
    name: string
    email?: string
    role?: 'admin' | 'user'
}

interface CutiData {
    id: number
    tanggal_pengajuan: string
    tanggal_cuti: string
    jumlah_hari: number
    alasan: string
    status: 'ditolak' | 'disetujui' | 'menunggu' | 'pending'
}

interface PaginationLink {
    url: string | null
    label: string
    active: boolean
}

interface CutiProps {
    auth: { user: AuthUser }
    cuti: {
        data: CutiData[]
        links: PaginationLink[]
    }
    filters: {
        bulan?: string
        status?: string
        search?: string
    }
}

export default function Cuti({ cuti, filters }: CutiProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const [params, setParams] = useState({
        bulan: filters.bulan ?? '',
        status: filters.status ?? '',
        search: filters.search ?? '',
    })

    const { data, setData, post, processing, reset } = useForm({
        tanggal_mulai: '',
        tanggal_selesai: '',
        alasan: '',
    })

    const handleFilter = () => {
        router.get('/cuti', params, { preserveState: true })
    }

    const submitCuti = (e: React.FormEvent) => {
        e.preventDefault()
        post('/cuti', {
            onSuccess: () => {
                setIsSuccess(true)
                reset()
            },
        })
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setIsSuccess(false)
    }

    const getStatusStyle = (status: CutiData['status']) => {
        switch (status) {
            case 'ditolak':
                return 'bg-red-50 text-red-600 border border-red-100'
            case 'disetujui':
                return 'bg-green-50 text-green-600 border border-green-100'
            case 'menunggu':
            case 'pending':
                return 'bg-orange-50 text-orange-600 border border-orange-100'
            default:
                return 'bg-gray-50 text-gray-600'
        }
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Cuti', href: '/cuti' }]}>
            <Head title="Data Cuti" />

            <main className="p-8 space-y-6 bg-gray-50 min-h-screen">
                {/* ================= FILTER ================= */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <input
                            type="month"
                            value={params.bulan}
                            onChange={(e) =>
                                setParams({ ...params, bulan: e.target.value })
                            }
                            className="bg-[#0D4838] text-white px-4 py-2 rounded-lg text-sm"
                        />

                        <select
                            value={params.status}
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    status: e.target.value,
                                })
                            }
                            className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm"
                        >
                            <option value="">Semua Status</option>
                            <option value="pending">Menunggu</option>
                            <option value="disetujui">Disetujui</option>
                            <option value="ditolak">Ditolak</option>
                        </select>

                        <button
                            onClick={handleFilter}
                            className="px-5 py-2 border border-[#0D4838] text-[#0D4838] rounded-lg text-sm font-semibold"
                        >
                            Terapkan
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari alasan..."
                                value={params.search}
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        search: e.target.value,
                                    })
                                }
                                onKeyUp={(e) =>
                                    e.key === 'Enter' && handleFilter()
                                }
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm"
                            />
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 bg-[#0D4838] text-white px-5 py-2 rounded-lg text-sm font-semibold"
                        >
                            <Plus className="w-4 h-4" />
                            Ajukan Cuti
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                    <table className="w-full text-sm">
                        <thead className="bg-[#0D4838] text-white">
                            <tr>
                                <th className="px-6 py-4">
                                    Tanggal Pengajuan
                                </th>
                                <th className="px-6 py-4">Tanggal Cuti</th>
                                <th className="px-6 py-4">Jumlah Hari</th>
                                <th className="px-6 py-4">Alasan</th>
                                <th className="px-6 py-4 text-center">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cuti.data.length ? (
                                cuti.data.map((item, i) => (
                                    <tr
                                        key={item.id}
                                        className={
                                            i % 2
                                                ? 'bg-[#E8EFED]'
                                                : 'bg-white'
                                        }
                                    >
                                        <td className="px-6 py-5">
                                            {item.tanggal_pengajuan}
                                        </td>
                                        <td className="px-6 py-5">
                                            {item.tanggal_cuti}
                                        </td>
                                        <td className="px-6 py-5">
                                            {item.jumlah_hari} hari
                                        </td>
                                        <td className="px-6 py-5">
                                            {item.alasan}
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span
                                                className={`px-4 py-1.5 rounded-full text-[11px] font-bold ${getStatusStyle(
                                                    item.status
                                                )}`}
                                            >
                                                {item.status === 'pending'
                                                    ? 'Menunggu'
                                                    : item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-6 py-20 text-center text-gray-400"
                                    >
                                        <Inbox className="mx-auto mb-2 opacity-20" />
                                        Belum ada data cuti
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center gap-2">
                    {cuti.links.map((link, i) => (
                        <button
                            key={i}
                            disabled={!link.url}
                            onClick={() =>
                                link.url && router.get(link.url, params)
                            }
                            className={`px-4 py-2 rounded-lg text-xs font-bold ${
                                link.active
                                    ? 'bg-[#0D4838] text-white'
                                    : 'bg-white text-gray-400 border'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    {!isSuccess ? (
                        <div className="bg-white rounded-3xl w-full max-w-2xl p-8">
                            <div className="flex justify-between mb-6">
                                <h2 className="text-2xl font-bold">
                                    Pengajuan Cuti
                                </h2>
                                <button onClick={closeModal}>
                                    <X />
                                </button>
                            </div>

                            <form
                                onSubmit={submitCuti}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-2 gap-6">
                                    <input
                                        type="date"
                                        value={data.tanggal_mulai}
                                        onChange={(e) =>
                                            setData(
                                                'tanggal_mulai',
                                                e.target.value
                                            )
                                        }
                                        className="p-3 border rounded-xl"
                                        required
                                    />
                                    <input
                                        type="date"
                                        value={data.tanggal_selesai}
                                        onChange={(e) =>
                                            setData(
                                                'tanggal_selesai',
                                                e.target.value
                                            )
                                        }
                                        className="p-3 border rounded-xl"
                                        required
                                    />
                                </div>

                                <textarea
                                    value={data.alasan}
                                    onChange={(e) =>
                                        setData('alasan', e.target.value)
                                    }
                                    className="w-full p-4 border rounded-xl"
                                    rows={4}
                                    required
                                />

                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="flex-1 py-3 border rounded-xl"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 py-3 bg-[#0D4838] text-white rounded-xl"
                                    >
                                        {processing
                                            ? 'Mengirim...'
                                            : 'Kirim'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl w-full max-w-sm p-8 text-center">
                            <CheckCircle2 className="mx-auto text-green-500 w-16 h-16 mb-4" />
                            <h2 className="text-2xl font-bold mb-2">
                                Berhasil
                            </h2>
                            <button
                                onClick={closeModal}
                                className="w-full py-3 bg-[#0D4838] text-white rounded-xl"
                            >
                                Selesai
                            </button>
                        </div>
                    )}
                </div>
            )}
        </AppLayout>
    )
}