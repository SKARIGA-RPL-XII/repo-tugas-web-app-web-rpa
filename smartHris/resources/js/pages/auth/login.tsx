<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c3fe032c8a5aed69be527fd5e6ae7de6e38c874a
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
<<<<<<< HEAD
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Head, useForm } from '@inertiajs/react';
=======
import InputError from '@/components/input-error'
import TextLink from '@/components/text-link'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import AuthLayout from '@/layouts/auth-layout'
import { store } from '@/routes/login'
import { request } from '@/routes/password'
import { Form, Head } from '@inertiajs/react'
>>>>>>> d4f988265246f77e9b646f025bef71a1695b76b8
=======
import { Head, useForm, Link } from '@inertiajs/react';
>>>>>>> c3fe032c8a5aed69be527fd5e6ae7de6e38c874a

interface LoginProps {
    status?: string
    canResetPassword: boolean
    canRegister: boolean
}

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c3fe032c8a5aed69be527fd5e6ae7de6e38c874a
export default function Login({
    status,
    canResetPassword,
}: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
<<<<<<< HEAD

        post(store.form().action, {
            onSuccess: () => reset('password'),
=======
        post('/login', {
            onFinish: () => reset('password'),
>>>>>>> c3fe032c8a5aed69be527fd5e6ae7de6e38c874a
        });
    };

    return (
        <AuthLayout>
            <Head title="Login" />

            <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[530px_1fr]">
<<<<<<< HEAD
                {/* LEFT IMAGE */}
=======
>>>>>>> c3fe032c8a5aed69be527fd5e6ae7de6e38c874a
                <div className="hidden lg:block relative w-full h-[calc(100vh-3rem)] overflow-hidden rounded-3xl ml-6 mt-6 mb-6 bg-black">
                    <img
                        src="/images/img_bg.jpg"
                        alt="Office"
                        className="absolute w-full h-full object-cover"
<<<<<<< HEAD
=======
export default function Login({ status, canResetPassword }: LoginProps) {
  return (
    <AuthLayout>
      <Head title="Login" />

      <div className="login-layout">
        <div className="login-left">
          <img
            src="/images/img_bg.jpg"
            alt="Office"
            className="login-left-image"
          />

          <div className="login-left-overlay" />

          <div className="login-left-content">
            <p className="login-left-footer">
              Human Resource © 2026 All rights reserved.
            </p>
            <h2 className="login-left-title">
              Masuki Era Baru <br />
              Absensi Digital Karyawan
            </h2>
          </div>
        </div>

        <div className="login-right">
          <div className="login-frame">
            <img
              src="/images/logos/logo_kantor.png"
              alt="HRIS Logo"
              className="login-logo"
            />

            <h1 className="login-title">Selamat Datang di</h1>
            <h2 className="login-title-main">Human Resource</h2>

            <p className="login-subtitle">
              Sistem Absensi Digital yang Terintegrasi.
            </p>

            <Form
              {...store.form()}
              resetOnSuccess={['password']}
              className="login-form"
            >
              {({ processing, errors }) => (
                <>
                  <div className="login-field">
                    <Label htmlFor="email">
                      Username <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      className="input-username"
                      id="email"
                      name="email"
                      type="text"
                      autoComplete="username"
                      spellCheck={false}
                      placeholder="Masukkan Username"
                      tabIndex={1}
>>>>>>> d4f988265246f77e9b646f025bef71a1695b76b8
=======
>>>>>>> c3fe032c8a5aed69be527fd5e6ae7de6e38c874a
                    />

<<<<<<< HEAD
<<<<<<< HEAD
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
=======
                    <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/60" />
>>>>>>> c3fe032c8a5aed69be527fd5e6ae7de6e38c874a

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
                                    className="mt-1"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="mb-4">
                                <Label htmlFor="password">
                                    Password <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Masukkan Password"
                                    className="mt-1"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                    <Checkbox
                                        id="remember"
                                        checked={data.remember}
                                        onCheckedChange={(val) =>
                                            setData('remember', Boolean(val))
                                        }
                                    />
                                    Ingat Saya
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm font-medium text-emerald-800 hover:text-emerald-900"
                                    >
                                        Lupa Password?
                                    </Link>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-800 text-white"
                            >
                                {processing && <Spinner className="mr-2 h-4 w-4" />}
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
<<<<<<< HEAD
=======
                  <div className="login-field-password">
                    <Label htmlFor="password">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      className="input-password"
                      id="password"
                      type="password"
                      name="password"
                      autoComplete="current-password"
                      spellCheck={false}
                      placeholder="Masukkan Password"
                      tabIndex={2}
                    />
                    <InputError message={errors.password} />
                  </div>

                  <div className="login-field-remember">
                    <label className="button-remember">
                      <Checkbox id="remember" name="remember" />
                      Ingat Saya
                    </label>

                    {canResetPassword && (
                      <TextLink
                        href={request()}
                        className="button-lupa-password"
                      >
                        Lupa Password?
                      </TextLink>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="button-masuk"
                    disabled={processing}
                  >
                    {processing && <Spinner />}
                    Masuk
                  </Button>
                </>
              )}
            </Form>

            {status && (
              <div className="mt-4 text-center text-sm font-medium text-green-600">
                {status}
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthLayout>
  )
>>>>>>> d4f988265246f77e9b646f025bef71a1695b76b8
}
=======
}
>>>>>>> c3fe032c8a5aed69be527fd5e6ae7de6e38c874a
