import {
    Dialog,
    DialogContent,
    DialogTitle,       // Import ini
    DialogDescription, // Import ini
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
}

export default function LogoutModal({
    isOpen,
    onClose,
    onConfirm,
    isLoading = false,
}: LogoutModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-100 p-8 rounded-2xl bg-white border-none shadow-xl [&>button]:hidden">
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-5">
                        <img
                            src="/logout.png"
                            alt="Logout"
                            className="w-10 h-10 object-contain opacity-80"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = '/warning.png';
                            }}
                        />
                    </div>

                    <DialogTitle className="text-xl font-bold text-gray-900 mb-2">
                        Konfirmasi Keluar
                    </DialogTitle>

                    <DialogDescription className="text-gray-500 text-sm leading-relaxed mb-8 px-2">
                        Apakah Anda yakin ingin keluar dari aplikasi? <br/>
                        Anda perlu login kembali untuk mengakses akun.
                    </DialogDescription>

                    <div className="w-full flex justify-center items-center gap-3">
                        <Button
                            variant="ghost"
                            onClick={onClose}
                            disabled={isLoading}
                            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 font-medium px-6 rounded-xl h-11"
                        >
                            Batal
                        </Button>

                        <Button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="bg-red-600 text-white hover:bg-red-700 rounded-xl px-8 font-medium shadow-sm transition-all h-11"
                        >
                            {isLoading ? "Keluar..." : "Ya, Keluar"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}