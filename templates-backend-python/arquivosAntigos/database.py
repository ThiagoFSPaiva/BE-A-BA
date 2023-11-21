# database.py
# Coloque sua lógica de banco de dados aqui

import psycopg2
from psycopg2 import extras

DB_CONFIG = {
    'dbname': "Banco",
    'user': "postgres",
    'password': "postgres",
    'host': "localhost"
}

def get_connection():
    return psycopg2.connect(**DB_CONFIG)