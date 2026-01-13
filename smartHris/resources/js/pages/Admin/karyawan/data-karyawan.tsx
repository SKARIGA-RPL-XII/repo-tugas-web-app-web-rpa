import { StatusModal } from '@/components/modal-status';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function DataKaryawan() {
    const [modal, setModal] = useState<{ 
        open: boolean; 
        type: 'success' | 'warning' | 'trash'; 
        title: string;
        description: string;
    }>({
        open: false, 
        type: 'success', 
        title: '',
        description: ''
    });

    const openModal = (type: 'success' | 'warning' | 'trash', title: string, description: string) => {
        setModal({ open: true, type, title, description });
    };

    return (
        <AppLayout>
            <Head title="Data Karyawan" />
            
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-[#0D4838]">Data Karyawan</h1>
                    </div>
                    <Button 
                        className="bg-[#0D4838] hover:bg-[#0A3D2F] text-white gap-2"
                        onClick={() => openModal('success', 'Tambah Karyawan', 'Data karyawan baru telah berhasil ditambahkan ke sistem.')}
                    >
                        <Plus className="size-4" /> Tambah Karyawan
                    </Button>
                </div>

                <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b text-slate-600">
                            <tr>
                                <th className="p-4 font-semibold w-16 text-center">No</th>
                                <th className="p-4 font-semibold">Nama Karyawan</th>
                                <th className="p-4 font-semibold">Jabatan</th>
                                <th className="p-4 font-semibold">Departemen</th>
                                <th className="p-4 font-semibold text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-4 text-center">1</td>
                                <td className="p-4 font-medium">Budi Setiawan</td>
                                <td className="p-4">Senior Developer</td>
                                <td className="p-4">IT Department</td>
                                <td className="p-4">
                                    <div className="flex justify-center gap-2">
                                        <Button 
                                            size="icon" 
                                            variant="ghost" 
                                            className="text-blue-600 hover:bg-blue-50" 
                                            onClick={() => openModal('warning', 'Update Data?', 'Apakah anda yakin ingin mengubah data karyawan ini?')}
                                        >
                                            <Edit2 className="size-4" />
                                        </Button>
                                        <Button 
                                            size="icon" 
                                            variant="ghost" 
                                            className="text-red-600 hover:bg-red-50" 
                                            onClick={() => openModal('trash', 'Hapus Data?', 'Data yang dihapus tidak dapat dipulihkan kembali.')}
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <StatusModal 
                isOpen={modal.open}
                type={modal.type}
                title={modal.title}
                description={modal.description}
                onClose={() => setModal({ ...modal, open: false })}
                onConfirm={() => {
                    console.log('Confirmed:', modal.type);
                }}
            />
        </AppLayout>
    );
}