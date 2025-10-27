# api_intranet/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Crea un router y registra tus viewsets con él.
router = DefaultRouter()
router.register(r'roles', views.RolViewSet)
router.register(r'configuraciones', views.ConfiguracionSistemaViewSet)
router.register(r'usuarios', views.UsuarioViewSet)
router.register(r'areas', views.AreaViewSet)
router.register(r'contactos-emergencia', views.ContactoEmergenciaViewSet)
router.register(r'eventos', views.CalendarioEventoViewSet)
router.register(r'actividades-tablero', views.ActividadTableroViewSet)
router.register(r'actividades-interesados', views.ActividadInteresadoViewSet)
router.register(r'comunicados', views.ComunicadoOficialViewSet)
router.register(r'adjuntos-comunicados', views.AdjuntoComunicadoViewSet)
router.register(r'licencias', views.LicenciaMedicaViewSet)
router.register(r'historial-actividades', views.HistorialActividadUsuarioViewSet)
router.register(r'documentos-personales', views.DocumentoPersonalViewSet)
router.register(r'notificaciones', views.NotificacionViewSet)
router.register(r'feriados-legales', views.FeriadoLegalViewSet)
router.register(r'solicitudes-feriados', views.SolicitudFeriadoViewSet)
router.register(r'sesiones', views.SesionViewSet)
router.register(r'logs-auditoria', views.LogAuditoriaViewSet)
router.register(r'recursos-multimedia', views.RecursoMultimediaViewSet)


urlpatterns = [
    path('', include(router.urls)), # Incluye todas las URLs generadas por el router
]