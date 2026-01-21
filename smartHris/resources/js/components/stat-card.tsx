// components/stat-card.tsx
import React from 'react'

type Props = {
  label: string
  value: string | React.ReactNode // Support teks biasa atau HTML
  icon: React.ReactNode
  iconBg: string
}

export default function StatCard({ label, value, icon, iconBg }: Props) {
  return (
    <div className="flex items-center gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      {/* Icon tetap di kiri, tambahkan shrink-0 agar tidak gepeng */}
      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
        {icon}
      </div>

      <div>
        {/* 1. Value (Angka) DI ATAS lagi */}
        {/* Hapus class 'truncate' supaya tidak muncul titik-titik (...) */}
        <h3 className="text-xl font-bold text-slate-800 leading-tight">
            {value}
        </h3>

        {/* 2. Label (Judul) DI BAWAH lagi */}
        <p className="text-sm font-medium text-slate-500 mt-1">
            {label}
        </p>
      </div>
    </div>
  )
}