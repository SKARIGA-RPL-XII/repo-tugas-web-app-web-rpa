import { Button } from '@/components/ui/button';
import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from './app-logo-icon';

export default function Sidebar() {
    const { auth } = usePage<PageProps>().props;

    return (
        <aside className="h-screen w-64 border-r bg-background p-4">
            <div className="mb-6 flex items-center gap-3">
                <AppLogoIcon className="size-8 fill-primary" />
                <span className="text-lg font-bold italic">SmartHRIS</span>
            </div>

            {auth.user ? (
                <div className="space-y-4">
                    <div className="border-b pb-2 text-sm text-muted-foreground">
                        Halo,{' '}
                        <strong className="text-foreground">
                            {auth.user.name}
                        </strong>
                        <span className="block text-[10px] tracking-wider uppercase">
                            {auth.user.role}
                        </span>
                    </div>

                    <nav className="space-y-1">
                        <Button
                            variant="ghost"
                            asChild
                            className="w-full justify-start"
                        >
                            <Link href="/dashboard">Dashboard</Link>
                        </Button>

                        {auth.user.role === 'admin' && (
                            <Button
                                variant="ghost"
                                asChild
                                className="w-full justify-start"
                            >
                                <Link href="/admin/settings">
                                    Pengaturan Sistem
                                </Link>
                            </Button>
                        )}
                    </nav>
                </div>
            ) : (
                <Button asChild className="w-full">
                    <Link href="/login">Login</Link>
                </Button>
            )}
        </aside>
    );
}
