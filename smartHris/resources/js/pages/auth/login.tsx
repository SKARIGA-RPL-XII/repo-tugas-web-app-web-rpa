import InputError from '@/components/input-error'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import AuthLayout from '@/layouts/auth-layout'

import { Head, useForm, Link } from '@inertiajs/react'

interface LoginProps {
  status?: string
  canResetPassword: boolean
  canRegister: boolean
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()

    post('/login', {
      onFinish: () => reset('password'),
    })
  }

  return (
    <AuthLayout>
      <Head title="Login" />

      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[530px_1fr]">
        {/* LEFT */}
        <div className="hidden lg:block relative m-6 rounded-3xl overflow-hidden">
          <img
            src="/images/img_bg.jpg"
            alt="Office"
            className="absolute w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/60" />

          <div className="absolute inset-0 z-10 flex flex-col justify-between p-8 text-white">
            <p className="text-sm">Human Resource © 2026</p>
            <h2 className="text-4xl font-thin leading-tight">
              Masuki Era Baru <br /> Absensi Digital Karyawan
            </h2>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-center px-6">
          <div className="w-full max-w-md">
            <img
              src="/images/logos/logo_kantor.png"
              className="w-44 mx-auto mb-6"
            />

            <h1 className="text-center text-2xl font-bold">
              Selamat Datang di
            </h1>
            <h2 className="text-center text-3xl font-bold mb-2">
              Human Resource
            </h2>

            <p className="text-center text-gray-500 mb-8">
              Sistem Absensi Digital Terintegrasi
            </p>

            <form onSubmit={submit}>
              <div className="mb-4">
                <Label>Email</Label>
                <Input
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                />
                <InputError message={errors.email} />
              </div>

              <div className="mb-4">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                />
                <InputError message={errors.password} />
              </div>

              <div className="flex justify-between mb-6">
                <label className="flex items-center gap-2">
                  <Checkbox
                    checked={data.remember}
                    onCheckedChange={(v) =>
                      setData('remember', Boolean(v))
                    }
                  />
                  Ingat Saya
                </label>

                {canResetPassword && (
                  <Link
                    href="/forgot-password"
                    className="text-sm text-emerald-700"
                  >
                    Lupa Password?
                  </Link>
                )}
              </div>

              <Button
                type="submit"
                disabled={processing}
                className="w-full"
              >
                {processing && <Spinner className="mr-2" />}
                Masuk
              </Button>
            </form>

            {status && (
              <div className="mt-4 text-center text-green-600">
                {status}
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
