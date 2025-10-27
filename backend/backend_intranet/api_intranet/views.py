# api_intranet/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils import timezone

from .models import (
    Rol, ConfiguracionSistema, Area, Usuario, ContactoEmergencia,
    CalendarioEvento, ActividadTablero, ActividadInteresado,
    ComunicadoOficial, AdjuntoComunicado, LicenciaMedica,
    HistorialActividadUsuario, DocumentoPersonal, Notificacion,
    FeriadoLegal, SolicitudFeriado, Sesion, LogAuditoria, RecursoMultimedia
)
from .serializers import (
    RolSerializer, ConfiguracionSistemaSerializer, AreaSerializer, UsuarioSerializer,
    ContactoEmergenciaSerializer, CalendarioEventoSerializer, ActividadTableroSerializer,
    ActividadInteresadoSerializer, ComunicadoOficialSerializer, AdjuntoComunicadoSerializer,
    LicenciaMedicaSerializer, HistorialActividadUsuarioSerializer, DocumentoPersonalSerializer,
    NotificacionSerializer, FeriadoLegalSerializer, SolicitudFeriadoSerializer,
    SesionSerializer, LogAuditoriaSerializer, RecursoMultimediaSerializer
)

# ======================================================
# ViewSets para todos los modelos
# ======================================================

class RolViewSet(viewsets.ModelViewSet):
    queryset = Rol.objects.all().order_by('id')
    serializer_class = RolSerializer

class ConfiguracionSistemaViewSet(viewsets.ModelViewSet):
    queryset = ConfiguracionSistema.objects.all().order_by('id')
    serializer_class = ConfiguracionSistemaSerializer

    def perform_update(self, serializer):
        # Asegurarse de que `updated_at` se actualice en cada modificación
        serializer.save(updated_at=timezone.now())

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all().order_by('apellidos', 'nombre')
    serializer_class = UsuarioSerializer

    # Podrías agregar acciones personalizadas, por ejemplo, para cambiar la contraseña
    # @action(detail=True, methods=['post'])
    # def set_password(self, request, pk=None):
    #     user = self.get_object()
    #     serializer = PasswordSerializer(data=request.data)
    #     if serializer.is_valid():
    #         user.set_password(serializer.validated_data['password'])
    #         user.save()
    #         return Response({'status': 'password set'})
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        serializer.save(updated_at=timezone.now())

class AreaViewSet(viewsets.ModelViewSet):
    queryset = Area.objects.all().order_by('nombre')
    serializer_class = AreaSerializer

    # Puedes agregar una acción personalizada para obtener los usuarios de un área
    @action(detail=True, methods=['get'])
    def usuarios(self, request, pk=None):
        area = self.get_object()
        usuarios = area.usuarios.all().order_by('apellidos')
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data)


class ContactoEmergenciaViewSet(viewsets.ModelViewSet):
    queryset = ContactoEmergencia.objects.all().order_by('nombre')
    serializer_class = ContactoEmergenciaSerializer

class CalendarioEventoViewSet(viewsets.ModelViewSet):
    queryset = CalendarioEvento.objects.all().order_by('-fecha', '-hora_inicio')
    serializer_class = CalendarioEventoSerializer

    def perform_update(self, serializer):
        serializer.save(updated_at=timezone.now())

class ActividadTableroViewSet(viewsets.ModelViewSet):
    queryset = ActividadTablero.objects.all().order_by('-fecha', '-created_at')
    serializer_class = ActividadTableroSerializer

    def perform_update(self, serializer):
        serializer.save(updated_at=timezone.now())

class ActividadInteresadoViewSet(viewsets.ModelViewSet):
    queryset = ActividadInteresado.objects.all().order_by('fecha_registro')
    serializer_class = ActividadInteresadoSerializer

class ComunicadoOficialViewSet(viewsets.ModelViewSet):
    queryset = ComunicadoOficial.objects.all().order_by('-fecha_publicacion', '-created_at')
    serializer_class = ComunicadoOficialSerializer

    # Incrementa las vistas cuando se recupera un comunicado individual
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.vistas = (instance.vistas or 0) + 1 # Asegura que no sea None y luego incrementa
        instance.save(update_fields=['vistas'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save(updated_at=timezone.now())

class AdjuntoComunicadoViewSet(viewsets.ModelViewSet):
    queryset = AdjuntoComunicado.objects.all().order_by('created_at')
    serializer_class = AdjuntoComunicadoSerializer

class LicenciaMedicaViewSet(viewsets.ModelViewSet):
    queryset = LicenciaMedica.objects.all().order_by('-fecha_subida')
    serializer_class = LicenciaMedicaSerializer

    def perform_create(self, serializer):
        # Lógica para calcular dias_licencia y actualizar estado aquí si no se hace en el modelo
        licencia = serializer.save()
        if licencia.fecha_inicio and licencia.fecha_termino:
            delta = licencia.fecha_termino - licencia.fecha_inicio
            licencia.dias_licencia = delta.days + 1
        
        # Actualizar estado basado en fechas
        if licencia.fecha_termino and licencia.fecha_termino < timezone.now().date():
            licencia.estado = 'vencida'
        elif licencia.fecha_inicio and licencia.fecha_termino and \
             licencia.fecha_inicio <= timezone.now().date() and licencia.fecha_termino >= timezone.now().date():
            licencia.estado = 'vigente'
        
        licencia.save(update_fields=['dias_licencia', 'estado', 'updated_at'])

    def perform_update(self, serializer):
        # Lógica para recalcular dias_licencia y actualizar estado en la actualización
        licencia = serializer.save(updated_at=timezone.now())
        if licencia.fecha_inicio and licencia.fecha_termino:
            delta = licencia.fecha_termino - licencia.fecha_inicio
            licencia.dias_licencia = delta.days + 1
        
        # Actualizar estado basado en fechas
        if licencia.fecha_termino and licencia.fecha_termino < timezone.now().date():
            licencia.estado = 'vencida'
        elif licencia.fecha_inicio and licencia.fecha_termino and \
             licencia.fecha_inicio <= timezone.now().date() and licencia.fecha_termino >= timezone.now().date():
            licencia.estado = 'vigente'
        
        licencia.save(update_fields=['dias_licencia', 'estado', 'updated_at'])


class HistorialActividadUsuarioViewSet(viewsets.ModelViewSet):
    queryset = HistorialActividadUsuario.objects.all().order_by('-fecha', '-created_at')
    serializer_class = HistorialActividadUsuarioSerializer

class DocumentoPersonalViewSet(viewsets.ModelViewSet):
    queryset = DocumentoPersonal.objects.all().order_by('-fecha_subida')
    serializer_class = DocumentoPersonalSerializer

class NotificacionViewSet(viewsets.ModelViewSet):
    queryset = Notificacion.objects.all().order_by('-created_at')
    serializer_class = NotificacionSerializer

    # Acción personalizada para marcar notificaciones como leídas
    @action(detail=True, methods=['post'])
    def mark_as_read(self, request, pk=None):
        notificacion = self.get_object()
        if not notificacion.leida:
            notificacion.leida = True
            notificacion.fecha_leida = timezone.now()
            notificacion.save(update_fields=['leida', 'fecha_leida'])
            return Response({'status': 'Notificación marcada como leída'})
        return Response({'status': 'Notificación ya estaba leída'}, status=status.HTTP_200_OK)

    # Acción personalizada para obtener notificaciones no leídas de un usuario
    @action(detail=False, methods=['get'])
    def unread_for_user(self, request):
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({'error': 'Parámetro user_id es requerido'}, status=status.HTTP_400_BAD_REQUEST)
        
        unread_notifications = Notificacion.objects.filter(usuario_id=user_id, leida=False).order_by('-created_at')
        serializer = self.get_serializer(unread_notifications, many=True)
        return Response(serializer.data)


class FeriadoLegalViewSet(viewsets.ModelViewSet):
    queryset = FeriadoLegal.objects.all().order_by('periodo_year', 'usuario__apellidos')
    serializer_class = FeriadoLegalSerializer

    def perform_create(self, serializer):
        # Calcular dias_pendientes al crear
        feriado = serializer.save()
        feriado.dias_pendientes = feriado.dias_totales - feriado.dias_usados
        feriado.save(update_fields=['dias_pendientes', 'updated_at'])

    def perform_update(self, serializer):
        # Recalcular dias_pendientes al actualizar
        feriado = serializer.save(updated_at=timezone.now())
        feriado.dias_pendientes = feriado.dias_totales - feriado.dias_usados
        feriado.save(update_fields=['dias_pendientes'])


class SolicitudFeriadoViewSet(viewsets.ModelViewSet):
    queryset = SolicitudFeriado.objects.all().order_by('-fecha_inicio', '-created_at')
    serializer_class = SolicitudFeriadoSerializer

    def perform_update(self, serializer):
        # Si el estado cambia a 'aprobada', registrar la fecha de aprobación
        if 'estado' in serializer.validated_data and serializer.validated_data['estado'] == 'aprobada':
            serializer.save(fecha_aprobacion=timezone.now(), updated_at=timezone.now())
        else:
            serializer.save(updated_at=timezone.now())

class SesionViewSet(viewsets.ModelViewSet):
    queryset = Sesion.objects.all().order_by('-ultima_actividad')
    serializer_class = SesionSerializer

class LogAuditoriaViewSet(viewsets.ModelViewSet):
    queryset = LogAuditoria.objects.all().order_by('-created_at')
    serializer_class = LogAuditoriaSerializer

class RecursoMultimediaViewSet(viewsets.ModelViewSet):
    queryset = RecursoMultimedia.objects.all().order_by('-created_at')
    serializer_class = RecursoMultimediaSerializer

    def perform_update(self, serializer):
        serializer.save(updated_at=timezone.now())