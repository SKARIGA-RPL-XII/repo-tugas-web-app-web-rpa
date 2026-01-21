import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

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
    if (!isOpen) return null;

    // ================== LOGIKA KALENDER ==================
    const year = 2026;
    const month = 11; // Desember (0 = Januari)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
    // =====================================================

    const handleSubmit = (e) => {
        e.preventDefault();
        success();
        onClose();
    };

    return (
        <div
            onClick={(e) => {
                if (e.target == e.currentTarget) {
                    onClose()
                }
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[1px]"
        >
            <div className="w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl">
                {/* ================= HEADER ================= */}
                <div className="border-b border-gray-100 p-6">
                    <h2 className="text-xl font-bold text-[#333]">
                        Tambah Jadwal Libur
                    </h2>
                </div>

                {/* ================= BODY ================= */}
                <div className="space-y-8 p-8">
                    {/* FORM */}
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700">
                                Nama Libur{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                defaultValue="Anniversary HR"
                                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-800 focus:border-emerald-800 focus:outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700">
                                Jenis Libur{' '}
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select className="w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-800 focus:border-emerald-800 focus:outline-none">
                                    <option>Libur Internal</option>
                                    <option>Libur Nasional</option>
                                </select>
                                <ChevronDown
                                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-400"
                                    size={18}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ================= KALENDER ================= */}
                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-gray-700">
                            Pilih Tanggal Libur{' '}
                            <span className="text-red-500">*</span>
                        </label>

                        <div className="w-full rounded-xl border border-gray-200 p-6">
                            {/* Header Kalender */}
                            <div className="mb-6 flex items-center justify-between">
                                <button className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-black">
                                    Desember 2026 <ChevronDown size={14} />
                                </button>
                                <div className="flex gap-4">
                                    <ChevronLeft className="text-gray-300 hover:text-gray-600" />
                                    <ChevronRight className="text-gray-300 hover:text-gray-600" />
                                </div>
                            </div>

                            {/* Header Hari */}
                            <div className="mb-2 grid grid-cols-7 text-center text-xs font-bold text-gray-400">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(
                                    (day, index) => (
                                        <span key={index} className="py-2">
                                            {day}
                                        </span>
                                    ),
                                )}
                            </div>

                            {/* Grid Tanggal */}
                            <div className="grid grid-cols-7 text-center">
                                {/* Padding awal bulan (DINAMIS) */}
                                {Array.from({ length: firstDay }).map(
                                    (_, i) => (
                                        <div
                                            key={`empty-${i}`}
                                            className="h-12"
                                        />
                                    ),
                                )}

                                {/* Tanggal bulan ini */}
                                {Array.from({ length: daysInMonth }).map(
                                    (_, i) => {
                                        const day = i + 1;
                                        return (
                                            <div
                                                key={day}
                                                className="flex h-12 items-center justify-center"
                                            >
                                                <button
                                                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all ${
                                                        day === 11
                                                            ? 'bg-[#cc44ff] text-white shadow-md shadow-purple-200'
                                                            : 'text-gray-600 hover:bg-gray-100'
                                                    }`}
                                                >
                                                    {day}
                                                </button>
                                            </div>
                                        );
                                    },
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= FOOTER ================= */}
                <div className="flex items-center justify-between border-t border-gray-50 bg-white p-6">
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-red-400 px-12 py-2.5 font-medium text-red-500 hover:bg-red-50"
                    >
                        Batal
                    </button>
                    <button
                        onClick={(e) => handleSubmit(e)}
                        className="rounded-lg bg-[#0d4436] px-12 py-2.5 font-medium text-white hover:bg-[#0a352a]"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};
