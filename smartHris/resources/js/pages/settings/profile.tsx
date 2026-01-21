import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Form, Head, usePage } from '@inertiajs/react';
import { CameraIcon, Edit2 } from 'lucide-react'; // Pastikan menginstall lucide-react

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '#',
    },
];

export default function Profile() {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            {/* Container Utama dengan Background Abu-abu Muda sesuai Gambar */}
            <div className="p-6">
                <Form
                    {...ProfileController.update.form()}
                    options={{ preserveScroll: true }}
                >
                    {({ processing, errors }) => (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            
                            {/* Header Form: Nama & Tombol Simpan */}
                            <div className="p-8 flex justify-between items-start">
                                <div className="flex gap-6 items-center">
                                    {/* Foto Profil */}
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-sm">
                                            <img 
                                                src={auth.user.avatar || '/profile.png'} 
                                                alt="Profile" 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <button type="button" className="absolute bottom-0 right-0 bg-gray-500 p-1.5 rounded-full border-2 border-white text-white">
                                            <CameraIcon size={12} />
                                        </button>
                                    </div>
                                    
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">{auth.user.name}</h2>
                                    </div>
                                </div>

                                <Button 
                                    type='submit'
                                    disabled={processing}
                                    className="bg-[#0d4436] hover:bg-[#0a352a] cursor-pointer text-white px-8 py-2 rounded-lg transition-colors"
                                >
                                    Simpan
                                </Button>
                            </div>

                            {/* Grid Form Input */}
                            <div className="px-8 pb-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                
                                {/* Nama */}
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="font-bold text-gray-700">Nama</Label>
                                    <div className="relative">
                                        <Input
                                            id="name"
                                            defaultValue={auth.user.name}
                                            name="name"
                                            className="bg-gray-50 border-gray-200 pr-10 text-black focus:ring-emerald-800"
                                        />
                                        <Edit2 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    </div>
                                    <InputError message={errors.name} />
                                </div>

                                {/* Jenis Kelamin */}
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Jenis Kelamin</Label>
                                    <div className="relative">
                                        <Input
                                            name='jenis_kelamin'
                                            defaultValue="Laki-Laki" // Sesuaikan dengan field DB Anda
                                            className="bg-gray-50 text-black border-gray-200 pr-10"
                                        />
                                        <Edit2 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    </div>
                                </div>

                                {/* NIP */}
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">NIP</Label>
                                    <div className="relative">
                                        <Input
                                            readOnly
                                            defaultValue="19991210"
                                            className="bg-gray-50 text-black border-gray-200 pr-10"
                                        />
                                        <Edit2 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    </div>
                                </div>

                                {/* Tanggal Lahir */}
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Tanggal Lahir</Label>
                                    <div className="relative">
                                        <Input
                                            name='tanggal_lahir'
                                            defaultValue="20 September 1999"
                                            className="bg-gray-50 text-black border-gray-200 pr-10"
                                        />
                                        <Edit2 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    </div>
                                </div>

                                {/* Jabatan */}
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Jabatan</Label>
                                    <div className="relative">
                                        <Input
                                            readOnly
                                            defaultValue="Supervisor"
                                            className="bg-gray-50 text-black border-gray-200 pr-10"
                                        />
                                        <Edit2 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    </div>
                                </div>

                                {/* Alamat */}
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Alamat</Label>
                                    <div className="relative">
                                        <Input
                                            name='alamat'
                                            defaultValue="Jawa Timur, Malang, Tlogomas"
                                            className="bg-gray-50 text-black border-gray-200 pr-10"
                                        />
                                        <Edit2 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    </div>
                                </div>

                                {/* Departemen */}
                                <div className="space-y-2">
                                    <Label className="font-bold text-gray-700">Departemen</Label>
                                    <div className="relative">
                                        <Input
                                            name='departemen_id'
                                            defaultValue="Supervisor"
                                            className="bg-gray-50 text-black border-gray-200 pr-10"
                                        />
                                        <Edit2 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}