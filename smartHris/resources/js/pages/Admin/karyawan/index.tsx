import { Head, router } from '@inertiajs/react'
import { useState } from 'react'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'

import AppLayout from '@/layouts/app-layout'
import DynamicTable, { ColumnDef } from '@/components/dynamic-table'
import ConfirmDeleteModal from '@/components/confirm-delete-modal'
import SuccessModal from '@/components/success-modal'
import PelanggaranFormModal from '@/components/pelanggaran-form-modal'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from '@/components/ui/dropdown-menu'

type Pelanggaran = {
    id: number
    tanggal: string
    catatan?: string
    karyawan?: {
        nama: string
        nip?: string
        jabatan?: string
        departemen?: string
    }
    jenis_pelanggaran?: {
        nama: string
    }
}

type PageProps = {
    pelanggaran: Pelanggaran[]
    karyawan: any[]
    jenisPelanggaran: any[]
}

export default function SanksiKaryawan({
    pelanggaran,
    karyawan,
    jenisPelanggaran
}: PageProps) {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [selected, setSelected] = useState<Pelanggaran | null>(null)

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')

    const handleEdit = (item: Pelanggaran) => {
        setSelected(item)
        setIsFormOpen(true)
    }

    const handleDeleteClick = (item: Pelanggaran) => {
        setSelected(item)
        setIsDeleteModalOpen(true)
    }

    const confirmDelete = () => {
        if (!selected) return

        router.delete(`/app/pelanggaran/${selected.id}`, {
            onBefore: () => setIsDeleting(true),
            onSuccess: () => {
                setIsDeleteModalOpen(false)
                setSelected(null)
                setSuccessMessage('Data sanksi berhasil dihapus.')
                setShowSuccessModal(true)
            },
            onFinish: () => setIsDeleting(false),
            preserveScroll: true
        })
    }

    const columns: ColumnDef<Pelanggaran>[] = [
        {
            header: 'No',
            className: 'w-24 pl-8 text-center',
            render: (_, index) => (
                <span className="text-gray-500">{index + 1}</span>
            )
        },
        {
            header: 'Karyawan',
            render: (item) => (
                <div className="flex flex-col gap-1">
                    <span className="font-medium text-gray-900">
                        {item.karyawan?.nama ?? '-'}
                    </span>
                    {item.karyawan?.nip && (
                        <span className="text-xs text-gray-500">
                            NIP: {item.karyawan.nip}
                        </span>
                    )}
                </div>
            )
        },
        {
            header: 'Jabatan',
            render: (item) => (
                <span className="font-medium text-gray-700">
                    {item.karyawan?.jabatan ?? '-'}
                </span>
            )
        },
        {
            header: 'Departemen',
            render: (item) => (
                <span className="text-gray-600">
                    {item.karyawan?.departemen ?? '-'}
                </span>
            )
        },
        {
            header: 'Pelanggaran',
            render: (item) => (
                <span className="font-medium text-gray-900">
                    {item.jenis_pelanggaran?.nama ?? '-'}
                </span>
            )
        },
        {
            header: 'Tanggal',
            render: (item) => (
                <span className="font-medium text-gray-900">
                    {item.tanggal}
                </span>
            )
        },
        {
            header: '',
            id: 'actions',
            className: 'w-10 px-0',
            render: (item) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 text-gray-400 hover:bg-gray-100 hover:text-gray-900
                            focus-visible:ring-0 focus-visible:ring-offset-0
                            data-[state=open]:bg-gray-100"
                        >
                            <MoreHorizontal className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        className="w-40 rounded-xl border border-gray-100 bg-white p-1 shadow-lg"
                    >
                        <DropdownMenuItem
                            onClick={() => handleEdit(item)}
                            className="cursor-pointer gap-3 rounded-lg px-3 py-2.5
                            text-gray-600 focus:bg-gray-50 focus:text-gray-900"
                        >
                            <Pencil className="h-4 w-4" />
                            <span className="font-medium">Edit</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() => handleDeleteClick(item)}
                            className="cursor-pointer gap-3 rounded-lg px-3 py-2.5
                            text-red-600 focus:bg-red-50 focus:text-red-700"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="font-medium">Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    ]

    return (
        <AppLayout>
            <Head title="Sanksi Karyawan" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">

                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                            Sanksi Karyawan
                        </h2>
                    </div>

                    <DynamicTable
                        title="Data Sanksi Karyawan"
                        data={pelanggaran}
                        columns={columns}
                        searchKeys={[
                            'karyawan.nama',
                            'karyawan.jabatan',
                            'karyawan.departemen',
                            'jenis_pelanggaran.nama'
                        ]}
                    />
                </div>
            </div>

            {/* MODAL FORM */}
            <PelanggaranFormModal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                data={selected}
                karyawan={karyawan}
                jenisPelanggaran={jenisPelanggaran}
            />

            {/* MODAL DELETE */}
            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                processing={isDeleting}
                inputType="pelanggaran"
            />

            {/* MODAL SUCCESS */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                title="Berhasil"
                message={successMessage}
            />
        </AppLayout>
    )
}
    