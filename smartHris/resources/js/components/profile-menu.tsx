import { ChevronDown, User, Moon, LogOut, Settings } from 'lucide-react'
import { usePage, router } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'

type AuthUser = {
    id: number
    name: string
    email: string
    role: string
}

type PageProps = {
    auth?: {
        user?: AuthUser
    }
}

export default function ProfileMenu() {
    const { auth } = usePage<PageProps>().props
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    if (!auth?.user) return null

    const { name } = auth.user

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

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="
                    group flex items-center gap-3
                    rounded-full bg-white
                    px-4 py-2 shadow-sm
                    transition hover:bg-[#3E5F44]
                    focus:outline-none
                "
            >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                    <User className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
                </div>

                <span className="text-sm font-medium text-slate-900 group-hover:text-white transition-colors">
                    {name}
                </span>

                <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform ${
                        open ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {open && (
                <div className="absolute right-0 mt-3 w-72 rounded-xl bg-white shadow-lg ring-1 ring-black/5">
                    <div className="flex items-center gap-3 border-b px-4 py-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                            <User className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <span className="font-medium text-slate-800">
                            {name}
                        </span>
                    </div>

                    
                    <div className="py-2">
                        <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                            <Settings className="h-4 w-4" />
                            Profile Settings
                        </button>

                        <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                            <Moon className="h-4 w-4" />
                            Dark Mode
                        </button>

                        <hr className="my-2" />

                        <button
                            onClick={() => router.post('/logout')}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                            <LogOut className="h-4 w-4" />
                            Keluar
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
