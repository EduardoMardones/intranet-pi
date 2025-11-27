# ======================================================
# PDF GENERATOR - Generación de PDFs para Solicitudes
# Ubicación: api_intranet/pdf_generator.py
# ======================================================

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from io import BytesIO
from datetime import datetime
import os


class SolicitudPDFGenerator:
    """
    Generador de PDFs para solicitudes de vacaciones y días administrativos aprobadas.
    """
    
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self._setup_custom_styles()
    
    def _setup_custom_styles(self):
        """Configurar estilos personalizados"""
        # Estilo para el título principal
        self.styles.add(ParagraphStyle(
            name='CustomTitle',
            parent=self.styles['Title'],
            fontSize=18,
            textColor=colors.HexColor('#1e40af'),
            spaceAfter=12,
            alignment=TA_CENTER,
            fontName='Helvetica-Bold'
        ))
        
        # Estilo para subtítulos
        self.styles.add(ParagraphStyle(
            name='CustomHeading',
            parent=self.styles['Heading2'],
            fontSize=14,
            textColor=colors.HexColor('#1e40af'),
            spaceAfter=8,
            spaceBefore=12,
            fontName='Helvetica-Bold'
        ))
        
        # Estilo para texto normal
        self.styles.add(ParagraphStyle(
            name='CustomBody',
            parent=self.styles['Normal'],
            fontSize=11,
            textColor=colors.black,
            alignment=TA_JUSTIFY,
            spaceAfter=6
        ))
        
        # Estilo para texto pequeño
        self.styles.add(ParagraphStyle(
            name='CustomSmall',
            parent=self.styles['Normal'],
            fontSize=9,
            textColor=colors.HexColor('#4b5563'),
            alignment=TA_LEFT
        ))
    
    def _format_rut(self, rut):
        """Formatea el RUT para mostrarlo correctamente"""
        return rut
    
    def _format_date(self, date):
        """Formatea una fecha al formato DD/MM/YYYY"""
        if isinstance(date, str):
            date = datetime.fromisoformat(date.replace('Z', '+00:00'))
        return date.strftime('%d/%m/%Y')
    
    def _format_datetime(self, dt):
        """Formatea un datetime al formato DD/MM/YYYY HH:MM"""
        if isinstance(dt, str):
            dt = datetime.fromisoformat(dt.replace('Z', '+00:00'))
        return dt.strftime('%d/%m/%Y %H:%M')
    
    def generate_solicitud_pdf(self, solicitud):
        """
        Genera un PDF para una solicitud aprobada.
        
        Args:
            solicitud: Instancia del modelo Solicitud
            
        Returns:
            BytesIO: Buffer con el contenido del PDF
        """
        buffer = BytesIO()
        
        # Crear documento
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=72,
            leftMargin=72,
            topMargin=72,
            bottomMargin=72,
        )
        
        # Contenedor para los elementos del PDF
        story = []
        
        # HEADER / TÍTULO
        story.append(Paragraph(
            "SOLICITUD DE " + ("VACACIONES" if solicitud.tipo == 'vacaciones' else "DÍA ADMINISTRATIVO"),
            self.styles['CustomTitle']
        ))
        story.append(Spacer(1, 0.2*inch))
        
        # INFORMACIÓN DEL DOCUMENTO
        info_doc = [
            ['Número de Solicitud:', solicitud.numero_solicitud],
            ['Estado:', 'APROBADA'],
            ['Fecha de Solicitud:', self._format_datetime(solicitud.fecha_solicitud)],
        ]
        
        info_table = Table(info_doc, colWidths=[2.5*inch, 3.5*inch])
        info_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#e5e7eb')),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#d1d5db')),
        ]))
        story.append(info_table)
        story.append(Spacer(1, 0.3*inch))
        
        # DATOS DEL SOLICITANTE
        story.append(Paragraph("DATOS DEL SOLICITANTE", self.styles['CustomHeading']))
        
        datos_solicitante = [
            ['Nombre Completo:', solicitud.usuario.get_nombre_completo()],
            ['RUT:', self._format_rut(solicitud.usuario.rut)],
            ['Cargo:', solicitud.usuario.cargo],
            ['Área:', solicitud.usuario.area.nombre],
            ['Email:', solicitud.usuario.email],
            ['Teléfono de Contacto:', solicitud.telefono_contacto],
        ]
        
        solicitante_table = Table(datos_solicitante, colWidths=[2.5*inch, 3.5*inch])
        solicitante_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#eff6ff')),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#bfdbfe')),
        ]))
        story.append(solicitante_table)
        story.append(Spacer(1, 0.3*inch))
        
        # DETALLE DE LA SOLICITUD
        story.append(Paragraph("DETALLE DE LA SOLICITUD", self.styles['CustomHeading']))
        
        tipo_texto = "Vacaciones" if solicitud.tipo == 'vacaciones' else "Día Administrativo"
        
        detalle_solicitud = [
            ['Tipo:', tipo_texto],
            ['Fecha de Inicio:', self._format_date(solicitud.fecha_inicio)],
            ['Fecha de Término:', self._format_date(solicitud.fecha_termino)],
            ['Cantidad de Días:', str(solicitud.cantidad_dias)],
        ]
        
        detalle_table = Table(detalle_solicitud, colWidths=[2.5*inch, 3.5*inch])
        detalle_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#f0fdf4')),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#bbf7d0')),
        ]))
        story.append(detalle_table)
        story.append(Spacer(1, 0.2*inch))
        
        # MOTIVO
        if solicitud.motivo:
            story.append(Paragraph("Motivo:", self.styles['CustomBody']))
            story.append(Paragraph(solicitud.motivo, self.styles['CustomBody']))
            story.append(Spacer(1, 0.3*inch))
        
        # APROBACIONES
        story.append(Paragraph("APROBACIONES", self.styles['CustomHeading']))
        
        # Aprobación Jefatura
        if solicitud.jefatura_aprobador:
            story.append(Paragraph("Aprobación de Jefatura:", self.styles['CustomBody']))
            
            aprobacion_jefatura = [
                ['Nombre:', solicitud.jefatura_aprobador.get_nombre_completo()],
                ['RUT:', self._format_rut(solicitud.jefatura_aprobador.rut)],
                ['Cargo:', solicitud.jefatura_aprobador.cargo],
                ['Área:', solicitud.jefatura_aprobador.area.nombre],
                ['Fecha de Aprobación:', self._format_datetime(solicitud.fecha_aprobacion_jefatura)],
            ]
            
            if solicitud.comentarios_jefatura:
                aprobacion_jefatura.append(['Comentarios:', solicitud.comentarios_jefatura])
            
            jefatura_table = Table(aprobacion_jefatura, colWidths=[2.5*inch, 3.5*inch])
            jefatura_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#fef3c7')),
                ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
                ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, -1), 10),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
                ('TOPPADDING', (0, 0), (-1, -1), 8),
                ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#fde68a')),
                ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ]))
            story.append(jefatura_table)
            story.append(Spacer(1, 0.2*inch))
        
        # Aprobación Dirección/Subdirección
        if solicitud.direccion_aprobador:
            story.append(Paragraph("Aprobación de Dirección/Subdirección:", self.styles['CustomBody']))
            
            aprobacion_direccion = [
                ['Nombre:', solicitud.direccion_aprobador.get_nombre_completo()],
                ['RUT:', self._format_rut(solicitud.direccion_aprobador.rut)],
                ['Cargo:', solicitud.direccion_aprobador.cargo],
                ['Área:', solicitud.direccion_aprobador.area.nombre],
                ['Fecha de Aprobación:', self._format_datetime(solicitud.fecha_aprobacion_direccion)],
            ]
            
            if solicitud.comentarios_direccion:
                aprobacion_direccion.append(['Comentarios:', solicitud.comentarios_direccion])
            
            direccion_table = Table(aprobacion_direccion, colWidths=[2.5*inch, 3.5*inch])
            direccion_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#d1fae5')),
                ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
                ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, -1), 10),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
                ('TOPPADDING', (0, 0), (-1, -1), 8),
                ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#a7f3d0')),
                ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ]))
            story.append(direccion_table)
            story.append(Spacer(1, 0.3*inch))
        
        # PIE DE PÁGINA
        story.append(Spacer(1, 0.5*inch))
        story.append(Paragraph(
            f"Documento generado el {datetime.now().strftime('%d/%m/%Y a las %H:%M')}",
            self.styles['CustomSmall']
        ))
        story.append(Paragraph(
            "Este documento es una constancia oficial de la aprobación de la solicitud.",
            self.styles['CustomSmall']
        ))
        
        # Construir el PDF
        doc.build(story)
        
        # Resetear el buffer para lectura
        buffer.seek(0)
        return buffer


# Función helper para uso directo
def generar_pdf_solicitud(solicitud):
    """
    Genera un PDF para una solicitud aprobada.
    
    Args:
        solicitud: Instancia del modelo Solicitud
        
    Returns:
        BytesIO: Buffer con el contenido del PDF
    """
    generator = SolicitudPDFGenerator()
    return generator.generate_solicitud_pdf(solicitud)