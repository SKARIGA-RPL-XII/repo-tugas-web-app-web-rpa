import { useForm, router } from "@inertiajs/react";
import { useState } from "react";

/* =========================
   TYPES
========================= */
interface User {
    name: string;
    email: string;
}

interface Karyawan {
    id: number;
    nip: string;
    jabatan: string;
    jenis_kelamin: string;
    departemen: string;
    tanggal_lahir: string;
    tanggal_masuk: string;
    alamat?: string;
    user: User;
}

interface FormData {
    id: number | null;
    nama: string;
    email: string;
    password: string;
    nip: string;
    jabatan: string;
    jenis_kelamin: string;
    departemen: string;
    tanggal_lahir: string;
    tanggal_masuk: string;
    alamat: string;
}

/* =========================
   COMPONENT
========================= */
export default function Index({ karyawan }: { karyawan: Karyawan[] }) {
    const today = new Date().toISOString().split("T")[0];

    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const { data, setData, reset } = useForm<FormData>({
        id: null,
        nama: "",
        email: "",
        password: "",
        nip: "",
        jabatan: "",
        jenis_kelamin: "L",
        departemen: "",
        tanggal_lahir: "",
        tanggal_masuk: today,
        alamat: "",
    });

    /* =========================
       HANDLER
    ========================= */
    const openCreate = () => {
        reset({
            id: null,
            nama: "",
            email: "",
            password: "",
            nip: "",
            jabatan: "",
            jenis_kelamin: "L",
            departemen: "",
            tanggal_lahir: "",
            tanggal_masuk: today,
            alamat: "",
        });
        setIsEdit(false);
        setShowModal(true);
    };

    const openEdit = (k: Karyawan) => {
        setIsEdit(true);
        setData({
            id: k.id,
            nama: k.user.name,
            email: k.user.email,
            password: "",
            nip: k.nip,
            jabatan: k.jabatan,
            jenis_kelamin: k.jenis_kelamin,
            departemen: k.departemen,
            tanggal_lahir: k.tanggal_lahir,
            tanggal_masuk: k.tanggal_masuk,
            alamat: k.alamat ?? "",
        });
        setShowModal(true);
    };

    const submit = () => {
        if (!data.nama || !data.email || !data.tanggal_lahir) {
            alert("Mohon lengkapi data wajib");
            return;
        }

        if (isEdit && data.id) {
            router.put(`/karyawan/${data.id}`, data);
        } else {
            router.post("/karyawan", data);
        }

        setShowModal(false);
        reset();
    };

    const handleDelete = (id: number) => {
        if (confirm("Hapus karyawan ini?")) {
            router.delete(`/karyawan/${id}`);
        }
    };

    /* =========================
       VIEW
    ========================= */
    return (
        <>
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={openCreate}
            >
                + Tambah Karyawan
            </button>

            <table border={1} cellPadding={8} className="mt-4 w-full">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>NIP</th>
                        <th>Jabatan</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {karyawan.map((k) => (
                        <tr key={k.id}>
                            <td>{k.user.name}</td>
                            <td>{k.nip}</td>
                            <td>{k.jabatan}</td>
                            <td className="space-x-2">
                                <button
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    onClick={() => openEdit(k)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-600 text-white px-2 py-1 rounded"
                                    onClick={() => handleDelete(k.id)}
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 w-96 rounded">
                        <h3 className="mb-4 font-bold">
                            {isEdit ? "Edit Karyawan" : "Tambah Karyawan"}
                        </h3>

                        <input
                            placeholder="Nama"
                            value={data.nama}
                            onChange={(e) => setData("nama", e.target.value)}
                        />

                        <input
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <input
                            placeholder="NIP"
                            value={data.nip}
                            onChange={(e) => setData("nip", e.target.value)}
                        />

                        <input
                            placeholder="Jabatan"
                            value={data.jabatan}
                            onChange={(e) =>
                                setData("jabatan", e.target.value)
                            }
                        />

                        <select
                            value={data.jenis_kelamin}
                            onChange={(e) =>
                                setData("jenis_kelamin", e.target.value)
                            }
                        >
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>

                        <input
                            placeholder="Departemen"
                            value={data.departemen}
                            onChange={(e) =>
                                setData("departemen", e.target.value)
                            }
                        />

                        <input
                            type="date"
                            value={data.tanggal_lahir}
                            onChange={(e) =>
                                setData("tanggal_lahir", e.target.value)
                            }
                        />

                        <input
                            type="date"
                            value={data.tanggal_masuk}
                            readOnly
                        />

                        <textarea
                            placeholder="Alamat"
                            value={data.alamat}
                            onChange={(e) =>
                                setData("alamat", e.target.value)
                            }
                        />

                        <div className="mt-4 flex gap-2">
                            <button onClick={() => setShowModal(false)}>
                                Batal
                            </button>
                            <button onClick={submit}>
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
