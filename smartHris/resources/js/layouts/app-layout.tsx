import Sidebar from '@/components/sidebar';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    return (
        <div className="flex min-h-screen w-full bg-slate-50">
            <Sidebar />

            <main className="flex-1 overflow-y-auto p-6">
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <div className="mb-4">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                )}
                <div className="mx-auto max-w-7xl">{children}</div>
            </main>
        </div>
    );
}
