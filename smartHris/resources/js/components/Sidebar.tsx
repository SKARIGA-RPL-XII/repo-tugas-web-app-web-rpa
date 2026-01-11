import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { Link, usePage } from '@inertiajs/react';

export default function Sidebar() {
    const page = usePage();
    const auth = page.props.auth as any;
    const url = page.url;
    const [openLogout, setOpenLogout] = useState(false);
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
                        {auth.user.role === 'admin' ? (
                            <>
                                <Button
                                    variant="ghost"
                                    asChild
                                    className={`${sidebarConfig.navStyle} ${
                                        isActive('/dashboard') //url nya jangan lupa diubah
                                            ? sidebarConfig.activeStyle
                                            : ''
                                    }`}
                                >
                                    <Link href="/dashboard">
                                        {/*url nya jangan lupa diubah*/}
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
                                        isActive('/admin/settings') //url nya jangan lupa diubah
                                            ? sidebarConfig.activeStyle
                                            : ''
                                    }`}
                                >
                                    <Link href="/admin/settings">
                                        {/*url nya jangan lupa diubah*/}
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
                                    className={`${sidebarConfig.navStyle} ${
                                        isActive('/admin/absensi_karyawan') //url nya jangan lupa diubah
                                            ? sidebarConfig.activeStyle
                                            : ''
                                    }`}
                                >
                                    <Link href="/admin/absensi_karyawan">
                                        {' '}
                                        {/*url nya jangan lupa diubah*/}
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
                                    className={`${sidebarConfig.navStyle} ${
                                        isActive('/dashboard') //url nya jangan lupa diubah
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
                                    className={`${sidebarConfig.navStyle} ${
                                        isActive('/absen') //url nya jangan lupa diubah
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
                                    className={`${sidebarConfig.navStyle} ${
                                        isActive('/absensi/riwayat') //url nya jangan lupa diubah
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
                                    className={`${sidebarConfig.navStyle} ${
                                        isActive('/pelanggaran') //url nya jangan lupa diubah
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
                                    className={`${sidebarConfig.navStyle} ${
                                        isActive('/cuti') //url nya jangan lupa diubah
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
                            </>
                        )}
                    </nav>
                </div>

                {auth.user && (
                    <div className="pt-4">
                        <Button
                            variant="ghost"
                            className="hover:text-red-990 w-full justify-start text-red-500 hover:bg-red-500/10"
                            onClick={() => setOpenLogout(true)}
                        >
                            Logout
                        </Button>
                    </div>
                )}
            </aside>
        </>
    );
}
