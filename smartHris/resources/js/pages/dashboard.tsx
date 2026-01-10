import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;
    const userRole = auth.user.role;

    return (
        <AppLayout>
            <Head title="Dashboard" />
            
            <div className="p-4">
                {userRole === 'admin' ? (
                    <div>
                        <h1 className="text-black text-2xl font-bold">Selamat Datang, {auth.user.name}!</h1>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-black text-2xl font-bold">Selamat Datang, {auth.user.name}!</h1>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}