# ======================================================
# SERIALIZERS.PY - Django REST Framework Serializers
# Ubicación: api_intranet/serializers.py
# ======================================================

from rest_framework import serializers
from .models import (
    Usuario, Rol, Area, Solicitud,
    LicenciaMedica, Actividad, InscripcionActividad,
    Anuncio, AdjuntoAnuncio, Documento, CategoriaDocumento,
    Notificacion, LogAuditoria
)


# ======================================================
# SERIALIZERS SIMPLES (Sin relaciones complejas)
# ======================================================

class RolSerializer(serializers.ModelSerializer):
    """Serializer para Rol"""
    class Meta:
        model = Rol
        fields = '__all__'
        read_only_fields = ('id', 'creado_en', 'actualizado_en')


class AreaSerializer(serializers.ModelSerializer):
    """Serializer para Área con jefe"""
    jefe_nombre = serializers.SerializerMethodField()
    total_funcionarios = serializers.SerializerMethodField()
    
    class Meta:
        model = Area
        fields = [
            'id', 'nombre', 'codigo', 'descripcion', 'color', 'icono',
            'jefe', 'jefe_nombre', 'total_funcionarios', 'activa',
            'creada_en', 'actualizada_en'
        ]
        read_only_fields = ('id', 'creada_en', 'actualizada_en')
    
    def get_jefe_nombre(self, obj):
        return obj.jefe.get_nombre_completo() if obj.jefe else None
    
    def get_total_funcionarios(self, obj):
        return obj.funcionarios.count()


class CategoriaDocumentoSerializer(serializers.ModelSerializer):
    """Serializer para Categoría de Documento"""
    class Meta:
        model = CategoriaDocumento
        fields = '__all__'


# ======================================================
# USUARIO SERIALIZERS
# ======================================================

class UsuarioListSerializer(serializers.ModelSerializer):
    """Serializer reducido para listados"""
    rol_nombre = serializers.CharField(source='rol.nombre', read_only=True)
    area_nombre = serializers.CharField(source='area.nombre', read_only=True)
    nombre_completo = serializers.SerializerMethodField()
    
    class Meta:
        model = Usuario
        fields = [
            'id', 'rut', 'nombre_completo', 'email', 'telefono',
            'cargo', 'area', 'area_nombre', 'rol', 'rol_nombre',
            'avatar', 'is_active'
        ]
        read_only_fields = ('id',)
    
    def get_nombre_completo(self, obj):
        return obj.get_nombre_completo()


class UsuarioDetailSerializer(serializers.ModelSerializer):
    """Serializer completo para detalle de usuario"""
    rol_nombre = serializers.CharField(source='rol.nombre', read_only=True)
    area_nombre = serializers.CharField(source='area.nombre', read_only=True)
    nombre_completo = serializers.SerializerMethodField()
    
    # Días disponibles
    dias_info = serializers.SerializerMethodField()
    
    class Meta:
        model = Usuario
        fields = [
            'id', 'rut', 'nombre', 'apellido_paterno', 'apellido_materno',
            'nombre_completo', 'email', 'telefono', 'fecha_nacimiento', 'direccion',
            'cargo', 'area', 'area_nombre', 'rol', 'rol_nombre', 'fecha_ingreso',
            'es_jefe_de_area',
            'contacto_emergencia_nombre', 'contacto_emergencia_telefono',
            'contacto_emergencia_relacion',
            'dias_vacaciones_anuales', 'dias_vacaciones_disponibles', 'dias_vacaciones_usados',
            'dias_administrativos_anuales', 'dias_administrativos_disponibles', 'dias_administrativos_usados',
            'dias_info',
            'avatar', 'tema_preferido', 'is_active',
            'creado_en', 'actualizado_en', 'ultimo_acceso'
        ]
        read_only_fields = (
            'id', 'dias_vacaciones_usados', 'dias_administrativos_usados',
            'creado_en', 'actualizado_en', 'ultimo_acceso'
        )
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def get_nombre_completo(self, obj):
        return obj.get_nombre_completo()
    
    def get_dias_info(self, obj):
        return {
            'vacaciones': {
                'total_anuales': obj.dias_vacaciones_anuales,
                'disponibles': obj.dias_vacaciones_disponibles,
                'usados': obj.dias_vacaciones_usados,
                'porcentaje_usado': (obj.dias_vacaciones_usados / obj.dias_vacaciones_anuales * 100) if obj.dias_vacaciones_anuales > 0 else 0
            },
            'administrativos': {
                'total_anuales': obj.dias_administrativos_anuales,
                'disponibles': obj.dias_administrativos_disponibles,
                'usados': obj.dias_administrativos_usados,
                'porcentaje_usado': (obj.dias_administrativos_usados / obj.dias_administrativos_anuales * 100) if obj.dias_administrativos_anuales > 0 else 0
            }
        }


class UsuarioCreateSerializer(serializers.ModelSerializer):
    """Serializer para crear usuario"""
    password = serializers.CharField(write_only=True, required=True)
    password_confirm = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = Usuario
        fields = [
            'rut', 'nombre', 'apellido_paterno', 'apellido_materno',
            'email', 'password', 'password_confirm', 'telefono',
            'fecha_nacimiento', 'direccion', 'cargo', 'area', 'rol',
            'fecha_ingreso', 'es_jefe_de_area',
            'dias_vacaciones_anuales', 'dias_administrativos_anuales'
        ]
    
    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Las contraseñas no coinciden")
        return data
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        user = Usuario.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user


# ======================================================
# SOLICITUD SERIALIZERS
# ======================================================

class SolicitudListSerializer(serializers.ModelSerializer):
    """Serializer para listado de solicitudes"""
    usuario_nombre = serializers.CharField(source='usuario.get_nombre_completo', read_only=True)
    area_nombre = serializers.CharField(source='usuario.area.nombre', read_only=True)
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    estado_display = serializers.CharField(source='get_estado_display', read_only=True)
    
    class Meta:
        model = Solicitud
        fields = [
            'id', 'numero_solicitud', 'usuario', 'usuario_nombre',
            'area_nombre', 'tipo', 'tipo_display', 'fecha_inicio',
            'fecha_termino', 'cantidad_dias', 'estado', 'estado_display',
            'fecha_solicitud'
        ]
        read_only_fields = ('id', 'numero_solicitud', 'fecha_solicitud')


class SolicitudDetailSerializer(serializers.ModelSerializer):
    """Serializer completo para detalle de solicitud"""
    usuario_nombre = serializers.CharField(source='usuario.get_nombre_completo', read_only=True)
    area_nombre = serializers.CharField(source='usuario.area.nombre', read_only=True)
    jefatura_nombre = serializers.CharField(source='jefatura_aprobador.get_nombre_completo', read_only=True)
    direccion_nombre = serializers.CharField(source='direccion_aprobador.get_nombre_completo', read_only=True)
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    estado_display = serializers.CharField(source='get_estado_display', read_only=True)
    
    class Meta:
        model = Solicitud
        fields = '__all__'
        read_only_fields = (
            'id', 'numero_solicitud', 'estado', 'fecha_solicitud',
            'aprobada_por_jefatura', 'jefatura_aprobador', 'fecha_aprobacion_jefatura',
            'aprobada_por_direccion', 'direccion_aprobador', 'fecha_aprobacion_direccion',
            'pdf_generado', 'url_pdf', 'creada_en', 'actualizada_en'
        )


class SolicitudCreateSerializer(serializers.ModelSerializer):
    """Serializer para crear solicitud"""
    class Meta:
        model = Solicitud
        fields = [
            'tipo', 'fecha_inicio', 'fecha_termino',
            'cantidad_dias', 'motivo', 'telefono_contacto'
        ]
    
    def validate(self, data):
        # Validar fechas
        if data['fecha_inicio'] > data['fecha_termino']:
            raise serializers.ValidationError("La fecha de inicio debe ser anterior a la fecha de término")
        
        # Validar días disponibles
        usuario = self.context['request'].user
        if data['tipo'] == 'vacaciones':
            if data['cantidad_dias'] > usuario.dias_vacaciones_disponibles:
                raise serializers.ValidationError(
                    f"Solo tienes {usuario.dias_vacaciones_disponibles} días de vacaciones disponibles"
                )
        elif data['tipo'] == 'dia_administrativo':
            if data['cantidad_dias'] > usuario.dias_administrativos_disponibles:
                raise serializers.ValidationError(
                    f"Solo tienes {usuario.dias_administrativos_disponibles} días administrativos disponibles"
                )
            if data['cantidad_dias'] > 6:
                raise serializers.ValidationError("Los días administrativos tienen un máximo de 6 días por año")
        
        return data


class SolicitudAprobacionSerializer(serializers.Serializer):
    """Serializer para aprobar/rechazar solicitud"""
    comentarios = serializers.CharField(required=False, allow_blank=True)
    aprobar = serializers.BooleanField(required=True)


# ======================================================
# LICENCIA MÉDICA SERIALIZERS
# ======================================================

class LicenciaMedicaSerializer(serializers.ModelSerializer):
    """Serializer para Licencia Médica"""
    usuario_nombre = serializers.CharField(source='usuario.get_nombre_completo', read_only=True)
    area_nombre = serializers.CharField(source='usuario.area.nombre', read_only=True)
    subida_por_nombre = serializers.CharField(source='subida_por.get_nombre_completo', read_only=True)
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    esta_vigente = serializers.SerializerMethodField()
    
    class Meta:
        model = LicenciaMedica
        fields = '__all__'
        read_only_fields = ('id', 'subida_en', 'actualizada_en')
    
    def get_esta_vigente(self, obj):
        return obj.esta_vigente()


# ======================================================
# ACTIVIDAD SERIALIZERS
# ======================================================

class InscripcionActividadSerializer(serializers.ModelSerializer):
    """Serializer para inscripción a actividad"""
    usuario_nombre = serializers.CharField(source='usuario.get_nombre_completo', read_only=True)
    
    class Meta:
        model = InscripcionActividad
        fields = '__all__'
        read_only_fields = ('id', 'fecha_inscripcion')


class ActividadListSerializer(serializers.ModelSerializer):
    """Serializer para listado de actividades"""
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    creado_por_nombre = serializers.CharField(source='creado_por.get_nombre_completo', read_only=True)
    total_inscritos = serializers.SerializerMethodField()
    tiene_cupos = serializers.SerializerMethodField()
    
    class Meta:
        model = Actividad
        fields = [
            'id', 'titulo', 'descripcion', 'tipo', 'tipo_display',
            'fecha_inicio', 'fecha_termino', 'ubicacion', 'color',
            'imagen', 'cupo_maximo', 'total_inscritos', 'tiene_cupos',
            'activa', 'creado_por_nombre', 'creado_en'
        ]
        read_only_fields = ('id', 'creado_en')
    
    def get_total_inscritos(self, obj):
        return obj.inscritos.count()
    
    def get_tiene_cupos(self, obj):
        return obj.tiene_cupos_disponibles()


class ActividadDetailSerializer(serializers.ModelSerializer):
    """Serializer completo para detalle de actividad"""
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    creado_por_nombre = serializers.CharField(source='creado_por.get_nombre_completo', read_only=True)
    areas_participantes_nombres = serializers.SerializerMethodField()
    inscritos_list = InscripcionActividadSerializer(source='inscripcionactividad_set', many=True, read_only=True)
    total_inscritos = serializers.SerializerMethodField()
    tiene_cupos = serializers.SerializerMethodField()
    
    class Meta:
        model = Actividad
        fields = '__all__'
        read_only_fields = ('id', 'creado_en', 'actualizado_en')
    
    def get_areas_participantes_nombres(self, obj):
        return [area.nombre for area in obj.areas_participantes.all()]
    
    def get_total_inscritos(self, obj):
        return obj.inscritos.count()
    
    def get_tiene_cupos(self, obj):
        return obj.tiene_cupos_disponibles()


# ======================================================
# ANUNCIO SERIALIZERS
# ======================================================

class AdjuntoAnuncioSerializer(serializers.ModelSerializer):
    """Serializer para adjuntos de anuncio"""
    class Meta:
        model = AdjuntoAnuncio
        fields = '__all__'
        read_only_fields = ('id', 'subido_en')


class AnuncioListSerializer(serializers.ModelSerializer):
    """Serializer para listado de anuncios"""
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    creado_por_nombre = serializers.CharField(source='creado_por.get_nombre_completo', read_only=True)
    esta_vigente = serializers.SerializerMethodField()
    
    class Meta:
        model = Anuncio
        fields = [
            'id', 'titulo', 'tipo', 'tipo_display', 'es_destacado',
            'prioridad', 'fecha_publicacion', 'fecha_expiracion',
            'imagen', 'activo', 'esta_vigente', 'creado_por_nombre',
            'creado_en'
        ]
        read_only_fields = ('id', 'creado_en')
    
    def get_esta_vigente(self, obj):
        return obj.esta_vigente()


class AnuncioDetailSerializer(serializers.ModelSerializer):
    """Serializer completo para detalle de anuncio"""
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    creado_por_nombre = serializers.CharField(source='creado_por.get_nombre_completo', read_only=True)
    areas_destinatarias_nombres = serializers.SerializerMethodField()
    adjuntos = AdjuntoAnuncioSerializer(many=True, read_only=True)
    esta_vigente = serializers.SerializerMethodField()
    
    class Meta:
        model = Anuncio
        fields = '__all__'
        read_only_fields = ('id', 'creado_en', 'actualizado_en')
    
    def get_areas_destinatarias_nombres(self, obj):
        return [area.nombre for area in obj.areas_destinatarias.all()]
    
    def get_esta_vigente(self, obj):
        return obj.esta_vigente()


# ======================================================
# DOCUMENTO SERIALIZERS
# ======================================================

class DocumentoListSerializer(serializers.ModelSerializer):
    """Serializer para listado de documentos"""
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    categoria_nombre = serializers.CharField(source='categoria.nombre', read_only=True)
    subido_por_nombre = serializers.CharField(source='subido_por.get_nombre_completo', read_only=True)
    esta_vigente = serializers.SerializerMethodField()
    
    class Meta:
        model = Documento
        fields = [
            'id', 'codigo_documento', 'titulo', 'tipo', 'tipo_display',
            'categoria', 'categoria_nombre', 'extension', 'tamano',
            'version', 'fecha_vigencia', 'fecha_expiracion',
            'publico', 'descargas', 'visualizaciones', 'activo',
            'esta_vigente', 'subido_por_nombre', 'subido_en'
        ]
        read_only_fields = (
            'id', 'codigo_documento', 'descargas', 'visualizaciones',
            'subido_en'
        )
    
    def get_esta_vigente(self, obj):
        return obj.esta_vigente()


class DocumentoDetailSerializer(serializers.ModelSerializer):
    """Serializer completo para detalle de documento"""
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    categoria_nombre = serializers.CharField(source='categoria.nombre', read_only=True)
    subido_por_nombre = serializers.CharField(source='subido_por.get_nombre_completo', read_only=True)
    areas_con_acceso_nombres = serializers.SerializerMethodField()
    esta_vigente = serializers.SerializerMethodField()
    
    class Meta:
        model = Documento
        fields = '__all__'
        read_only_fields = (
            'id', 'codigo_documento', 'descargas', 'visualizaciones',
            'subido_en', 'actualizado_en'
        )
    
    def get_areas_con_acceso_nombres(self, obj):
        return [area.nombre for area in obj.areas_con_acceso.all()]
    
    def get_esta_vigente(self, obj):
        return obj.esta_vigente()


# ======================================================
# NOTIFICACIÓN SERIALIZER
# ======================================================

class NotificacionSerializer(serializers.ModelSerializer):
    """Serializer para notificaciones"""
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    
    class Meta:
        model = Notificacion
        fields = '__all__'
        read_only_fields = ('id', 'creada_en')


# ======================================================
# LOG AUDITORÍA SERIALIZER
# ======================================================

class LogAuditoriaSerializer(serializers.ModelSerializer):
    """Serializer para logs de auditoría"""
    usuario_nombre = serializers.CharField(source='usuario.get_nombre_completo', read_only=True)
    accion_display = serializers.CharField(source='get_accion_display', read_only=True)
    
    class Meta:
        model = LogAuditoria
        fields = '__all__'
        read_only_fields = ('id', 'timestamp')