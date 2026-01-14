import { useForm, router } from "@inertiajs/react";
import { useState } from "react";

/* ================= TYPES ================= */
interface SuratPeringatan {
    id: number;
    nomor_sp: string;
    jenis_sp: string;
    isi_pernyataan: string;
    tanggal_terbit: string;
}

interface Pelanggaran {
    id: number;
    karyawan: {
        id: number;
        user: {
            name: string;
        };
    };
    jenis_pelanggaran: {
        nama_pelanggaran: string;
        tingkat: string;
    };
    surat_peringatan: SuratPeringatan[];
}

interface Props {
    pelanggaran: Pelanggaran[];
}

/* ================= COMPONENT ================= */
export default function Index({ pelanggaran }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState<Pelanggaran | null>(null);

    const { data, setData, post, reset } = useForm({
        pelanggaran_id: "",
        tingkat_sp: "",
        isi_pernyataan: ""
    });

    // Buka modal SP
    const openModal = (p: Pelanggaran) => {
        setSelected(p);
        setData("pelanggaran_id", String(p.id)); // wajib kirim ID pelanggaran
        setShowModal(true);
    };

    // Submit SP
    const submit = () => {
        post("/sp", {
            onSuccess: () => {
                reset();
                setShowModal(false);
            }
        });
    };

    // Hapus SP
    const destroy = (id: number) => {
        if (confirm("Hapus surat peringatan?")) {
            router.delete(`/sp/${id}`);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Sistem Surat Peringatan</h1>

            {/* ================= TABLE ================= */}
            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left">Karyawan</th>
                            <th className="px-4 py-3 text-left">Pelanggaran</th>
                            <th className="px-4 py-3 text-center">Tingkat</th>
                            <th className="px-4 py-3 text-left">Surat Peringatan</th>
                            <th className="px-4 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pelanggaran.map(p => (
                            <tr key={p.id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-2">{p.karyawan.user.name}</td>
                                <td className="px-4 py-2">{p.jenis_pelanggaran.nama_pelanggaran}</td>
                                <td className="px-4 py-2 text-center">
                                    <span
                                        className={`px-2 py-1 rounded text-xs text-white
                                        ${p.jenis_pelanggaran.tingkat === "ringan"
                                                ? "bg-green-500"
                                                : p.jenis_pelanggaran.tingkat === "sedang"
                                                    ? "bg-yellow-500"
                                                    : "bg-red-600"
                                            }`}
                                    >
                                        {p.jenis_pelanggaran.tingkat}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    {p.surat_peringatan.length === 0 ? (
                                        <span className="text-gray-400 italic">Belum ada SP</span>
                                    ) : (
                                        <ul className="space-y-1">
                                            {p.surat_peringatan.map(sp => (
                                                <li
                                                    key={sp.id}
                                                    className="border rounded p-2 text-xs bg-gray-50"
                                                >
                                                    <div className="font-semibold">{sp.jenis_sp}</div>
                                                    <div>{sp.nomor_sp}</div>
                                                    <div className="text-gray-500">{sp.tanggal_terbit}</div>
                                                    <button
                                                        onClick={() => destroy(sp.id)}
                                                        className="text-red-600 mt-1 hover:underline"
                                                    >
                                                        Hapus
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </td>

                                {/* Tombol buka modal */}
                                <td className="px-4 py-2 text-center">
                                    <button
                                        onClick={() => openModal(p)}
                                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                        Buat SP
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= MODAL ================= */}
            {showModal && selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl">

                        {/* HEADER */}
                        <div className="flex justify-between items-center px-6 py-4 border-b">
                            <h2 className="text-lg font-bold">Buat Surat Peringatan</h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        {/* BODY */}
                        <div className="px-6 py-5 space-y-4">
                            {/* Info Karyawan */}
                            <div className="bg-gray-50 border rounded-lg p-4 text-sm">
                                <p><b>Nama:</b> {selected.karyawan.user.name}</p>
                                <p><b>Pelanggaran:</b> {selected.jenis_pelanggaran.nama_pelanggaran}</p>
                                <p className="flex items-center gap-2">
                                    <b>Tingkat:</b>
                                    <span
                                        className={`px-2 py-1 rounded text-xs text-white
                                            ${selected.jenis_pelanggaran.tingkat === "ringan"
                                                ? "bg-green-500"
                                                : selected.jenis_pelanggaran.tingkat === "sedang"
                                                    ? "bg-yellow-500"
                                                    : "bg-red-600"
                                            }`}
                                    >
                                        {selected.jenis_pelanggaran.tingkat}
                                    </span>
                                </p>
                            </div>

                            {/* Jenis SP */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Jenis Surat Peringatan</label>
                                <select
                                    className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                                    value={data.tingkat_sp}
                                    onChange={e => setData("tingkat_sp", e.target.value)}
                                >
                                    <option value="">Pilih SP</option>
                                    <option value="SP1">SP 1</option>
                                    <option value="SP2">SP 2</option>
                                    <option value="SP3">SP 3</option>
                                </select>
                            </div>

                            {/* Isi SP */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Isi Surat Pernyataan</label>
                                <textarea
                                    rows={5}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                                    placeholder="Tuliskan isi surat peringatan..."
                                    value={data.isi_pernyataan}
                                    onChange={e => setData("isi_pernyataan", e.target.value)}
                                />
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                            >
                                Batal
                            </button>
                            <button
                                onClick={submit}
                                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Simpan SP
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
