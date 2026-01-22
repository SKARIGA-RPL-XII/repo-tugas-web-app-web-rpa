import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface WarningModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    isLoading?: boolean;
}

export default function WarningModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel = "Konfirmasi",
    cancelLabel = "Batal",
    isLoading = false,
}: WarningModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-112.5 p-8 rounded-2xl bg-white border-none shadow-xl [&>button]:hidden">

                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-[#FFF5EB] rounded-full flex items-center justify-center mb-5">
                        <img
                            src="/warning.png"
                            alt="Warning"
                            className="w-10 h-10 object-contain"
                        />
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {title}
                    </h2>

                    <p className="text-gray-500 text-sm leading-relaxed mb-8 px-4">
                        {message}
                    </p>

                    <div className="w-full flex justify-end items-center gap-3">
                        <Button
                            variant="ghost"
                            onClick={onClose}
                            disabled={isLoading}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 font-medium px-4"
                        >
                            {cancelLabel}
                        </Button>

                        <Button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="bg-[#114F38] text-white hover:bg-[#0d3f2d] rounded-lg px-6 font-medium shadow-sm transition-all"
                        >
                            {isLoading ? "Memproses..." : confirmLabel}
                        </Button>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
}