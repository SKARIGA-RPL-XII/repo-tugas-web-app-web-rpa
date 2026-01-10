import { Button } from '@/components/ui/button';
import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from './app-logo-icon';

export default function Sidebar() {
    const { auth } = usePage<PageProps>().props;

    return (
        <aside className="h-screen w-64 border-r bg-[#0D4838] p-4 flex flex-col">
            <div className='flex-1'>
      <div className="mb-6 flex items-center gap-3">
       <img
  src="/asset/fullputih.png"
  alt="SmartHRIS Logo"
  className="h-25 w-50 object-contain"
/>
      </div>

            {auth.user ? (
                <div className="space-y-4">
            
                    <nav className="space-y-1">
                      

                        {/* Contoh menu berdasarkan Role untuk testing */}
                        {/* Menu Admin*/}
                        
                        {auth.user.role === 'admin' && (

                            <>
                                <Button
                                    variant="ghost"
                                    asChild
                                    className="w-full justify-start hover:bg-[#0A3D2FB8] hover:text-white"
                                >
                                    <Link href="/dashboard">Dashboard</Link>
                                </Button>

                                <Button
                                    variant="ghost"
                                    asChild
                                    className="w-full justify-start hover:bg-[#0A3D2FB8] hover:text-white"
                                >
                                    <Link href="/admin/settings">
                                        Data Karyawan
                                    </Link>
                                </Button>
                                
                                <Button
                                    variant="ghost"
                                    asChild
                                    className="w-full justify-start hover:bg-[#0A3D2FB8] hover:text-white"
                                >
                                    <Link href="/admin/settings">
                                        Absensi Karyawan
                                    </Link>
                                </Button>


                                {/* Tambahkan menu admin lainnya */}

                            </>
                        )}
                    </nav>
                </div>
        

                            
            ) : (
                <Button asChild className="w-full">
                    <Link href="/login">Login</Link>
                </Button>
            )}
         </div>

{auth.user && (
                <div className="mt-auto pt-4 border-t">
                    <Button 
                        variant="ghost" 
                        className="w-full justify-start gap-2 hover:bg-[#0A3D2FB8] hover:text-white" 
                        asChild
                    >
                        <Link 
                        // href={route('logout')} method="post" as="button"
                        href = "/admin/setting">

                            Logout
                        </Link>
                    </Button>
                </div>
            )}

        </aside>
    );
}
