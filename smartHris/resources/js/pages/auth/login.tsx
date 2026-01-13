import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
// import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    // canRegister,
}: LoginProps) {
    return (
        <AuthLayout>
            <Head title="Login" />

            <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[530px_1fr]">
                {/* LEFT IMAGE SECTION */}
                <div className="hidden lg:block relative w-full h-[calc(100vh-3rem)] overflow-hidden rounded-3xl ml-6 mt-6 mb-6 bg-black">
                 <img
                    src="/images/img_login.jpg"
                    alt="Office"
                    className="absolute w-full h-full object-cover"
                 />




                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

                    {/* Text Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-8 text-white z-10">
                        <p className="text-sm opacity-90">
                            Human Resource © 2026 All rights reserved.
                        </p>
                        
                        <div>
                            <h2 className="text-4xl font-thin leading-tight mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Masuki Era Baru <br />
                                Absensi Digital Karyawan
                            </h2>
                            <div className="w-full h-px bg-white/80" />
                        </div>
                    </div>
                </div>

                {/* RIGHT FORM SECTION */}
                <div className="flex items-center justify-center px-6 lg:px-12 bg-white">
                    <div className="w-full max-w-md flex flex-col items-center">
                        {/* LOGO */}
                        <img
                            src="/images/logos/logo_kantor.png"
                            alt="HRIS Logo"
                            className="w-44 h-auto mb-6"
                        />

                        {/* TITLE */}
                        <h1 className="text-2xl font-bold text-center text-gray-800 mb-0" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            Selamat Datang di
                        </h1>
                        <h2 className="text-3xl font-bold text-center text-gray-900 mt-1 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            Human Resource
                        </h2>

                        {/* SUBTITLE */}
                        <p className="text-base text-center text-gray-500 mb-8">
                            Sistem Absensi Digital yang Terintegrasi.
                        </p>
                
                        <Form
                            {...store.form()}
                            resetOnSuccess={['password']}
                            className="w-full"
                        >
                            {({ processing, errors }) => (
                                <>
                                    {/* Username Field */}
                                    <div className="w-full mb-4">
                                        <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                                            Username{' '}
                                            <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            placeholder="Masukkan Username"
                                            tabIndex={1}
                                            className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* Password Field */}
                                    <div className="w-full mb-4">
                                        <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2 block">
                                            Password{' '}
                                            <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="Masukkan Password"
                                            tabIndex={2}
                                            className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    {/* Remember & Forgot Password */}
                                    <div className="w-full flex items-center justify-between mb-6">
                                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                            />
                                            Ingat Saya
                                        </label>

                                        {canResetPassword && (
                                            <TextLink
                                                href={request()}
                                                className="text-sm font-medium text-emerald-800 hover:text-emerald-900"
                                            >
                                                Lupa Password?
                                            </TextLink>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-3.5 px-6 bg-emerald-900 hover:bg-emerald-800 text-white font-semibold rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
                                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                                    >
                                        {processing && <Spinner />}
                                        Masuk
                                    </Button>
                                </>
                            )}
                        </Form>

                        {/* Status Message */}
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