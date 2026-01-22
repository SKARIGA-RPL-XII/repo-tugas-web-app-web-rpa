import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { AlertCircle, Calendar, Camera, Clock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Props {
    absensiHariIni?: {
        status: string;
        keterangan: string;
        jamMasuk: string;
        jamPulang: string;
    };
    canAbsenMasuk: boolean;
    canAbsenPulang: boolean;
    canCuti: boolean;
    flash?: {
        success?: string;
        error?: string;
    };
    errors?: {
        message?: string;
    };
}

export default function Index({
    absensiHariIni,
    canAbsenMasuk,
    canAbsenPulang,
    canCuti,
    flash,
    errors,
}: Props) {
    const [time, setTime] = useState(new Date());
    const [modalType, setModalType] = useState<'masuk' | 'pulang' | null>(null);
    const [successModal, setSuccessModal] = useState<{
        type: 'masuk' | 'pulang';
        message: string;
    } | null>(null);
    const [errorModal, setErrorModal] = useState<string | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const lastActionRef = useRef<'masuk' | 'pulang'>('masuk');

    const formMasuk = useForm({
        foto: null as File | null,
    });

    const formPulang = useForm({
        foto: null as File | null,
    });

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (flash?.success) {
            const successMsg = flash.success;

            setSuccessModal((prev) => {
                if (prev?.message === successMsg) return prev;

                return {
                    type: lastActionRef.current,
                    message: successMsg,
                };
            });
        }

        if (flash?.error || errors?.message) {
            const newErrorMessage = flash?.error || errors?.message || '';
            setErrorModal((prev) => {
                if (prev === newErrorMessage) return prev;
                return newErrorMessage;
            });
        }
    }, [flash, errors]);

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    };

    const formatTime = (date: Date) => {
        return date
            .toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            })
            .replace(/\./g, ':');
    };

    const formatDateInput = (date: Date) => {
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const handlePhotoCapture = (type: 'masuk' | 'pulang') => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/jpeg,image/jpg,image/png';
        input.capture = 'environment';

        input.onchange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];

            if (file) {
                if (file.size > 2048 * 1024) {
                    setErrorModal('Ukuran foto maksimal 2MB');
                    return;
                }

                if (
                    !['image/jpeg', 'image/jpg', 'image/png'].includes(
                        file.type,
                    )
                ) {
                    setErrorModal('Format foto harus JPG, JPEG, atau PNG');
                    return;
                }

                const reader = new FileReader();
                reader.onload = (event) => {
                    setPhotoPreview(event.target?.result as string);
                };
                reader.readAsDataURL(file);

                if (type === 'masuk') {
                    formMasuk.setData('foto', file);
                } else {
                    formPulang.setData('foto', file);
                }
            }
        };

        input.click();
    };

    const handleSubmitMasuk = () => {
        if (!formMasuk.data.foto) {
            setErrorModal('Silakan ambil foto terlebih dahulu');
            return;
        }

        lastActionRef.current = 'masuk';

        formMasuk.post('/absensi/masuk', {
            forceFormData: true,
            onSuccess: () => {
                setModalType(null);
                setPhotoPreview(null);
            },
            onError: () => {
                setModalType(null);
                setPhotoPreview(null);
            },
        });
    };

    const handleSubmitPulang = () => {
        if (!formPulang.data.foto) {
            setErrorModal('Silakan ambil foto terlebih dahulu');
            return;
        }

        lastActionRef.current = 'pulang';

        formPulang.post('/absensi/pulang', {
            forceFormData: true,
            onSuccess: () => {
                setModalType(null);
                setPhotoPreview(null);
            },
            onError: () => {
                setModalType(null);
                setPhotoPreview(null);
            },
        });
    };

    const handleCloseSuccessModal = () => {
        setSuccessModal(null);
        window.location.reload();
    };

    const handleCloseModal = () => {
        setModalType(null);
        setPhotoPreview(null);
        formMasuk.reset();
        formPulang.reset();
    };

    const currentDate = formatDateInput(time);
    const currentTime = formatTime(time);

    return (
        <AppLayout breadcrumbs={[{ title: 'Absensi', href: '/absensi' }]}>
            <Head title="Absensi" />

            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-10">
                <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap');
  `}</style>

                <div className="flex flex-col items-center justify-between gap-12 border-b border-gray-100 pb-12 md:flex-row">
                    <div className="text-center md:text-left">
                        <h1
                            className="text-[80px] leading-none font-bold tracking-wider text-[#1a1a1a] sm:text-[100px] md:text-[120px]"
                            style={{ fontFamily: "'Orbitron', monospace" }}
                        >
                            {currentTime}
                        </h1>
                        <p className="mt-2 text-xl font-light text-gray-500">
                            {formatDate(time)}
                        </p>
                    </div>

                    <div className="flex items-center gap-10 text-sm md:text-base">
                        <div className="space-y-3">
                            <div className="flex gap-4">
                                <span className="w-20 text-right font-medium text-gray-500">
                                    Status
                                </span>
                                <span className="font-semibold text-gray-700">
                                    : {absensiHariIni?.status || '-'}
                                </span>
                            </div>
                            <div className="flex gap-4">
                                <span className="w-20 text-right font-medium text-gray-500">
                                    Keterangan
                                </span>
                                <span className="font-semibold text-gray-700">
                                    : {absensiHariIni?.keterangan || '-'}
                                </span>
                            </div>
                            <div className="h-px w-full bg-gray-100 sm:hidden"></div>
                        </div>

                        <div className="hidden h-12 w-px bg-gray-200 sm:block"></div>

                        <div className="space-y-3">
                            <div className="flex gap-4">
                                <span className="w-16 text-right font-medium text-gray-500">
                                    Datang
                                </span>
                                <span className="font-semibold text-gray-700">
                                    : {absensiHariIni?.jamMasuk || '-'}
                                </span>
                            </div>
                            <div className="flex gap-4">
                                <span className="w-16 text-right font-medium text-gray-500">
                                    Pulang
                                </span>
                                <span className="font-semibold text-gray-700">
                                    : {absensiHariIni?.jamPulang || '-'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-4 md:flex-nowrap">
                    <Button
                        disabled={!canAbsenMasuk}
                        onClick={() =>
                            canAbsenMasuk && setModalType('masuk')
                        }
                        className={`h-16 flex-1 cursor-pointer rounded-full text-xl font-semibold transition-all ${
                            canAbsenMasuk
                                ? 'bg-[#0D4838] text-white hover:bg-[#09362a]'
                                : 'cursor-not-allowed bg-gray-100 text-gray-400'
                        }`}
                    >
                        Absen
                    </Button>

                    <Button
                        disabled={!canAbsenPulang}
                        onClick={() => canAbsenPulang && setModalType('pulang')}
                        className={`h-16 flex-1 rounded-full text-xl font-semibold transition-all ${
                            canAbsenPulang
                                ? 'bg-[#0D4838] text-white hover:bg-[#09362a]'
                                : 'cursor-not-allowed bg-gray-100 text-gray-400'
                        }`}
                    >
                        Pulang
                    </Button>

                    <Button
                        disabled={!canCuti}
                        className={`h-16 flex-1 rounded-full text-xl font-semibold transition-all ${
                            canCuti
                                ? 'bg-[#D1D5DB] text-gray-800 hover:bg-gray-400'
                                : 'cursor-not-allowed bg-gray-100 text-gray-400'
                        }`}
                    >
                        Cuti
                    </Button>
                </div>
            </div>
            <Dialog
                open={modalType === 'masuk'}
                onOpenChange={handleCloseModal}
            >
                <DialogContent className="max-w-md gap-0 overflow-hidden rounded-xl border-none p-0">
                    <div className="p-8 pb-6">
                        <div className="mb-8 flex items-start justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#0D4838]">
                                    <span className="text-xl font-bold tracking-tighter text-white">
                                        H<span className="ml-0.5">R</span>
                                    </span>
                                </div>
                                <div className="leading-tight">
                                    <h3 className="text-sm font-bold tracking-widest text-gray-800">
                                        HUMAN
                                    </h3>
                                    <p className="text-[10px] font-semibold tracking-[0.2em] text-gray-500">
                                        RESOURCE
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Absen Datang
                                </h2>
                                <p className="text-[13px] text-gray-500">
                                    Ambil foto untuk verifikasi kehadiran
                                </p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="flex items-center gap-4">
                                <label className="w-20 text-sm font-bold text-gray-700">
                                    Kamera{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div
                                    onClick={() => handlePhotoCapture('masuk')}
                                    className="flex h-24 flex-1 cursor-pointer items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 shadow-sm transition-colors hover:bg-gray-50"
                                >
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-100">
                                        <Camera className="h-6 w-6 text-gray-600" />
                                    </div>
                                    <div className="flex flex-col">
                                        {photoPreview ? (
                                            <span className="text-sm font-medium text-green-600">
                                                Foto berhasil diambil
                                            </span>
                                        ) : (
                                            <>
                                                <p className="text-sm leading-tight font-semibold text-gray-700">
                                                    Aktifkan kamera untuk
                                                    mengambil foto
                                                </p>
                                                <p className="mt-1 text-[11px] leading-tight text-gray-400">
                                                    Pastikan wajah terlihat
                                                    jelas dan pencahayaan cukup
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="w-20 text-sm font-bold text-gray-700">
                                    Tanggal{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="flex h-11 flex-1 overflow-hidden rounded-lg border border-gray-200">
                                    <input
                                        type="text"
                                        value={currentDate}
                                        readOnly
                                        className="flex-1 bg-white px-4 text-sm text-gray-600 outline-none"
                                    />
                                    <div className="flex w-12 items-center justify-center bg-[#0D4838]">
                                        <Calendar className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="w-20 text-sm font-bold text-gray-700">
                                    Waktu{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="flex h-11 flex-1 overflow-hidden rounded-lg border border-gray-200">
                                    <input
                                        type="text"
                                        value={currentTime}
                                        readOnly
                                        className="flex-1 bg-white px-4 text-sm text-gray-600 outline-none"
                                    />
                                    <div className="flex w-12 items-center justify-center bg-[#0D4838]">
                                        <Clock className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 p-8 pt-4">
                        <Button
                            onClick={handleCloseModal}
                            disabled={formMasuk.processing}
                            className="flex-1 rounded-lg border border-gray-300 bg-white py-6 font-bold text-gray-700 hover:bg-gray-50"
                        >
                            Batal
                        </Button>
                        <Button
                            onClick={handleSubmitMasuk}
                            disabled={!photoPreview || formMasuk.processing}
                            className="flex-1 rounded-lg bg-[#0D4838] py-6 font-bold text-white shadow-lg hover:bg-[#09362a] disabled:bg-gray-300"
                        >
                            {formMasuk.processing ? 'Mengirim...' : 'Kirim'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog
                open={modalType === 'pulang'}
                onOpenChange={handleCloseModal}
            >
                <DialogContent className="max-w-md gap-0 overflow-hidden rounded-xl border-none p-0">
                    <div className="p-8 pb-6">
                        <div className="mb-10 flex items-start justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#0D4838]">
                                    <span className="text-xl font-bold tracking-tighter text-white">
                                        H<span className="ml-0.5">R</span>
                                    </span>
                                </div>
                                <div className="leading-tight">
                                    <h3 className="text-sm font-bold tracking-widest text-gray-800 uppercase">
                                        Human
                                    </h3>
                                    <p className="text-[10px] font-semibold tracking-[0.2em] text-gray-500 uppercase">
                                        Resource
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <h2 className="text-2xl leading-none font-bold text-gray-900">
                                    Absen Pulang
                                </h2>
                                <p className="mt-1 text-[13px] text-gray-500">
                                    Ambil foto untuk verifikasi pulang
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <label className="w-20 text-sm font-bold text-gray-700">
                                    Kamera{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div
                                    onClick={() => handlePhotoCapture('pulang')}
                                    className="flex h-22 flex-1 cursor-pointer items-center gap-4 rounded-2xl border border-gray-200 bg-white px-4 transition-colors hover:bg-gray-50"
                                >
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-100">
                                        <Camera className="h-6 w-6 text-gray-600" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p className="text-sm leading-tight font-semibold text-gray-700">
                                            {photoPreview
                                                ? 'Foto berhasil diambil'
                                                : 'Aktifkan kamera untuk mengambil foto'}
                                        </p>
                                        {!photoPreview && (
                                            <p className="mt-1 text-[11px] leading-tight text-gray-400">
                                                Pastikan wajah terlihat jelas
                                                dan pencahayaan cukup
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="w-20 text-sm font-bold text-gray-700">
                                    Tanggal{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="flex h-12 flex-1 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                                    <input
                                        type="text"
                                        value={currentDate}
                                        readOnly
                                        className="flex-1 bg-white px-4 text-sm font-medium text-gray-700 outline-none"
                                    />
                                    <div className="flex w-12 items-center justify-center bg-[#0D4838]">
                                        <Calendar className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="w-20 text-sm font-bold text-gray-700">
                                    Waktu{' '}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="flex h-12 flex-1 overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                                    <input
                                        type="text"
                                        value={currentTime}
                                        readOnly
                                        className="flex-1 bg-white px-4 text-sm font-medium text-gray-700 outline-none"
                                    />
                                    <div className="flex w-12 items-center justify-center bg-[#0D4838]">
                                        <Clock className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 p-8 pt-6">
                        <Button
                            onClick={handleCloseModal}
                            disabled={formPulang.processing}
                            className="flex-1 rounded-xl border border-gray-200 bg-white py-6 text-base font-bold text-gray-700 transition-all hover:bg-gray-50"
                        >
                            Batal
                        </Button>
                        <Button
                            onClick={handleSubmitPulang}
                            disabled={!photoPreview || formPulang.processing}
                            className="flex-1 rounded-xl bg-[#0D4838] py-6 text-base font-bold text-white shadow-md transition-all hover:bg-[#0a3a2d] disabled:bg-gray-300"
                        >
                            {formPulang.processing ? 'Mengirim...' : 'Kirim'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Modal Success */}
            <Dialog
                open={successModal !== null}
                onOpenChange={handleCloseSuccessModal}
            >
                <DialogContent className="max-w-sm p-8 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                        <svg
                            className="h-10 w-10 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h3 className="mb-2 text-2xl font-bold">Berhasil</h3>
                    <p className="mb-6 text-gray-600">
                        {successModal?.type === 'masuk'
                            ? `Absensi datang berhasil dicatat pada ${currentTime}`
                            : `Absensi pulang berhasil dicatat pada ${currentTime}`}
                    </p>
                    <Button
                        onClick={handleCloseSuccessModal}
                        className="w-full rounded-lg bg-[#0D4838] py-2.5 text-white hover:bg-[#09362a]"
                    >
                        OK
                    </Button>
                </DialogContent>
            </Dialog>

            {/* Modal Error */}
            <Dialog
                open={errorModal !== null}
                onOpenChange={() => setErrorModal(null)}
            >
                <DialogContent className="max-w-sm p-8 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                        <AlertCircle className="h-10 w-10 text-red-500" />
                    </div>
                    <h3 className="mb-2 text-2xl font-bold">Gagal</h3>
                    <p className="mb-6 text-gray-600">{errorModal}</p>
                    <Button
                        onClick={() => setErrorModal(null)}
                        className="w-full rounded-lg bg-red-500 py-2.5 text-white hover:bg-red-600"
                    >
                        Tutup
                    </Button>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
