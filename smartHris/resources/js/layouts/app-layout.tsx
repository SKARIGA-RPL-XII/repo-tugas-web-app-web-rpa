import { Breadcrumbs } from '@/components/breadcrumbs';
import Sidebar from '@/components/Sidebar';
import UserHeader from '@/components/user/UserHeader';
import ProfileMenu from '@/components/profile-menu';
import { type BreadcrumbItem, PageProps } from '@/types';
import { type ReactNode } from 'react';
import { usePage } from '@inertiajs/react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    const { auth } = usePage<PageProps>().props;
    const user = auth?.user;

    const isUserRole = user?.role === 'user' || (Array.isArray(user?.roles) && user.roles[0]?.name === 'user');

    return (
        <div className="h-screen w-full overflow-hidden bg-[#E8F3F0]">
            <Sidebar />

            <main className="pt-16 md:pt-0 md:ml-64 h-screen overflow-y-auto">
                
                {isUserRole ? (
                    <div className="px-4 pt-10 pb-4 sm:px-8">
                        <UserHeader />
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 items-start justify-between px-4 py-4 sm:flex-row sm:items-center sm:px-6 sm:py-6">
                        <div className="flex-1">
                            {breadcrumbs && breadcrumbs.length > 0 && (
                                <Breadcrumbs breadcrumbs={breadcrumbs} />
                            )}
                        </div>
                        <div className="w-full sm:w-auto">
                            <ProfileMenu />
                        </div>
                    </div>
                )}

                <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}