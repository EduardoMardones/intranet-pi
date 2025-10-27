# api_intranet/serializers.py
from rest_framework import serializers
from .models import (
    Rol, ConfiguracionSistema, Area, Usuario, ContactoEmergencia,
    CalendarioEvento, ActividadTablero, ActividadInteresado,
    ComunicadoOficial, AdjuntoComunicado, LicenciaMedica,
    HistorialActividadUsuario, DocumentoPersonal, Notificacion,
    FeriadoLegal, SolicitudFeriado, Sesion, LogAuditoria, RecursoMultimedia
)

# ======================================================
# Serializers para Tablas sin dependencias directas o cíclicas
# ======================================================

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = '__all__' # Incluye todos los campos del modelo Rol
        read_only_fields = ('id', 'created_at') # Campos que no se pueden modificar en la creación/actualización

class ConfiguracionSistemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfiguracionSistema
        fields = '__all__'
        read_only_fields = ('id', 'updated_at')

# ======================================================
# Serializers para Tablas que dependen de otras
# (Ordenados para referenciar serializadores ya definidos cuando sea necesario)
# ======================================================

# Serializer de Usuario para ser usado en referencias (antes del full UsuarioSerializer)
# Esto es útil para evitar dependencias circulares si Usuario fuera a referenciar Area y Area a Usuario.
class UsuarioMinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id', 'nombre', 'apellidos', 'rut', 'email')
        read_only_fields = ('id',)

class AreaSerializer(serializers.ModelSerializer):
    # Usamos UsuarioMinSerializer para jefe_area para evitar recursión infinita
    # si el UsuarioSerializer completo ya incluyera AreaSerializer.
    # En este caso particular, jefe_area es una FK simple, pero es buena práctica.
    jefe_area = UsuarioMinSerializer(read_only=True) # Muestra los detalles del jefe de área
    jefe_area_id = serializers.UUIDField(write_only=True, required=False, allow_null=True) # Campo para escribir el UUID del jefe de área

    class Meta:
        model = Area
        fields = '__all__'
        read_only_fields = ('id', 'created_at')

    def create(self, validated_data):
        jefe_area_id = validated_data.pop('jefe_area_id', None)
        area = Area.objects.create(**validated_data)
        if jefe_area_id:
            try:
                area.jefe_area = Usuario.objects.get(id=jefe_area_id)
                area.save()
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"jefe_area_id": "El usuario especificado como jefe de área no existe."})
        return area

    def update(self, instance, validated_data):
        jefe_area_id = validated_data.pop('jefe_area_id', None)
        instance = super().update(instance, validated_data)
        if jefe_area_id is not None:
            try:
                instance.jefe_area = Usuario.objects.get(id=jefe_area_id)
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"jefe_area_id": "El usuario especificado como jefe de área no existe."})
        elif 'jefe_area_id' in self.initial_data and self.initial_data['jefe_area_id'] is None:
            instance.jefe_area = None # Permite setear el jefe_area a NULL
        instance.save()
        return instance


class UsuarioSerializer(serializers.ModelSerializer):
    # Aquí podríamos anidar RolSerializer y AreaSerializer si quisiéramos
    # que la respuesta incluyera todos los detalles de rol y área.
    # Por ahora, usamos una representación de solo lectura para Rol y Area
    # y permitimos escribir el ID directamente.
    rol = RolSerializer(read_only=True)
    rol_id = serializers.IntegerField(write_only=True, required=False, allow_null=True) # Campo para escribir el ID del rol

    area = AreaSerializer(read_only=True)
    area_id = serializers.IntegerField(write_only=True, required=False, allow_null=True) # Campo para escribir el ID del área

    class Meta:
        model = Usuario
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')
        extra_kwargs = {
            'password_hash': {'write_only': True} # Para que password_hash no se muestre en la respuesta, pero se pueda enviar
        }

    # Custom create y update para manejar el rol_id y area_id
    def create(self, validated_data):
        rol_id = validated_data.pop('rol_id', None)
        area_id = validated_data.pop('area_id', None)

        user = Usuario.objects.create(**validated_data)

        if rol_id:
            try:
                user.rol = Rol.objects.get(id=rol_id)
            except Rol.DoesNotExist:
                raise serializers.ValidationError({"rol_id": "El rol especificado no existe."})
        if area_id:
            try:
                user.area = Area.objects.get(id=area_id)
            except Area.DoesNotExist:
                raise serializers.ValidationError({"area_id": "El área especificada no existe."})
        user.save()
        return user

    def update(self, instance, validated_data):
        rol_id = validated_data.pop('rol_id', None)
        area_id = validated_data.pop('area_id', None)

        instance = super().update(instance, validated_data)

        if rol_id is not None:
            try:
                instance.rol = Rol.objects.get(id=rol_id)
            except Rol.DoesNotExist:
                raise serializers.ValidationError({"rol_id": "El rol especificado no existe."})
        elif 'rol_id' in self.initial_data and self.initial_data['rol_id'] is None:
            instance.rol = None # Permite setear el rol a NULL

        if area_id is not None:
            try:
                instance.area = Area.objects.get(id=area_id)
            except Area.DoesNotExist:
                raise serializers.ValidationError({"area_id": "El área especificada no existe."})
        elif 'area_id' in self.initial_data and self.initial_data['area_id'] is None:
            instance.area = None # Permite setear el área a NULL

        instance.save()
        return instance


class ContactoEmergenciaSerializer(serializers.ModelSerializer):
    usuario = UsuarioMinSerializer(read_only=True)
    usuario_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = ContactoEmergencia
        fields = '__all__'
        read_only_fields = ('id', 'created_at')

    def create(self, validated_data):
        usuario_id = validated_data.pop('usuario_id')
        try:
            usuario = Usuario.objects.get(id=usuario_id)
        except Usuario.DoesNotExist:
            raise serializers.ValidationError({"usuario_id": "El usuario especificado no existe."})
        return ContactoEmergencia.objects.create(usuario=usuario, **validated_data)

    def update(self, instance, validated_data):
        usuario_id = validated_data.pop('usuario_id', None)
        if usuario_id:
            try:
                instance.usuario = Usuario.objects.get(id=usuario_id)
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"usuario_id": "El usuario especificado no existe."})
        return super().update(instance, validated_data)


class CalendarioEventoSerializer(serializers.ModelSerializer):
    organizador = UsuarioMinSerializer(read_only=True)
    organizador_id = serializers.UUIDField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = CalendarioEvento
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')

    def create(self, validated_data):
        organizador_id = validated_data.pop('organizador_id', None)
        evento = CalendarioEvento.objects.create(**validated_data)
        if organizador_id:
            try:
                evento.organizador = Usuario.objects.get(id=organizador_id)
                evento.save()
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"organizador_id": "El usuario organizador no existe."})
        return evento

    def update(self, instance, validated_data):
        organizador_id = validated_data.pop('organizador_id', None)
        instance = super().update(instance, validated_data)
        if organizador_id is not None:
            try:
                instance.organizador = Usuario.objects.get(id=organizador_id)
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"organizador_id": "El usuario organizador no existe."})
        elif 'organizador_id' in self.initial_data and self.initial_data['organizador_id'] is None:
            instance.organizador = None
        instance.save()
        return instance


class ActividadTableroSerializer(serializers.ModelSerializer):
    organizador = UsuarioMinSerializer(read_only=True)
    organizador_id = serializers.UUIDField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = ActividadTablero
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')

    def create(self, validated_data):
        organizador_id = validated_data.pop('organizador_id', None)
        actividad = ActividadTablero.objects.create(**validated_data)
        if organizador_id:
            try:
                actividad.organizador = Usuario.objects.get(id=organizador_id)
                actividad.save()
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"organizador_id": "El usuario organizador no existe."})
        return actividad

    def update(self, instance, validated_data):
        organizador_id = validated_data.pop('organizador_id', None)
        instance = super().update(instance, validated_data)
        if organizador_id is not None:
            try:
                instance.organizador = Usuario.objects.get(id=organizador_id)
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"organizador_id": "El usuario organizador no existe."})
        elif 'organizador_id' in self.initial_data and self.initial_data['organizador_id'] is None:
            instance.organizador = None
        instance.save()
        return instance


class ActividadInteresadoSerializer(serializers.ModelSerializer):
    actividad = serializers.PrimaryKeyRelatedField(read_only=True) # Muestra el ID de la actividad
    actividad_id = serializers.UUIDField(write_only=True)
    usuario = UsuarioMinSerializer(read_only=True)
    usuario_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = ActividadInteresado
        fields = '__all__'
        read_only_fields = ('id', 'fecha_registro')

    def validate(self, data):
        # Validar la unicidad de actividad_id y usuario_id
        if self.instance is None: # Solo para creación
            actividad_id = data.get('actividad_id')
            usuario_id = data.get('usuario_id')
            if ActividadInteresado.objects.filter(actividad_id=actividad_id, usuario_id=usuario_id).exists():
                raise serializers.ValidationError("Este usuario ya está interesado en esta actividad.")
        return data

    def create(self, validated_data):
        actividad_id = validated_data.pop('actividad_id')
        usuario_id = validated_data.pop('usuario_id')
        try:
            actividad = ActividadTablero.objects.get(id=actividad_id)
            usuario = Usuario.objects.get(id=usuario_id)
        except (ActividadTablero.DoesNotExist, Usuario.DoesNotExist) as e:
            raise serializers.ValidationError({"detail": f"Actividad o Usuario no encontrado: {e}"})
        return ActividadInteresado.objects.create(actividad=actividad, usuario=usuario, **validated_data)

    def update(self, instance, validated_data):
        # Para evitar cambiar el PK, normalmente no permitimos cambiar las FKs que forman unique_together
        # en un update, o se maneja con cuidado. Para este ejemplo, solo actualizaremos si se envía.
        actividad_id = validated_data.pop('actividad_id', None)
        usuario_id = validated_data.pop('usuario_id', None)

        if actividad_id:
            try:
                instance.actividad = ActividadTablero.objects.get(id=actividad_id)
            except ActividadTablero.DoesNotExist:
                raise serializers.ValidationError({"actividad_id": "La actividad especificada no existe."})
        if usuario_id:
            try:
                instance.usuario = Usuario.objects.get(id=usuario_id)
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"usuario_id": "El usuario especificado no existe."})

        return super().update(instance, validated_data)


class ComunicadoOficialSerializer(serializers.ModelSerializer):
    autor = UsuarioMinSerializer(read_only=True)
    autor_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = ComunicadoOficial
        fields = '__all__'
        read_only_fields = ('id', 'fecha_publicacion', 'vistas', 'created_at', 'updated_at')

    def create(self, validated_data):
        autor_id = validated_data.pop('autor_id')
        try:
            autor = Usuario.objects.get(id=autor_id)
        except Usuario.DoesNotExist:
            raise serializers.ValidationError({"autor_id": "El autor especificado no existe."})
        return ComunicadoOficial.objects.create(autor=autor, **validated_data)

    def update(self, instance, validated_data):
        autor_id = validated_data.pop('autor_id', None)
        if autor_id:
            try:
                instance.autor = Usuario.objects.get(id=autor_id)
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"autor_id": "El autor especificado no existe."})
        return super().update(instance, validated_data)


class AdjuntoComunicadoSerializer(serializers.ModelSerializer):
    comunicado = serializers.PrimaryKeyRelatedField(read_only=True)
    comunicado_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = AdjuntoComunicado
        fields = '__all__'
        read_only_fields = ('id', 'created_at')

    def create(self, validated_data):
        comunicado_id = validated_data.pop('comunicado_id')
        try:
            comunicado = ComunicadoOficial.objects.get(id=comunicado_id)
        except ComunicadoOficial.DoesNotExist:
            raise serializers.ValidationError({"comunicado_id": "El comunicado especificado no existe."})
        return AdjuntoComunicado.objects.create(comunicado=comunicado, **validated_data)

    def update(self, instance, validated_data):
        comunicado_id = validated_data.pop('comunicado_id', None)
        if comunicado_id:
            try:
                instance.comunicado = ComunicadoOficial.objects.get(id=comunicado_id)
            except ComunicadoOficial.DoesNotExist:
                raise serializers.ValidationError({"comunicado_id": "El comunicado especificado no existe."})
        return super().update(instance, validated_data)


class LicenciaMedicaSerializer(serializers.ModelSerializer):
    usuario = UsuarioMinSerializer(read_only=True)
    usuario_id = serializers.UUIDField(write_only=True)
    subido_por = UsuarioMinSerializer(read_only=True)
    subido_por_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = LicenciaMedica
        fields = '__all__'
        read_only_fields = ('id', 'fecha_subida', 'dias_licencia', 'created_at', 'updated_at') # dias_licencia se calculará en el modelo o un método save

    def create(self, validated_data):
        usuario_id = validated_data.pop('usuario_id')
        subido_por_id = validated_data.pop('subido_por_id')
        try:
            usuario = Usuario.objects.get(id=usuario_id)
            subido_por = Usuario.objects.get(id=subido_por_id)
        except Usuario.DoesNotExist as e:
            raise serializers.ValidationError({"detail": f"Usuario no encontrado: {e}"})
        
        # Calcular dias_licencia si fechas están presentes
        if 'fecha_inicio' in validated_data and 'fecha_termino' in validated_data and validated_data['fecha_inicio'] and validated_data['fecha_termino']:
            delta = validated_data['fecha_termino'] - validated_data['fecha_inicio']
            validated_data['dias_licencia'] = delta.days + 1
        
        return LicenciaMedica.objects.create(usuario=usuario, subido_por=subido_por, **validated_data)

    def update(self, instance, validated_data):
        usuario_id = validated_data.pop('usuario_id', None)
        subido_por_id = validated_data.pop('subido_por_id', None)

        if usuario_id:
            try:
                instance.usuario = Usuario.objects.get(id=usuario_id)
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"usuario_id": "El usuario especificado no existe."})
        if subido_por_id:
            try:
                instance.subido_por = Usuario.objects.get(id=subido_por_id)
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"subido_por_id": "El usuario que subió la licencia no existe."})
        
        # Recalcular dias_licencia si las fechas se actualizan
        if ('fecha_inicio' in validated_data or 'fecha_termino' in validated_data) and (instance.fecha_inicio and instance.fecha_termino):
            fecha_inicio = validated_data.get('fecha_inicio', instance.fecha_inicio)
            fecha_termino = validated_data.get('fecha_termino', instance.fecha_termino)
            if fecha_inicio and fecha_termino:
                delta = fecha_termino - fecha_inicio
                validated_data['dias_licencia'] = delta.days + 1

        return super().update(instance, validated_data)


class HistorialActividadUsuarioSerializer(serializers.ModelSerializer):
    usuario = UsuarioMinSerializer(read_only=True)
    usuario_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = HistorialActividadUsuario
        fields = '__all__'
        read_only_fields = ('id', 'created_at')

    def create(self, validated_data):
        usuario_id = validated_data.pop('usuario_id')
        try:
            usuario = Usuario.objects.get(id=usuario_id)
        except Usuario.DoesNotExist:
            raise serializers.ValidationError({"usuario_id": "El usuario especificado no existe."})
        return HistorialActividadUsuario.objects.create(usuario=usuario, **validated_data)

    def update(self, instance, validated_data):
        usuario_id = validated_data.pop('usuario_id', None)
        if usuario_id:
            try:
                instance.usuario = Usuario.objects.get(id=usuario_id)
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"usuario_id": "El usuario especificado no existe."})
        return super().update(instance, validated_data)


class DocumentoPersonalSerializer(serializers.ModelSerializer):
    usuario = UsuarioMinSerializer(read_only=True)
    usuario_id = serializers.UUIDField(write_only=True)
    subido_por = UsuarioMinSerializer(read_only=True)
    subido_por_id = serializers.UUIDField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = DocumentoPersonal
        fields = '__all__'
        read_only_fields = ('id', 'fecha_subida', 'created_at')

    def create(self, validated_data):
        usuario_id = validated_data.pop('usuario_id')
        subido_por_id = validated_data.pop('subido_por_id', None)
        try:
            usuario = Usuario.objects.get(id=usuario_id)
        except Usuario.DoesNotExist:
            raise serializers.ValidationError({"usuario_id": "El usuario especificado no existe."})
        
        subido_por = None
        if subido_por_id:
            try:
                subido_por = Usuario.objects.get(id=subido_por_id)
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"subido_por_id": "El usuario que subió el documento no existe."})
        
        return DocumentoPersonal.objects.create(usuario=usuario, subido_por=subido_por, **validated_data)

    def update(self, instance, validated_data):
        usuario_id = validated_data.pop('usuario_id', None)
        subido_por_id = validated_data.pop('subido_por_id', None)

        if usuario_id:
            try:
                instance.usuario = Usuario.objects.get(id=usuario_id)
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"usuario_id": "El usuario especificado no existe."})
        if subido_por_id is not None:
            try:
                instance.subido_por = Usuario.objects.get(id=subido_por_id)
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"subido_por_id": "El usuario que subió el documento no existe."})
        elif 'subido_por_id' in self.initial_data and self.initial_data['subido_por_id'] is None:
            instance.subido_por = None
        
        return super().update(instance, validated_data)


class NotificacionSerializer(serializers.ModelSerializer):
    usuario = UsuarioMinSerializer(read_only=True)
    usuario_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = Notificacion
        fields = '__all__'
        read_only_fields = ('id', 'created_at')

    def create(self, validated_data):
        usuario_id = validated_data.pop('usuario_id')
        try:
            usuario = Usuario.objects.get(id=usuario_id)
        except Usuario.DoesNotExist:
            raise serializers.ValidationError({"usuario_id": "El usuario especificado no existe."})
        return Notificacion.objects.create(usuario=usuario, **validated_data)

    def update(self, instance, validated_data):
        usuario_id = validated_data.pop('usuario_id', None)
        if usuario_id:
            try:
                instance.usuario = Usuario.objects.get(id=usuario_id)
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"usuario_id": "El usuario especificado no existe."})
        return super().update(instance, validated_data)


class FeriadoLegalSerializer(serializers.ModelSerializer):
    usuario = UsuarioMinSerializer(read_only=True)
    usuario_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = FeriadoLegal
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')

    def validate(self, data):
        # Validar la unicidad de usuario_id y periodo_year
        if self.instance is None: # Solo para creación
            usuario_id = data.get('usuario_id')
            periodo_year = data.get('periodo_year')
            if FeriadoLegal.objects.filter(usuario_id=usuario_id, periodo_year=periodo_year).exists():
                raise serializers.ValidationError("Ya existe un registro de feriados para este usuario y año.")
        return data

    def create(self, validated_data):
        usuario_id = validated_data.pop('usuario_id')
        try:
            usuario = Usuario.objects.get(id=usuario_id)
        except Usuario.DoesNotExist:
            raise serializers.ValidationError({"usuario_id": "El usuario especificado no existe."})
        return FeriadoLegal.objects.create(usuario=usuario, **validated_data)

    def update(self, instance, validated_data):
        usuario_id = validated_data.pop('usuario_id', None)
        if usuario_id:
            try:
                instance.usuario = Usuario.objects.get(id=usuario_id)
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"usuario_id": "El usuario especificado no existe."})
        return super().update(instance, validated_data)


class SolicitudFeriadoSerializer(serializers.ModelSerializer):
    usuario = UsuarioMinSerializer(read_only=True)
    usuario_id = serializers.UUIDField(write_only=True)
    aprobado_por = UsuarioMinSerializer(read_only=True)
    aprobado_por_id = serializers.UUIDField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = SolicitudFeriado
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')

    def create(self, validated_data):
        usuario_id = validated_data.pop('usuario_id')
        aprobado_por_id = validated_data.pop('aprobado_por_id', None)
        try:
            usuario = Usuario.objects.get(id=usuario_id)
        except Usuario.DoesNotExist:
            raise serializers.ValidationError({"usuario_id": "El usuario solicitante no existe."})
        
        aprobado_por = None
        if aprobado_por_id:
            try:
                aprobado_por = Usuario.objects.get(id=aprobado_por_id)
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"aprobado_por_id": "El usuario aprobador no existe."})
        
        return SolicitudFeriado.objects.create(usuario=usuario, aprobado_por=aprobado_por, **validated_data)

    def update(self, instance, validated_data):
        usuario_id = validated_data.pop('usuario_id', None)
        aprobado_por_id = validated_data.pop('aprobado_por_id', None)

        if usuario_id:
            try:
                instance.usuario = Usuario.objects.get(id=usuario_id)
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"usuario_id": "El usuario solicitante no existe."})
        if aprobado_por_id is not None:
            try:
                instance.aprobado_por = Usuario.objects.get(id=aprobado_por_id)
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"aprobado_por_id": "El usuario aprobador no existe."})
        elif 'aprobado_por_id' in self.initial_data and self.initial_data['aprobado_por_id'] is None:
            instance.aprobado_por = None
        
        return super().update(instance, validated_data)


class SesionSerializer(serializers.ModelSerializer):
    usuario = UsuarioMinSerializer(read_only=True)
    usuario_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = Sesion
        fields = '__all__'
        read_only_fields = ('id', 'ultima_actividad', 'created_at')

    def create(self, validated_data):
        usuario_id = validated_data.pop('usuario_id')
        try:
            usuario = Usuario.objects.get(id=usuario_id)
        except Usuario.DoesNotExist:
            raise serializers.ValidationError({"usuario_id": "El usuario especificado no existe."})
        return Sesion.objects.create(usuario=usuario, **validated_data)

    def update(self, instance, validated_data):
        usuario_id = validated_data.pop('usuario_id', None)
        if usuario_id:
            try:
                instance.usuario = Usuario.objects.get(id=usuario_id)
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"usuario_id": "El usuario especificado no existe."})
        return super().update(instance, validated_data)


class LogAuditoriaSerializer(serializers.ModelSerializer):
    usuario = UsuarioMinSerializer(read_only=True)
    usuario_id = serializers.UUIDField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = LogAuditoria
        fields = '__all__'
        read_only_fields = ('id', 'created_at')

    def create(self, validated_data):
        usuario_id = validated_data.pop('usuario_id', None)
        usuario_instance = None
        if usuario_id:
            try:
                usuario_instance = Usuario.objects.get(id=usuario_id)
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"usuario_id": "El usuario especificado no existe."})
        return LogAuditoria.objects.create(usuario=usuario_instance, **validated_data)

    def update(self, instance, validated_data):
        usuario_id = validated_data.pop('usuario_id', None)
        if usuario_id is not None:
            try:
                instance.usuario = Usuario.objects.get(id=usuario_id)
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"usuario_id": "El usuario especificado no existe."})
        elif 'usuario_id' in self.initial_data and self.initial_data['usuario_id'] is None:
            instance.usuario = None
        return super().update(instance, validated_data)


class RecursoMultimediaSerializer(serializers.ModelSerializer):
    subido_por = UsuarioMinSerializer(read_only=True)
    subido_por_id = serializers.UUIDField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = RecursoMultimedia
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')

    def create(self, validated_data):
        subido_por_id = validated_data.pop('subido_por_id', None)
        subido_por_instance = None
        if subido_por_id:
            try:
                subido_por_instance = Usuario.objects.get(id=subido_por_id)
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"subido_por_id": "El usuario que subió el recurso no existe."})
        return RecursoMultimedia.objects.create(subido_por=subido_por_instance, **validated_data)

    def update(self, instance, validated_data):
        subido_por_id = validated_data.pop('subido_por_id', None)
        if subido_por_id is not None:
            try:
                instance.subido_por = Usuario.objects.get(id=subido_por_id)
            except Usuario.DoesNotExist:
                raise serializers.ValidationError({"subido_por_id": "El usuario que subió el recurso no existe."})
        elif 'subido_por_id' in self.initial_data and self.initial_data['subido_por_id'] is None:
            instance.subido_por = None
        return super().update(instance, validated_data)