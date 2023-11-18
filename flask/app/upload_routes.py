import datetime
from flask import Blueprint, jsonify, request
import pandas as pd
from .file_handler import upload_file_to_s3
from .auth import check_token
from .models import *
from sqlalchemy.orm import joinedload
from io import BytesIO
from . import db
from datetime import datetime
import logging
class UploadedFile:
    def __init__(self, file):
        self.file = file

    def read(self):
        return self.file.read()

    def seek(self, position):
        self.file.seek(position)

upload_bp = Blueprint('upload', __name__)

@upload_bp.route('/upload', methods=['POST'])
def upload_file():
    try:
        token = request.headers.get('Authorization')
        template_id = request.form.get('templateId')

        if token is None:
            return jsonify({'error': 'Token ausente'}), 401

        decoded_token = check_token(token)
        if decoded_token is None:
            return jsonify({'error': 'Token inválido ou expirado'}), 401

        if 'file' not in request.files:
            return jsonify({'error': 'Nenhum arquivo enviado'}), 400

        file = request.files['file']

        file_wrapper = UploadedFile(file)

        template = Template.query.options(joinedload(Template.campos)).filter_by(id=template_id).first()
        template_category = db.session.query(Category.name).join(Template).filter(Template.id == template_id).scalar()

        if not template:
            return jsonify({'error': 'Template não encontrado'}), 404

        expected_columns = [campo.name for campo in template.campos]
        expected_types = [campo.tipo for campo in template.campos]

        if not any(file.filename.lower().endswith(ext) for ext in template.extensao.split(',')):
            return jsonify({
                'error': f'Formato de arquivo não condiz com o template. Esperado: {template.extensao}, Recebido: {file.filename}'
            }), 400

        df = None
        if file.filename.endswith(('csv', 'xls', 'xlsx')):
            file_data = file_wrapper.read()
            if file.filename.endswith('csv'):
                df = pd.read_csv(BytesIO(file_data), sep=";")
            elif file.filename.endswith(('xls', 'xlsx')):
                df = pd.read_excel(BytesIO(file_data))

            for column, expected_type in zip(df.columns, expected_types):
                try:
                    df[column] = df[column].astype(expected_type)
                except ValueError:
                    return jsonify({
                        'error': f'O tipo de dados da coluna "{column}" não corresponde ao esperado',
                        'column': column,
                        'expected_type': expected_type,
                        'actual_type': str(df[column].dtype)
                    }), 400

            file_wrapper.seek(0)

        else:
            return jsonify({'error': 'Formato de arquivo não suportado'}), 400

        if len(df.columns) != len(expected_columns):
            return jsonify({'error': 'Número de colunas não corresponde ao esperado'}), 400

        for column in expected_columns:
            if column not in df.columns:
                return jsonify({'error': f'O nome da coluna "{column}" não está presente no arquivo'}), 400

        for column, col_type in zip(df.columns, df.dtypes):
            expected_type = expected_types[df.columns.get_loc(column)]
            if str(col_type) != expected_type:
                return jsonify({
                    'error': f'O tipo de dados da coluna "{column}" não corresponde ao esperado',
                    'column': column,
                    'expected_type': expected_type,
                    'actual_type': str(col_type)
                }), 400

        path = upload_file_to_s3(file, decoded_token['id'], template_category)

        new_upload = Upload(
            user_id=decoded_token['id'],
            template_id=template_id,
            nomeArquivo=file.filename,
            path=path,
            created_at=datetime.now()
        )

        db.session.add(new_upload)
        db.session.commit()

        return jsonify({
            'message': 'Arquivo enviado com sucesso',
            'file_path': path,
            'extensao_template': template.extensao
        }), 200

    except Exception as e:
        logging.error(f'Ocorreu uma exceção: {str(e)}')
        return jsonify({'error': 'Ocorreu um erro interno'}), 500

@upload_bp.route('/getAllUploads', methods=['GET'])
def getAllUploads():
    token = request.headers.get('Authorization')

    if token is None:
        return jsonify({'message': 'Token ausente'}), 401

    decoded_token = check_token(token)
    if decoded_token is None:
        return jsonify({'message': 'Token inválido ou expirado'}), 401


    user = User.query.filter_by(id=decoded_token['id'], typeUser='admin').first()

    if not user:
        return jsonify({'error': 'Permissão negada'}), 403
    

    results = (
        db.session.query(
            Upload, Template.name.label('template_name'), 
            User.name.label('user_name'), 
            User.matricula.label('matricula'),
            Template.extensao)
        .join(Template, Upload.template_id == Template.id)
        .join(User, Upload.user_id == User.id)
        .order_by(Upload.id.desc())
        .all()
    )

    formatted_results = []

    for upload, template_name, user_name, matricula, extensao in results:
        formatted_results.append({
            'id': upload.id,
            'nomeArquivo': upload.nomeArquivo,
            'created_at': upload.created_at.strftime("%d/%m/%Y %H:%M"),
            'template_name': template_name,
            'extensao' : extensao,
            'matricula' : matricula,
            'user_name': f"{user_name.split()[0]} {user_name.split()[-1]}" if ' ' in user_name else user_name
        })

    return jsonify(formatted_results)