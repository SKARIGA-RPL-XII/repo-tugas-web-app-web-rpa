import React, { useState } from "react";
import { router, Head } from "@inertiajs/react";

export default function Pelanggaran({
    pelanggaran = [],
    karyawan = [],
    jenisPelanggaran = [],
}: any) {
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [form, setForm] = useState({
        id: null as number | null,
        karyawan_id: "",
        jenis_pelanggaran_id: "",
        tanggal: "",
        catatan: "",
    });

    const resetForm = () => {
        setForm({
            id: null,
            karyawan_id: "",
            jenis_pelanggaran_id: "",
            tanggal: "",
            catatan: "",
        });
        setIsEdit(false);
    };

    const handleSubmit = () => {
        if (!form.karyawan_id || !form.jenis_pelanggaran_id || !form.tanggal) {
            alert("Mohon lengkapi data wajib");
            return;
        }

        if (isEdit && form.id) {
            router.put(`/app/pelanggaran/${form.id}`, form);
        } else {
            router.post("/app/pelanggaran", form);
        }

        setShowModal(false);
        resetForm();
    };

    const handleEdit = (data: any) => {
        setIsEdit(true);
        setForm({
            id: data.id,
            karyawan_id: data.karyawan_id,
            jenis_pelanggaran_id: data.jenis_pelanggaran_id,
            tanggal: data.tanggal,
            catatan: data.catatan ?? "",
        });
        setShowModal(true);
    };

    const handleDelete = (id: number) => {
        if (confirm("Yakin hapus data ini?")) {
            router.delete(`/app/pelanggaran/${id}`);
        }
    };

    return (
        <>
            <Head title="Pelanggaran Karyawan" />

            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="bg-white p-6 rounded shadow">
                    <div className="flex justify-between mb-4">
                        <h1 className="text-xl font-bold">🚫 Pelanggaran Karyawan</h1>
                        <button
                            onClick={() => {
                                resetForm();
                                setShowModal(true);
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            + Tambah
                        </button>
                    </div>

                    <table className="w-full border">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border p-2">Karyawan</th>
                                <th className="border p-2">Pelanggaran</th>
                                <th className="border p-2">Tanggal</th>
                                <th className="border p-2">Catatan</th>
                                <th className="border p-2">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pelanggaran.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center p-4 text-gray-500 italic"
                                    >
                                        Belum ada data pelanggaran karyawan.
                                    </td>
                                </tr>
                            )}

                            {pelanggaran.map((p: any) => (
                                <tr key={p.id} className="hover:bg-gray-50">
                                    <td className="border p-2">
                                        {p.karyawan?.nama}
                                    </td>
                                    <td className="border p-2">
                                        {p.jenis_pelanggaran?.nama}
                                    </td>
                                    <td className="border p-2">{p.tanggal}</td>
                                    <td className="border p-2">
                                        {p.catatan || "-"}
                                    </td>
                                    <td className="border p-2 flex gap-2">
                                        <button
                                            onClick={() => handleEdit(p)}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(p.id)}
                                            className="bg-red-600 text-white px-2 py-1 rounded"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 w-96 rounded shadow">
                        <h2 className="font-bold mb-4">
                            {isEdit ? "✏️ Edit Pelanggaran" : "➕ Tambah Pelanggaran"}
                        </h2>

                        <select
                            className="w-full border p-2 mb-2"
                            value={form.karyawan_id}
                            onChange={(e) =>
                                setForm({ ...form, karyawan_id: e.target.value })
                            }
                        >
                            <option value="">-- Pilih Karyawan --</option>
                            {karyawan.map((k: any) => (
                                <option key={k.id} value={k.id}>
                                    {k.nama}
                                </option>
                            ))}
                        </select>

                        <select
                            className="w-full border p-2 mb-2"
                            value={form.jenis_pelanggaran_id}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    jenis_pelanggaran_id: e.target.value,
                                })
                            }
                        >
                            <option value="">-- Jenis Pelanggaran --</option>
                            {jenisPelanggaran.map((j: any) => (
                                <option key={j.id} value={j.id}>
                                    {j.nama}
                                </option>
                            ))}
                        </select>

                        <input
                            type="date"
                            className="w-full border p-2 mb-2"
                            value={form.tanggal}
                            onChange={(e) =>
                                setForm({ ...form, tanggal: e.target.value })
                            }
                        />

                        <textarea
                            className="w-full border p-2 mb-4"
                            placeholder="Catatan (opsional)"
                            value={form.catatan}
                            onChange={(e) =>
                                setForm({ ...form, catatan: e.target.value })
                            }
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    resetForm();
                                }}
                                className="px-3 py-1 bg-gray-300 rounded"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-600 text-white px-3 py-1 rounded"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
