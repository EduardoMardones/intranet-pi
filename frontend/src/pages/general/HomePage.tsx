// ======================================================
// HOMEPAGE - COMBINADA (LOGICA AUTH + DISEÑO GRID)
// Ubicación: src/pages/general/HomePage.tsx
// ======================================================

import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Megaphone,
  PartyPopper,
  CheckSquare,
  Bell,
  Users,
  Folder,
  UserCircle,
  Award,
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
import { MiniCalendario } from '@/components/common/calendario/MiniCalendario';
import { anunciosService, actividadesService } from '@/api/services';
import { usuarioService } from '@/api/services/usuarioService';
import { areaService } from '@/api/services/areaService';
import type { Anuncio } from '@/api/services/anunciosService';
import { actividadesToActivities } from '@/utils/actividadesAdapter';
import type { Activity } from '@/types/activity';
import type { Usuario } from '@/api/services/usuarioService';
import type { Area } from '@/api/services/areaService';

const Homepage = () => {
  // 1. LÓGICA DE ESTADO Y AUTH
  const { user } = useAuth(); 
  const userName = user?.nombre || 'Usuario';
  const [currentDate, setCurrentDate] = useState(new Date());
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [loadingAnuncios, setLoadingAnuncios] = useState(true);
  const [actividades, setActividades] = useState<Activity[]>([]);
  const [loadingActividades, setLoadingActividades] = useState(true);
  const [usuariosDestacados, setUsuariosDestacados] = useState<Usuario[]>([]);
  const [loadingDestacados, setLoadingDestacados] = useState(true);

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

  // ======================================================
  // CARGAR ANUNCIOS CON FILTRADO POR PERMISOS (OPTIMIZADO)
  // ======================================================

  useEffect(() => {
    if (user) {
      // Cargar anuncios inmediatamente sin esperar
      cargarAnuncios();
      // Cargar actividades en paralelo
      cargarActividades();
      // Cargar usuarios destacados
      cargarUsuariosDestacados();
    }
  }, [user]);

  const cargarAnuncios = async () => {
    if (!user) return;
    
    try {
      setLoadingAnuncios(true);
      
      // Obtener todos los anuncios vigentes
      const anunciosData = await anunciosService.getVigentes();
      
      // Filtrar anuncios según permisos del usuario (misma lógica que CalendarioAdminPage)
      const anunciosFiltrados = anunciosData.filter((anuncio: Anuncio) => {
        // Si es para todas las áreas
        if (anuncio.para_todas_areas) return true;
        
        // Si es para el área del usuario
        if (anuncio.areas_destinatarias?.includes(user.area_nombre || '')) return true;
        
        // Filtrar por visibilidad de roles
        const userRolNivel = user.rol_nivel || 1;
        
        switch (anuncio.visibilidad_roles) {
          case 'solo_funcionarios':
            return userRolNivel === 1;
          case 'solo_jefatura':
            return userRolNivel === 2;
          case 'funcionarios_y_jefatura':
            return userRolNivel <= 2;
          case 'solo_direccion':
            return userRolNivel >= 3;
          default:
            return true;
        }
      });
      
      // Ordenar por fecha de publicación (más recientes primero) y tomar los 3 primeros
      const anunciosOrdenados = anunciosFiltrados
        .sort((a, b) => new Date(b.fecha_publicacion).getTime() - new Date(a.fecha_publicacion).getTime())
        .slice(0, 3);
      
      setAnuncios(anunciosOrdenados);
    } catch (error) {
      console.error('Error al cargar anuncios:', error);
      // En caso de error, no mostrar spinner infinito
      setAnuncios([]);
    } finally {
      setLoadingAnuncios(false);
    }
  };

  // ======================================================
  // CARGAR ACTIVIDADES
  // ======================================================

  const cargarActividades = async () => {
    if (!user) return;
    
    try {
      setLoadingActividades(true);
      
      // Obtener todas las actividades activas
      const actividadesData = await actividadesService.getAll({ activa: true });
      
      // Convertir al formato del frontend
      const actividadesConvertidas = actividadesToActivities(actividadesData);
      
      // Filtrar actividades futuras y ordenar por fecha (más próximas primero)
      const now = new Date();
      const actividadesFuturas = actividadesConvertidas
        .filter(actividad => {
          // Validar que startTime existe antes de crear Date
          if (!actividad.startTime) return false;
          return new Date(actividad.startTime) > now;
        })
        .sort((a, b) => {
          // Validar que ambos startTime existen
          const dateA = a.startTime ? new Date(a.startTime).getTime() : 0;
          const dateB = b.startTime ? new Date(b.startTime).getTime() : 0;
          return dateA - dateB;
        })
        .slice(0, 3); // Tomar las 3 más próximas
      
      setActividades(actividadesFuturas);
    } catch (error) {
      console.error('Error al cargar actividades:', error);
      // En caso de error, no mostrar spinner infinito
      setActividades([]);
    } finally {
      setLoadingActividades(false);
    }
  };

  // ======================================================
  // CARGAR USUARIOS DESTACADOS
  // ======================================================

  const cargarUsuariosDestacados = async () => {
    if (!user) return;
    
    try {
      setLoadingDestacados(true);
      const destacados: Usuario[] = [];
      
      // Obtener todos los usuarios activos
      const todosUsuarios = await usuarioService.getActivos();
      console.log('📋 Total usuarios activos:', todosUsuarios.length);
      console.log('👤 Usuario actual - rol_nivel:', user.rol_nivel, 'rol_nombre:', user.rol_nombre);
      
      // 1. Dirección (rol_nivel = 4)
      const direccion = todosUsuarios.find(u => u.rol_nivel === 4);
      if (direccion) {
        console.log('✅ Dirección encontrada:', direccion.nombre_completo);
        destacados.push(direccion);
      } else {
        console.log('⚠️ No se encontró Dirección (rol_nivel = 4)');
      }
      
      // 2. Todas las subdirecciones (rol_nivel = 3)
      const subdirecciones = todosUsuarios.filter(u => u.rol_nivel === 3);
      console.log('📊 Subdirecciones encontradas:', subdirecciones.length);
      
      subdirecciones.forEach(sub => {
        console.log('  - ' + sub.nombre_completo + ' (' + sub.rol_nombre + ')');
        if (!destacados.find(d => d.id === sub.id)) {
          destacados.push(sub);
        }
      });
      
      // 3. Si el usuario es funcionario (rol_nivel = 1), agregar su jefe de área
      if (user.rol_nivel === 1 && user.area) {
        try {
          console.log('🔍 Buscando jefe del área:', user.area_nombre);
          const area = await areaService.getById(user.area);
          
          if (area.jefe) {
            const jefeUsuario = todosUsuarios.find(u => u.id === area.jefe);
            if (jefeUsuario && !destacados.find(d => d.id === jefeUsuario.id)) {
              console.log('✅ Jefe de área encontrado:', jefeUsuario.nombre_completo);
              destacados.push(jefeUsuario);
            }
          } else {
            console.log('⚠️ El área no tiene jefe asignado');
          }
        } catch (error) {
          console.error('❌ Error al obtener jefe de área:', error);
        }
      }
      
      console.log('✅ Total usuarios destacados:', destacados.length);
      setUsuariosDestacados(destacados);
    } catch (error) {
      console.error('❌ Error al cargar usuarios destacados:', error);
      setUsuariosDestacados([]);
    } finally {
      setLoadingDestacados(false);
    }
  };

  const formatActivityDate = (dateStr: string | undefined): string => {
    if (!dateStr) return 'Fecha no disponible';
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-CL', { day: 'numeric', month: 'short' });
  };

  // ======================================================
  // OBTENER ICONO POR TIPO DE ACTIVIDAD
  // ======================================================

  const getActivityIcon = (category: string | undefined) => {
    if (!category) return Calendar;
    
    switch (category) {
      case 'celebracion':
        return PartyPopper;
      case 'deportiva':
        return Users;
      case 'gastronomica':
        return Calendar;
      case 'cultural':
        return Award;
      default:
        return Calendar;
    }
  };

  // ======================================================
  // FORMATEAR FECHA PARA ANUNCIOS
  // ======================================================

  const formatDateShort = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-CL', { day: 'numeric', month: 'short' });
  };

  // ======================================================
  // OBTENER BADGE DE TIPO DE ANUNCIO
  // ======================================================

  const getTipoBadge = (tipo: string): string => {
    const tipos: Record<string, string> = {
      'informativo': 'Info',
      'urgente': 'Urgente',
      'recordatorio': 'Recordatorio',
      'felicitacion': 'Felicitación',
      'normativa': 'Normativa',
      'administrativa': 'Admin'
    };
    return tipos[tipo] || 'Info';
  };

  // 2. DATOS Y ARRAYS (CON RUTAS DEL NAVBAR) - MEMOIZADO
  const accesosRapidos = useMemo(() => [
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
  ], []);

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
                
                {/* Últimos Anuncios */}
                <Card className="shadow-md border-0 bg-white overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="bg-gradient-to-br from-purple-400 to-pink-400 px-6 py-4 flex justify-between items-center">
                      <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                        <Megaphone className="w-4 h-4" />
                        Últimos Anuncios
                      </CardTitle>
                      <Link to="/anuncios">
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-white hover:bg-white/20 px-2">
                          Ver todos
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    {loadingAnuncios ? (
                      // Skeleton loader ligero
                      <>
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-100 animate-pulse">
                            <div className="flex justify-between items-start gap-2">
                              <div className="flex-1 space-y-2">
                                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                              </div>
                              <div className="h-5 w-16 bg-slate-200 rounded"></div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : anuncios.length === 0 ? (
                      <div className="text-center py-8">
                        <Megaphone className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                        <p className="text-sm text-slate-500">No hay anuncios disponibles</p>
                      </div>
                    ) : (
                      anuncios.map((anuncio) => (
                        <Link 
                          key={anuncio.id} 
                          to="/anuncios"
                          className="block"
                        >
                          <div className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-100">
                            <div className="flex justify-between items-start gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-800 line-clamp-1">
                                  {anuncio.titulo}
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                  {anuncio.creado_por_nombre} • {formatDateShort(anuncio.fecha_publicacion)}
                                </p>
                              </div>
                              <Badge 
                                variant={anuncio.tipo === 'urgente' ? 'destructive' : 'secondary'} 
                                className="text-[10px] px-2 h-5 shrink-0"
                              >
                                {getTipoBadge(anuncio.tipo)}
                              </Badge>
                            </div>
                            {/* Indicador si es destacado */}
                            {anuncio.es_destacado && (
                              <div className="flex items-center gap-1 mt-2">
                                <div className="w-1 h-1 rounded-full bg-[#009DDC]"></div>
                                <span className="text-[10px] text-[#009DDC] font-medium">Destacado</span>
                              </div>
                            )}
                          </div>
                        </Link>
                      ))
                    )}
                  </CardContent>
                </Card>

                {/* Próximas Actividades */}
                <Card className="shadow-md border-0 bg-white overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="bg-gradient-to-br from-[#52FFB8] to-[#4DFFF3] px-6 py-4 flex justify-between items-center">
                      <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                        <PartyPopper className="w-4 h-4" />
                        Próximas Actividades
                      </CardTitle>
                      <Link to="/actividades">
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-700 hover:bg-slate-800/10 px-2">
                          Ver todas
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    {loadingActividades ? (
                      // Skeleton loader ligero
                      <>
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 animate-pulse">
                            <div className="w-10 h-10 bg-slate-200 rounded-lg shrink-0"></div>
                            <div className="flex-1 space-y-2">
                              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                              <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : actividades.length === 0 ? (
                      <div className="text-center py-8">
                        <PartyPopper className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                        <p className="text-sm text-slate-500">No hay actividades próximas</p>
                      </div>
                    ) : (
                      actividades.map((actividad) => {
                        const Icon = getActivityIcon(actividad.category);
                        return (
                          <Link 
                            key={actividad.id} 
                            to="/actividades"
                            className="block"
                          >
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100 cursor-pointer">
                              <div className="w-10 h-10 bg-[#009DDC]/10 rounded-lg flex items-center justify-center shrink-0 text-[#009DDC]">
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-800 line-clamp-1">
                                  {actividad.title}
                                </p>
                                <p className="text-xs text-slate-500">
                                  {formatActivityDate(actividad.startTime)}
                                </p>
                              </div>
                              {/* Indicador de cupos si aplica */}
                              {actividad.maxAttendees && (
                                <div className="text-[10px] text-slate-500 shrink-0">
                                  {actividad.currentAttendees}/{actividad.maxAttendees}
                                </div>
                              )}
                            </div>
                          </Link>
                        );
                      })
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* 2. Mini Calendario */}
              <MiniCalendario />

            </div>

            {/* --- COLUMNA DERECHA (Lateral) --- */}
            <div className="col-span-12 lg:col-span-4 space-y-6">

              

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

              {/* 3. Usuarios Destacados */}
              <Card className="shadow-md border-0 bg-white overflow-hidden">
                <CardHeader className="p-0">
                  <div className="bg-gradient-to-br from-indigo-400 to-purple-500 px-6 py-4">
                    <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Usuarios Destacados
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {loadingDestacados ? (
                    // Skeleton loader
                    <>
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-100 animate-pulse">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-200 rounded-full shrink-0"></div>
                            <div className="flex-1 space-y-2">
                              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                              <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                              <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : usuariosDestacados.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                      <p className="text-sm text-slate-500">No hay usuarios disponibles</p>
                    </div>
                  ) : (
                    usuariosDestacados.map((usuario) => (
                      <div key={usuario.id} className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
                        <div className="flex items-center gap-3">
                          {usuario.avatar ? (
                            <img 
                              src={usuario.avatar} 
                              alt={usuario.nombre_completo}
                              className="w-10 h-10 rounded-full object-cover shrink-0 shadow-sm"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-[#009DDC]/10 rounded-full flex items-center justify-center shrink-0">
                              <UserCircle className="w-6 h-6 text-[#009DDC]" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-800 truncate">
                              {usuario.nombre_completo}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              {usuario.cargo}
                            </p>
                            <p className="text-xs text-slate-400 truncate">
                              {usuario.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
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