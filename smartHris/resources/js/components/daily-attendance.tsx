import React, { useEffect, useState } from 'react'
type Props = {
    absen?: {
        status: string
        jamMasuk: string
        jamPulang: string | null
        keterlambatan: string | number | null
        tanggal?: string 
    } | null
    jadwal?: {
        jamDatang: string
        jamPulang: string
    } | null
    tanggal?: string
}

export default function DailyAttendance({ absen, jadwal, tanggal }: Props) {
    const [clientDate, setClientDate] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            const now = new Date()
            const options: Intl.DateTimeFormatOptions = { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
            }
            setClientDate(now.toLocaleDateString('id-ID', options))
        }, 0)

        return () => clearTimeout(timer)
    }, [])

    const dataAbsen = absen || {
        status: 'Belum Hadir',
        jamMasuk: '-- : --',
        jamPulang: '-- : --',
        keterlambatan: '-',
        tanggal: null
    }

    const dataJadwal = jadwal || {
        jamDatang: '08 : 00',
        jamPulang: '17 : 00'
    }

    const displayDate = dataAbsen.tanggal || tanggal || clientDate || 'Memuat...'

    return (
        <div className="mb-8 w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <h2 className="text-xl font-bold text-slate-900">Absen Hari ini</h2>
                
                <div className="rounded-full bg-linear-to-r from-[#0f5145] to-[#158068] px-6 py-2 shadow-md shadow-emerald-900/20">
                    <span className="text-sm font-semibold text-white tracking-wide">
                        {displayDate}
                    </span>
                </div>

                <div className="hidden sm:block">
                     <h2 className="text-xl font-bold text-slate-900">Jadwal Masuk</h2>
                </div>
            </div>

            <div className="flex w-full flex-col sm:flex-row sm:items-center sm:divide-x sm:divide-slate-100">
                <div className="mb-4 block sm:hidden">
                    <h3 className="text-lg font-bold text-slate-900">Jadwal Masuk</h3>
                </div>

                <div className="grid grid-cols-2 gap-y-6 sm:flex sm:w-full sm:items-center sm:gap-y-0">
                    <div className="col-span-2 px-2 text-center sm:col-span-1 sm:flex-1 sm:px-4 sm:first:pl-0">
                        <p className="mb-1 text-sm font-semibold text-slate-500">Status</p>
                        <p className={`text-2xl font-medium ${
                            dataAbsen.status === 'Hadir' ? 'text-emerald-600' : 
                            dataAbsen.status === 'Terlambat' ? 'text-red-500' : 
                            'text-slate-800'
                        }`}>
                            {dataAbsen.status}
                        </p>
                    </div>

                    <div className="px-2 text-center sm:flex-1 sm:px-4">
                        <p className="mb-1 text-sm font-semibold text-slate-500">Datang</p>
                        <p className="text-2xl font-normal text-slate-800">{dataAbsen.jamMasuk}</p>
                    </div>

                    <div className="px-2 text-center sm:flex-1 sm:px-4">
                        <p className="mb-1 text-sm font-semibold text-slate-500">Pulang</p>
                        <p className="text-2xl font-normal text-slate-800">{dataAbsen.jamPulang}</p>
                    </div>

                    <div className="col-span-2 px-2 text-center sm:col-span-1 sm:flex-1 sm:px-4">
                        <p className="mb-1 text-sm font-semibold text-slate-500">Keterlambatan</p>
                        <p className="text-2xl font-normal text-slate-800">{dataAbsen.keterlambatan}</p>
                    </div>

                    <div className="col-span-2 my-2 border-t border-slate-100 sm:hidden"></div>

                    <div className="px-2 text-center sm:flex-1 sm:border-l-2 sm:border-slate-100 sm:px-4"> 
                        <p className="mb-1 text-sm font-semibold text-slate-500">Jadwal Masuk</p>
                        <p className="text-2xl font-normal text-slate-800">{dataJadwal.jamDatang}</p>
                    </div>

                    <div className="px-2 text-center sm:flex-1 sm:px-4 sm:last:pr-0">
                        <p className="mb-1 text-sm font-semibold text-slate-500">Jadwal Pulang</p>
                        <p className="text-2xl font-normal text-slate-800">{dataJadwal.jamPulang}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}