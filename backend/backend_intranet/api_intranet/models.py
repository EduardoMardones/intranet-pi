# api_intranet/models.py
import uuid
from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator

# ======================================================
# TABLAS SIN DEPENDENCIAS EXTERNAS DIRECTAS O DEPENDENCIAS CÍCLICAS
# ======================================================

class Rol(models.Model):
    id = models.AutoField(primary_key=True)
    codigo = models.CharField(max_length=50, unique=True, null=False, blank=False)
    nombre = models.CharField(max_length=100, null=False, blank=False)
    descripcion = models.TextField(null=True, blank=True)
    nivel_acceso = models.IntegerField(default=1) # 1=básico, 5=admin
    color_badge = models.CharField(max_length=50, null=True, blank=True) # Para UI: 'bg-blue-100 text-blue-700'
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'roles'
        verbose_name = 'Rol'
        verbose_name_plural = 'Roles'

    def __str__(self):
        return self.nombre

class ConfiguracionSistema(models.Model):
    id = models.AutoField(primary_key=True)
    clave = models.CharField(max_length=100, unique=True, null=False, blank=False)
    valor = models.TextField(null=True, blank=True)
    descripcion = models.TextField(null=True, blank=True)
    TIPO_DATO_CHOICES = [
        ('string', 'String'),
        ('number', 'Number'),
        ('boolean', 'Boolean'),
        ('json', 'JSON'),
    ]
    tipo_dato = models.CharField(max_length=20, choices=TIPO_DATO_CHOICES)
    es_publica = models.BooleanField(default=False)
    updated_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'configuraciones_sistema'
        verbose_name = 'Configuración del Sistema'
        verbose_name_plural = 'Configuraciones del Sistema'

    def __str__(self):
        return self.clave

# ======================================================
# TABLAS QUE DEPENDEN DE 'roles' (o otras tablas básicas)
# ======================================================

class Area(models.Model):
    id = models.AutoField(primary_key=True)
    codigo = models.CharField(max_length=50, unique=True, null=False, blank=False)
    nombre = models.CharField(max_length=100, null=False, blank=False)
    descripcion = models.TextField(null=True, blank=True)
    icono = models.CharField(max_length=10, null=True, blank=True) # Emoji para UI
    color = models.CharField(max_length=50, null=True, blank=True) # Para UI: 'text-blue-600'
    jefe_area = models.ForeignKey('Usuario', on_delete=models.SET_NULL, null=True, blank=True, related_name='areas_dirigidas')
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'areas'
        verbose_name = 'Área'
        verbose_name_plural = 'Áreas'

    def __str__(self):
        return self.nombre

class Usuario(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    rut = models.CharField(max_length=12, unique=True, null=False, blank=False)
    nombre = models.CharField(max_length=100, null=False, blank=False)
    apellidos = models.CharField(max_length=100, null=False, blank=False)
    email = models.EmailField(max_length=255, unique=True, null=False, blank=False)
    password_hash = models.CharField(max_length=255, null=False, blank=False) # Almacenar hashes, no contraseñas planas
    telefono = models.CharField(max_length=20, null=True, blank=True)
    fecha_nacimiento = models.DateField(null=True, blank=True)
    direccion = models.TextField(null=True, blank=True)
    avatar_url = models.URLField(max_length=200, null=True, blank=True)
    fecha_ingreso = models.DateField(default=timezone.now)
    ESTADO_CHOICES = [
        ('activo', 'Activo'),
        ('inactivo', 'Inactivo'),
        ('licencia', 'Licencia'),
        ('vacaciones', 'Vacaciones'),
    ]
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='activo')
    rol = models.ForeignKey(Rol, on_delete=models.SET_NULL, null=True, blank=True, related_name='usuarios')
    area = models.ForeignKey(Area, on_delete=models.SET_NULL, null=True, blank=True, related_name='usuarios')
    cargo = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'usuarios'
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    def __str__(self):
        return f"{self.nombre} {self.apellidos} ({self.rut})"

# ======================================================
# TABLAS QUE DEPENDEN DE 'usuarios' (directa o indirectamente)
# ======================================================

class ContactoEmergencia(models.Model):
    id = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='contactos_emergencia')
    nombre = models.CharField(max_length=100, null=False, blank=False)
    telefono = models.CharField(max_length=20, null=False, blank=False)
    relacion = models.CharField(max_length=50, null=True, blank=True)
    es_principal = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'contactos_emergencia'
        verbose_name = 'Contacto de Emergencia'
        verbose_name_plural = 'Contactos de Emergencia'

    def __str__(self):
        return f"{self.nombre} ({self.relacion}) de {self.usuario.nombre}"

class CalendarioEvento(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    titulo = models.CharField(max_length=200, null=False, blank=False)
    descripcion = models.TextField(null=True, blank=True)
    fecha = models.DateField(null=False, blank=False)
    hora_inicio = models.TimeField(null=True, blank=True)
    hora_fin = models.TimeField(null=True, blank=True)
    ubicacion = models.CharField(max_length=200, null=True, blank=True)
    organizador = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, blank=True, related_name='eventos_organizados')
    TIPO_CHOICES = [
        ('reunion', 'Reunión'),
        ('capacitacion', 'Capacitación'),
        ('feriado', 'Feriado'),
        ('otro', 'Otro'),
    ]
    tipo = models.CharField(max_length=50, choices=TIPO_CHOICES)
    color_categoria = models.CharField(max_length=50, null=True, blank=True)
    es_todo_el_dia = models.BooleanField(default=False)
    es_recurrente = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'calendario_eventos'
        verbose_name = 'Evento de Calendario'
        verbose_name_plural = 'Eventos de Calendario'

    def __str__(self):
        return self.titulo

class ActividadTablero(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    titulo = models.CharField(max_length=200, null=False, blank=False)
    descripcion = models.TextField(null=False, blank=False)
    fecha = models.DateField(null=False, blank=False)
    hora_inicio = models.TimeField(null=True, blank=True)
    hora_fin = models.TimeField(null=True, blank=True)
    ubicacion = models.CharField(max_length=200, null=True, blank=True)
    imagen_url = models.URLField(max_length=200, null=True, blank=True)
    TIPO_CHOICES = [
        ('gastronomica', 'Gastronómica'),
        ('deportiva', 'Deportiva'),
        ('celebracion', 'Celebración'),
        ('comunitaria', 'Comunitaria'),
        ('otra', 'Otra'),
    ]
    tipo = models.CharField(max_length=50, choices=TIPO_CHOICES)
    organizador = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, blank=True, related_name='actividades_organizadas')
    cupos_maximos = models.IntegerField(null=True, blank=True)
    cupos_disponibles = models.IntegerField(null=True, blank=True)
    ESTADO_CHOICES = [
        ('borrador', 'Borrador'),
        ('publicada', 'Publicada'),
        ('cancelada', 'Cancelada'),
        ('finalizada', 'Finalizada'),
    ]
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='publicada')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'actividades_tablero'
        verbose_name = 'Actividad de Tablero'
        verbose_name_plural = 'Actividades de Tablero'

    def __str__(self):
        return self.titulo

class ActividadInteresado(models.Model):
    id = models.AutoField(primary_key=True)
    actividad = models.ForeignKey(ActividadTablero, on_delete=models.CASCADE, related_name='interesados')
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='actividades_interesado')
    fecha_registro = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'actividades_interesados'
        verbose_name = 'Interesado en Actividad'
        verbose_name_plural = 'Interesados en Actividades'
        unique_together = ('actividad', 'usuario') # Restricción UNIQUE(actividad_id, usuario_id)

    def __str__(self):
        return f"{self.usuario.nombre} interesado en {self.actividad.titulo}"

class ComunicadoOficial(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    titulo = models.CharField(max_length=300, null=False, blank=False)
    descripcion = models.TextField(null=False, blank=False)
    fecha_publicacion = models.DateTimeField(default=timezone.now)
    autor = models.ForeignKey(Usuario, on_delete=models.PROTECT, related_name='comunicados_publicados') # PROTECT para no eliminar el autor si tiene comunicados
    CATEGORIA_CHOICES = [
        ('general', 'General'),
        ('normativa', 'Normativa'),
        ('urgente', 'Urgente'),
        ('informativa', 'Informativa'),
        ('administrativa', 'Administrativa'),
    ]
    categoria = models.CharField(max_length=50, choices=CATEGORIA_CHOICES)
    es_fijado = models.BooleanField(default=False)
    vistas = models.IntegerField(default=0)
    ESTADO_CHOICES = [
        ('borrador', 'Borrador'),
        ('publicado', 'Publicado'),
        ('archivado', 'Archivado'),
    ]
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='publicado')
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'comunicados_oficiales'
        verbose_name = 'Comunicado Oficial'
        verbose_name_plural = 'Comunicados Oficiales'

    def __str__(self):
        return self.titulo

class AdjuntoComunicado(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    comunicado = models.ForeignKey(ComunicadoOficial, on_delete=models.CASCADE, related_name='adjuntos')
    nombre_archivo = models.CharField(max_length=255, null=False, blank=False)
    url_archivo = models.URLField(max_length=200, null=False, blank=False) # Django usa max_length para URLField
    TIPO_ARCHIVO_CHOICES = [
        ('pdf', 'PDF'),
        ('doc', 'DOC'),
        ('xls', 'XLS'),
        ('img', 'Imagen'),
        ('other', 'Otro'),
    ]
    tipo_archivo = models.CharField(max_length=10, choices=TIPO_ARCHIVO_CHOICES)
    tamano_bytes = models.BigIntegerField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'adjuntos_comunicados'
        verbose_name = 'Adjunto de Comunicado'
        verbose_name_plural = 'Adjuntos de Comunicados'

    def __str__(self):
        return self.nombre_archivo

class LicenciaMedica(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    usuario = models.ForeignKey(Usuario, on_delete=models.PROTECT, related_name='licencias_emitidas')
    nombre_archivo = models.CharField(max_length=255, null=False, blank=False)
    url_archivo = models.URLField(max_length=200, null=False, blank=False)
    TIPO_ARCHIVO_CHOICES = [
        ('pdf', 'PDF'),
        ('jpeg', 'JPEG'),
        ('jpg', 'JPG'),
        ('png', 'PNG'),
    ]
    tipo_archivo = models.CharField(max_length=10, choices=TIPO_ARCHIVO_CHOICES)
    tamano_bytes = models.BigIntegerField(null=True, blank=True)
    fecha_subida = models.DateTimeField(default=timezone.now)
    subido_por = models.ForeignKey(Usuario, on_delete=models.PROTECT, related_name='licencias_subidas')
    fecha_inicio = models.DateField(null=True, blank=True)
    fecha_termino = models.DateField(null=True, blank=True)
    dias_licencia = models.IntegerField(null=True, blank=True)
    diagnostico = models.TextField(null=True, blank=True)
    medico_tratante = models.CharField(max_length=100, null=True, blank=True)
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('aprobada', 'Aprobada'),
        ('rechazada', 'Rechazada'),
        ('vigente', 'Vigente'),
        ('vencida', 'Vencida'),
    ]
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')
    observaciones = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'licencias_medicas'
        verbose_name = 'Licencia Médica'
        verbose_name_plural = 'Licencias Médicas'

    def __str__(self):
        return f"Licencia de {self.usuario.nombre} ({self.fecha_inicio} - {self.fecha_termino})"

class HistorialActividadUsuario(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='historial_actividades')
    TIPO_CHOICES = [
        ('capacitacion', 'Capacitación'),
        ('evento', 'Evento'),
        ('reconocimiento', 'Reconocimiento'),
        ('evaluacion', 'Evaluación'),
        ('otro', 'Otro'),
    ]
    tipo = models.CharField(max_length=50, choices=TIPO_CHOICES)
    titulo = models.CharField(max_length=200, null=False, blank=False)
    descripcion = models.TextField(null=True, blank=True)
    fecha = models.DateField(null=False, blank=False)
    duracion_horas = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    institucion_organizadora = models.CharField(max_length=200, null=True, blank=True)
    certificado_url = models.URLField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'historial_actividades_usuario'
        verbose_name = 'Historial de Actividad del Usuario'
        verbose_name_plural = 'Historial de Actividades del Usuario'

    def __str__(self):
        return f"{self.titulo} para {self.usuario.nombre} ({self.fecha})"

class DocumentoPersonal(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='documentos_personales')
    TIPO_CHOICES = [
        ('licencia', 'Licencia'),
        ('certificado', 'Certificado'),
        ('evaluacion', 'Evaluación'),
        ('contrato', 'Contrato'),
        ('otro', 'Otro'),
    ]
    tipo = models.CharField(max_length=50, choices=TIPO_CHOICES)
    nombre = models.CharField(max_length=255, null=False, blank=False)
    url_archivo = models.URLField(max_length=200, null=False, blank=False)
    tamano_bytes = models.BigIntegerField(null=True, blank=True)
    fecha_subida = models.DateTimeField(default=timezone.now)
    subido_por = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, blank=True, related_name='documentos_subidos')
    fecha_vigencia = models.DateField(null=True, blank=True)
    es_confidencial = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'documentos_personales'
        verbose_name = 'Documento Personal'
        verbose_name_plural = 'Documentos Personales'

    def __str__(self):
        return f"{self.nombre} ({self.tipo}) de {self.usuario.nombre}"

class Notificacion(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='notificaciones')
    titulo = models.CharField(max_length=200, null=False, blank=False)
    mensaje = models.TextField(null=False, blank=False)
    TIPO_CHOICES = [
        ('info', 'Información'),
        ('warning', 'Advertencia'),
        ('success', 'Éxito'),
        ('error', 'Error'),
    ]
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    leida = models.BooleanField(default=False)
    fecha_leida = models.DateTimeField(null=True, blank=True)
    url_accion = models.URLField(max_length=200, null=True, blank=True)
    entidad_tipo = models.CharField(max_length=50, null=True, blank=True)
    entidad_id = models.UUIDField(null=True, blank=True) # UUID de la entidad relacionada
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'notificaciones'
        verbose_name = 'Notificación'
        verbose_name_plural = 'Notificaciones'

    def __str__(self):
        return self.titulo

class FeriadoLegal(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='feriados_legales')
    periodo_year = models.IntegerField(null=False, blank=False, validators=[MinValueValidator(1900), MaxValueValidator(2100)])
    dias_totales = models.IntegerField(default=15, null=False, blank=False)
    dias_usados = models.IntegerField(default=0)
    dias_pendientes = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'feriados_legales'
        verbose_name = 'Feriado Legal'
        verbose_name_plural = 'Feriados Legales'
        unique_together = ('usuario', 'periodo_year')

    def __str__(self):
        return f"Feriados de {self.usuario.nombre} para {self.periodo_year}"

class SolicitudFeriado(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='solicitudes_feriados')
    fecha_inicio = models.DateField(null=False, blank=False)
    fecha_termino = models.DateField(null=False, blank=False)
    dias_solicitados = models.IntegerField(null=False, blank=False)
    motivo = models.TextField(null=True, blank=True)
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('aprobada', 'Aprobada'),
        ('rechazada', 'Rechazada'),
        ('cancelada', 'Cancelada'),
    ]
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')
    aprobado_por = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, blank=True, related_name='solicitudes_aprobadas')
    fecha_aprobacion = models.DateTimeField(null=True, blank=True)
    comentarios_aprobacion = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'solicitudes_feriados'
        verbose_name = 'Solicitud de Feriado'
        verbose_name_plural = 'Solicitudes de Feriados'

    def __str__(self):
        return f"Solicitud de {self.usuario.nombre} del {self.fecha_inicio} al {self.fecha_termino}"

class Sesion(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='sesiones')
    token = models.TextField(unique=True, null=False, blank=False)
    ip_address = models.GenericIPAddressField(protocol='IPv4', null=True, blank=True) # Para INET
    user_agent = models.TextField(null=True, blank=True)
    ultima_actividad = models.DateTimeField(default=timezone.now)
    fecha_expiracion = models.DateTimeField(null=False, blank=False)
    esta_activa = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'sesiones'
        verbose_name = 'Sesión'
        verbose_name_plural = 'Sesiones'

    def __str__(self):
        return f"Sesión de {self.usuario.nombre} ({self.id})"

class LogAuditoria(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    usuario = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, blank=True, related_name='logs_auditoria')
    accion = models.CharField(max_length=100, null=False, blank=False)
    entidad_tipo = models.CharField(max_length=50, null=True, blank=True)
    entidad_id = models.UUIDField(null=True, blank=True)
    datos_anteriores = models.JSONField(null=True, blank=True)
    datos_nuevos = models.JSONField(null=True, blank=True)
    ip_address = models.GenericIPAddressField(protocol='IPv4', null=True, blank=True)
    user_agent = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'logs_auditoria'
        verbose_name = 'Log de Auditoría'
        verbose_name_plural = 'Logs de Auditoría'

    def __str__(self):
        return f"[{self.created_at.isoformat()}] {self.accion} en {self.entidad_tipo if self.entidad_tipo else 'N/A'}"

class RecursoMultimedia(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre_archivo = models.CharField(max_length=255, null=False, blank=False)
    clave_s3 = models.CharField(max_length=512, unique=True, null=False, blank=False)
    bucket_s3 = models.CharField(max_length=100, null=False, blank=False)
    url_acceso = models.URLField(max_length=200, null=False, blank=False)
    tipo_mime = models.CharField(max_length=100, null=False, blank=False)
    TIPO_CATEGORIA_CHOICES = [
        ('documento', 'Documento'),
        ('imagen', 'Imagen'),
        ('video', 'Video'),
        ('audio', 'Audio'),
        ('otro', 'Otro'),
    ]
    tipo_categoria = models.CharField(max_length=50, choices=TIPO_CATEGORIA_CHOICES, null=False, blank=False)
    tamano_bytes = models.BigIntegerField(null=False, blank=False)
    subido_por = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, blank=True, related_name='recursos_subidos')
    es_publico = models.BooleanField(default=False)
    metadata = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'recursos_multimedia'
        verbose_name = 'Recurso Multimedia'
        verbose_name_plural = 'Recursos Multimedia'

    def __str__(self):
        return self.nombre_archivo