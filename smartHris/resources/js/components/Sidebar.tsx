import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { Link, usePage, } from '@inertiajs/react';

type AuthUser = {
    id: number;
    name: string;
    role: 'admin' | 'user';
};

type AuthProps = {
    user: AuthUser | null;
};

type PageProps = {
    auth: AuthProps;
};

export default function Sidebar() {
    const page = usePage<PageProps>();
    const auth = page.props.auth ?? { user: null };
    const isActive = (path: string) => page.url.startsWith(path);

    const isAdmin = auth.user?.role === 'admin';
    const sidebarConfig = isAdmin
        ? {
            bg: 'bg-[#0D4838]',
            logo: '/asset/fullputih.png',
            navStyle:
                'w-full justify-start text-white/80 hover:bg-[#0A3D2FB8] hover:text-white transition-colors',
            activeStyle: 'bg-[#0A3D2FB8] text-white',
        }
        : {
            bg: 'bg-[#FFFFFF]',
            logo: '/asset/logo_hijau.png',
            navStyle:
                'w-full justify-start text-[#666666]/80 hover:bg-[#0D48381A] hover:text-[#0D4838] transition-colors',
            activeStyle: 'bg-[#0D48381A] text-[#0D4838]',
        };

    return (
        <>
            <aside
                className={`fixed top-0 left-0 z-40 flex h-screen w-64 flex-col overflow-hidden ${sidebarConfig.bg} p-4 text-white`}
            >
                <div className="mb-8 flex justify-center px-2">
                    <img
                        src={sidebarConfig.logo}
                        alt="SmartHRIS Logo"
                        className="h-auto w-full max-w-40 object-contain"
                    />
                </div>

                <div className="flex-1">
                    <nav className="space-y-2">
                        {isAdmin ? (
                            <>
                                <Button
                                    variant="ghost"
                                    asChild
                                    className={`${sidebarConfig.navStyle} ${isActive('/dashboard')
                                        ? sidebarConfig.activeStyle
                                        : ''
                                        }`}
                                >
                                    <Link href="/dashboard">
                                        <Icon
                                            icon="material-symbols:dashboard-rounded"
                                            width="20"
                                            height="20"
                                        />
                                        <span>Dashboard</span>
                                    </Link>
                                </Button>

                                <Button
                                    variant="ghost"
                                    asChild
                                    className={`${sidebarConfig.navStyle} ${
                                        isActive('/app/karyawan')
                                            ? sidebarConfig.activeStyle
                                            : ''
                                    }`}
                                >
                                    <Link href="/app/karyawan"> 
                                        <Icon
                                            icon="f7:person-2-fill" 
                                            width="24"  
                                            height="24"
                                        />
                                        <span>Data Karyawan</span>
                                    </Link>
                                </Button>

                                <Button
                                    variant="ghost"
                                    asChild
                                    className={`${sidebarConfig.navStyle} ${
                                        isActive('/app/absensi')
                                            ? sidebarConfig.activeStyle
                                            : ''
                                    }`}
                                >
                                    <Link href="/app/absensi">
                                        {' '}
                                        <Icon
                                            icon="streamline:office-worker-remix"
                                            width="14"
                                            height="14"
                                        />
                                        <span> Absensi Karyawan</span>
                                    </Link>
                                </Button>
                                <Button
                                    variant="ghost"
                                    asChild
                                    className={`${sidebarConfig.navStyle} ${
                                        isActive('/app/cuti')
                                            ? sidebarConfig.activeStyle
                                            : ''
                                    }`}
                                >
                                    <Link href="/app/cuti">
                                        {' '}
                                        <Icon
                                            icon="streamline:office-worker-remix"
                                            width="14"
                                            height="14"
                                        />
                                        <span> Data Cuti Karyawan</span>
                                    </Link>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="ghost"
                                    asChild
                                    className={`${sidebarConfig.navStyle} ${isActive('/dashboard')
                                        ? sidebarConfig.activeStyle
                                        : ''
                                        }`}
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
                                    className={`${sidebarConfig.navStyle} ${isActive('/absen')
                                        ? sidebarConfig.activeStyle
                                        : ''
                                        }`}
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
                                    className={`${sidebarConfig.navStyle} ${isActive('/absensi/riwayat')
                                        ? sidebarConfig.activeStyle
                                        : ''
                                        }`}
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
                                    className={`${sidebarConfig.navStyle} ${isActive('/pelanggaran')
                                        ? sidebarConfig.activeStyle
                                        : ''
                                        }`}
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
                                    className={`${sidebarConfig.navStyle} ${isActive('/cuti')
                                        ? sidebarConfig.activeStyle
                                        : ''
                                        }`}
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
                                <Button
                                    variant="ghost"
                                    asChild
                                    className={`${sidebarConfig.navStyle} ${isActive('/cuti')
                                        ? sidebarConfig.activeStyle
                                        : ''
                                        }`}
                                >
                                    <Link href="/logout" method='post'>
                                        <Icon
                                            icon="mage:star-moving-fill"
                                            width="24"
                                            height="24"
                                        />
                                        <span>Logout</span>
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
