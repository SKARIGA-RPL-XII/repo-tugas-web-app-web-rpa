import AppLayout from '@/layouts/app-layout'
import { Head, router } from '@inertiajs/react'
import { Search, AlertCircle, Info } from 'lucide-react'
import { useState } from 'react'

interface PelanggaranData {
  id: number
  tanggal: string
  status: string
  tingkat_pelanggaran: string
  sanksi: string
}

interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

type AuthUser = {
  id: number
  name: string
  email?: string
  role?: 'admin' | 'user'
}

interface PelanggaranProps {
  auth: { user: AuthUser }
  summary: {
    total: number
    ringan: number
    berat: number
    label_bulan: string
  }
  pelanggaran: {
    data: PelanggaranData[]
    links: PaginationLink[]
  }
  filters: {
    search?: string
  }
}

export default function Pelanggaran({
  summary,
  pelanggaran,
  filters,
}: PelanggaranProps) {
  const baseUrl = '/pelanggaran'

  const [search, setSearch] = useState(filters.search ?? '')

  const handleSearch = () => {
    const params = search ? { search } : {}
    router.get(baseUrl, params, {
      preserveState: true,
      replace: true,
    })
  }

  return (
    <AppLayout breadcrumbs={[{ title: 'Pelanggaran', href: '/pelanggaran' }]}>
      <Head title="Pelanggaran Karyawan" />

      <main className="p-8 space-y-6 bg-gray-50 min-h-screen text-[#111827]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard
            title="Jumlah Pelanggaran"
            value={`${summary.total} Kali`}
            icon={<Info />}
            label={summary.label_bulan}
          />
          <SummaryCard
            title="Pelanggaran Ringan"
            value={`${summary.ringan} Kali`}
            icon={<AlertCircle />}
            label={summary.label_bulan}
          />
          <SummaryCard
            title="Pelanggaran Berat"
            value={`${summary.berat} Kali`}
            icon={<AlertCircle />}
            label={summary.label_bulan}
            danger
          />
        </div>

        <div className="flex justify-end">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari jenis pelanggaran..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:ring-[#0D4838] focus:border-[#0D4838]"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#0D4838] text-white">
              <tr>
                <th className="px-6 py-4 font-semibold">Tanggal</th>
                <th className="px-6 py-4 font-semibold">Jenis Pelanggaran</th>
                <th className="px-6 py-4 font-semibold">Tingkat</th>
                <th className="px-6 py-4 font-semibold">Sanksi</th>
              </tr>
            </thead>
            <tbody>
              {pelanggaran.data.length > 0 ? (
                pelanggaran.data.map((item, i) => (
                  <tr
                    key={item.id}
                    className={`${i % 2 ? 'bg-[#F9FBFA]' : 'bg-white'} border-b border-gray-50 hover:bg-gray-50 transition-colors`}
                  >
                    <td className="px-6 py-5 font-medium">
                      {item.tanggal}
                    </td>
                    <td className="px-6 py-5">{item.status}</td>
                    <td className="px-6 py-5">
                      <span
                        className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                          item.tingkat_pelanggaran === 'berat'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-orange-100 text-orange-600'
                        }`}
                      >
                        {item.tingkat_pelanggaran}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-gray-600">
                      {item.sanksi}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-20 text-center text-gray-400 italic"
                  >
                    Data pelanggaran tidak ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4">
          {pelanggaran.links.map((link, i) => (
            <button
              key={i}
              disabled={!link.url || link.active}
              onClick={() =>
                link.url &&
                router.get(
                  link.url,
                  search ? { search } : {},
                  { preserveState: true }
                )
              }
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all
                ${
                  link.active
                    ? 'bg-[#0D4838] text-white shadow-md'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-[#0D4838] hover:text-[#0D4838]'
                }
                ${!link.url ? 'opacity-30 cursor-not-allowed' : ''}
              `}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          ))}
        </div>
      </main>
    </AppLayout>
  )
}

function SummaryCard({
  title,
  value,
  label,
  icon,
  danger,
}: {
  title: string
  value: string
  label: string
  icon: React.ReactNode
  danger?: boolean
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div
            className={`p-2 rounded-lg ${
              danger
                ? 'bg-red-100 text-red-600'
                : 'bg-[#0D4838]/10 text-[#0D4838]'
            }`}
          >
            {icon}
          </div>
          <span className="font-semibold text-gray-700">{title}</span>
        </div>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs text-gray-400 mt-1 italic">
          Pada Bulan Ini
        </p>
      </div>
      <span className="bg-[#0D4838] text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase">
        {label}
      </span>
    </div>
  )
}
