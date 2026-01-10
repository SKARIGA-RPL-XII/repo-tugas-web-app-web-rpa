import { StatusModal } from '@/components/modal-status';
import { Button } from '@/components/ui/button';
import { PageProps } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Sidebar() {
    const { auth } = usePage<PageProps>().props;
    const [openLogout, setOpenLogout] = useState(false);

    const navButtonStyle =
        'w-full justify-start text-white/80 hover:bg-[#0A3D2FB8] hover:text-white transition-colors';

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <>
            <aside className="flex h-screen w-64 flex-col border-r bg-[#0D4838] p-4 text-white">
                <div className="mb-8 flex justify-center px-2">
                    <img
                        src="/asset/fullputih.png"
                        alt="SmartHRIS Logo"
                        className="h-auto w-full max-w-40 object-contain"
                    />
                </div>

                <div className="flex-1">
                    <nav className="space-y-2">
                        {auth.user.role === 'admin' ? (
                            <>
                                <Button
                                    variant="ghost"
                                    asChild
                                    className={navButtonStyle}
                                >
                                    <Link href="/dashboard">Dashboard</Link>
                                </Button>

                                <Button
                                    variant="ghost"
                                    asChild
                                    className={navButtonStyle}
                                >
                                    <Link href="/admin/karyawan">
                                        Data Karyawan
                                    </Link>
                                </Button>

                                <Button
                                    variant="ghost"
                                    asChild
                                    className={navButtonStyle}
                                >
                                    <Link href="/admin/settings">
                                        Absensi Karyawan
                                    </Link>
                                </Button>
                            </>
                        ) : (
                            <Button
                                variant="ghost"
                                asChild
                                className={navButtonStyle}
                            >
                                <Link href="/dashboard">My Dashboard</Link>
                            </Button>
                        )}
                    </nav>
                </div>

                {auth.user && (
                    <div className="mt-auto pt-4">
                        <Button
                            variant="ghost"
                            className={`${navButtonStyle} text-red-500 hover:text-red-300`}
                            onClick={() => setOpenLogout(true)}
                        >
                            Logout
                        </Button>
                    </div>
                )}
            </aside>

            <StatusModal
                isOpen={openLogout}
                onClose={() => setOpenLogout(false)}
                type="logout"
                title="Konfirmasi Logout"
                description="Apakah Anda yakin ingin keluar dari sistem?"
                onConfirm={handleLogout}
            />
        </>
    );
}
