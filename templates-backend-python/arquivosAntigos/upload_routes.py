# # upload_handler.py
# # Blueprint e lógica de upload
# import os
# import psycopg2
# from psycopg2 import extras
# from flask import Blueprint, request,send_from_directory, jsonify, send_file
# from datetime import datetime

# from app.database import get_connection
# from .auth import check_token
# from .file_handler import create_user_directory, save_file
# from .template_handler import validate_file_with_template

# upload_bp = Blueprint('upload', __name__)



# def store_file_info_in_db(user_id, template_id, file_name, file_path):
#     try:
#         connection = get_connection()

#         cursor = connection.cursor()

#         insert_query = """INSERT INTO upload (user_id, template_id, "nomeArquivo", path, created_at) 
#                           VALUES (%s, %s, %s, %s, current_timestamp);"""

#         cursor.execute(insert_query, (user_id, template_id, file_name, file_path))
#         connection.commit()

#     except (Exception, psycopg2.Error) as error:
#         print("Erro ao inserir os dados no PostgreSQL", error)
#     finally:
#         if connection: 
#             cursor.close()
#             connection.close()
#             print("Conexão ao PostgreSQL fechada")


# @upload_bp.route('/upload', methods=['POST'])
# def uploadFile():
#     try:
#         token = request.headers.get('Authorization')
#         if token is None:
#             return jsonify({'message': 'Token ausente'}), 401

#         decoded_token = check_token(token)
#         if decoded_token is None:
#             return jsonify({'message': 'Token inválido ou expirado'}), 401

#         if 'file' not in request.files:
#             return jsonify({'error': 'Nenhum arquivo enviado'}), 400

#         file = request.files['file']
#         template_id = request.form.get('templateId')

#         user_directory = create_user_directory(decoded_token)
#         file_path = save_file(file, user_directory)

#         is_valid, error = validate_file_with_template(file, template_id)

#         if not is_valid:
#             os.remove(file_path)
#             return jsonify({'error': error}), 400


#         user_id = decoded_token.get('id') 
#         print(user_id)
#         store_file_info_in_db(user_id, template_id, file.filename, file_path)    

#         return jsonify({'message': 'Arquivo enviado com sucesso', 'file_path': file_path}), 200

#     except Exception as e:
#         return jsonify({'message': f'Ocorreu um erro: {e}'}), 500
    
# def get_all_files_from_database():
#     try:
#         connection = psycopg2.connect(
#             dbname="Banco",
#             user="postgres",
#             password="postgres",
#             host="localhost",
#             port=5432
#         )

#         cursor = connection.cursor()

#         select_query = "SELECT * FROM upload;"
#         cursor.execute(select_query)
#         files = []
#         files = cursor.fetchall()
#         print(files)

#         return files

#     except (Exception, psycopg2.Error) as error:
#         print("Erro ao consultar o banco de dados", error)
#         return None
#     finally:
#         if connection:
#             cursor.close()
#             connection.close()
#             print("Conexão ao PostgreSQL fechada")



# def get_file_path_from_database(file_id):
#     connection = None  # Inicialize a variável connection

#     try:
#         connection = psycopg2.connect(
#             dbname="Banco",
#             user="postgres",
#             password="postgres",
#             host="localhost",
#             port=5432
#         )

#         cursor = connection.cursor()

#         select_query = "SELECT path FROM upload WHERE id = %s;"
#         cursor.execute(select_query, (file_id,))
#         file_path = cursor.fetchone()[0] if cursor.rowcount > 0 else None

#         return file_path

#     except (Exception, psycopg2.Error) as error:
#         print("Erro ao consultar o banco de dados", error)
#         return None
#     finally:
#         if connection is not None:
#             cursor.close()
#             connection.close()
#             print("Conexão ao PostgreSQL fechada")

# def get_all_files_from_database():
#     connection = None  # Inicialize a variável connection

#     try:
#         connection = psycopg2.connect(
#             dbname="Banco",
#             user="postgres",
#             password="postgres",
#             host="localhost",
#             port=5432
#         )

#         cursor = connection.cursor()

#         select_query = "SELECT * FROM upload;"
#         cursor.execute(select_query)
#         files = []
#         files = cursor.fetchall()


#         return files

#     except (Exception, psycopg2.Error) as error:
#         print("Erro ao consultar o banco de dados", error)
#         return None
#     finally:
#         if connection is not None:
#             cursor.close()
#             connection.close()
#             print("Conexão ao PostgreSQL fechada")

# @upload_bp.route('/downloadFile', methods=['GET'])
# def downloadFile():
#     try:
#         file_id = request.args.get('file_id')
#         file_path = get_file_path_from_database(file_id)
#         print(file_path)
#         print(file_id)
#         if file_path is not None and os.path.isfile(file_path):
#             return send_from_directory(file_path, as_attachment=True)

#         return jsonify({'message': 'Arquivo não encontrado'}), 404

#     except Exception as e:
#         return jsonify({'message': f'Ocorreu um erro: {e}'}), 500

# @upload_bp.route('/files', methods=['GET'])
# def get_files():
#     try:
#         files = get_all_files_from_database()

#         if files:
#             return jsonify(files)

#         return jsonify({'message': 'Nenhum arquivo encontrado'}), 404

#     except Exception as e:
#         return jsonify({'message': f'Ocorreu um erro: {e}'}), 500
