import { Head } from '@inertiajs/react'
import { useState } from 'react'
import { MoreHorizontal, Trash2, Pencil, Plus } from 'lucide-react'

import AppLayout from '@/layouts/app-layout'
import DynamicTable, { ColumnDef } from '@/components/dynamic-table'
import ConfirmDeleteModal from '@/components/confirm-delete-modal'
import PelanggaranFormModal from '@/components/pelanggaran-form-modal'
import ProfileMenu from '@/components/profile-menu'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from '@/components/ui/dropdown-menu'

/* ================= TYPES ================= */

type Pelanggaran = {
    id: number
    tanggal: string
    karyawan: {
        nama: string
        jabatan: string
        departemen: string
    }
    jenis_pelanggaran: {
        nama: string
    }
}

type JenisPelanggaran = {
    id: number
    nama_pelanggaran: string
    tingkat: string
    keterangan?: string
}

type Props = {
    pelanggaran: Pelanggaran[]
    jenisPelanggaran: JenisPelanggaran[]
    karyawan: any[]
}

/* ================= PAGE ================= */

export default function PelanggaranPage({
    pelanggaran,
    jenisPelanggaran,
    karyawan
}: Props) {
    const [activeTab, setActiveTab] = useState<'sanksi' | 'jenis'>('sanksi')
    const [showForm, setShowForm] = useState(false)
    const [selected, setSelected] = useState<any>(null)

    /* ================= COLUMNS ================= */

    const columnsSanksi: ColumnDef<Pelanggaran>[] = [
        {
            header: 'No',
            className: 'w-16 text-center',
            render: (_, i) => i + 1
        },
        {
            header: 'Karyawan',
            render: (item) => item.karyawan.nama
        },
        {
            header: 'Jabatan',
            render: (item) => item.karyawan.jabatan
        },
        {
            header: 'Departemen',
            render: (item) => item.karyawan.departemen
        },
        {
            header: 'Pelanggaran',
            render: (item) => item.jenis_pelanggaran.nama
        },
        {
            header: 'Tanggal',
            render: (item) => item.tanggal
        },
        {
            header: '',
            render: () => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    ]

    const columnsJenis: ColumnDef<JenisPelanggaran>[] = [
        {
            header: 'No',
            className: 'w-16 text-center',
            render: (_, i) => i + 1
        },
        {
            header: 'Nama Pelanggaran',
            render: (item) => item.nama_pelanggaran
        },
        {
            header: 'Tingkat',
            render: (item) => item.tingkat
        },
        {
            header: 'Keterangan',
            render: (item) => item.keterangan ?? '-'
        },
        {
            header: '',
            render: () => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    ]

    return (
        <AppLayout>
            <Head title="Pelanggaran Karyawan" />

            {/* ===== HEADER ATAS ===== */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-900">
                    Pelanggaran Karyawan
                </h1>
                <ProfileMenu />
            </div>

            {/* ===== CARD ===== */}
            <div className="rounded-2xl bg-white shadow-sm">
                {/* TAB + SEARCH + BUTTON */}
                <div className="flex items-center justify-between border-b px-6 pt-6">
                    <div className="flex gap-6">
                        <button
                            onClick={() => setActiveTab('sanksi')}
                            className={`pb-3 text-sm font-semibold ${
                                activeTab === 'sanksi'
                                    ? 'text-[#114F38] border-b-2 border-[#114F38]'
                                    : 'text-gray-400'
                            }`}
                        >
                            Sanksi Karyawan
                        </button>

                        <button
                            onClick={() => setActiveTab('jenis')}
                            className={`pb-3 text-sm font-semibold ${
                                activeTab === 'jenis'
                                    ? 'text-[#114F38] border-b-2 border-[#114F38]'
                                    : 'text-gray-400'
                            }`}
                        >
                            Jenis Pelanggaran
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        {activeTab === 'jenis' && (
                            <Button className="bg-[#114F38] hover:bg-[#0d3f2d]">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Jenis Pelanggaran
                            </Button>
                        )}
                    </div>
                </div>

                {/* TABLE */}
                <div className="p-6">
                    {activeTab === 'sanksi' && (
                        <DynamicTable
                            title=""
                            data={pelanggaran}
                            columns={columnsSanksi}
                            searchKeys={[]}
                        />
                    )}

                    {activeTab === 'jenis' && (
                        <DynamicTable
                            title=""
                            data={jenisPelanggaran}
                            columns={columnsJenis}
                            searchKeys={[]}
                        />
                    )}
                </div>
            </div>

            {/* MODAL (kalau mau dipakai) */}
            <PelanggaranFormModal
                isOpen={showForm}
                onClose={() => setShowForm(false)}
                data={selected}
                karyawan={karyawan}
                jenisPelanggaran={jenisPelanggaran}
            />

            <ConfirmDeleteModal
                isOpen={false}
                onClose={() => {}}
                onConfirm={() => {}}
                processing={false}
                inputType="pelanggaran"
            />
        </AppLayout>
    )
}
