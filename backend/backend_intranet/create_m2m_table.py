#!/usr/bin/env python3
import os, sys, django
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_intranet.settings')
django.setup()
from django.db import connection

with connection.cursor() as cursor:
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS api_intranet_documento_areas_con_acceso (
            id SERIAL PRIMARY KEY,
            documento_id UUID NOT NULL REFERENCES api_intranet_documento(id) ON DELETE CASCADE,
            area_id UUID NOT NULL REFERENCES api_intranet_area(id) ON DELETE CASCADE,
            UNIQUE(documento_id, area_id)
        );
    """)
    print("✓ Tabla M2M creada")