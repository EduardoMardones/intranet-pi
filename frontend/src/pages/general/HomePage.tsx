
import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Megaphone,
  PartyPopper,
  CheckSquare,
  Bell,
  Users,
  FileText,
  UserCircle,
  Settings,
  ChevronRight,
  Award,
  Briefcase,
  Phone,
  Clock,
  Check
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/cardgenerica/cardsn';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/common/layout/Navbar';
import Footer from '@/components/common/layout/Footer';

const Homepage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [userName] = useState('María González');
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

  const comunicados = [
    { id: 1, title: 'Actualización del protocolo de atención', author: 'Dr. Ramírez', date: '20 Oct', type: 'Importante' },
    { id: 2, title: 'Cambios en horarios de turnos', author: 'RR.HH.', date: '18 Oct', type: 'Info' },
    { id: 3, title: 'Capacitación en nuevos sistemas', author: 'TI', date: '15 Oct', type: 'Formación' },
    { id: 4, title: 'Recordatorio: Evaluaciones anuales', author: 'Dirección', date: '12 Oct', type: 'Aviso' }
  ];

  const actividades = [
    { id: 1, title: 'Aniversario CESFAM', date: '30 Oct', icon: Calendar },
    { id: 2, title: 'Asado de fin de mes', date: '02 Nov', icon: Users },
    { id: 3, title: 'Día del Funcionario', date: '15 Nov', icon: Award }
  ];

  const recordatorios = [
    { id: 1, text: 'Completar informe mensual', completed: false },
    { id: 2, text: 'Revisar solicitudes pendientes', completed: false },
    { id: 3, text: 'Actualizar datos de contacto', completed: true },
    { id: 4, text: 'Asistir a reunión de equipo', completed: false }
  ];

  const [tasks, setTasks] = useState(recordatorios);

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

  const accesosRapidos = [
    { icon: FileText, label: 'Licencias Médicas', color: 'bg-blue-500' },
    { icon: Briefcase, label: 'Documentos', color: 'bg-purple-500' },
    { icon: Users, label: 'Directorio', color: 'bg-teal-500' },
    { icon: Settings, label: 'Configuración', color: 'bg-slate-500' }
  ];

  const monthName = currentDate.toLocaleDateString('es-CL', { month: 'long', year: 'numeric' });

  return (
    <>
    <Navbar></Navbar>
      <div className="h-15" /> {/* Este espacio ocupa la altura del Navbar */}

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 ">
      
      {/* Header Profesional */}
      <div className="bg-gradient-to-r from-[#009DDC] to-[#4DFFF3] shadow-sm">
        <div className=" max-w-[1600px] mx-auto py-25">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center shadow-md">
                <Briefcase className="w-16 h-16 text-[#009DDC]" />
              </div>
              <div>
                <h1 className="text-5xl font-semibold text-white">Bienvenid@, {userName}</h1>
                <p className="text-sm text-blue-50 capitalize">{formatDate(currentDate)}</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto">
              <div className="h-15" /> {/* Este espacio ocupa la altura del Navbar */}

        <div className="grid grid-cols-12 gap-4">

          {/* Columna Izquierda */}
          <div className="col-span-12 lg:col-span-8 space-y-4">

            {/* Accesos Rápidos */}
            <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                {/* ESTE DIV CONTROLA EL FONDO Y PADDINGS DEL TEXTO DEL HEADER */}
                <div className="pb-3 bg-gradient-to-r from-[#CDC7E5] to-[#009DDC] rounded-t-lg px-6 pt-4 flex items-center">
                  <CardTitle className="text-base font-semibold text-white">Accesos Rápidos</CardTitle>
                </div>
              </CardHeader>
              {/* CardContent necesita padding vertical ahora que Card no lo tiene */}
              <CardContent className="pt-0 pb-6">
                <div className="grid grid-cols-4 gap-3">
                  {accesosRapidos.map((acceso, i) => {
                    const Icon = acceso.icon;
                    return (
                      <button
                        key={i}
                        className="flex flex-col items-center gap-2 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200"
                      >
                        <div className={`w-10 h-10 ${acceso.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-slate-700 text-center leading-tight">{acceso.label}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Grid de Widgets Principales */}
            <div className="grid grid-cols-2 gap-4">

              {/* Comunicados Recientes */}
              <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  {/* ESTE DIV CONTROLA EL FONDO Y PADDINGS DEL TEXTO DEL HEADER */}
                  <div className="pb-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-t-lg px-6 pt-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                        <Megaphone className="w-4 h-4" />
                        Comunicados
                      </CardTitle>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-white hover:bg-white/20">
                        Ver todos
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {/* CardContent necesita padding vertical ahora que Card no lo tiene */}
                <CardContent className="pt-0 pb-6">
                  <div className="space-y-2">
                    {comunicados.slice(0, 3).map((com) => (
                      <div key={com.id} className="p-2 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-100">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-800 truncate">{com.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{com.author} • {com.date}</p>
                          </div>
                          <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5 shrink-0">{com.type}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Próximas Actividades */}
              <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  {/* ESTE DIV CONTROLA EL FONDO Y PADDINGS DEL TEXTO DEL HEADER */}
                  <div className="pb-3 bg-gradient-to-br from-[#52FFB8] to-[#4DFFF3] rounded-t-lg px-6 pt-4 flex items-center">
                    <CardTitle className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                      <PartyPopper className="w-4 h-4" />
                      Próximas Actividades
                    </CardTitle>
                  </div>
                </CardHeader>
                {/* CardContent necesita padding vertical ahora que Card no lo tiene */}
                <CardContent className="pt-0 pb-6">
                  <div className="space-y-2">
                    {actividades.map((act) => {
                      const Icon = act.icon;
                      return (
                        <div key={act.id} className="flex items-center gap-3 p-2 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
                          <div className="w-8 h-8 bg-[#009DDC] bg-opacity-10 rounded-lg flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-[#009DDC]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-800 truncate">{act.title}</p>
                            <p className="text-xs text-slate-500">{act.date}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Mini Calendario */}
            <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                {/* ESTE DIV CONTROLA EL FONDO Y PADDINGS DEL TEXTO DEL HEADER */}
                <div className="pb-3 bg-gradient-to-br from-[#009DDC] to-[#4DFFF3] rounded-t-lg px-6 pt-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {monthName}
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-white hover:bg-white/20">
                      Ver completo
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {/* CardContent necesita padding vertical ahora que Card no lo tiene */}
              <CardContent className="pt-0 pb-6">
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, i) => (
                    <div key={i} className="text-xs font-semibold text-slate-500 py-1">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {getMiniCalendar().map((day, i) => (
                    <button
                      key={i}
                      onClick={() => day && setSelectedDate(day)}
                      className={`
                        aspect-square rounded-md text-xs transition-all flex items-center justify-center
                        ${!day ? 'invisible' : ''}
                        ${day === currentDate.getDate()
                          ? 'bg-[#009DDC] text-white font-semibold'
                          : 'hover:bg-slate-100 text-slate-700'}
                        ${selectedDate === day && day !== currentDate.getDate() ? 'ring-1 ring-[#009DDC]' : ''}
                      `}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Columna Derecha */}
          <div className="col-span-12 lg:col-span-4 space-y-4">

            {/* Notificaciones */}
            <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                {/* ESTE DIV CONTROLA EL FONDO Y PADDINGS DEL TEXTO DEL HEADER */}
                <div className="pb-3 bg-gradient-to-br from-rose-400 to-pink-400 rounded-t-lg px-6 pt-4 flex items-center">
                  <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Notificaciones
                  </CardTitle>
                </div>
              </CardHeader>
              {/* CardContent necesita padding vertical ahora que Card no lo tiene */}
              <CardContent className="pt-0 pb-6">
                <div className="space-y-2">
                  {notificaciones.map((notif) => (
                    <div key={notif.id} className="p-2 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer border-l-2 border-[#009DDC]">
                      <p className="text-xs text-slate-800 leading-snug">{notif.message}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <p className="text-xs text-slate-500">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recordatorios */}
            <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                {/* ESTE DIV CONTROLA EL FONDO Y PADDINGS DEL TEXTO DEL HEADER */}
                <div className="pb-3 bg-gradient-to-br from-amber-400 to-orange-400 rounded-t-lg px-6 pt-4 flex items-center">
                  <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                    <CheckSquare className="w-4 h-4" />
                    Mis Recordatorios
                  </CardTitle>
                </div>
              </CardHeader>
              {/* CardContent necesita padding vertical ahora que Card no lo tiene */}
              <CardContent className="pt-0 pb-6">
                <div className="space-y-1.5">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start gap-2 p-2 rounded-md hover:bg-slate-50 cursor-pointer transition-colors"
                      onClick={() => toggleTask(task.id)}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                        task.completed ? 'bg-[#009DDC] border-[#009DDC]' : 'border-slate-300'
                      }`}>
                        {task.completed && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-xs leading-snug ${task.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                        {task.text}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Destacados del Mes */}
            <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                {/* ESTE DIV CONTROLA EL FONDO Y PADDINGS DEL TEXTO DEL HEADER */}
                <div className="pb-3 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-t-lg px-6 pt-4 flex items-center">
                  <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Destacados del Mes
                  </CardTitle>
                </div>
              </CardHeader>
              {/* CardContent necesita padding vertical ahora que Card no lo tiene */}
              <CardContent className="pt-0 pb-6">
                <div className="space-y-2">
                  {destacados.map((dest) => (
                    <div key={dest.id} className="flex items-center gap-3 p-2 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors">
                      <div className="w-9 h-9 bg-gradient-to-br from-[#009DDC] to-[#4DFFF3] rounded-full flex items-center justify-center text-white font-semibold text-xs shrink-0">
                        {dest.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-800 truncate">{dest.name}</p>
                        <p className="text-xs text-slate-500 truncate">{dest.area}</p>
                      </div>
                    </div>
                  ))}
                </div>
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

export default Homepage;
