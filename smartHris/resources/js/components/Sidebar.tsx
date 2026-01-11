import { Button } from '@/components/ui/button';
import { PageProps } from '@/types';
import { Icon } from '@iconify/react';
import { Link, usePage } from '@inertiajs/react';

export default function Sidebar() {
    const { auth } = usePage<PageProps>().props;

   const isAdmin = auth.user?.role === 'admin';

const sidebarConfig = isAdmin
    ? {
          bg: 'bg-[#0D4838]',
          logo: '/asset/fullputih.png',
          navStyle:
              'w-full justify-start text-white/80 hover:bg-[#0A3D2FB8] hover:text-white transition-colors',
      }
    : {
          bg: 'bg-[#FFFFFF]', 
          logo: '/asset/logo_hijau.png',
          navStyle:
            'w-full justify-start text-[#666666]/80 hover:bg-[#0D48381A] hover:text-[#0D4838] transition-colors',
      };

    return (
        <>
            <aside className={`fixed top-0 left-0 z-40 flex h-screen w-64 flex-col overflow-hidden ${sidebarConfig.bg} p-4 text-white`}>
                <div className="mb-8 flex justify-center px-2">
                    <img
                        src={sidebarConfig.logo}
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
                                    className={sidebarConfig.navStyle}
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
                                    className={sidebarConfig.navStyle}
                                >
                                    <Link href="/admin/karyawan">
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
                                    className={sidebarConfig.navStyle}
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
                                    className={sidebarConfig.navStyle}
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
                                    className={sidebarConfig.navStyle}
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
                                    className={sidebarConfig.navStyle}
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
                                    className={sidebarConfig.navStyle}
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
                                    className={sidebarConfig.navStyle}
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
            </aside>
        </>
    );
}
