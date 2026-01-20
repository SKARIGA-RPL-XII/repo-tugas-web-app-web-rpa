import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import ProfileMenu from '@/components/profile-menu';
import { useState } from 'react';

export default function UserHeader({ className = "" }: { className?: string }) {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    const [currentDate] = useState(() => {
        return new Date().toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    });

    return (
        <div className={`relative h-24 w-full ${className}`}>
            <div className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl bg-[#0F172A] shadow-lg">
                <div className="absolute inset-0 bg-linear-to-r from-blue-600/40 to-purple-600/40 mix-blend-overlay" />
                <img 
                    src="/images/img_bg.jpg" 
                    alt="Header Background" 
                    className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-multiply"
                />
            </div>
            
            <div className="relative z-10 flex h-full w-full items-center justify-between px-6 sm:px-8">
                <div className="flex flex-col justify-center">
                    <h1 className="text-xl font-bold text-white sm:text-2xl">
                        Hi, {user.name}
                    </h1>
                    <p className="text-xs text-gray-200 sm:text-sm">
                        {currentDate}
                    </p>
                </div>

                <div className="flex items-center">
                    <ProfileMenu />
                </div>
            </div>
        </div>
    );
}