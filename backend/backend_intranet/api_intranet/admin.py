# api_intranet/admin.py
from django.contrib import admin
from .models import (
    Rol, ConfiguracionSistema, Area, Usuario, ContactoEmergencia,
    CalendarioEvento, ActividadTablero, ActividadInteresado,
    ComunicadoOficial, AdjuntoComunicado, LicenciaMedica,
    HistorialActividadUsuario, DocumentoPersonal, Notificacion,
    FeriadoLegal, SolicitudFeriado, Sesion, LogAuditoria, RecursoMultimedia
)

# ======================================================
# Registro de modelos en el panel de administración
# ======================================================

# Admin para Rol
@admin.register(Rol)
class RolAdmin(admin.ModelAdmin):
    list_display = ('id', 'codigo', 'nombre', 'nivel_acceso', 'created_at')
    search_fields = ('codigo', 'nombre')
    list_filter = ('nivel_acceso',)
    ordering = ('nivel_acceso', 'nombre')

# Admin para ConfiguracionSistema
@admin.register(ConfiguracionSistema)
class ConfiguracionSistemaAdmin(admin.ModelAdmin):
    list_display = ('id', 'clave', 'valor', 'tipo_dato', 'es_publica', 'updated_at')
    search_fields = ('clave', 'descripcion')
    list_filter = ('tipo_dato', 'es_publica')
    readonly_fields = ('updated_at',)

# Admin para Area
@admin.register(Area)
class AreaAdmin(admin.ModelAdmin):
    list_display = ('id', 'codigo', 'nombre', 'jefe_area', 'created_at')
    search_fields = ('codigo', 'nombre', 'jefe_area__nombre', 'jefe_area__apellidos')
    list_filter = ('created_at',)
    raw_id_fields = ('jefe_area',) # Permite buscar al jefe de área por ID, útil con muchos usuarios
    ordering = ('nombre',)

# Admin para Usuario
@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'rut', 'nombre', 'apellidos', 'email', 'rol', 'area', 'estado', 'fecha_ingreso', 'updated_at')
    search_fields = ('rut', 'nombre', 'apellidos', 'email', 'cargo')
    list_filter = ('estado', 'rol', 'area', 'fecha_ingreso')
    date_hierarchy = 'fecha_ingreso' # Permite navegar por fechas
    raw_id_fields = ('rol', 'area',) # Permite buscar rol y área por ID
    readonly_fields = ('id', 'created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('rut', 'nombre', 'apellidos', 'email', 'password_hash')
        }),
        ('Información de Contacto y Personal', {
            'fields': ('telefono', 'fecha_nacimiento', 'direccion', 'avatar_url'),
            'classes': ('collapse',), # Oculta esta sección por defecto
        }),
        ('Información Laboral', {
            'fields': ('fecha_ingreso', 'estado', 'rol', 'area', 'cargo')
        }),
        ('Fechas', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )

# Admin para ContactoEmergencia
@admin.register(ContactoEmergencia)
class ContactoEmergenciaAdmin(admin.ModelAdmin):
    list_display = ('id', 'usuario', 'nombre', 'telefono', 'relacion', 'es_principal')
    search_fields = ('usuario__nombre', 'usuario__apellidos', 'nombre', 'telefono')
    list_filter = ('es_principal', 'relacion')
    raw_id_fields = ('usuario',)

# Admin para CalendarioEvento
@admin.register(CalendarioEvento)
class CalendarioEventoAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'fecha', 'hora_inicio', 'organizador', 'tipo', 'es_todo_el_dia', 'updated_at')
    search_fields = ('titulo', 'descripcion', 'ubicacion', 'organizador__nombre', 'organizador__apellidos')
    list_filter = ('tipo', 'fecha', 'es_todo_el_dia', 'es_recurrente')
    date_hierarchy = 'fecha'
    raw_id_fields = ('organizador',)
    readonly_fields = ('id', 'created_at', 'updated_at')

# Admin para ActividadTablero
@admin.register(ActividadTablero)
class ActividadTableroAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'fecha', 'organizador', 'tipo', 'estado', 'cupos_disponibles', 'updated_at')
    search_fields = ('titulo', 'descripcion', 'ubicacion', 'organizador__nombre', 'organizador__apellidos')
    list_filter = ('tipo', 'estado', 'fecha')
    date_hierarchy = 'fecha'
    raw_id_fields = ('organizador',)
    readonly_fields = ('id', 'created_at', 'updated_at')

# Admin para ActividadInteresado
@admin.register(ActividadInteresado)
class ActividadInteresadoAdmin(admin.ModelAdmin):
    list_display = ('id', 'actividad', 'usuario', 'fecha_registro')
    search_fields = ('actividad__titulo', 'usuario__nombre', 'usuario__apellidos')
    list_filter = ('fecha_registro',)
    raw_id_fields = ('actividad', 'usuario')
    readonly_fields = ('fecha_registro',)

# Admin para ComunicadoOficial
@admin.register(ComunicadoOficial)
class ComunicadoOficialAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'autor', 'categoria', 'fecha_publicacion', 'es_fijado', 'vistas', 'estado', 'updated_at')
    search_fields = ('titulo', 'descripcion', 'autor__nombre', 'autor__apellidos')
    list_filter = ('categoria', 'estado', 'es_fijado', 'fecha_publicacion')
    date_hierarchy = 'fecha_publicacion'
    raw_id_fields = ('autor',)
    readonly_fields = ('id', 'vistas', 'created_at', 'updated_at')

# Admin para AdjuntoComunicado
@admin.register(AdjuntoComunicado)
class AdjuntoComunicadoAdmin(admin.ModelAdmin):
    list_display = ('id', 'comunicado', 'nombre_archivo', 'tipo_archivo', 'tamano_bytes', 'created_at')
    search_fields = ('comunicado__titulo', 'nombre_archivo')
    list_filter = ('tipo_archivo',)
    raw_id_fields = ('comunicado',)
    readonly_fields = ('id', 'created_at')

# Admin para LicenciaMedica
@admin.register(LicenciaMedica)
class LicenciaMedicaAdmin(admin.ModelAdmin):
    list_display = ('id', 'usuario', 'fecha_inicio', 'fecha_termino', 'dias_licencia', 'estado', 'subido_por', 'fecha_subida', 'updated_at')
    search_fields = ('usuario__nombre', 'usuario__apellidos', 'diagnostico', 'medico_tratante')
    list_filter = ('estado', 'tipo_archivo', 'fecha_inicio', 'fecha_termino')
    date_hierarchy = 'fecha_subida'
    raw_id_fields = ('usuario', 'subido_por')
    readonly_fields = ('id', 'created_at', 'updated_at', 'dias_licencia') # dias_licencia puede ser calculado

# Admin para HistorialActividadUsuario
@admin.register(HistorialActividadUsuario)
class HistorialActividadUsuarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'usuario', 'titulo', 'tipo', 'fecha', 'duracion_horas', 'created_at')
    search_fields = ('usuario__nombre', 'usuario__apellidos', 'titulo', 'institucion_organizadora')
    list_filter = ('tipo', 'fecha')
    date_hierarchy = 'fecha'
    raw_id_fields = ('usuario',)
    readonly_fields = ('id', 'created_at')

# Admin para DocumentoPersonal
@admin.register(DocumentoPersonal)
class DocumentoPersonalAdmin(admin.ModelAdmin):
    list_display = ('id', 'usuario', 'nombre', 'tipo', 'fecha_subida', 'subido_por', 'es_confidencial', 'fecha_vigencia')
    search_fields = ('usuario__nombre', 'usuario__apellidos', 'nombre', 'tipo')
    list_filter = ('tipo', 'es_confidencial', 'fecha_vigencia')
    date_hierarchy = 'fecha_subida'
    raw_id_fields = ('usuario', 'subido_por')
    readonly_fields = ('id', 'created_at')

# Admin para Notificacion
@admin.register(Notificacion)
class NotificacionAdmin(admin.ModelAdmin):
    list_display = ('id', 'usuario', 'titulo', 'tipo', 'leida', 'fecha_leida', 'created_at')
    search_fields = ('usuario__nombre', 'usuario__apellidos', 'titulo', 'mensaje')
    list_filter = ('tipo', 'leida', 'created_at')
    date_hierarchy = 'created_at'
    raw_id_fields = ('usuario',)
    readonly_fields = ('id', 'created_at', 'fecha_leida')

# Admin para FeriadoLegal
@admin.register(FeriadoLegal)
class FeriadoLegalAdmin(admin.ModelAdmin):
    list_display = ('id', 'usuario', 'periodo_year', 'dias_totales', 'dias_usados', 'dias_pendientes', 'updated_at')
    search_fields = ('usuario__nombre', 'usuario__apellidos', 'periodo_year')
    list_filter = ('periodo_year',)
    raw_id_fields = ('usuario',)
    readonly_fields = ('id', 'created_at', 'updated_at', 'dias_pendientes') # dias_pendientes es calculado

# Admin para SolicitudFeriado
@admin.register(SolicitudFeriado)
class SolicitudFeriadoAdmin(admin.ModelAdmin):
    list_display = ('id', 'usuario', 'fecha_inicio', 'fecha_termino', 'dias_solicitados', 'estado', 'aprobado_por', 'fecha_aprobacion', 'updated_at')
    search_fields = ('usuario__nombre', 'usuario__apellidos', 'motivo')
    list_filter = ('estado', 'fecha_inicio', 'fecha_termino')
    date_hierarchy = 'fecha_inicio'
    raw_id_fields = ('usuario', 'aprobado_por')
    readonly_fields = ('id', 'created_at', 'updated_at')

# Admin para Sesion
@admin.register(Sesion)
class SesionAdmin(admin.ModelAdmin):
    list_display = ('id', 'usuario', 'ultima_actividad', 'fecha_expiracion', 'esta_activa')
    search_fields = ('usuario__nombre', 'usuario__apellidos', 'token', 'ip_address')
    list_filter = ('esta_activa', 'fecha_expiracion')
    date_hierarchy = 'ultima_actividad'
    raw_id_fields = ('usuario',)
    readonly_fields = ('id', 'token', 'created_at', 'ultima_actividad')

# Admin para LogAuditoria
@admin.register(LogAuditoria)
class LogAuditoriaAdmin(admin.ModelAdmin):
    list_display = ('id', 'usuario', 'accion', 'entidad_tipo', 'entidad_id', 'ip_address', 'created_at')
    search_fields = ('usuario__nombre', 'usuario__apellidos', 'accion', 'entidad_tipo', 'entidad_id')
    list_filter = ('accion', 'entidad_tipo', 'created_at')
    date_hierarchy = 'created_at'
    raw_id_fields = ('usuario',)
    readonly_fields = ('id', 'created_at', 'datos_anteriores', 'datos_nuevos') # Datos JSON son solo lectura

# Admin para RecursoMultimedia
@admin.register(RecursoMultimedia)
class RecursoMultimediaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre_archivo', 'tipo_categoria', 'subido_por', 'es_publico', 'tamano_bytes', 'created_at', 'updated_at')
    search_fields = ('nombre_archivo', 'clave_s3', 'url_acceso', 'subido_por__nombre', 'subido_por__apellidos')
    list_filter = ('tipo_categoria', 'es_publico', 'bucket_s3')
    date_hierarchy = 'created_at'
    raw_id_fields = ('subido_por',)
    readonly_fields = ('id', 'created_at', 'updated_at', 'clave_s3')