import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

type ModalType = 'success' | 'warning' | 'trash' | 'logout';

interface StatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: ModalType;
    title: string;
    description?: string;
    onConfirm?: () => void;
}

export function StatusModal({
    isOpen,
    onClose,
    type,
    title,
    description,
    onConfirm,
}: StatusModalProps) {
    const config = {
        success: {
            icon: '/success.png',
            iconBg: 'bg-emerald-50',
            confirmText: 'Oke',
            confirmBtn: 'bg-[#0D4838] hover:bg-[#0A3D2F]',
            showCancel: false,
            cancelText: '',
            cancelColor: '',
        },
        warning: {
            icon: '/warning.png',
            iconBg: 'bg-orange-50',
            confirmText: 'Konfirmasi',
            confirmBtn: 'bg-[#0D4838] hover:bg-[#0A3D2F]',
            showCancel: true,
            cancelText: 'Batal',
            cancelColor: 'text-orange-500',
        },
        trash: {
            icon: '/trash.png',
            iconBg: 'bg-red-50',
            confirmText: 'Hapus',
            confirmBtn: 'bg-red-500 hover:bg-red-600',
            showCancel: true,
            cancelText: 'Batal',
            cancelColor: 'text-red-500',
        },
        logout: {
            icon: '/logout.png',
            iconBg: 'bg-red-50',
            confirmText: 'Logout',
            confirmBtn: 'bg-red-500 hover:bg-red-600',
            showCancel: true,
            cancelText: 'Batal',
            cancelColor: 'text-red-500',
        },
    };

    const current = config[type];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-95 rounded-2xl border-none bg-white p-8 shadow-xl [&>button]:hidden">
                <DialogHeader className="flex flex-col items-center text-center">
                    <div
                        className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full ${current.iconBg}`}
                    >
                        <img
                            src={current.icon}
                            alt={type}
                            className="h-10 w-10 object-contain"
                        />
                    </div>

                    <DialogTitle className="text-lg font-semibold text-slate-900">
                        {title}
                    </DialogTitle>

                    {description && (
                        <DialogDescription className="mt-2 text-center text-sm leading-relaxed text-slate-500">
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>

                <div className="mt-6 flex w-full justify-end gap-4">
                    {current.showCancel && (
                        <button
                            onClick={onClose}
                            className={`text-sm font-medium ${current.cancelColor}`}
                        >
                            {current.cancelText}
                        </button>
                    )}

                    <Button
                        className={`rounded-lg px-6 text-sm text-white ${current.confirmBtn}`}
                        onClick={() => {
                            onConfirm?.();
                            onClose();
                        }}
                    >
                        {current.confirmText}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
