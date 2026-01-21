import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Lock } from 'lucide-react';
import { Transition } from '@headlessui/react';
import SuccessModal from '@/components/success-modal';

export default function UpdatePasswordForm() {
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        put('/settings/password', { 
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setIsSuccessOpen(true);
            },
            onError: (err) => {
                if (err.password) {
                    reset('password', 'password_confirmation');
                }
                if (err.current_password) {
                    reset('current_password');
                }
            },
        });
    };

    const handleCloseModal = () => {
        setIsSuccessOpen(false);
        router.post('/logout'); 
    };

    return (
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
            <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
                <div className="p-2 bg-orange-100 rounded-lg text-orange-700">
                    <Lock size={20} />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Ganti Password</h2>
                    <p className="text-xs text-gray-500">Amankan akun Anda.</p>
                </div>
            </div>

            <form onSubmit={updatePassword} className="p-6 space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="current_password">Password Saat Ini</Label>
                    <Input
                        id="current_password"
                        type="password"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        className="focus:ring-orange-500"
                    />
                    <InputError message={errors.current_password} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password Baru</Label>
                    <Input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="focus:ring-orange-500"
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className="focus:ring-orange-500"
                    />
                    <InputError message={errors.password_confirmation} />
                </div>

                <div className="flex items-center justify-between pt-2">
                    <Transition
                        show={recentlySuccessful && !isSuccessOpen}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in-out"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-emerald-600 font-medium">Password diganti!</p>
                    </Transition>

                    <Button 
                        type="submit" 
                        disabled={processing}
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                        Update
                    </Button>
                </div>
            </form>

            <SuccessModal 
                isOpen={isSuccessOpen}
                onClose={handleCloseModal}
                title="Berhasil Ganti Password"
                message="Password Anda telah diperbarui. Silakan login kembali dengan password baru."
            />
        </section>
    );
}