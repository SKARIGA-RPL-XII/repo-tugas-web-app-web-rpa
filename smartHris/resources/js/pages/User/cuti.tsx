import AppLayout from '@/layouts/app-layout'
import { Head, router, useForm } from '@inertiajs/react'
import { Search, Inbox, Plus } from 'lucide-react'
import { useState } from 'react'
import CutiModal from '@/components/cuti-modal'
import SuccessModal from '@/components/success-modal'

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
        status?: string
        search?: string
    }
}

const STATUS_LABEL: Record<string, string> = {
    pending: 'Menunggu',
    disetujui: 'Disetujui',
    ditolak: 'Ditolak',
}

export default function Cuti({ cuti, filters }: CutiProps) {
    const [successOpen, setSuccessOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [params, setParams] = useState({
        status: filters.status ?? '',
        search: filters.search ?? '',
    })

    const { data, setData, post, processing, reset } = useForm({
        tanggal_mulai: '',
        tanggal_selesai: '',
        alasan: '',
    })

    const handleStatusChange = (value: string) => {
        const newParams = { ...params, status: value }
        setParams(newParams)
        router.get('/cuti', newParams, { preserveState: true })
    }

    const handleSearch = () => {
        router.get('/cuti', params, { preserveState: true })
    }

    const submitCuti = (e: React.FormEvent) => {
        e.preventDefault()

        post('/cuti', {
            onSuccess: () => {
                setSuccessOpen(true)
                setIsModalOpen(false)
                reset()
            },
        })
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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <select
                        value={params.status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className={`px-4 py-2 rounded-lg text-sm border transition
              ${params.status
                                ? 'bg-[#0D4838] text-white border-[#0D4838]'
                                : 'bg-white border-gray-300 text-gray-600'
                            }`}
                    >
                        <option value="">Semua Status</option>
                        {Object.entries(STATUS_LABEL).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari alasan..."
                                value={params.search}
                                onChange={(e) =>
                                    setParams({ ...params, search: e.target.value })
                                }
                                onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
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
                                <th className="px-6 py-4">Tanggal Pengajuan</th>
                                <th className="px-6 py-4">Tanggal Cuti</th>
                                <th className="px-6 py-4">Jumlah Hari</th>
                                <th className="px-6 py-4">Alasan</th>
                                <th className="px-6 py-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cuti.data.length ? (
                                cuti.data.map((item, i) => (
                                    <tr
                                        key={item.id}
                                        className={i % 2 ? 'bg-[#E8EFED]' : 'bg-white'}
                                    >
                                        <td className="px-6 py-5">{item.tanggal_pengajuan}</td>
                                        <td className="px-6 py-5">{item.tanggal_cuti}</td>
                                        <td className="px-6 py-5">
                                            {item.jumlah_hari} hari
                                        </td>
                                        <td className="px-6 py-5">{item.alasan}</td>
                                        <td className="px-6 py-5 text-center">
                                            <span
                                                className={`px-4 py-1.5 rounded-full text-[11px] font-bold ${getStatusStyle(
                                                    item.status
                                                )}`}
                                            >
                                                {STATUS_LABEL[item.status]}
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
            </main>

            <CutiModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={submitCuti}
                processing={processing}
                data={data}
                setData={setData}
            />

            <SuccessModal
                isOpen={successOpen}
                onClose={() => setSuccessOpen(false)}
                title="Berhasil"
                message="Pengajuan cuti berhasil dikirim"
            />
        </AppLayout>
    )
}