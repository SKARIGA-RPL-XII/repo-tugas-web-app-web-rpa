import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { type SharedData, type User } from '@/types';

import UpdatePasswordForm from '@/components/update-password-form';
import UpdateProfileInformationForm from '@/components/update-profile-information-form';

export interface KaryawanData {
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
        nip: '',
        jabatan: '',
        departemen: '',
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