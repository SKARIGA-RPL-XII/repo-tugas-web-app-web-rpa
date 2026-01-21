import { X } from 'lucide-react'

interface CutiModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  processing?: boolean
  data: {
    tanggal_mulai: string
    tanggal_selesai: string
    alasan: string
  }
  setData: (key: string, value: string) => void
}

export default function CutiModal({
  open,
  onClose,
  onSubmit,
  processing,
  data,
  setData,
}: CutiModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl p-10">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-3">
            <div className="font-bold text-[#0D4838] text-lg">
              HR
              <span className="font-normal ml-1 text-sm">
                HUMAN RESOURCE
              </span>
            </div>
          </div>

          <div className="text-right">
            <h2 className="text-2xl font-bold">Pengajuan Cuti</h2>
            <p className="text-sm text-gray-500">
              Wajib mengisi semua data cuti
            </p>
          </div>

          <button onClick={onClose}>
            <X className="text-gray-400" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Tanggal Mulai Cuti <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={data.tanggal_mulai}
                  onChange={(e) =>
                    setData('tanggal_mulai', e.target.value)
                  }
                  className="w-full border rounded-xl px-4 py-3 pr-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Tanggal Selesai Cuti{' '}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={data.tanggal_selesai}
                  onChange={(e) =>
                    setData('tanggal_selesai', e.target.value)
                  }
                  className="w-full border rounded-xl px-4 py-3 pr-12"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Alasan Cuti <span className="text-red-500">*</span>
            </label>
            <textarea
              value={data.alasan}
              onChange={(e) => setData('alasan', e.target.value)}
              placeholder="Contoh: Cuti keluarga"
              rows={4}
              className="w-full border rounded-xl px-4 py-3 resize-none"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border rounded-xl font-semibold"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={processing}
              className="flex-1 py-3 bg-[#0D4838] text-white rounded-xl font-semibold"
            >
              {processing ? 'Mengirim...' : 'Kirim'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
