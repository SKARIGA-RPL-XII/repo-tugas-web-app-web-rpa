import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import ProfileMenu from '@/components/profile-menu';

export default function UserHeader() {
  const { auth } = usePage<PageProps>().props;
  const user = auth.user;

  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const dateString = now.toLocaleDateString('id-ID', options);

  return (
    <div className="relative mb-6 h-40 w-full"> 
      
      <div className="absolute inset-0 h-full w-full overflow-hidden rounded-3xl">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
          style={{
            backgroundImage: "url('/images/img_bg.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#0F4C3A] to-[#1B6B57]/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="relative z-10 flex h-full items-center justify-between px-8 py-8 text-white">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Halo, {user.name}! 👋
          </h1>
          <p className="text-sm font-medium opacity-90 capitalize">
            {dateString}
          </p>
        </div>

        <div className="flex items-center">
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
}