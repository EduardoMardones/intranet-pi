'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { UserProfile, Activity, PersonalDocument, Notification } from '@/types/perfil';
import { ACTIVITY_COLORS, DOCUMENT_COLORS } from '@/types/perfil';
import { Navbar } from '@/components/common/layout/Navbar'; // Asegúrate de que sea la Navbar actualizada
import Footer from '@/components/common/layout/Footer';

import {
  mockUserProfile,
  mockActivities,
  mockDocuments,
  mockNotifications,
  mockFeriadosStatus,
  formatFileSize
} from '@/data/mockPerfil';
import {
  User, Mail, Phone, Briefcase, Calendar, Shield, Edit, Download,
  FileText, Bell, Plane, Key, Eye, Clock, Heart, Upload
} from 'lucide-react';

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export const PerfilUsuarioPage: React.FC = () => {
  // ======================================================
  // ESTADOS
  // ======================================================

  const [profile, setProfile] = useState<UserProfile>(mockUserProfile); // Ahora el perfil puede ser modificado
  const [activities] = useState<Activity[]>(mockActivities);
  const [documents] = useState<PersonalDocument[]>(mockDocuments);
  const [notifications] = useState<Notification[]>(mockNotifications);
  const [feriadosStatus] = useState(mockFeriadosStatus);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(profile.avatar);

  const unreadNotifications = notifications.filter(n => !n.leida).length;

  // Actualiza el avatarPreview si la URL del perfil cambia
  useEffect(() => {
    setAvatarPreview(profile.avatar);
  }, [profile.avatar]);

  // ======================================================
  // FUNCIONES AUXILIARES
  // ======================================================

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getInitials = (nombre: string, apellidos: string): string => {
    return `${nombre.charAt(0)}${apellidos.charAt(0)}`;
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatarUrl = reader.result as string;
        setAvatarPreview(newAvatarUrl);
        // Aquí deberías subir la imagen a tu servidor
        // y luego actualizar la URL del avatar en el estado global/contexto del usuario
        // Por ahora, solo actualizamos el mock local y el estado del componente
        setProfile(prevProfile => ({ ...prevProfile, avatar: newAvatarUrl }));
        // Idealmente, notificar a la Navbar que el avatar ha cambiado (usando contexto o props)
      };
      reader.readAsDataURL(file);
    }
  };

  // ======================================================
  // RENDERIZADO
  // ======================================================

  return (
    <>
    <Navbar /> {/* La Navbar ahora toma la URL del avatar desde el estado de usuario real/contexto */}
    <div className="h-16" /> {/* Ajustado a h-16 para que coincida con el Navbar de 4rem */}

    {/* El fondo degradado principal de toda la página, similar al directorio */}
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      {/* ======================================================
          BANNER SUPERIOR CON PATRÓN
          ====================================================== */}
      <div className="relative h-80 w-full bg-gradient-to-r from-[#009DDC] via-[#4DFFF3] to-[#52FFB8] overflow-hidden">
        {/* Patrón de puntos */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        {/* Círculos decorativos */}
        <div className="absolute top-10 right-20 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-20 w-60 h-60 bg-white/20 rounded-full blur-3xl"></div>
      </div>

      {/* ======================================================
          CONTENEDOR PRINCIPAL CON PADDING y ANCHO MÁXIMO
          ====================================================== */}
      {/* Modificado max-w-7xl a max-w-[1600px] para consistencia si ese es el objetivo */}
      {/* Añadido px-4 md:px-8 para el padding responsivo como en el directorio, y se remueve el px-6 de abajo */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 -mt-40 pb-12 relative z-10">
        {/* ======================================================
            CARD PRINCIPAL DEL PERFIL
            ====================================================== */}
        <Card className="mb-8 shadow-2xl border-0 bg-white">
          <CardContent className="p-8">
            {/* Layout Flex para Avatar e Información */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* AVATAR */}
              <div className="flex-shrink-0 relative">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt={`${profile.nombre} ${profile.apellidos}`}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl ring-4 ring-gray-100"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#009DDC] to-[#4DFFF3] flex items-center justify-center border-4 border-white shadow-xl ring-4 ring-gray-100">
                    <span className="text-4xl font-bold text-white">
                      {getInitials(profile.nombre, profile.apellidos)}
                    </span>
                  </div>
                )}
                {/* Botón para cambiar foto de perfil */}
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition-colors"
                  title="Cambiar foto de perfil"
                >
                  <Upload className="w-5 h-5 text-gray-700" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Activo
                  </div>
                </div>
              </div>

              {/* INFORMACIÓN PRINCIPAL */}
              <div className="flex-1">
                {/* Nombre y Badges */}
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    {profile.nombre} {profile.apellidos}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] text-white rounded-full text-sm font-semibold shadow-md">
                      {profile.role}
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                      {profile.area}
                    </span>
                  </div>
                </div>

                {/* Grid de Información de Contacto */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* RUT */}
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 rounded-lg">
                      <User className="w-5 h-5 text-[#009DDC]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">RUT</p>
                      <p className="font-semibold text-gray-900">{profile.rut}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-cyan-50 rounded-lg">
                      <Mail className="w-5 h-5 text-[#4DFFF3]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Email Institucional</p>
                      <p className="font-semibold text-gray-900 truncate">{profile.email}</p>
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-green-50 rounded-lg">
                      <Phone className="w-5 h-5 text-[#52FFB8]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Teléfono</p>
                      <p className="font-semibold text-gray-900">{profile.telefono}</p>
                    </div>
                  </div>

                  {/* Cargo */}
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-purple-50 rounded-lg">
                      <Briefcase className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Cargo</p>
                      <p className="font-semibold text-gray-900">{profile.cargo}</p>
                    </div>
                  </div>

                  {/* Fecha Ingreso */}
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-orange-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Fecha de Ingreso</p>
                      <p className="font-semibold text-gray-900">{formatDate(profile.fechaIngreso)}</p>
                    </div>
                  </div>

                  {/* Contacto Emergencia */}
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-pink-50 rounded-lg">
                      <Heart className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Contacto de Emergencia</p>
                      <p className="font-semibold text-gray-900">{profile.contactoEmergencia?.nombre}</p>
                    </div>
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                    <Edit className="w-4 h-4" />
                    Editar Perfil
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-semibold hover:border-[#009DDC] transition-colors">
                    <Eye className="w-4 h-4" />
                    Ver Perfil Público
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ======================================================
            GRID DE SECCIONES (2 COLUMNAS)
            ====================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ======================================================
              COLUMNA PRINCIPAL (2/3)
              ====================================================== */}
          <div className="lg:col-span-2 space-y-6">
            {/* HISTORIAL DE ACTIVIDADES */}
            <Card className="shadow-lg border-0">
              <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-blue-50">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="w-5 h-5 text-[#009DDC]" />
                  Historial de Actividades
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {activities.map((activity) => {
                    const colorConfig = ACTIVITY_COLORS[activity.tipo];
                    return (
                      <div
                        key={activity.id}
                        className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className={`flex-shrink-0 p-3 ${colorConfig.bg} rounded-lg`}>
                          <span className="text-2xl">{colorConfig.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 mb-1">
                            {activity.titulo}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {activity.descripcion}
                          </p>
                          <p className="text-xs text-gray-500">
                            📅 {formatDate(activity.fecha)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* DOCUMENTOS PERSONALES */}
            <Card className="shadow-lg border-0">
              <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-blue-50">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="w-5 h-5 text-[#009DDC]" />
                  Documentos Personales
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {documents.map((doc) => {
                    const docConfig = DOCUMENT_COLORS[doc.tipo];
                    return (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="text-3xl flex-shrink-0">{docConfig.icon}</span>
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 truncate">
                              {doc.nombre}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(doc.tamano)} · {formatDate(doc.fechaSubida)}
                            </p>
                          </div>
                        </div>
                        <button className="flex-shrink-0 p-2 hover:bg-blue-50 rounded-lg transition-colors ml-2">
                          <Download className="w-5 h-5 text-[#009DDC]" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ======================================================
              COLUMNA LATERAL (1/3)
              ====================================================== */}
          <div className="space-y-6">
            {/* ESTADO DE FERIADOS */}
            <Card className="shadow-lg border-0">
              <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-green-50">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Plane className="w-5 h-5 text-[#52FFB8]" />
                  Feriados
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex flex-col items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full mb-2">
                    <p className="text-4xl font-bold text-[#009DDC]">
                      {feriadosStatus.diasDisponibles}
                    </p>
                    <p className="text-xs text-gray-600">Disponibles</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <p className="text-2xl font-bold text-green-600">
                      {feriadosStatus.diasUsados}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Usados</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-xl">
                    <p className="text-2xl font-bold text-yellow-600">
                      {feriadosStatus.diasPendientes}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Pendientes</p>
                  </div>
                </div>

                <div className="text-center text-xs text-gray-500 pt-3 border-t">
                  Período: {feriadosStatus.periodoActual}
                </div>
              </CardContent>
            </Card>

            {/* NOTIFICACIONES */}
            <Card className="shadow-lg border-0">
              <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-yellow-50">
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-yellow-600" />
                    Notificaciones
                  </div>
                  {unreadNotifications > 0 && (
                    <span className="flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full">
                      {unreadNotifications}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 rounded-lg border-l-4 transition-colors ${
                        notif.leida 
                          ? 'bg-gray-50 border-gray-300' 
                          : 'bg-blue-50 border-[#009DDC]'
                      }`}
                    >
                      <p className={`font-semibold text-sm mb-1 ${
                        notif.leida ? 'text-gray-700' : 'text-gray-900'
                      }`}>
                        {notif.titulo}
                      </p>
                      <p className="text-xs text-gray-600 mb-2">
                        {notif.mensaje}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDate(notif.fecha)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* SEGURIDAD */}
            <Card className="shadow-lg border-0">
              <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-red-50">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5 text-red-600" />
                  Seguridad
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group">
                  <div className="flex items-center gap-3">
                    <Key className="w-5 h-5 text-gray-600 group-hover:text-[#009DDC] transition-colors" />
                    <span className="font-semibold text-gray-900">
                      Cambiar Contraseña
                    </span>
                  </div>
                  <span className="text-gray-400 group-hover:text-[#009DDC] transition-colors">→</span>
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};