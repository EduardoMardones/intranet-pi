#!/usr/bin/env python3
"""
SOLUCIÓN DIRECTA - Ejecutar desde backend_intranet/
python3 fix_db.py
"""

import os
import sys

# Agregar el directorio actual al path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_intranet.settings')

import django
django.setup()

from django.db import connection

print("Reparando base de datos...")

with connection.cursor() as cursor:
    try:
        # Agregar columna tipo
        cursor.execute("""
            ALTER TABLE api_intranet_documento 
            ADD COLUMN IF NOT EXISTS tipo VARCHAR(20);
        """)
        print("✓ Columna 'tipo' agregada")
        
        # Poner valor por defecto
        cursor.execute("""
            UPDATE api_intranet_documento 
            SET tipo = 'otro' 
            WHERE tipo IS NULL;
        """)
        print("✓ Valores por defecto asignados")
        
        # Hacer NOT NULL
        cursor.execute("""
            ALTER TABLE api_intranet_documento 
            ALTER COLUMN tipo SET NOT NULL;
        """)
        print("✓ Columna configurada como NOT NULL")
        
        # Agregar constraint
        cursor.execute("""
            ALTER TABLE api_intranet_documento 
            DROP CONSTRAINT IF EXISTS api_intranet_documento_tipo_check;
        """)
        
        cursor.execute("""
            ALTER TABLE api_intranet_documento 
            ADD CONSTRAINT api_intranet_documento_tipo_check 
            CHECK (tipo IN ('circular', 'protocolo', 'formulario', 'guia', 
                           'reglamento', 'manual', 'informe', 'otro'));
        """)
        print("✓ Constraint agregado")
        
        print("\n✅ BASE DE DATOS REPARADA")
        print("Reinicia el servidor Django")
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        sys.exit(1)