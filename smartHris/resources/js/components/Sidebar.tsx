import { Link, usePage } from '@inertiajs/react'
import AppLogoIcon from './app-logo-icon'
import { Button } from '@/components/ui/button'

export default function Sidebar() {
  const { auth } = usePage().props as any

  return (
    <aside className="w-64 border-r bg-background p-4">
      <div className="flex items-center gap-3 mb-6">
        <AppLogoIcon className="size-8 fill-primary" />
        <span className="font-bold text-lg">SmartHRIS</span>
      </div>

      {auth?.user ? (
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Halo, <strong>{auth.user.name}</strong>
          </div>

          <Button asChild className="w-full">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      ) : (
        <Button asChild className="w-full">
          <Link href="/login">Login</Link>
        </Button>
      )}
    </aside>
  )
}
