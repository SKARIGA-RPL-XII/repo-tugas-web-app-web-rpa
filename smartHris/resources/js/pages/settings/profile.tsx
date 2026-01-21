import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { type SharedData, type User } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import { Save, Lock, User as UserIcon } from 'lucide-react';
import { Transition } from '@headlessui/react';

interface KaryawanData {
    nip: string | null;
    jabatan: string | null;
    departemen: string | null;
    jenis_kelamin: 'L' | 'P';
    tanggal_lahir: string | null;
    alamat: string | null;
}

interface UserWithKaryawan extends User {
    karyawan?: KaryawanData;
}

export default function Profile() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user as UserWithKaryawan;
    const karyawanData: KaryawanData = user.karyawan || {
        nip: '-',
        jabatan: '',
        departemen: '-',
        jenis_kelamin: 'L',
        tanggal_lahir: '',
        alamat: ''
    };

    return (
        <AppLayout>
            <Head title="Pengaturan Profil" />

            <div className="p-6 max-w-7xl mx-auto space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <UpdateProfileInformationForm user={user} karyawan={karyawanData} />
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                        <UpdatePasswordForm />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

interface UpdateProfileProps {
    user: User;
    karyawan: KaryawanData;
}

function UpdateProfileInformationForm({ user, karyawan }: UpdateProfileProps) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        nip: karyawan.nip || '',
        jabatan: karyawan.jabatan || '',
        departemen: karyawan.departemen || '',
        jenis_kelamin: karyawan.jenis_kelamin || 'L',
        tanggal_lahir: karyawan.tanggal_lahir || '',
        alamat: karyawan.alamat || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch('/settings/profile');
    };

    return (
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                        <UserIcon size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Informasi Pribadi</h2>
                        <p className="text-xs text-gray-500">Update data diri dan alamat Anda.</p>
                    </div>
                </div>
            </div>

            <form onSubmit={submit} className="p-6 space-y-6">
                <div className="flex items-center gap-6 mb-4">
                    <div className="relative group">
                        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-md">
                            <img 
                                src={user.avatar || '/profile.png'} 
                                alt={user.name} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                        <div className="flex gap-2 mt-1">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                {data.jabatan || 'Karyawan'}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                {data.nip || 'No NIP'}
                            </span>
                        </div>
                    </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input 
                            id="name" 
                            value={data.name} 
                            onChange={(e) => setData('name', e.target.value)} 
                            className="focus:ring-emerald-500"
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                            id="email" 
                            type="email" 
                            value={data.email} 
                            onChange={(e) => setData('email', e.target.value)} 
                            className="focus:ring-emerald-500"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                        <Select 
                            value={data.jenis_kelamin} 
                            onValueChange={(val) => setData('jenis_kelamin', val as 'L' | 'P')}
                        >
                            <SelectTrigger>
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="L">Laki-Laki</SelectItem>
                                <SelectItem value="P">Perempuan</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.jenis_kelamin} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
                        <Input 
                            id="tanggal_lahir" 
                            type="date"
                            value={data.tanggal_lahir || ''} 
                            onChange={(e) => setData('tanggal_lahir', e.target.value)} 
                        />
                        <InputError message={errors.tanggal_lahir} />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="alamat">Alamat Lengkap</Label>
                        <Textarea 
                            id="alamat" 
                            value={data.alamat || ''} 
                            onChange={(e) => setData('alamat', e.target.value)}
                            className="resize-none h-24 focus:ring-emerald-500"
                        />
                        <InputError message={errors.alamat} />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-4">
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in-out"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-emerald-600 font-medium">Tersimpan!</p>
                    </Transition>

                    <Button 
                        type="submit" 
                        disabled={processing}
                        className="bg-[#0d4436] hover:bg-[#0a352a] text-white min-w-30"
                    >
                        {processing ? 'Menyimpan...' : <><Save size={16} className="mr-2"/> Simpan</>}
                    </Button>
                </div>
            </form>
        </section>
    );
}

function UpdatePasswordForm() {
    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        put('/settings/password', { 
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (err) => {
                if (err.password) {
                    reset('password', 'password_confirmation');
                }
                if (err.current_password) {
                    reset('current_password');
                }
            },
        });
    };

    return (
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
            <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
                <div className="p-2 bg-orange-100 rounded-lg text-orange-700">
                    <Lock size={20} />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Ganti Password</h2>
                    <p className="text-xs text-gray-500">Amankan akun Anda.</p>
                </div>
            </div>

            <form onSubmit={updatePassword} className="p-6 space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="current_password">Password Saat Ini</Label>
                    <Input
                        id="current_password"
                        type="password"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        className="focus:ring-orange-500"
                    />
                    <InputError message={errors.current_password} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password Baru</Label>
                    <Input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="focus:ring-orange-500"
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className="focus:ring-orange-500"
                    />
                    <InputError message={errors.password_confirmation} />
                </div>

                <div className="flex items-center justify-between pt-2">
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in-out"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-emerald-600 font-medium">Password diganti!</p>
                    </Transition>

                    <Button 
                        type="submit" 
                        disabled={processing}
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                        Update
                    </Button>
                </div>
            </form>
        </section>
    );
}