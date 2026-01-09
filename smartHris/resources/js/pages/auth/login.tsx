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

            <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
                {/* LEFT IMAGE */}
                <div className="hidden md:block relative">
                    <img
                        src="/images/img_kantor.jpg"
                        alt="Office"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-green-900/40" />
                </div>

                {/* RIGHT FORM */}
                <div className="flex items-center justify-center px-8">
                    <div className="w-full max-w-[515px] flex flex-col gap-6">
                       <img src="images/logos/logo_kantor.png" 
                       alt="HRIS Logo"
                       className='h-10 w-auto'
                        />
                        <div>
                            <p className="text-lg font-semibold text-gray-900">HRIS</p>
                            <p className="text-xs text-gray-500">
                                Human Resource Information System
                            </p>
                        </div>

                        {/* TITLE */}
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Selamat Datang di <br /> Human Resource
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                            Sistem Absensi Digital yang Terintegrasi.
                        </p>

                        {/* FORM */}
                        <Form
                            {...store.form()}
                            resetOnSuccess={['password']}
                            className="mt-8 flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor="email">
                                            Username{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            placeholder="Masukkan Username"
                                            tabIndex={1}
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor="password">
                                            Password{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="Masukkan Password"
                                            tabIndex={2}
                                        />
                                        <InputError message={errors.password} />
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
                                    </div>

                                    <Button
                                        type="submit"
                                        className="mt-4 w-full h-12 bg-green-900 hover:bg-green-800 text-white"
                                        disabled={processing}
                                    >
                                        {processing && <Spinner />}
                                        Masuk
                                    </Button>
                                </>
                            )}
                        </Form>

                        {canRegister && (
                            <div className="mt-4 text-center text-sm text-muted-foreground">
                                Belum punya akun?{' '}
                                <TextLink href={register()}>
                                    Daftar
                                </TextLink>
                            </div>
                        )}

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
