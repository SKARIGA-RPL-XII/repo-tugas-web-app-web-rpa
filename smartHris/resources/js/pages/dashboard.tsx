import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    // Ambil data auth dari props atau usePage
    const { auth } = usePage<PageProps>().props;
    const userRole = auth.user.role;

    return (
        <AppLayout>
            <Head title="Dashboard" />
            
            <div className="p-4">
                {userRole === 'admin' ? (
                    /* Tampilan khusus Admin */
                    <div className="bg-blue-100 p-6 rounded-xl border border-blue-200">
                        <h1 className="text-2xl font-bold text-blue-800">Hello Admin, {auth.user.name}!</h1>
                        <p className="text-blue-600">Ini adalah panel kendali manajemen HRIS.</p>
                    </div>
                ) : (
                    /* Tampilan khusus User/Karyawan */
                    <div className="bg-green-100 p-6 rounded-xl border border-green-200">
                        <h1 className="text-2xl font-bold text-green-800">Selamat Datang, {auth.user.name}!</h1>
                        <p className="text-green-600">Silahkan cek absensi dan jadwal kerja kamu hari ini.</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}