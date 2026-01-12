import { Breadcrumbs } from '@/components/breadcrumbs';
import Sidebar from '@/components/sidebar';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    return (
        <div className="h-screen w-full overflow-hidden bg-[#E8F3F0]" >
            <Sidebar /> 

            <main className="ml-64 h-screen overflow-y-auto p-6">
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
