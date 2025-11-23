// ======================================================
// TIPOS Y INTERFACES - Usuario CESFAM
// Ubicación: src/types/usuario.ts
// Descripción: Interfaces que coinciden 100% con models.py
// ======================================================

/**
 * Interface completa del Usuario (desde la BD)
 */
export interface Usuario {
  // Identificación
  id: string;
  rut: string;
  
  // Datos personales
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  telefono?: string;
  fecha_nacimiento?: string;
  direccion?: string;
  
  // Información profesional
  cargo: string;
  area: string;  // UUID del área
  rol: string;   // UUID del rol
  fecha_ingreso: string;
  es_jefe_de_area: boolean;
  
  // Contacto de emergencia
  contacto_emergencia_nombre?: string;
  contacto_emergencia_telefono?: string;
  contacto_emergencia_relacion?: string;
  
  // Días disponibles (auto-calculados)
  dias_vacaciones_anuales: number;
  dias_vacaciones_disponibles: number;
  dias_vacaciones_usados: number;
  dias_administrativos_anuales: number;
  dias_administrativos_disponibles: number;
  dias_administrativos_usados: number;
  
  // Avatar y preferencias
  avatar?: string;
  tema_preferido: 'light' | 'dark';
  
  // Estado y permisos
  is_active: boolean;
  is_staff: boolean;
  
  // Auditoría
  creado_en: string;
  actualizado_en: string;
  ultimo_acceso?: string;
}

/**
 * DTO para crear un nuevo usuario
 * (Solo los campos que el usuario debe ingresar)
 */
export interface CrearUsuarioDTO {
  // OBLIGATORIOS
  rut: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  password: string;
  cargo: string;
  area: string;  // UUID
  rol: string;   // UUID
  fecha_ingreso: string;
  
  // OPCIONALES - Contacto
  telefono?: string;
  fecha_nacimiento?: string;
  direccion?: string;
  
  // OPCIONALES - Emergencia
  contacto_emergencia_nombre?: string;
  contacto_emergencia_telefono?: string;
  contacto_emergencia_relacion?: string;
  
  // OPCIONALES - Otros
  avatar?: File;
  es_jefe_de_area?: boolean;
}

/**
 * DTO para editar usuario
 * (Similar a crear pero sin password obligatorio)
 */
export interface EditarUsuarioDTO {
  // OBLIGATORIOS
  rut: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  cargo: string;
  area: string;
  rol: string;
  fecha_ingreso: string;
  
  // OPCIONALES
  password?: string;  // Solo si se quiere cambiar
  telefono?: string;
  fecha_nacimiento?: string;
  direccion?: string;
  contacto_emergencia_nombre?: string;
  contacto_emergencia_telefono?: string;
  contacto_emergencia_relacion?: string;
  avatar?: File;
  es_jefe_de_area?: boolean;
  is_active?: boolean;
}

/**
 * Errores del formulario
 */
export interface UsuarioFormErrors {
  rut?: string;
  nombre?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  email?: string;
  password?: string;
  cargo?: string;
  area?: string;
  rol?: string;
  fecha_ingreso?: string;
  telefono?: string;
  fecha_nacimiento?: string;
}

/**
 * Props del componente FormularioUsuario
 */
export interface FormularioUsuarioProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (usuario: CrearUsuarioDTO | EditarUsuarioDTO) => void;
  usuarioEditar?: Usuario;
  modo?: 'crear' | 'editar';
}

/**
 * Rol del sistema (desde backend)
 */
export interface Rol {
  id: string;
  nombre: string;
  descripcion?: string;
  nivel: 1 | 2 | 3 | 4;
}

/**
 * Área del sistema (desde backend)
 */
export interface Area {
  id: string;
  nombre: string;
  descripcion?: string;
  codigo: string;
  color: string;
  icono: string;
  activa: boolean;
}

/**
 * Helper: Obtener nombre completo
 */
export function getNombreCompleto(usuario: Usuario): string {
  return `${usuario.nombre} ${usuario.apellido_paterno} ${usuario.apellido_materno}`.trim();
}

/**
 * Helper: Validar RUT chileno
 */
export function validarRUT(rut: string): boolean {
  // Formato: XX.XXX.XXX-X
  const regex = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/;
  return regex.test(rut);
}

/**
 * Helper: Formatear RUT
 */
export function formatearRUT(rut: string): string {
  // Limpia el RUT y lo formatea
  const cleaned = rut.replace(/[^\dkK]/g, '');
  if (cleaned.length < 2) return cleaned;
  
  const dv = cleaned.slice(-1);
  const numbers = cleaned.slice(0, -1);
  
  // Agregar puntos
  const formatted = numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
  return `${formatted}-${dv}`;
}