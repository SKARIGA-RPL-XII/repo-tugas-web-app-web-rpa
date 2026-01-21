import React from 'react';
import { useForm } from '@inertiajs/react';
import { type User } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import InputError from '@/components/input-error';
import { Save, User as UserIcon } from 'lucide-react';
import { Transition } from '@headlessui/react';

export interface KaryawanData {
    nip: string | null;
    jabatan: string | null;
    departemen: string | null;
    jenis_kelamin: 'L' | 'P';
    tanggal_lahir: string | null;
    alamat: string | null;
}

interface UpdateProfileProps {
    user: User;
    karyawan: KaryawanData;
}

export default function UpdateProfileInformationForm({ user, karyawan }: UpdateProfileProps) {
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
                                src='/profile.png'
                                alt='profile empty'
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                        {user.role === 'user' && (
                            <div className="flex flex-wrap gap-2 mt-1">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {data.departemen || 'departemen'}
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                    {data.jabatan || 'jabatan'}
                                </span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                    {data.nip || 'No NIP'}
                                </span>
                            </div>
                        )}
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

                    {user.role !== 'admin' && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                                <Select
                                    value={data.jenis_kelamin}
                                    onValueChange={(val) => setData('jenis_kelamin', val as 'L' | 'P')}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
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
                        </>
                    )}
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
                        {processing ? 'Menyimpan...' : <><Save size={16} className="mr-2" /> Simpan</>}
                    </Button>
                </div>
            </form>
        </section>
    );
}