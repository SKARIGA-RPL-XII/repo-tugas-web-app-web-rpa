import { useState } from 'react'
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/routes/login';
import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react'

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
  canRegister: boolean;
}

export default function Login({ status }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false)
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(store.form().action, {
      onSuccess: () => reset('password'),
    });
  };

  return (
    <AuthLayout>
      <Head title="Login" />

      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[530px_1fr]">
        <div className="hidden lg:block relative w-full h-[calc(100vh-3rem)] overflow-hidden rounded-3xl ml-6 mt-6 mb-6 bg-black">
          <img
            src="/images/img_bg.jpg"
            alt="Office"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/60" />
          <div className="absolute inset-0 flex flex-col justify-between p-8 text-white z-10">
            <p className="text-sm opacity-90">
              Human Resource © 2026 All rights reserved.
            </p>
            <div>
              <h2
                className="text-4xl font-thin leading-tight mb-5"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Masuki Era Baru <br />
                Absensi Digital Karyawan
              </h2>
              <div className="w-full h-px bg-white/80" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 lg:px-12 bg-white">
          <div className="w-full max-w-md flex flex-col items-center">
            <img
              src="/images/logos/logo_kantor.png"
              alt="HRIS Logo"
              className="w-44 h-auto mb-6"
            />
            <h1
              className="text-2xl font-bold text-center text-gray-800"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Selamat Datang di
            </h1>
            <h2
              className="text-3xl font-bold text-center text-gray-900 mt-1 mb-2"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Human Resource
            </h2>

            <p className="text-base text-center text-gray-500 mb-8">
              Sistem Absensi Digital yang Terintegrasi.
            </p>

            <form onSubmit={submit} className="w-full">
              <div className="mb-4">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  placeholder="Masukkan Email"
                />
                <InputError message={errors.email} />
              </div>

              <div className="mb-4">
                <Label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </Label>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder="Masukkan Password"
                    className="pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <InputError message={errors.password} />
              </div>

              <Button
                type="submit"
                disabled={processing}
                className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-800 text-white"
              >
                {processing && <Spinner />}
                Masuk
              </Button>
            </form>

            {status && (
              <div className="mt-4 text-center text-sm font-medium text-green-600">
                {status}
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
