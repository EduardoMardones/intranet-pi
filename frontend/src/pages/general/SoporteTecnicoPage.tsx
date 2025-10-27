import React, { useState } from 'react';
import { 
  Headphones, 
  FileText, 
  Download, 
  Send, 
  AlertCircle,
  CheckCircle2,
  Upload,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Navbar } from '@/components/common/layout/Navbar';
import Footer from '@/components/common/layout/Footer';
import bannerHome from "@/components/images/banner_images/BannerSoporte.png" // Asegúrate que esta ruta sea correcta
import Banner from '@/components/common/layout/Banner';



export const SoporteTecnicoPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    descripcion: '',
    prioridad: 'media'
  });
  
  const [adjunto, setAdjunto] = useState<File | null>(null);
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAdjunto(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setAdjunto(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    
    // Simulación de envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setEnviando(false);
    setEnviado(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        nombre: '',
        email: '',
        asunto: '',
        descripcion: '',
        prioridad: 'media'
      });
      setAdjunto(null);
      setEnviado(false);
    }, 3000);
  };

  const prioridades = [
    { value: 'baja', label: 'Baja', color: 'bg-green-500' },
    { value: 'media', label: 'Media', color: 'bg-yellow-500' },
    { value: 'alta', label: 'Alta', color: 'bg-orange-500' },
    { value: 'critica', label: 'Crítica', color: 'bg-red-500' }
  ];

  return (
    <>
      <Navbar></Navbar>
      <div className="h-16" /> {/* Este espacio ocupa la altura del Navbar */}
      <Banner
          imageSrc={bannerHome}
          title=""
          subtitle=""
          height="250px"
        />

      {/* Nuevo contenedor principal para el padding y ancho máximo, similar a DirectorioPage */}
      <div className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 p-4 md:p-8">
        {/* Contenedor para el ancho máximo */}
        <div className="max-w-[1600px] mx-auto">
          {/* Header/Mini Banner para Soporte Técnico */}
          <header className="bg-white shadow-lg border-b-2 border-[#009DDC] rounded-xl overflow-hidden mb-6"> {/* Añadido rounded-xl y mb-6 */}
            <div className="max-w-[1800px] mx-auto px-6 py-6"> {/* Ajustado a px-6 para mejor look */}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-[#009DDC] to-[#4DFFF3] rounded-xl shadow-lg">
                  <Headphones className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Soporte Técnico</h1>
                  <p className="text-sm text-gray-600">Centro de ayuda y reportes del sistema</p>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="max-w-[1800px] mx-auto"> {/* Ajuste el ancho máximo aquí para el contenido */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Columna Izquierda - Recursos */}
              <div className="lg:col-span-1 space-y-4">
                
                {/* Manual de Usuario */}
                <Card className="shadow-sm border-slate-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#009DDC]" />
                      Manual de Usuario
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Guía completa del sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a 
                      href="/docs/manual-usuario-cesfam.pdf" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full bg-[#009DDC] hover:bg-[#0088c0] gap-2">
                        <Download className="w-4 h-4" />
                        Descargar PDF
                      </Button>
                    </a>
                    <p className="text-xs text-slate-500 mt-3 text-center">
                      Versión 2.1 • Actualizado Oct 2025
                    </p>
                  </CardContent>
                </Card>

                {/* Información de Contacto */}
                <Card className="shadow-sm border-slate-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-slate-900">
                      Contacto Directo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-slate-700">Correo electrónico</p>
                      <a href="mailto:soporte@cesfam.cl" className="text-xs text-[#009DDC] hover:underline">
                        soporte@cesfam.cl
                      </a>
                    </div>
                    <Separator />
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-slate-700">Teléfono interno</p>
                      <p className="text-xs text-slate-600">Anexo: 2500</p>
                    </div>
                    <Separator />
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-slate-700">Horario de atención</p>
                      <p className="text-xs text-slate-600">Lun - Vie: 08:00 - 17:00</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Consejos Rápidos */}
                <Card className="shadow-sm border-slate-200 bg-blue-50 border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-semibold text-blue-900 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Consejo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-blue-800 leading-relaxed">
                      Antes de reportar un problema, intenta cerrar sesión y volver a iniciar. Muchos inconvenientes se resuelven con esta acción.
                    </p>
                  </CardContent>
                </Card>

              </div>

              {/* Columna Derecha - Formulario de Reporte */}
              <div className="lg:col-span-2">
                <Card className="shadow-sm border-slate-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base font-semibold text-slate-900">
                      Reportar Problema o Sugerencia
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Describe el inconveniente que experimentas o envía tu sugerencia de mejora
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {enviado ? (
                      <div className="flex flex-col items-center justify-center py-12 px-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                          <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">¡Reporte enviado!</h3>
                        <p className="text-sm text-slate-600 text-center">
                          Tu solicitud ha sido recibida. Te contactaremos a la brevedad.
                        </p>
                        <Badge className="mt-4 bg-green-100 text-green-800 hover:bg-green-100">
                          Ticket #{Math.floor(Math.random() * 10000)}
                        </Badge>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        
                        {/* Nombre */}
                        <div className="space-y-1.5">
                          <label htmlFor="nombre" className="text-xs font-medium text-slate-700">
                            Nombre completo <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009DDC] focus:border-transparent"
                            placeholder="Tu nombre"
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                          <label htmlFor="email" className="text-xs font-medium text-slate-700">
                            Correo electrónico <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009DDC] focus:border-transparent"
                            placeholder="tu.email@cesfam.cl"
                          />
                        </div>

                        {/* Asunto */}
                        <div className="space-y-1.5">
                          <label htmlFor="asunto" className="text-xs font-medium text-slate-700">
                            Asunto <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="asunto"
                            name="asunto"
                            value={formData.asunto}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009DDC] focus:border-transparent"
                            placeholder="Resumen breve del problema"
                          />
                        </div>

                        {/* Prioridad */}
                        <div className="space-y-1.5">
                          <label htmlFor="prioridad" className="text-xs font-medium text-slate-700">
                            Prioridad <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="prioridad"
                            name="prioridad"
                            value={formData.prioridad}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009DDC] focus:border-transparent"
                          >
                            {prioridades.map((p) => (
                              <option key={p.value} value={p.value}>
                                {p.label}
                              </option>
                            ))}
                          </select>
                          <div className="flex items-center gap-2 mt-2">
                            {prioridades.map((p) => (
                              <div key={p.value} className="flex items-center gap-1">
                                <div className={`w-3 h-3 rounded-full ${p.color}`}></div>
                                <span className="text-xs text-slate-600">{p.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Descripción */}
                        <div className="space-y-1.5">
                          <label htmlFor="descripcion" className="text-xs font-medium text-slate-700">
                            Descripción detallada <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            id="descripcion"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleInputChange}
                            required
                            rows={5}
                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009DDC] focus:border-transparent resize-none"
                            placeholder="Describe el problema en detalle: qué estabas haciendo, qué error apareció, etc."
                          />
                        </div>

                        {/* Adjuntar archivo */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-slate-700">
                            Adjuntar captura de pantalla (opcional)
                          </label>
                          {adjunto ? (
                            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                              <div className="flex items-center gap-2">
                                <Upload className="w-4 h-4 text-slate-500" />
                                <span className="text-xs text-slate-700">{adjunto.name}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {(adjunto.size / 1024).toFixed(1)} KB
                                </Badge>
                              </div>
                              <button
                                type="button"
                                onClick={handleRemoveFile}
                                className="text-slate-500 hover:text-red-500 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="relative">
                              <input
                                type="file"
                                id="adjunto"
                                onChange={handleFileChange}
                                accept="image/*,.pdf"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                              <div className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-[#009DDC] transition-colors cursor-pointer">
                                <Upload className="w-5 h-5 text-slate-400" />
                                <span className="text-sm text-slate-600">
                                  Haz clic para seleccionar un archivo
                                </span>
                              </div>
                            </div>
                          )}
                          <p className="text-xs text-slate-500">
                            Formatos aceptados: JPG, PNG, PDF (máx. 5MB)
                          </p>
                        </div>

                        <Separator />

                        {/* Botón de envío */}
                        <div className="flex justify-end gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setFormData({
                                nombre: '',
                                email: '',
                                asunto: '',
                                descripcion: '',
                                prioridad: 'media'
                              });
                              setAdjunto(null);
                            }}
                          >
                            Limpiar
                          </Button>
                          <Button
                            type="button"
                            onClick={handleSubmit}
                            disabled={enviando}
                            className="bg-[#009DDC] hover:bg-[#0088c0] gap-2"
                          >
                            {enviando ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Enviando...
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4" />
                                Enviar Reporte
                              </>
                            )}
                          </Button>
                        </div>

                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </div> {/* Cierre del div max-w-[1600px] */}
      </div> {/* Cierre del div p-4 md:p-8 */}
      <Footer></Footer>
    </>
  );
};