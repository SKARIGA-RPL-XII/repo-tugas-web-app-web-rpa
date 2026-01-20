  import { Head } from '@inertiajs/react'
  import { useState, useMemo } from 'react'
  import { MoreHorizontal, Trash2, Pencil, Plus, Search, Eye } from 'lucide-react'

  // Layout & UI
  import AppLayout from '@/layouts/app-layout'
  import DynamicTable, { ColumnDef } from '@/components/dynamic-table'
  import ProfileMenu from '@/components/profile-menu'
  import { Button } from '@/components/ui/button'
  import { Input } from '@/components/ui/input'
  import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
  } from '@/components/ui/dropdown-menu'

  import PelanggaranFormModal from '@/components/pelanggaran-form-modal'
  import SuccessModal from '@/components/success-modal'
  import WarningModal from '@/components/warning-modal'

  type Pelanggaran = {
    id: number
    tanggal: string
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
    karyawanList: any[] // Pastikan data ini dikirim dari controller
  }

  export default function PelanggaranPage({
    pelanggaran,
    jenisPelanggaran,
    karyawanList
  }: Props) {
    const [activeTab, setActiveTab] = useState<'sanksi' | 'jenis'>('sanksi')
    const [search, setSearch] = useState('')
    
    // State Modals
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isSuccessOpen, setIsSuccessOpen] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [selectedKaryawanId, setSelectedKaryawanId] = useState<number | null>(null)
    const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null)

    // Handlers
    const openTambahSanksi = () => {
      setSelectedKaryawanId(null)
      setIsFormOpen(true)
    }

    const openEditSanksi = (item: Pelanggaran) => {
      setSelectedKaryawanId(item.karyawan.id)
      setIsFormOpen(true)
    }

    const openDeleteConfirm = (id: number) => {
      setSelectedDeleteId(id)
      setIsDeleteOpen(true)
    }

    const handleActionSuccess = (message: string) => {
      setSuccessMessage(message)
      setIsSuccessOpen(true)
    }

    const handleDelete = () => {
      // Logika hapus di sini (Inertia.delete)
      console.log("Menghapus ID:", selectedDeleteId)
      setIsDeleteOpen(false)
      handleActionSuccess("Data sanksi berhasil dihapus")
    }

    // Columns Sanksi (Pindah ke dalam agar bisa akses handler)
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
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" /> History
              </DropdownMenuItem>
              <DropdownMenuItem 
                  className="text-red-600" 
                  onClick={() => openDeleteConfirm(item.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Hapus
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
        render: () => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
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

    const headerSlotSanksi = useMemo(() => (
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('sanksi')}
            className={`pb-2 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'sanksi' ? 'border-[#114F38] text-[#114F38]' : 'border-transparent text-gray-400'
            }`}
          >
            Sanksi Karyawan
          </button>
          <button
            onClick={() => setActiveTab('jenis')}
            className={`pb-2 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'jenis' ? 'border-[#114F38] text-[#114F38]' : 'border-transparent text-gray-400'
            }`}
          >
            Jenis Pelanggaran
          </button>
        </div>

        <div className="flex gap-3">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              className="pl-10"
            />
          </div>
          <Button onClick={openTambahSanksi} className="bg-[#114F38] hover:bg-[#0d3f2d]">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Sanksi
          </Button>
        </div>
      </div>
    ), [search, activeTab])

    return (
      <AppLayout>
        <Head title="Pelanggaran Karyawan" />

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Pelanggaran Karyawan</h1>
          <ProfileMenu />
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

        {/* MODAL COMPONENTS */}
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

        <SuccessModal
          isOpen={isSuccessOpen}
          onClose={() => setIsSuccessOpen(false)}
          message={successMessage}
        />

      </AppLayout>
    )
  }