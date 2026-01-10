import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
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
    canRegister,
}: LoginProps) {
    return (
        <AuthLayout>
            <Head title="Login" />

                <div className="login-layout">
                {/* LEFT IMAGE */}
                <div className="login-left">
                    <img
                        src="/images/img_login.jpg"
                        alt="Office"
                        className="login-left-image"
                    />

                    <div className="login-left-overlay" />

                    {/* TEXT OVER IMAGE */}
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



                {/* RIGHT FORM */}
                <div className="login-right">
                    <div className="login-frame">
                       {/* LOGO */}
                        <img
                            src="/images/logos/logo_kantor.png"
                            alt="HRIS Logo"
                            className="login-logo"
                        />


                        {/* TITLE */}
                        <h1 className="login-title">
                            Selamat Datang di
                        </h1>
                        <h2 className="login-title-main">
                            Human Resource
                        </h2>

                        {/* SUBTITLE */}
                        <p className="login-subtitle">
                            Sistem Absensi Digital yang Terintegrasi.
                        </p>

                        {/* FORM */}
                        <Form
                            {...store.form()}
                            resetOnSuccess={['password']}
                            className="login-form"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="login-field">
                                        <Label htmlFor="email">
                                            Username{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <Input className='input-username'
                                            id="email"
                                            name="email"
                                            placeholder="Masukkan Username"
                                            tabIndex={1}
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="login-field-password">
                                        <Label htmlFor="password">
                                            Password{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <Input className='input-password'
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="Masukkan Password"
                                            tabIndex={2}
                                        />
                                        <InputError
                                            message={errors.password}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between text-sm">
                                        <label className="flex items-center gap-2">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                            />
                                            Ingat Saya
                                        </label>

                                        {canResetPassword && (
                                            <TextLink
                                                href={request()}
                                                className="text-green-700"
                                            >
                                                Lupa Password?
                                            </TextLink>
                                        )}
                                    </div>  <Button
                                        type="submit"
                                        className="mt-4 h-12 w-full bg-green-900 text-white hover:bg-green-800"
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
    );
}
