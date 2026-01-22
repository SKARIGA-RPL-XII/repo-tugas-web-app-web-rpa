import { ChevronDown, LogOut, Settings } from 'lucide-react'
import { usePage, useForm, Link } from '@inertiajs/react'
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
    const { post, processing } = useForm({});

    const [open, setOpen] = useState(false)
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

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

    const { name, avatar } = auth.user

    const handleLogoutClick = () => {
        setOpen(false);
        setIsLogoutModalOpen(true);
    }

    const handleConfirmLogout = () => {
        post('/logout', {
            onFinish: () => {
                setIsLogoutModalOpen(false);
            }
        });
    }

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 z-30 bg-transparent"
                    onClick={() => setOpen(false)}
                />
            )}

            <div className="relative z-40" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className={`
        flex items-center gap-2 rounded-full bg-white px-3 py-1.5
        border border-gray-200 shadow-sm
        transition-all duration-200
        ${open ? 'ring-2 ring-gray-200' : 'hover:shadow-md'}
    `}
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 overflow-hidden border">
                        <img
                            src={avatar || '/profile.png'}
                            alt={name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/profile.png'
                            }}
                        />
                    </div>

                    <span className="text-sm font-medium text-gray-800">
                        {auth.user.role === 'admin' ? 'Hi, Admin' : ``}
                    </span>

                    <ChevronDown
                        className={`h-4 w-4 text-gray-600 transition-transform ${open ? 'rotate-180' : ''
                            }`}
                    />
                </button>
                {open && (
                    <div className="absolute right-0 mt-3 w-64 origin-top-right overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/50 px-4 py-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm overflow-hidden border border-gray-200">
                                <img
                                    src={avatar || "/profile.png"}
                                    alt={name}
                                    className="h-full w-full object-cover"
                                    onError={(e) => { (e.target as HTMLImageElement).src = '/profile.png'; }}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="truncate text-sm font-semibold text-gray-900">
                                    {name}
                                </p>
                            </div>
                        </div>

                        <div className="p-1.5">
                            <Link
                                href="/settings/profile"
                                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            >
                                <Settings className="h-4 w-4 text-gray-500" />
                                Pengaturan Profil
                            </Link>

                            <button
                                onClick={handleLogoutClick}
                                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <LogOut className="h-4 w-4 text-red-500" />
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
                isLoading={processing}
            />
        </>
    )
}