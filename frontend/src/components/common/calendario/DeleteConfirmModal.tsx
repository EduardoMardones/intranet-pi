// ======================================================
// COMPONENTE: DeleteConfirmModal
// Ubicación: src/components/common/DeleteConfirmModal.tsx
// Descripción: Modal de confirmación para eliminar eventos
// ======================================================

'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

// ======================================================
// INTERFACES
// ======================================================

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  eventTitle: string;
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  eventTitle
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Confirmar Eliminación
            </DialogTitle>
          </div>
          <DialogDescription className="text-gray-600 pt-2">
            ¿Estás seguro de que deseas eliminar este evento? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg my-4">
          <p className="text-sm font-semibold text-red-800">
            Evento a eliminar:
          </p>
          <p className="text-sm text-red-700 mt-1">
            "{eventTitle}"
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            Eliminar Evento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmModal;