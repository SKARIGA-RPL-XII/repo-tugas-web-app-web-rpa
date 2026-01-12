import { useForm, router } from "@inertiajs/react";
import { useState } from "react";

export default function JenisPelanggaran({ jPelanggaran }) {
    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, put, reset } = useForm({
        id: null,
        nama_pelanggaran: "",
        tingkat: "",
        potongan: "",
        keterangan: ""
    });

    /* ======================
       HANDLER
    ====================== */
    const openCreate = () => {
        reset();
        setShowModal(true);
    };

    const openEdit = (item) => {
        setData(item);
        setShowModal(true);
    };

    const submit = () => {
        data.id
            ? put(`/jenis-pelanggaran/${data.id}`)
            : post("/jenis-pelanggaran");

        reset();
        setShowModal(false);
    };

    const destroy = (id) => {
        if (confirm("Yakin hapus data? Semua relasi akan ikut terhapus!")) {
            router.delete(`/jenis-pelanggaran/${id}`);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Jenis Pelanggaran</h2>

                <button
                    onClick={openCreate}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    + Tambah
                </button>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="px-4 py-3">Nama</th>
                            <th className="px-4 py-3">Tingkat</th>
                            <th className="px-4 py-3">Potongan</th>
                            <th className="px-4 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jPelanggaran.length === 0 && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-4 py-6 text-center text-gray-500"
                                >
                                    Data belum ada
                                </td>
                            </tr>
                        )}

                        {jPelanggaran.map((item) => (
                            <tr
                                key={item.id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="px-4 py-2">
                                    {item.nama_pelanggaran}
                                </td>
                                <td className="px-4 py-2">
                                    {item.tingkat}
                                </td>
                                <td className="px-4 py-2">
                                    {item.potongan}
                                </td>
                                <td className="px-4 py-2 text-center space-x-2">
                                    <button
                                        onClick={() => openEdit(item)}
                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => destroy(item.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-bold mb-4">
                            {data.id
                                ? "Edit Jenis Pelanggaran"
                                : "Tambah Jenis Pelanggaran"}
                        </h3>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Nama Pelanggaran"
                                className="border rounded px-3 py-2 w-full"
                                value={data.nama_pelanggaran}
                                onChange={(e) =>
                                    setData(
                                        "nama_pelanggaran",
                                        e.target.value
                                    )
                                }
                            />

                            <select
                                className="border rounded px-3 py-2 w-full"
                                value={data.tingkat}
                                onChange={(e) => setData("tingkat", e.target.value)}
                            >
                                <option value="">-- Pilih Tingkat --</option>
                                <option value="ringan">Ringan</option>
                                <option value="sedang">Sedang</option>
                                <option value="berat">Berat</option>
                            </select>


                            <input
                                type="number"
                                placeholder="Potongan"
                                className="border rounded px-3 py-2 w-full"
                                value={data.potongan}
                                onChange={(e) =>
                                    setData("potongan", e.target.value)
                                }
                            />

                            <textarea
                                placeholder="Keterangan"
                                className="border rounded px-3 py-2 w-full"
                                value={data.keterangan}
                                onChange={(e) =>
                                    setData("keterangan", e.target.value)
                                }
                            />
                        </div>

                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    reset();
                                    setShowModal(false);
                                }}
                                className="px-4 py-2 rounded border"
                            >
                                Batal
                            </button>

                            <button
                                onClick={submit}
                                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                {data.id ? "Update" : "Simpan"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
