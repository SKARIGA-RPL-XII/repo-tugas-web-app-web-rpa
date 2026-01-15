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


                        <h1 className="login-title">
                            Selamat Datang di
                        </h1>
                        <h2 className="login-title-main">
                            Human Resource
                        </h2>

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
                                            Email{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <Input className='input-username'
                                            id="email"
                                            name="email"
                                            placeholder="Masukkan Email
                                            "
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

                                    <div className="login-field-remember">
                                        <label className="button-remember">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                            />
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
                                    </div>  <Button
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
    );
}
