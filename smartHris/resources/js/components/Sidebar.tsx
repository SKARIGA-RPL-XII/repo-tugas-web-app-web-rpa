import { Button } from '@/components/ui/button';
import { PageProps } from '@/types';
import { Icon } from '@iconify/react';
import { Link, usePage } from '@inertiajs/react';

export default function Sidebar() {
    const { auth } = usePage<PageProps>().props;

    const navButtonStyle =
        'w-full justify-start text-white/80 hover:bg-[#0A3D2FB8] hover:text-white transition-colors';

    return (
        <aside className="flex h-screen w-64 flex-col border-r bg-[#0D4838] p-4 text-white overflow-hidden">
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
                                <Link href="/dashboard">
                                    <Icon
                                        icon="material-symbols:dashboard-rounded"
                                        width="20"
                                        height="20"
                                    />
                                    <span> Dashboard </span>
                                </Link>
                            </Button>

                            <Button
                                variant="ghost"
                                asChild
                                className={navButtonStyle}
                            >
                                <Link href="/admin/settings">
                                    <Icon
                                        icon="f7:person-2-fill"
                                        width="56"
                                        height="56"
                                    />
                                    <span>Data Karyawan</span>
                                </Link>
                            </Button>

                            <Button
                                variant="ghost"
                                asChild
                                className={navButtonStyle}
                            >
                                <Link href="/admin/settings">
                                    <Icon
                                        icon="streamline:office-worker-remix"
                                        width="14"
                                        height="14"
                                    />
                                    <span> Absensi Karyawan</span>
                                </Link>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="ghost"
                                asChild
                                className={navButtonStyle}
                            >
                                <Link href="/dashboard">
                                    <Icon
                                        icon="solar:home-2-bold"
                                        width="24"
                                        height="24"
                                    />
                                    <span>Home</span>
                                </Link>
                            </Button>

                            <Button
                                variant="ghost"
                                asChild
                                className={navButtonStyle}
                            >
                                <Link href="/absen">
                                    <Icon
                                        icon="fluent:task-list-square-16-filled"
                                        width="16"
                                        height="16"
                                    />
                                    <span>Absen</span>
                                </Link>
                            </Button>

                            <Button
                                variant="ghost"
                                asChild
                                className={navButtonStyle}
                            >
                                <Link href="/absen/riwayat">
                                    <Icon
                                        icon="mage:note-text-fill"
                                        width="24"
                                        height="24"
                                    />
                                    <span>Riwayat Absen</span>
                                </Link>
                            </Button>

                            <Button
                                variant="ghost"
                                asChild
                                className={navButtonStyle}
                            >
                                <Link href="/pelanggaran">
                                    <Icon
                                        icon="mingcute:warning-fill"
                                        width="24"
                                        height="24"
                                    />
                                    <span>Pelanggaran</span>
                                </Link>
                            </Button>

                            <Button
                                variant="ghost"
                                asChild
                                className={navButtonStyle}
                            >
                                <Link href="/cuti">
                                    <Icon
                                        icon="mage:star-moving-fill"
                                        width="24"
                                        height="24"
                                    />
                                    <span>Cuti</span>
                                </Link>
                            </Button>
                        </>
                    )}
                </nav>
            </div>

            {auth.user && (
                <div className="mt-auto pt-4">
                    <Button
                        variant="ghost"
                        className={`${navButtonStyle} text-red-500 hover:text-red-300`}
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
