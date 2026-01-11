import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";

interface EventType {
    id?: number;
    tanggal: string;
    keterangan: string;
    jenis_hari: "event" | "libur";
}

export default function Event({ events = [] }: { events: EventType[] }) {
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [form, setForm] = useState<EventType>({
        tanggal: "",
        keterangan: "",
        jenis_hari: "event",
    });

    const handleAdd = () => {
        setIsEdit(false);
        setForm({
            tanggal: "",
            keterangan: "",
            jenis_hari: "event",
        });
        setShowModal(true);
    };

    const handleEdit = (event: EventType) => {
        setIsEdit(true);
        setForm(event);
        setShowModal(true);
    };

    const handleDelete = (id?: number) => {
        if (!id) return;

        if (!confirm("Yakin ingin menghapus event ini?")) return;

        router.delete(`/kalender-event/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                console.log("Event berhasil dihapus");
            },
            onError: () => {
                alert("Gagal menghapus event");
            },
        });
    };


    const handleSubmit = () => {
        if (isEdit && form.id) {
            router.put(`/kalender-event/${form.id}`, form);
        } else {
            router.post('/kalender-event', form);
        }

        setShowModal(false);
    };


    return (
        <>
            <Head title="Daftar Event Kantor" />

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">

                    {/* HEADER */}
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-bold">
                            📋 Daftar Event Kantor
                        </h1>

                        <button
                            onClick={handleAdd}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            + Tambah Event
                        </button>
                    </div>

                    {/* TABEL */}
                    <table className="w-full border">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border p-2">Tanggal</th>
                                <th className="border p-2">Keterangan</th>
                                <th className="border p-2">Jenis</th>
                                <th className="border p-2">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {events.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center p-4">
                                        Belum ada event
                                    </td>
                                </tr>
                            )}

                            {events.map((e) => (
                                <tr key={e.id} className="hover:bg-gray-50">
                                    <td className="border p-2">
                                        {e.tanggal}
                                    </td>
                                    <td className="border p-2">
                                        {e.keterangan}
                                    </td>
                                    <td className="border p-2">
                                        <span
                                            className={`px-2 py-1 rounded text-xs text-white ${e.jenis_hari === "libur"
                                                ? "bg-red-600"
                                                : "bg-blue-600"
                                                }`}
                                        >
                                            {e.jenis_hari}
                                        </span>
                                    </td>
                                    <td className="border p-2">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(e)}
                                                className="px-3 py-1 bg-yellow-500 text-white rounded"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(e.id)
                                                }
                                                className="px-3 py-1 bg-red-600 text-white rounded"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-96 p-6 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">
                            {isEdit ? "✏️ Edit Event" : "➕ Tambah Event"}
                        </h2>

                        <div className="mb-3">
                            <label className="text-sm">Tanggal</label>
                            <input
                                type="date"
                                className="w-full border p-2 rounded"
                                value={form.tanggal}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        tanggal: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="mb-3">
                            <label className="text-sm">Keterangan</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                value={form.keterangan}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        keterangan: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="mb-4">
                            <label className="text-sm">Jenis</label>
                            <select
                                className="w-full border p-2 rounded"
                                value={form.jenis_hari}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        jenis_hari: e.target.value as
                                            | "event"
                                            | "libur",
                                    })
                                }
                            >
                                <option value="event">Event Kantor</option>
                                <option value="libur">Libur Khusus</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-3 py-1 bg-gray-300 rounded"
                            >
                                Batal
                            </button>

                            <button
                                onClick={handleSubmit}
                                className="px-3 py-1 bg-blue-600 text-white rounded"
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
