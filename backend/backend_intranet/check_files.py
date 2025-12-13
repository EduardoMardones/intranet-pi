#!/usr/bin/env python3
"""
Script para verificar integridad de archivos en BD
Ejecutar desde: backend/backend_intranet/
"""

import os
import sys
import django

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_intranet.settings')
django.setup()

from api_intranet.models import Documento

print("=== VERIFICACIÓN DE ARCHIVOS EN BD ===\n")

documentos = Documento.objects.all()

if not documentos:
    print("No hay documentos en la base de datos")
else:
    for doc in documentos:
        print(f"Documento: {doc.titulo}")
        print(f"  ID: {doc.id}")
        print(f"  Nombre archivo: {doc.nombre_archivo}")
        print(f"  Extension: {doc.extension}")
        print(f"  MIME type: {doc.mime_type}")
        print(f"  Tamaño esperado: {doc.tamano} bytes")
        
        if doc.archivo_contenido:
            contenido_real = len(bytes(doc.archivo_contenido))
            print(f"  Tamaño real en BD: {contenido_real} bytes")
            
            if contenido_real == doc.tamano:
                print(f"  ✓ Tamaños coinciden")
            else:
                print(f"  ✗ ERROR: Tamaños NO coinciden!")
                print(f"    Diferencia: {abs(contenido_real - doc.tamano)} bytes")
            
            # Verificar primeros bytes
            primeros_bytes = bytes(doc.archivo_contenido)[:20]
            print(f"  Primeros bytes (hex): {primeros_bytes.hex()}")
            
            # Guardar archivo para prueba
            test_file = f"/tmp/test_{doc.nombre_archivo}"
            with open(test_file, 'wb') as f:
                f.write(bytes(doc.archivo_contenido))
            print(f"  Archivo de prueba guardado en: {test_file}")
            
        else:
            print(f"  ✗ ERROR: No hay contenido!")
        
        print()

print("\nPrueba abrir los archivos de /tmp/ para verificar si funcionan")