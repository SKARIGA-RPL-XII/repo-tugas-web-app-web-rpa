import { Head, router } from '@inertiajs/react'
import { useState, useMemo } from 'react'
import { MoreHorizontal, Trash2, Pencil, Plus, Search, Eye } from 'lucide-react'

// Layout & UI
import AppLayout from '@/layouts/app-layout'
import DynamicTable, { ColumnDef } from '@/components/dynamic-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'

import PelanggaranFormModal from '@/components/pelanggaran-form-modal'
import JenisPelanggaranFormModal from '@/components/jenis-pelanggaran-modal'

// Catatan: JenisPelanggaranFormModal sudah diupdate untuk hanya menampilkan:
// - Nama Pelanggaran
// - Tingkat Pelanggaran
// - Keterangan
import SuccessModal from '@/components/success-modal'
import WarningModal from '@/components/warning-modal'
import HistorySanksiModal, { RiwayatSanksi } from '@/components/history-pelanggaran-modal'

type Pelanggaran = {
  id: number
  tanggal: string
  catatan: string
  sp?: string
  karyawan: {
    id: number
    nama: string
    jabatan: string
    departemen: string
  }
  jenis_pelanggaran: {
    id: number
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
  karyawanList: any[]
}

export default function PelanggaranPage({
  pelanggaran,
  jenisPelanggaran,
  karyawanList
}: Props) {
  const [activeTab, setActiveTab] = useState<'sanksi' | 'jenis'>('sanksi')
  const [search, setSearch] = useState('')
  
  // State Modals untuk Sanksi
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedKaryawanId, setSelectedKaryawanId] = useState<number | null>(null)
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null)
  
  // State Modals untuk Jenis Pelanggaran
  const [isJenisFormOpen, setIsJenisFormOpen] = useState(false)
  const [isDeleteJenisOpen, setIsDeleteJenisOpen] = useState(false)
  const [editJenisData, setEditJenisData] = useState<JenisPelanggaran | null>(null)
  const [selectedDeleteJenisId, setSelectedDeleteJenisId] = useState<number | null>(null)
  
  // State Global
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  
  // State untuk History Modal
  const [showHistory, setShowHistory] = useState(false)
  const [historyData, setHistoryData] = useState<RiwayatSanksi[]>([])
  const [loadingHistory, setLoadingHistory] = useState(false)

  // Handlers untuk Sanksi
  const openEditSanksi = (item: Pelanggaran) => {
    setSelectedKaryawanId(item.karyawan.id)
    setIsFormOpen(true)
  }

  const openDeleteConfirm = (id: number) => {
    setSelectedDeleteId(id)
    setIsDeleteOpen(true)
  }

  const handleDelete = () => {
    if (selectedDeleteId) {
      router.delete(`/app/pelanggaran/${selectedDeleteId}`, {
        onSuccess: () => {
          setIsDeleteOpen(false)
          handleActionSuccess("Data sanksi berhasil dihapus")
        },
        onError: (errors) => {
          console.error('Error deleting:', errors)
          setIsDeleteOpen(false)
        }
      })
    }
  }

  // Handlers untuk Jenis Pelanggaran
  const openTambahJenisPelanggaran = () => {
    setEditJenisData(null)
    setIsJenisFormOpen(true)
  }

  const openEditJenisPelanggaran = (item: JenisPelanggaran) => {
    setEditJenisData(item)
    setIsJenisFormOpen(true)
  }

  const openDeleteJenisConfirm = (id: number) => {
    setSelectedDeleteJenisId(id)
    setIsDeleteJenisOpen(true)
  }

  const handleDeleteJenis = () => {
    if (selectedDeleteJenisId) {
      router.delete(`/jenis-pelanggaran/${selectedDeleteJenisId}`, {
        onSuccess: () => {
          setIsDeleteJenisOpen(false)
          handleActionSuccess("Jenis pelanggaran berhasil dihapus")
        },
        onError: (errors) => {
          console.error('Error deleting:', errors)
          setIsDeleteJenisOpen(false)
        }
      })
    }
  }

  // Handler Global
  const handleActionSuccess = (message: string) => {
    setSuccessMessage(message)
    setIsSuccessOpen(true)
  }

  const openHistorySanksi = (item: Pelanggaran) => {
    setLoadingHistory(true)
    setShowHistory(true)
    
    fetch(`/app/pelanggaran/history/${item.karyawan.id}`)
      .then(res => res.json())
      .then(data => {
        const history: RiwayatSanksi[] = data.map((record: any) => ({
          id: record.id,
          nama_pelanggaran: record.jenis_pelanggaran?.nama || 'Tidak ada data',
          tingkat: record.jenis_pelanggaran?.tingkat || 'ringan',
          sp: record.sp || null,
          catatan: record.catatan || null,
          tanggal: record.tanggal,
          pemberi: 'Manager'
        }))
        
        setHistoryData(history)
        setLoadingHistory(false)
      })
      .catch(error => {
        console.error('Error fetching history:', error)
        setHistoryData([])
        setLoadingHistory(false)
      })
  }

  // Column Definitions
  const COLUMNS_SANKSI: ColumnDef<Pelanggaran>[] = [
    { header: 'No', className: 'w-16 text-center', render: (_, i) => i + 1 },
    { header: 'Karyawan', render: i => i.karyawan.nama },
    { header: 'Jabatan', render: i => i.karyawan.jabatan },
    { header: 'Departemen', render: i => i.karyawan.departemen },
    { header: 'Pelanggaran', render: i => i.jenis_pelanggaran.nama },
    { header: 'Tanggal', render: i => i.tanggal },
    {
      header: '',
      className: 'w-12',
      render: (item) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => openEditSanksi(item)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => openHistorySanksi(item)}>
              <Eye className="mr-2 h-4 w-4" />
              History
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-red-600"
              onClick={() => openDeleteConfirm(item.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]

  const COLUMNS_JENIS: ColumnDef<JenisPelanggaran>[] = [
    { header: 'No', className: 'w-16 text-center', render: (_, i) => i + 1 },
    { header: 'Nama Pelanggaran', render: i => i.nama_pelanggaran },
    { header: 'Tingkat', render: i => i.tingkat },
    { header: 'Keterangan', render: i => i.keterangan ?? '-' },
    {
      header: '',
      className: 'w-12',
      render: (item) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => openEditJenisPelanggaran(item)}>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-red-600"
              onClick={() => openDeleteJenisConfirm(item.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]

  const filteredSanksi = useMemo(() => {
    return pelanggaran.filter(item =>
      item.karyawan.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.jenis_pelanggaran.nama.toLowerCase().includes(search.toLowerCase())
    )
  }, [pelanggaran, search])

  const filteredJenis = useMemo(() => {
    return jenisPelanggaran.filter(item =>
      item.nama_pelanggaran.toLowerCase().includes(search.toLowerCase()) ||
      item.tingkat.toLowerCase().includes(search.toLowerCase())
    )
  }, [jenisPelanggaran, search])

  const headerSlotSanksi = useMemo(
    () => (
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('sanksi')}
            className={`border-b-2 pb-2 text-sm font-semibold transition-colors ${
              activeTab === 'sanksi'
                ? 'border-[#114F38] text-[#114F38]'
                : 'border-transparent text-gray-400'
            }`}
          >
            Sanksi Karyawan
          </button>
          <button
            onClick={() => setActiveTab('jenis')}
            className={`border-b-2 pb-2 text-sm font-semibold transition-colors ${
              activeTab === 'jenis'
                ? 'border-[#114F38] text-[#114F38]'
                : 'border-transparent text-gray-400'
            }`}
          >
            Jenis Pelanggaran
          </button>
        </div>

        <div className="flex gap-3">
          <div className="relative w-72">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="pl-10"
            />
          </div>
          {activeTab === 'jenis' && (
            <Button
              onClick={openTambahJenisPelanggaran}
              className="bg-[#114F38] hover:bg-[#0d3f2d]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Tambah Jenis Pelanggaran
            </Button>
          )}
        </div>
      </div>
    ),
    [search, activeTab],
  )

  return (
    <AppLayout>
      <Head title="Pelanggaran Karyawan" />

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Pelanggaran Karyawan</h1>
      </div>

      {activeTab === 'sanksi' ? (
        <DynamicTable<Pelanggaran>
          title=""
          data={filteredSanksi}
          columns={COLUMNS_SANKSI}
          headerSlot={headerSlotSanksi}
        />
      ) : (
        <DynamicTable<JenisPelanggaran>
          title=""
          data={filteredJenis}
          columns={COLUMNS_JENIS}
          headerSlot={headerSlotSanksi}
        />
      )}

      {/* SANKSI MODALS */}
      <PelanggaranFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        karyawanList={karyawanList}
        jenisPelanggaranList={jenisPelanggaran.map(j => ({ id: j.id, nama_pelanggaran: j.nama_pelanggaran }))}
        defaultKaryawanId={selectedKaryawanId}
        onSuccess={handleActionSuccess}
      />

      <WarningModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Hapus Sanksi"
        message="Apakah Anda yakin ingin menghapus data sanksi ini? Tindakan ini tidak dapat dibatalkan."
        confirmLabel="Ya, Hapus"
      />

      {/* JENIS PELANGGARAN MODALS */}
      <JenisPelanggaranFormModal
        isOpen={isJenisFormOpen}
        onClose={() => setIsJenisFormOpen(false)}
        onSuccess={handleActionSuccess}
        editData={editJenisData}
      />

      <WarningModal
        isOpen={isDeleteJenisOpen}
        onClose={() => setIsDeleteJenisOpen(false)}
        onConfirm={handleDeleteJenis}
        title="Hapus Jenis Pelanggaran"
        message="Apakah Anda yakin ingin menghapus jenis pelanggaran ini? Tindakan ini tidak dapat dibatalkan."
        confirmLabel="Ya, Hapus"
      />

      {/* GLOBAL MODALS */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        message={successMessage}
      />

      <HistorySanksiModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        data={historyData}
        loading={loadingHistory}
      />
    </AppLayout>
  )
}