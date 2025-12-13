#!/usr/bin/env python3
import os, sys, django
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_intranet.settings')
django.setup()
from django.db import connection

with connection.cursor() as cursor:
    cursor.execute("ALTER TABLE api_intranet_documento ALTER COLUMN tipo_archivo DROP NOT NULL;")
    print("✓ tipo_archivo ahora permite NULL")