// ======================================================
// COMPONENTE: Wrapper de Formulario de Anuncio para Calendario
// Ubicación: src/components/common/calendario/AnuncioFormWrapper.tsx
// Descripción: Wrapper que adapta FormularioComunicado para usar en calendario
// ======================================================

import React from 'react';
import { FormularioComunicado } from '@/components/common/anuncios/FormularioComunicado';
import type { Announcement } from '@/types/announcement';

interface AnuncioFormWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (anuncio: Omit<Announcement, 'id' | 'publicationDate'>) => void;
  initialDate?: Date | null;
  anuncio?: Announcement | null;
}

export const AnuncioFormWrapper: React.FC<AnuncioFormWrapperProps> = ({
  isOpen,
  onClose,
  onSave,
  initialDate,
  anuncio
}) => {
  // Adaptador del handler de guardado
  const handleSubmit = (comunicado: Omit<Announcement, 'id' | 'publicationDate'>) => {
    onSave(comunicado);
    onClose();
  };
  
  return (
    <FormularioComunicado
      open={isOpen}
      onOpenChange={onClose}
      onSubmit={handleSubmit}
      comunicadoEditar={anuncio || undefined}
    />
  );
};

export default AnuncioFormWrapper;