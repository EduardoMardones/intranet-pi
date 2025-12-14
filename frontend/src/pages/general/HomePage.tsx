// ======================================================
// HOMEPAGE - COMBINADA (LOGICA AUTH + DISEÑO GRID)
// Ubicación: src/pages/general/HomePage.tsx
// ======================================================

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // <--- 1. IMPORTANTE: Importamos Link
import {
  Calendar,
  Megaphone,
  PartyPopper,
  CheckSquare,
  Bell,
  Users,
  FileText,
  Folder,
  UserCircle,
  Settings,
  ChevronRight,
  Award,
  Briefcase,
  Phone,
  Clock,
  Check
} from 'lucide-react';

// Asegúrate que estas rutas sean correctas según tu proyecto actual:
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/cardgenerica/cardsn';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UnifiedNavbar } from '@/components/common/layout/UnifiedNavbar';
import Footer from '@/components/common/layout/Footer';
import { useAuth } from '@/api/contexts/AuthContext';

const Homepage = () => {
  // 1. LÓGICA DE ESTADO Y AUTH
  const [currentDate, setCurrentDate] = useState(new Date());
  const { user } = useAuth(); 
  const userName = user?.nombre || 'Usuario';
  
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('es-CL', options);
  };

  const monthName = currentDate.toLocaleDateString('es-CL', { month: 'long', year: 'numeric' });

  const getMiniCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  // 2. DATOS Y ARRAYS (CON RUTAS DEL NAVBAR)
  const accesosRapidos = [
    // Archivos -> Ruta: /repositorio
    { icon: Folder, label: 'Archivos', color: 'bg-blue-600', path: '/repositorio' },
    // Anuncios -> Ruta: /anuncios
    { icon: Megaphone, label: 'Anuncios', color: 'bg-purple-500', path: '/anuncios' },
    // Actividades -> Ruta: /actividades
    { icon: PartyPopper, label: 'Actividades', color: 'bg-teal-500', path: '/actividades' },
    // Calendario -> Ruta: /calendario
    { icon: Calendar, label: 'Calendario', color: 'bg-orange-500', path: '/calendario' },
    // Directorio -> Ruta: /directorio
    { icon: Users, label: 'Directorio', color: 'bg-indigo-500', path: '/directorio' },
    // Perfil -> Ruta típica: /perfil (Asumida por convención ya que suele estar en el botón de avatar)
    { icon: UserCircle, label: 'Perfil', color: 'bg-rose-500', path: '/perfil' }
  ];

  const comunicados = [
    { id: 1, title: 'Actualización del protocolo de atención', author: 'Dr. Ramírez', date: '20 Oct', type: 'Importante' },
    { id: 2, title: 'Cambios en horarios de turnos', author: 'RR.HH.', date: '18 Oct', type: 'Info' },
    { id: 3, title: 'Capacitación en nuevos sistemas', author: 'TI', date: '15 Oct', type: 'Formación' }
  ];

  const actividades = [
    { id: 1, title: 'Aniversario CESFAM', date: '30 Oct', icon: Calendar },
    { id: 2, title: 'Asado de fin de mes', date: '02 Nov', icon: Users },
    { id: 3, title: 'Día del Funcionario', date: '15 Nov', icon: Award }
  ];

  const recordatoriosIniciales = [
    { id: 1, text: 'Completar informe mensual', completed: false },
    { id: 2, text: 'Revisar solicitudes pendientes', completed: false },
    { id: 3, text: 'Actualizar datos de contacto', completed: true },
    { id: 4, text: 'Asistir a reunión de equipo', completed: false }
  ];

  const [tasks, setTasks] = useState(recordatoriosIniciales);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const notificaciones = [
    { id: 1, message: 'Nueva solicitud de licencia médica pendiente', time: '15 min' },
    { id: 2, message: 'Documento aprobado: Informe trimestral', time: '1 h' },
    { id: 3, message: 'Recordatorio: Reunión a las 15:00', time: '2 h' }
  ];

  const destacados = [
    { id: 1, name: 'Carlos Muñoz', area: 'Enfermería' },
    { id: 2, name: 'Ana Torres', area: 'Atención al Usuario' },
    { id: 3, name: 'Luis Pérez', area: 'Medicina General' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <UnifiedNavbar />
      
      {/* Espaciador para el navbar fixed */}
      <div className="h-16" />

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
        
          {/* BANNER DE BIENVENIDA */}
          <div className="bg-gradient-to-r from-[#009DDC] to-[#0077A3] text-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  ¡Bienvenid@, {userName}!
                </h1>
                <p className="text-xl opacity-90">
                  {formatDate(currentDate)}
                </p>
                {user?.area_nombre && (
                  <p className="text-lg opacity-80 mt-1">
                    {user.cargo} - {user.area_nombre}
                  </p>
                )}
              </div>
              <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 flex items-center gap-4">
                <Clock className="w-10 h-10" />
                <p className="text-3xl font-bold">
                  {currentDate.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>

          {/* ACCESOS RÁPIDOS CON LINKS */}
          <Card className="shadow-md border-0 bg-white overflow-hidden mb-6">
            <CardHeader className="p-0">
              <div className="bg-gradient-to-r from-[#CDC7E5] to-[#009DDC] px-6 py-4">
                <CardTitle className="text-base font-semibold text-white">Accesos Rápidos</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {accesosRapidos.map((acceso, i) => {
                  const Icon = acceso.icon;
                  // Usamos LINK en lugar de button
                  return (
                    <Link
                      key={i}
                      to={acceso.path}
                      className="flex flex-col items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all hover:shadow-sm border border-slate-200 group"
                    >
                      <div className={`w-12 h-12 ${acceso.color} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 text-center">{acceso.label}</span>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>


          {/* CUERPO PRINCIPAL */}
          <div className="grid grid-cols-12 gap-6">

            {/* --- COLUMNA IZQUIERDA (Principal) --- */}
            <div className="col-span-12 lg:col-span-8 space-y-6">

              {/* 1. Grid Interno: Comunicados y Actividades */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Comunicados */}
                <Card className="shadow-md border-0 bg-white overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="bg-gradient-to-br from-purple-400 to-pink-400 px-6 py-4 flex justify-between items-center">
                      <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                        <Megaphone className="w-4 h-4" />
                        Comunicados
                      </CardTitle>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-white hover:bg-white/20 px-2">
                        Ver todos
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    {comunicados.map((com) => (
                      <div key={com.id} className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-100">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <p className="text-sm font-medium text-slate-800 line-clamp-1">{com.title}</p>
                            <p className="text-xs text-slate-500 mt-1">{com.author} • {com.date}</p>
                          </div>
                          <Badge variant="secondary" className="text-[10px] px-2 h-5">{com.type}</Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Próximas Actividades */}
                <Card className="shadow-md border-0 bg-white overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="bg-gradient-to-br from-[#52FFB8] to-[#4DFFF3] px-6 py-4">
                      <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                        <PartyPopper className="w-4 h-4" />
                        Próximas Actividades
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    {actividades.map((act) => {
                      const Icon = act.icon;
                      return (
                        <div key={act.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
                          <div className="w-10 h-10 bg-[#009DDC]/10 rounded-lg flex items-center justify-center shrink-0 text-[#009DDC]">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">{act.title}</p>
                            <p className="text-xs text-slate-500">{act.date}</p>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>

              {/* 2. Mini Calendario */}
              <Card className="shadow-md border-0 bg-white overflow-hidden">
                <CardHeader className="p-0">
                  <div className="bg-gradient-to-br from-[#009DDC] to-[#4DFFF3] px-6 py-4 flex justify-between items-center">
                    <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {monthName}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-7 gap-2 text-center mb-2">
                    {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, i) => (
                      <div key={i} className="text-xs font-bold text-slate-400 uppercase">{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {getMiniCalendar().map((day, i) => (
                      <button
                        key={i}
                        onClick={() => day && setSelectedDate(day)}
                        className={`
                          aspect-square rounded-lg text-sm flex items-center justify-center transition-all
                          ${!day ? 'invisible' : ''}
                          ${day === currentDate.getDate()
                            ? 'bg-[#009DDC] text-white font-bold shadow-md scale-105'
                            : 'hover:bg-slate-100 text-slate-700'}
                          ${selectedDate === day && day !== currentDate.getDate() ? 'ring-2 ring-[#009DDC] ring-offset-2' : ''}
                        `}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* --- COLUMNA DERECHA (Lateral) --- */}
            <div className="col-span-12 lg:col-span-4 space-y-6">

              {/* 1. Notificaciones */}
              <Card className="shadow-md border-0 bg-white overflow-hidden">
                <CardHeader className="p-0">
                  <div className="bg-gradient-to-br from-rose-400 to-pink-400 px-6 py-4">
                    <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      Notificaciones
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {notificaciones.map((notif) => (
                    <div key={notif.id} className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border-l-4 border-[#009DDC] shadow-sm">
                      <p className="text-xs font-medium text-slate-800 mb-1">{notif.message}</p>
                      <div className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3 h-3" />
                        <span className="text-[10px]">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* 2. Recordatorios (Checklist) */}
              <Card className="shadow-md border-0 bg-white overflow-hidden">
                <CardHeader className="p-0">
                  <div className="bg-gradient-to-br from-amber-400 to-orange-400 px-6 py-4">
                    <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                      <CheckSquare className="w-4 h-4" />
                      Mis Recordatorios
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                        onClick={() => toggleTask(task.id)}
                      >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          task.completed ? 'bg-[#009DDC] border-[#009DDC]' : 'border-slate-300 group-hover:border-[#009DDC]'
                        }`}>
                          {task.completed && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <span className={`text-sm ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                          {task.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 3. Destacados */}
              <Card className="shadow-md border-0 bg-white overflow-hidden">
                <CardHeader className="p-0">
                  <div className="bg-gradient-to-br from-indigo-400 to-purple-500 px-6 py-4">
                    <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Destacados del Mes
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {destacados.map((dest) => (
                    <div key={dest.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#009DDC] to-[#4DFFF3] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
                        {dest.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{dest.name}</p>
                        <p className="text-xs text-slate-500">{dest.area}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Homepage;