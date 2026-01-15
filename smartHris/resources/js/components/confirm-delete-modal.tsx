import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; 
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  inputType?: string;
  processing?: boolean;
}

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Konfirmasi Hapus Data",
  description, 
  inputType = "item", 
  processing = false,
}: ConfirmDeleteModalProps) => {

  const textDescription = description || `Apakah Anda yakin ingin menghapus data ${inputType} ini? Tindakan ini tidak dapat dibatalkan.`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-6 overflow-hidden bg-white rounded-2xl gap-0">
        
        <div className="flex flex-col items-center justify-center text-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 mb-6">
            <Trash2 className="h-10 w-10 text-red-500" strokeWidth={2.5} />
          </div>

          <DialogHeader className="mb-2">
            <DialogTitle className="text-xl font-bold text-center text-gray-900">
              {title}
            </DialogTitle>
          </DialogHeader>

          <p className="text-center text-gray-500 text-sm max-w-75 leading-relaxed">
            {textDescription}
          </p>
        </div>

        <DialogFooter className="flex flex-row justify-end gap-3 w-full">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={processing}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 font-medium px-6"
          >
            Batal
          </Button>
          
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={processing}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 shadow-sm shadow-red-200"
          >
            {processing ? "Menghapus..." : "Hapus"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteModal;