import { Button } from '@/components/ui/button';
import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function Sidebar() {
    const { auth } = usePage<PageProps>().props;

    const navButtonStyle =
        'w-full justify-start text-white/80 hover:bg-[#0A3D2FB8] hover:text-white transition-colors';

    return (
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
                                <Link href="/admin/settings">
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
                        className={`${navButtonStyle} text-yellow-300 hover:text-red-100`}
                        asChild
                    >
                        <Link href="/logout" method="post" as="button">
                            Logout
                        </Link>
                    </Button>
                </div>
            )}
        </aside>
    );
}
