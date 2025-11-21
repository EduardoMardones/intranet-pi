// ======================================================
// PERFIL USUARIO PAGE - VERSIÓN COMPLETA CORRECTA
// Ubicación: src/pages/general/PerfilUsuarioPage.tsx
// ======================================================

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/common/layout/Navbar';
import Footer from '@/components/common/layout/Footer';
import { useAuth } from '@/api/contexts/AuthContext';
import {
  User, Mail, Phone, Briefcase, Calendar, MapPin, Cake,
  FileText, Bell, Clock, Upload, Shield, Plane, Heart
} from 'lucide-react';

// Importar tipos y datos mock para secciones que aún no están en el backend
import type { Activity, PersonalDocument, Notification } from '@/types/perfil';
import { ACTIVITY_COLORS, DOCUMENT_COLORS } from '@/types/perfil';
import {
  mockActivities,
  mockDocuments,
  mockNotifications,
  formatFileSize
} from '@/data/mockPerfil';

export const PerfilUsuarioPage: React.FC = () => {
  const { user } = useAuth();

  // Estados para datos mock (hasta que se conecten al backend)
  const [activities] = useState<Activity[]>(mockActivities);
  const [documents] = useState<PersonalDocument[]>(mockDocuments);
  const [notifications] = useState<Notification[]>(mockNotifications);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(user?.avatar);

  const unreadNotifications = notifications.filter(n => !n.leida).length;

  useEffect(() => {
    setAvatarPreview(user?.avatar);
  }, [user?.avatar]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatActivityDate = (date: Date): string => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getInitials = (): string => {
    if (!user) return 'U';
    return `${user.nombre.charAt(0)}${user.apellido_paterno.charAt(0)}`;
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatarUrl = reader.result as string;
        setAvatarPreview(newAvatarUrl);
        // TODO: Subir imagen al servidor
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando perfil...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-7xl">
        {/* Header del Perfil */}
        <div className="bg-gradient-to-r from-[#009DDC] to-[#0077A3] text-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-lg border-4 border-white flex items-center justify-center overflow-hidden">
                {avatarPreview ? (
                  <img 
                    src={avatarPreview} 
                    alt={user.nombre_completo}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-white">
                    {getInitials()}
                  </span>
                )}
              </div>
              <label 
                htmlFor="avatar-upload" 
                className="absolute bottom-0 right-0 bg-white text-[#009DDC] p-2 rounded-full cursor-pointer hover:bg-gray-100 transition"
              >
                <Upload className="w-5 h-5" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            {/* Información Principal */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">
                {user.nombre_completo}
              </h1>
              <div className="flex items-center gap-4 text-lg opacity-90">
                <span className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  {user.cargo || 'Sin cargo asignado'}
                </span>
                <span>•</span>
                <span>{user.area_nombre || 'Sin área asignada'}</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {user.rol_nombre || 'Sin rol'}
                </Badge>
                {user.es_jefe_de_area && (
                  <Badge variant="secondary" className="bg-yellow-500/20 text-white">
                    Jefatura de Área
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna Izquierda - Información Personal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información de Contacto */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">RUT</label>
                    <p className="text-lg">{user.rut}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-lg flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {user.email}
                    </p>
                  </div>
                  {user.telefono && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Teléfono</label>
                      <p className="text-lg flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {user.telefono}
                      </p>
                    </div>
                  )}
                  {user.fecha_ingreso && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Fecha de Ingreso</label>
                      <p className="text-lg flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {formatDate(user.fecha_ingreso)}
                      </p>
                    </div>
                  )}
                  {user.fecha_nacimiento && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Fecha de Nacimiento</label>
                      <p className="text-lg flex items-center gap-2">
                        <Cake className="w-4 h-4 text-gray-400" />
                        {formatDate(user.fecha_nacimiento)}
                      </p>
                    </div>
                  )}
                  {user.direccion && (
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-500">Dirección</label>
                      <p className="text-lg flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {user.direccion}
                      </p>
                    </div>
                  )}
                </div>

                {/* Contacto de Emergencia */}
                {user.contacto_emergencia_nombre && (
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      Contacto de Emergencia
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Nombre</label>
                        <p>{user.contacto_emergencia_nombre}</p>
                      </div>
                      {user.contacto_emergencia_telefono && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Teléfono</label>
                          <p>{user.contacto_emergencia_telefono}</p>
                        </div>
                      )}
                      {user.contacto_emergencia_relacion && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">Relación</label>
                          <p>{user.contacto_emergencia_relacion}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Estado de Días */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5" />
                  Días Disponibles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Vacaciones */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-3">Vacaciones</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Anual:</span>
                        <span className="font-semibold">{user.dias_vacaciones_anuales || 0} días</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Usados:</span>
                        <span className="font-semibold text-red-600">{user.dias_vacaciones_usados || 0} días</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-blue-200">
                        <span className="font-medium">Disponibles:</span>
                        <span className="font-bold text-blue-600 text-lg">{user.dias_vacaciones_disponibles || 0} días</span>
                      </div>
                    </div>
                  </div>

                  {/* Días Administrativos */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-3">Días Administrativos</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Anual:</span>
                        <span className="font-semibold">{user.dias_administrativos_anuales || 0} días</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Usados:</span>
                        <span className="font-semibold text-red-600">{user.dias_administrativos_usados || 0} días</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-green-200">
                        <span className="font-medium">Disponibles:</span>
                        <span className="font-bold text-green-600 text-lg">{user.dias_administrativos_disponibles || 0} días</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Información Laboral */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Información Laboral
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Cargo</label>
                    <p className="text-lg">{user.cargo || 'No especificado'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Área</label>
                    <p className="text-lg">{user.area_nombre || 'No especificada'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Rol</label>
                    <p className="text-lg">{user.rol_nombre || 'No especificado'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Jefatura</label>
                    <Badge variant={user.es_jefe_de_area ? 'default' : 'secondary'}>
                      {user.es_jefe_de_area ? 'Sí' : 'No'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna Derecha - Actividad Reciente */}
          <div className="space-y-6">
            {/* Notificaciones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notificaciones
                  </span>
                  {unreadNotifications > 0 && (
                    <Badge variant="destructive">{unreadNotifications}</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.slice(0, 5).map(notif => (
                    <div 
                      key={notif.id}
                      className={`p-3 rounded-lg border ${
                        !notif.leida ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <p className="text-sm font-medium">{notif.titulo}</p>
                      <p className="text-xs text-gray-600 mt-1">{notif.mensaje}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatActivityDate(notif.fecha)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actividad Reciente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Actividad Reciente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activities.slice(0, 5).map(activity => {
                    const colorConfig = ACTIVITY_COLORS[activity.tipo];
                    return (
                      <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                        <div className={`p-2 rounded-full ${colorConfig.bg}`}>
                          <span className="text-lg">{colorConfig.icon}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.titulo}</p>
                          <p className="text-xs text-gray-600 mt-1">{activity.descripcion}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatActivityDate(activity.fecha)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Documentos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Mis Documentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {documents.slice(0, 4).map(doc => {
                    const colorConfig = DOCUMENT_COLORS[doc.tipo];
                    return (
                      <div 
                        key={doc.id}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{colorConfig.icon}</span>
                          <div>
                            <p className="text-sm font-medium">{doc.nombre}</p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(doc.tamano)} • {formatActivityDate(doc.fechaSubida)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};