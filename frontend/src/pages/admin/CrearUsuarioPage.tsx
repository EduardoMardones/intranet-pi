// ======================================================
// PÁGINA PARA CREAR NUEVO USUARIO
// Ubicación: src/pages/CrearUsuarioPage.tsx
// Descripción: Formulario de creación de usuario con estética moderna
// ======================================================

'use client';

import React, { useState, type FormEvent } from 'react';
import { Card } from '@/components/ui/card';
import { Users, Save, XCircle } from 'lucide-react';
import { Navbar } from '@/components/common/layout/Navbar';
import Banner from '@/components/common/layout/Banner';
import bannerHome from "@/components/images/banner_images/BannerDirectorio.png"; // Reutilizamos el banner
import Footer from '@/components/common/layout/Footer';

// Define tipos para los select (asumiendo que estos ya existen o se crearán)
type RoleType = 'admin' | 'medico' | 'enfermero' | 'matrona' | 'odontologo' | 'kinesiologo' | 'nutricionista' | 'psicologo' | 'secretaria' | 'otro';
type AreaType = 'medicina_general' | 'enfermeria' | 'odontologia' | 'salud_mental' | 'kinesiologia' | 'nutricion' | 'administracion' | 'farmacia' | 'laboratorio';
type EstadoUsuario = 'activo' | 'inactivo' | 'licencia' | 'vacaciones';

// Configuración de Roles y Áreas (puedes ajustar esto según tu `types/employee.ts`)
const ROLE_CONFIG = {
  admin: { label: 'Administrador', badge: 'bg-red-100 text-red-800' },
  medico: { label: 'Médico', badge: 'bg-blue-100 text-blue-800' },
  enfermero: { label: 'Enfermero/a', badge: 'bg-green-100 text-green-800' },
  matrona: { label: 'Matrón/a', badge: 'bg-pink-100 text-pink-800' },
  odontologo: { label: 'Odontólogo/a', badge: 'bg-indigo-100 text-indigo-800' },
  kinesiologo: { label: 'Kinesiólogo/a', badge: 'bg-yellow-100 text-yellow-800' },
  nutricionista: { label: 'Nutricionista', badge: 'bg-teal-100 text-teal-800' },
  psicologo: { label: 'Psicólogo/a', badge: 'bg-purple-100 text-purple-800' },
  secretaria: { label: 'Secretaria/o', badge: 'bg-gray-100 text-gray-800' },
  otro: { label: 'Otro', badge: 'bg-gray-200 text-gray-700' },
};

const AREA_CONFIG = {
  medicina_general: { label: 'Medicina General', icon: '🩺', color: 'text-blue-600' },
  enfermeria: { label: 'Enfermería', icon: '🩹', color: 'text-green-600' },
  odontologia: { label: 'Odontología', icon: '🦷', color: 'text-indigo-600' },
  salud_mental: { label: 'Salud Mental', icon: '🧠', color: 'text-purple-600' },
  kinesiologia: { label: 'Kinesiología', icon: '🏋️', color: 'text-yellow-600' },
  nutricion: { label: 'Nutrición', icon: '🍎', color: 'text-teal-600' },
  administracion: { label: 'Administración', icon: '🏢', color: 'text-gray-600' },
  farmacia: { label: 'Farmacia', icon: '💊', color: 'text-orange-600' },
  laboratorio: { label: 'Laboratorio', icon: '🔬', color: 'text-cyan-600' },
};

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const CrearUsuarioPage: React.FC = () => {
  // ======================================================
  // ESTADOS DEL FORMULARIO
  // ======================================================

  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    apellidos: '',
    email: '',
    password: '', // Nota: En un entorno real, la confirmación de password sería buena idea.
    telefono: '',
    fecha_nacimiento: '',
    direccion: '',
    avatar_url: '',
    estado: 'activo' as EstadoUsuario,
    rol_id: '' as RoleType | '',
    area_id: '' as AreaType | '',
    cargo: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ======================================================
  // MANEJADORES DE EVENTOS
  // ======================================================

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Aquí iría la lógica para enviar los datos a tu API
    console.log("Datos a enviar:", formData);

    try {
      // Simula una llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1500));
      // throw new Error("Error simulado al guardar usuario"); // Descomentar para probar errores

      setSuccess(true);
      // Opcional: limpiar formulario después de éxito
      setFormData({
        rut: '',
        nombre: '',
        apellidos: '',
        email: '',
        password: '',
        telefono: '',
        fecha_nacimiento: '',
        direccion: '',
        avatar_url: '',
        estado: 'activo',
        rol_id: '',
        area_id: '',
        cargo: '',
      });
    } catch (err: any) {
      setError(err.message || "Hubo un error al crear el usuario.");
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // RENDERIZADO
  // ======================================================

  return (
    <>
      <Navbar />
      <div className="h-15" /> {/* Este espacio ocupa la altura del Navbar */}

      <Banner
        imageSrc={bannerHome}
        title=""
        subtitle=""
        height="250px"
      />

      <div className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-[1000px] mx-auto"> {/* Ancho más ajustado para un formulario */}
          {/* ======================================================
              HEADER DEL FORMULARIO
              ====================================================== */}
          <header className="bg-white shadow-lg rounded-xl overflow-hidden mb-6">
            <div className="max-w-[1000px] mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-[#009DDC] to-[#4DFFF3] rounded-xl shadow-lg">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Crear Nuevo Funcionario
                    </h1>
                    <p className="text-sm text-gray-600">
                      Ingresa los datos del nuevo usuario del CESFAM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* ======================================================
              FORMULARIO DE CREACIÓN DE USUARIO
              ====================================================== */}
          <main className="py-6">
            <Card className="overflow-hidden shadow-xl border-0 p-8">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* RUT */}
                <div>
                  <label htmlFor="rut" className="block text-sm font-medium text-gray-700 mb-1">
                    RUT <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="rut"
                    name="rut"
                    value={formData.rut}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#009DDC] transition-colors text-sm"
                    placeholder="Ej: 12.345.678-9"
                  />
                </div>

                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#009DDC] transition-colors text-sm"
                    placeholder="Ej: Juan"
                  />
                </div>

                {/* Apellidos */}
                <div>
                  <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700 mb-1">
                    Apellidos <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#009DDC] transition-colors text-sm"
                    placeholder="Ej: Pérez González"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#009DDC] transition-colors text-sm"
                    placeholder="Ej: juan.perez@cesfam.cl"
                  />
                </div>

                {/* Contraseña */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#009DDC] transition-colors text-sm"
                    placeholder="Mínimo 8 caracteres"
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#009DDC] transition-colors text-sm"
                    placeholder="Ej: +56912345678"
                  />
                </div>

                {/* Fecha de Nacimiento */}
                <div>
                  <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    id="fecha_nacimiento"
                    name="fecha_nacimiento"
                    value={formData.fecha_nacimiento}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#009DDC] transition-colors text-sm"
                  />
                </div>

                {/* Dirección */}
                <div className="md:col-span-2">
                  <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección
                  </label>
                  <textarea
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#009DDC] transition-colors text-sm"
                    placeholder="Ej: Av. Siempre Viva 742, Springfield"
                  />
                </div>

                {/* URL del Avatar */}
                <div className="md:col-span-2">
                  <label htmlFor="avatar_url" className="block text-sm font-medium text-gray-700 mb-1">
                    URL del Avatar (Opcional)
                  </label>
                  <input
                    type="url"
                    id="avatar_url"
                    name="avatar_url"
                    value={formData.avatar_url}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#009DDC] transition-colors text-sm"
                    placeholder="Ej: https://example.com/avatar.jpg"
                  />
                </div>

                {/* Estado */}
                <div>
                  <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <select
                    id="estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#009DDC] transition-colors text-sm"
                  >
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                    <option value="licencia">Licencia</option>
                    <option value="vacaciones">Vacaciones</option>
                  </select>
                </div>

                {/* Rol */}
                <div>
                  <label htmlFor="rol_id" className="block text-sm font-medium text-gray-700 mb-1">
                    Rol <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="rol_id"
                    name="rol_id"
                    value={formData.rol_id}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#009DDC] transition-colors text-sm"
                  >
                    <option value="">Selecciona un rol</option>
                    {Object.entries(ROLE_CONFIG).map(([key, config]) => (
                      <option key={key} value={key}>
                        {config.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Área */}
                <div>
                  <label htmlFor="area_id" className="block text-sm font-medium text-gray-700 mb-1">
                    Área/Departamento <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="area_id"
                    name="area_id"
                    value={formData.area_id}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#009DDC] transition-colors text-sm"
                  >
                    <option value="">Selecciona un área</option>
                    {Object.entries(AREA_CONFIG).map(([key, config]) => (
                      <option key={key} value={key}>
                        {config.icon} {config.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cargo */}
                <div>
                  <label htmlFor="cargo" className="block text-sm font-medium text-gray-700 mb-1">
                    Cargo
                  </label>
                  <input
                    type="text"
                    id="cargo"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#009DDC] transition-colors text-sm"
                    placeholder="Ej: Médico General"
                  />
                </div>

                {/* Mensajes de estado */}
                {loading && (
                  <div className="md:col-span-2 text-center text-blue-600 font-medium">
                    Guardando usuario...
                  </div>
                )}
                {success && (
                  <div className="md:col-span-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl relative flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    <span className="block sm:inline">¡Usuario creado exitosamente!</span>
                  </div>
                )}
                {error && (
                  <div className="md:col-span-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}

                {/* Botones de acción */}
                <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      // Lógica para cancelar o resetear el formulario
                      setFormData({
                        rut: '', nombre: '', apellidos: '', email: '', password: '',
                        telefono: '', fecha_nacimiento: '', direccion: '', avatar_url: '',
                        estado: 'activo', rol_id: '', area_id: '', cargo: '',
                      });
                      setSuccess(false);
                      setError(null);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                  >
                    <XCircle className="w-5 h-5" />
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`
                      flex items-center gap-2 px-6 py-3 rounded-xl transition-colors font-medium
                      ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-br from-[#009DDC] to-[#4DFFF3] text-white hover:from-[#008DCC] hover:to-[#3DCFE3] shadow-lg'}
                    `}
                  >
                    <Save className="w-5 h-5" />
                    {loading ? 'Guardando...' : 'Crear Usuario'}
                  </button>
                </div>
              </form>
            </Card>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CrearUsuarioPage;