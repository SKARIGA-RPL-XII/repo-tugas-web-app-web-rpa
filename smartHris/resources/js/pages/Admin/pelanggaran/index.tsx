import { Head } from '@inertiajs/react'
import { useState } from 'react'
import { MoreHorizontal, Trash2, Pencil, Plus, Search } from 'lucide-react'

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
}

/* ================= PAGE ================= */

export default function PelanggaranPage({
  pelanggaran,
  jenisPelanggaran
}: Props) {
  const [activeTab, setActiveTab] = useState<'sanksi' | 'jenis'>('sanksi')
  const [search, setSearch] = useState('')

  const filteredSanksi = pelanggaran.filter(item =>
    item.karyawan.nama.toLowerCase().includes(search.toLowerCase()) ||
    item.jenis_pelanggaran.nama.toLowerCase().includes(search.toLowerCase())
  )

  const filteredJenis = jenisPelanggaran.filter(item =>
    item.nama_pelanggaran.toLowerCase().includes(search.toLowerCase()) ||
    item.tingkat.toLowerCase().includes(search.toLowerCase())
  )

  const columnsSanksi: ColumnDef<Pelanggaran>[] = [
    { header: 'No', className: 'w-16 text-center', render: (_, i) => i + 1 },
    { header: 'Karyawan', render: i => i.karyawan.nama },
    { header: 'Jabatan', render: i => i.karyawan.jabatan },
    { header: 'Departemen', render: i => i.karyawan.departemen },
    { header: 'Pelanggaran', render: i => i.jenis_pelanggaran.nama },
    { header: 'Tanggal', render: i => i.tanggal },
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
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" /> Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]

  const columnsJenis: ColumnDef<JenisPelanggaran>[] = [
    { header: 'No', className: 'w-16 text-center', render: (_, i) => i + 1 },
    { header: 'Nama Pelanggaran', render: i => i.nama_pelanggaran },
    { header: 'Tingkat', render: i => i.tingkat },
    { header: 'Keterangan', render: i => i.keterangan ?? '-' }
  ]

  return (
    <AppLayout>
      <Head title="Pelanggaran Karyawan" />

      {/* PAGE HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Pelanggaran Karyawan</h1>
        <ProfileMenu />
      </div>

      {/* TABLE */}
<DynamicTable
  title=""
  data={activeTab === 'sanksi' ? filteredSanksi : filteredJenis}
  columns={activeTab === 'sanksi' ? columnsSanksi : columnsJenis}
  headerSlot={
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* TAB */}
      <div className="flex gap-6">
        <button
          onClick={() => setActiveTab('sanksi')}
          className={`pb-2 text-sm font-semibold ${
            activeTab === 'sanksi'
              ? 'border-b-2 border-[#114F38] text-[#114F38]'
              : 'text-gray-400'
          }`}
        >
          Sanksi Karyawan
        </button>

        <button
          onClick={() => setActiveTab('jenis')}
          className={`pb-2 text-sm font-semibold ${
            activeTab === 'jenis'
              ? 'border-b-2 border-[#114F38] text-[#114F38]'
              : 'text-gray-400'
          }`}
        >
          Jenis Pelanggaran
        </button>
      </div>

      {/* ACTION */}
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

        {activeTab === 'jenis' && (
          <Button className="bg-[#114F38] hover:bg-[#0d3f2d]">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Jenis Pelanggaran
          </Button>
        )}
      </div>
    </div>
  }
/>

    </AppLayout>
  )
}
