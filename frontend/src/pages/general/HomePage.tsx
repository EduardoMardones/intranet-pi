// ======================================================
// HOMEPAGE - ACTUALIZADA CON USUARIO REAL
// Ubicación: src/pages/general/HomePage.tsx
// Cambio principal: Línea 27 - usa useAuth() en lugar de 'María González'
// ======================================================

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
import { useAuth } from '@/api/contexts/AuthContext'; // ← AGREGAR IMPORT

const Homepage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { user } = useAuth(); // ← USAR useAuth
  
  // Usar nombre del usuario autenticado o fallback
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

  // El resto del código permanece igual...
  // Solo cambiamos {userName} en el JSX para que use el nombre real
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        {/* Banner de Bienvenida - ACTUALIZADO */}
        <div className="bg-gradient-to-r from-[#009DDC] to-[#0077A3] text-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                ¡Bienvenid@, {userName}! {/* ← AQUÍ USA EL NOMBRE REAL */}
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
            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6">
              <Clock className="w-12 h-12 mb-2" />
              <p className="text-2xl font-bold">
                {currentDate.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </div>

        {/* Resto del componente... */}
        {/* Todo el código después del banner permanece igual */}
      </main>
      
      <Footer />
    </div>
  );
};

export default Homepage;

/* 
NOTA: Este archivo solo muestra los cambios principales.
El resto del código (grid de cards, comunicados, etc.) permanece exacto como estaba.
Solo se actualizó:
1. import { useAuth } from '@/contexts/AuthContext';
2. const { user } = useAuth();
3. const userName = user?.nombre || 'Usuario';
4. En el JSX: {userName} y datos adicionales del usuario
*/