import { useState } from 'react';
import { X, Clock, ChevronDown, ChevronRight } from 'lucide-react';

export interface RiwayatSanksi {
    id: number;
    nama_pelanggaran: string;
    tingkat: 'ringan' | 'sedang' | 'berat';
    sp?: string | null;
    catatan?: string | null;
    tanggal: string;
    pemberi: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    data: RiwayatSanksi[];
}

export default function HistorySanksiModal({
    isOpen,
    onClose,
    data,
}: Props) {
    const [openId, setOpenId] = useState<number | null>(null);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-2xl rounded-xl bg-white shadow-lg">
                {/* HEADER */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-gray-600" />
                        <h2 className="text-lg font-semibold text-gray-800">
                            History
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* BODY */}
                <div className="px-6 py-5 space-y-3 max-h-[70vh] overflow-y-auto">
                    {data.length === 0 && (
                        <div className="py-8 text-center">
                            <Clock className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                            <p className="text-sm text-gray-500">
                                Belum ada riwayat sanksi untuk karyawan ini.
                            </p>
                        </div>
                    )}

                    {data.map((item) => {
                        const isOpen = openId === item.id;

                        return (
                            <div
                                key={item.id}
                                className="rounded-lg border border-gray-200 bg-white overflow-hidden transition-shadow hover:shadow-sm"
                            >
                                {/* RINGKAS */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpenId(isOpen ? null : item.id)
                                    }
                                    className="flex w-full items-center justify-between gap-4 p-4 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600 shrink-0">
                                            ⚠️
                                        </span>
                                        <div className="text-left">
                                            <p className="font-semibold text-gray-800">
                                                Sanksi Diberikan
                                            </p>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                Pada {item.tanggal}, oleh {item.pemberi}
                                            </p>
                                        </div>
                                    </div>

                                    {isOpen ? (
                                        <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                                    ) : (
                                        <ChevronRight className="h-5 w-5 text-gray-400 shrink-0" />
                                    )}
                                </button>

                                {/* DETAIL */}
                                {isOpen && (
                                    <div className="border-t bg-gray-50 px-6 py-4 space-y-3">
                                        <DetailRow
                                            label="Pelanggaran"
                                            value={item.nama_pelanggaran}
                                        />
                                        <DetailRow
                                            label="Tingkat"
                                            value={
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    item.tingkat === 'ringan'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : item.tingkat === 'sedang'
                                                        ? 'bg-orange-100 text-orange-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {capitalize(item.tingkat)}
                                                </span>
                                            }
                                        />
                                        <DetailRow
                                            label="SP"
                                            value={item.sp ?? '-'}
                                        />
                                        <DetailRow
                                            label="Catatan"
                                            value={item.catatan ?? '-'}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex gap-4">
            <span className="text-sm text-gray-500 w-24 shrink-0">{label}</span>
            <span className="text-sm text-gray-900 font-medium flex-1">
                {typeof value === 'string' ? value : value}
            </span>
        </div>
    );
}

function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}