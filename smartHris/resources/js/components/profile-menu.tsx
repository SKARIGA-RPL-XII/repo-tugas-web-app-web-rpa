import { ChevronDown, LogOut, Settings } from 'lucide-react'
import { usePage, router, Link } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'
import LogoutModal from '@/components/logout-modal'

type AuthUser = {
    id: number
    name: string
    email: string
    role: string
    avatar?: string
}

type PageProps = {
    auth?: {
        user?: AuthUser
    }
}

export default function ProfileMenu() {
    const { auth } = usePage<PageProps>().props

    const [open, setOpen] = useState(false)

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    if (!auth?.user) return null

    const { name, role, avatar } = auth.user

    const isAdmin = role === 'admin';

    const handleLogoutClick = () => {
        setOpen(false);
        setIsLogoutModalOpen(true);
    }

    const handleConfirmLogout = () => {
        setIsLoggingOut(true);
        router.post('/logout', {}, {
            onFinish: () => {
                setIsLoggingOut(false);
                setIsLogoutModalOpen(false);
            }
        });
    }

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 z-30 bg-black/20 transition-opacity duration-200"
                    onClick={() => setOpen(false)}
                />
            )}

            <div className="relative z-40" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className={`
                        group flex items-center rounded-full bg-white shadow-sm 
                        border border-slate-200 hover:shadow-md hover:border-slate-300 
                        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#144435]/20
                        ${open ? 'ring-2 ring-[#144435]/20' : ''}
                        ${isAdmin ? 'gap-2 px-3 py-2 sm:gap-3 sm:px-3' : 'p-1'} 
                    `}
                >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br shadow-sm overflow-hidden sm:h-9 sm:w-9">
                        <img
                            src={avatar || "/profile.png"}
                            alt={name}
                            className="h-full w-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/profile.png'; }}
                        />
                    </div>

                    {isAdmin && (
                        <>
                            <div className="flex flex-col items-start">
                                <span className="text-xs font-semibold text-slate-800 leading-none sm:text-sm">
                                    Hi, {name}
                                </span>
                            </div>

                            <ChevronDown
                                className={`h-3 w-3 text-slate-400 transition-transform duration-300 sm:h-4 sm:w-4 ${open ? 'rotate-180 text-slate-600' : ''
                                    }`}
                            />
                        </>
                    )}
                </button>

                {open && (
                    <div className="absolute right-0 sm:right-0 mt-3 w-80 sm:w-72 origin-top-right overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/10 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="flex items-center gap-3 border-b border-slate-100 bg-linear-to-r from-slate-50 to-white px-4 py-3 sm:px-5 sm:py-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-sm overflow-hidden">
                                <img
                                    src={avatar || "/profile.png"}
                                    alt={name}
                                    className="h-full w-full object-cover"
                                    onError={(e) => { (e.target as HTMLImageElement).src = '/profile.png'; }}
                                />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="truncate text-sm font-bold text-slate-900">
                                    {name}
                                </p>
                            </div>
                        </div>

                        <div className="p-2 space-y-1">
                            <Link
                                href="/settings"
                                className="group flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                            >
                                <Settings className="h-4 w-4 text-slate-400 transition-colors group-hover:text-slate-600" />
                                Pengaturan Profil
                            </Link>

                            <div className="my-1 h-px bg-slate-100 mx-2" />

                            <button
                                onClick={handleLogoutClick}
                                className="group flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                            >
                                <LogOut className="h-4 w-4 text-red-500 transition-colors group-hover:text-red-600" />
                                Keluar
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleConfirmLogout}
                isLoading={isLoggingOut}
            />
        </>
    )
}