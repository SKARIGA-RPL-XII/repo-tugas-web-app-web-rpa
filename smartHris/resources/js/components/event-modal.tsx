import { useForm } from '@inertiajs/react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
    success?: () => void;
}

export const EventModal = ({
    isOpen,
    onClose,
    success = () => {},
}: EventModalProps) => {
    // 1. Setup State Form (Sesuai Controller: keterangan, jenis_hari, tanggal)
    const { data, setData, post, processing, reset, errors } = useForm({
        keterangan: '',
        jenis_hari: 'event', // Default value
        tanggal: '',
    });

    // 2. State View Kalender (Hanya untuk tampilan navigasi bulan)
    const [viewDate, setViewDate] = useState(new Date());

    if (!isOpen) return null;

    // ================== LOGIKA RESET & CLOSE ==================
    const handleClose = () => {
        reset();                 // Bersihkan form
        setViewDate(new Date()); // Reset kalender ke hari ini
        onClose();               // Tutup modal
    };

    // ================== LOGIKA KALENDER ==================
    const viewYear = viewDate.getFullYear();
    const viewMonth = viewDate.getMonth();
    
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Minggu

    const bulanNama = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
    ];

    const formatDate = (y: number, m: number, d: number) => {
        return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    };

    const changeMonth = (offset: number) => {
        setViewDate(new Date(viewYear, viewMonth + offset, 1));
    };

    const handleDateClick = (day: number) => {
        const dateString = formatDate(viewYear, viewMonth, day);
        setData('tanggal', dateString);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post('/kalender-event', { 
            onSuccess: () => {
                success();
                handleClose(); 
            },
            preserveScroll: true
        });
    };

    return (
        <div
            onClick={(e) => {
                if (e.target === e.currentTarget) handleClose();
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[1px] transition-all"
        >
            <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                
                {/* ================= HEADER ================= */}
                <div className="border-b border-gray-100 p-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        Tambah Jadwal Libur
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    
                    {/* ================= INPUT ROW (NAMA & JENIS) ================= */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Nama Libur */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700">
                                Nama Libur <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.keterangan}
                                onChange={(e) => setData('keterangan', e.target.value)}
                                placeholder="Contoh: Anniversary HR"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 focus:border-green-800 focus:ring-1 focus:ring-green-800 focus:outline-none placeholder:text-gray-400"
                            />
                            {errors.keterangan && <p className="text-xs text-red-500">{errors.keterangan}</p>}
                        </div>

                        {/* Jenis Libur */}
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700">
                                Jenis Libur <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select 
                                    value={data.jenis_hari}
                                    onChange={(e) => setData('jenis_hari', e.target.value)}
                                    className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-800 focus:border-green-800 focus:ring-1 focus:ring-green-800 focus:outline-none"
                                >
                                    <option value="event">Libur Internal / Event</option>
                                    <option value="libur">Libur Nasional</option>
                                </select>
                                <ChevronDown
                                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-500"
                                    size={16}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ================= KALENDER SECTION ================= */}
                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-gray-700">
                            Pilih Tanggal Libur <span className="text-red-500">*</span>
                        </label>
                        
                        <div className="rounded-lg border border-gray-200 p-6">
                            {/* Calendar Header */}
                            <div className="mb-6 flex items-center justify-between">
                                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded transition-colors">
                                    <span className="text-base font-bold text-gray-600">
                                        {bulanNama[viewMonth]} {viewYear}
                                    </span>
                                    <ChevronDown size={16} className="text-gray-400" />
                                </div>
                                <div className="flex gap-4">
                                    <button 
                                        type="button"
                                        onClick={() => changeMonth(-1)}
                                        className="text-gray-300 hover:text-gray-600 transition-colors"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => changeMonth(1)}
                                        className="text-gray-300 hover:text-gray-600 transition-colors"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </div>
                            </div>

                            {/* Calendar Grid Header */}
                            <div className="grid grid-cols-7 text-center mb-4">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                    <div key={i} className="text-sm text-gray-500 font-medium">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Days */}
                            <div className="grid grid-cols-7 text-center gap-y-2">
                                {/* Empty cells */}
                                {Array.from({ length: firstDay }).map((_, i) => (
                                    <div key={`empty-${i}`} />
                                ))}

                                {/* Date cells */}
                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                    const day = i + 1;
                                    const dateStr = formatDate(viewYear, viewMonth, day);
                                    const isSelected = data.tanggal === dateStr;
                                    
                                    return (
                                        <div key={day} className="flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => handleDateClick(day)}
                                                className={`
                                                    h-10 w-10 flex items-center justify-center rounded-full text-sm transition-all
                                                    ${isSelected 
                                                        ? 'bg-[#a855f7] text-white shadow-md' // Warna Ungu (sesuai gambar) 
                                                        : 'text-gray-600 hover:bg-gray-100'}
                                                `}
                                            >
                                                {day}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {errors.tanggal && <p className="text-xs text-red-500 mt-1">{errors.tanggal}</p>}
                    </div>

                    {/* ================= FOOTER BUTTONS ================= */}
                    <div className="mt-8 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="rounded-lg border border-red-400 px-8 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                            disabled={processing}
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-[#0d4436] px-8 py-2.5 text-sm font-medium text-white hover:bg-[#0a352a] disabled:opacity-50 transition-colors shadow-sm"
                        >
                            {processing ? 'Menyimpan...' : 'Update'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};