import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;
    const userRole = auth.user.role;

    const attendanceData = [
        { date: '1 Mei', value: 16 },
        { date: '2 Mei', value: 16 },
        { date: '3 Mei', value: 24 },
        { date: '4 Mei', value: 21 },
        { date: '5 Mei', value: 27 },
        { date: '6 Mei', value: 21 },
        { date: '7 Mei', value: 30 },
    ];
    const maxValue = Math.max(...attendanceData.map((d) => d.value));

    return (
        <AppLayout>
            <Head title="Dashboard" />

            {/* Container: Menggunakan w-full dan px yang lebih besar agar tidak mepet layar */}
            <div className="min-h-screen w-full bg-gray-50 px-4 py-8 md:px-8 lg:px-12">
                
                <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Selamat Datang, Admin!
                        </h1>
                        <p className="text-gray-500">Berikut adalah ringkasan aktivitas absensi karyawan Anda.</p>
                    </div>

                    {/* Notification and Profile Wrapper */}
                    <div className="mt-4 md:mt-0 flex items-center space-x-4">
                        {/* Notification Bell */}
                        <button className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-100 transition hover:bg-gray-50">
                            <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            {/* Red Dot Notification */}
                            <span className="absolute right-3.5 top-3.5 flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
                            </span>
                        </button>

                        {/* Profile Pill */}
                        <button className="flex items-center space-x-3 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-gray-100 transition hover:bg-gray-50">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="font-semibold text-gray-700">Hi, Admin</span>
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Stats Cards: Menambah gap dan margin bottom */}
                <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Total Karyawan */}
                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                        <div className="flex items-center space-x-4">
                            <div className="rounded-lg bg-blue-100 p-4">
                                <svg className="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">30 Orang</h3>
                                <p className="text-sm font-medium text-gray-500">Total Karyawan</p>
                            </div>
                        </div>
                    </div>

                    {/* Hadir Hari Ini */}
                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                        <div className="flex items-center space-x-4">
                            <div className="rounded-lg bg-green-100 p-4">
                                <svg className="h-8 w-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">27 Karyawan</h3>
                                <p className="text-sm font-medium text-gray-500">Hadir Hari Ini</p>
                            </div>
                        </div>
                    </div>

                    {/* Pengajuan Cuti */}
                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                        <div className="flex items-center space-x-4">
                            <div className="rounded-lg bg-orange-100 p-4">
                                <svg className="h-8 w-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">3 Pengajuan</h3>
                                <p className="text-sm font-medium text-gray-500">Pengajuan Cuti</p>
                            </div>
                        </div>
                    </div>

                    {/* Sanksi Aktif */}
                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                        <div className="flex items-center space-x-4">
                            <div className="rounded-lg bg-red-100 p-4">
                                <svg className="h-8 w-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">3 Karyawan</h3>
                                <p className="text-sm font-medium text-gray-500">Sanksi Aktif</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section: Menambah gap antar chart */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Rekap Absensi Mingguan */}
                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
                        <h2 className="mb-6 text-xl font-bold text-gray-900 text-center lg:text-left">
                            Rekap Absensi Mingguan
                        </h2>
                        <div className="relative h-72 w-full">
                            <svg width="100%" height="100%" viewBox="0 0 500 250" preserveAspectRatio="none">
                                {[0, 5, 10, 15, 20, 25, 30].map((value, i) => (
                                    <g key={i}>
                                        <line x1="40" y1={200 - (value / maxValue) * 180} x2="480" y2={200 - (value / maxValue) * 180} stroke="#f3f4f6" strokeWidth="1" />
                                        <text x="25" y={205 - (value / maxValue) * 180} fontSize="12" fill="#9ca3af" textAnchor="end">{value}</text>
                                    </g>
                                ))}
                                <polyline fill="none" stroke="#10b981" strokeWidth="3" points={attendanceData.map((d, i) => `${60 + i * 65},${200 - (d.value / maxValue) * 180}`).join(' ')} />
                                {attendanceData.map((d, i) => (
                                    <circle key={i} cx={60 + i * 65} cy={200 - (d.value / maxValue) * 180} r="5" fill="#10b981" stroke="white" strokeWidth="2" />
                                ))}
                                {attendanceData.map((d, i) => (
                                    <text key={i} x={60 + i * 65} y="235" fontSize="12" fill="#6b7280" textAnchor="middle">{d.date}</text>
                                ))}
                            </svg>
                            <p className="text-center text-sm text-gray-500 mt-4">Mei 2024</p>
                        </div>
                    </div>

                    {/* Status Kehadiran Karyawan */}
                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
                        <h2 className="mb-6 text-xl font-bold text-gray-900 text-center lg:text-left">
                            Status Kehadiran Karyawan
                        </h2>
                        <div className="flex items-center justify-center h-72">
                            <div className="relative">
                                <svg width="220" height="220" viewBox="0 0 220 220">
                                    {/* Donut chart segments */}
                                    <circle cx="110" cy="110" r="70" fill="none" stroke="#10b981" strokeWidth="40" 
                                            strokeDasharray="220 220" transform="rotate(-90 110 110)"/>
                                    <circle cx="110" cy="110" r="70" fill="none" stroke="#3b82f6" strokeWidth="40" 
                                            strokeDasharray="55 220" strokeDashoffset="-220" transform="rotate(-90 110 110)"/>
                                    <circle cx="110" cy="110" r="70" fill="none" stroke="#ef4444" strokeWidth="40" 
                                            strokeDasharray="11 220" strokeDashoffset="-275" transform="rotate(-90 110 110)"/>
                                    <circle cx="110" cy="110" r="70" fill="none" stroke="#f97316" strokeWidth="40" 
                                            strokeDasharray="22 220" strokeDashoffset="-286" transform="rotate(-90 110 110)"/>
                                    <circle cx="110" cy="110" r="70" fill="none" stroke="#eab308" strokeWidth="40" 
                                            strokeDasharray="44 220" strokeDashoffset="-308" transform="rotate(-90 110 110)"/>
                                    <circle cx="110" cy="110" r="70" fill="none" stroke="#f59e0b" strokeWidth="40" 
                                            strokeDasharray="33 220" strokeDashoffset="-352" transform="rotate(-90 110 110)"/>
                                    
                                    {/* Center circle */}
                                    <circle cx="110" cy="110" r="55" fill="#e0f2f1"/>
                                    
                                    {/* Center text */}
                                    <text x="110" y="105" fontSize="14" fontWeight="600" fill="#000" textAnchor="middle">Tepat Waktu</text>
                                    <text x="110" y="125" fontSize="20" fontWeight="bold" fill="#000" textAnchor="middle">50%</text>
                                </svg>
                            </div>
                            
                            {/* Legend */}
                            <div className="ml-8 space-y-3">
                                <LegendItem color="bg-green-500" label="Hadir" />
                                <LegendItem color="bg-red-500" label="Alpha" />
                                <LegendItem color="bg-yellow-500" label="Cuti" />
                                <LegendItem color="bg-orange-500" label="Izin" />
                                <LegendItem color="bg-blue-500" label="Sakit" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

// Komponen Kecil untuk Legend agar kode lebih bersih
function LegendItem({ color, label }: { color: string, label: string }) {
    return (
        <div className="flex items-center space-x-2">
            <div className={`h-3 w-3 rounded-full ${color}`}></div>
            <span className="text-sm font-medium text-gray-600">{label}</span>
        </div>
    );
}