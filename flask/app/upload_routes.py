import datetime
from flask import Blueprint, jsonify, request
import pandas as pd
from .file_handler import upload_file_to_s3
from .auth import check_token
from .models import Template,Upload,User
from sqlalchemy.orm import joinedload
from io import BytesIO
from . import db
from datetime import datetime

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
    token = request.headers.get('Authorization')
    template_id = request.form.get('templateId')

    if token is None:
        return jsonify({'message': 'Token ausente'}), 401

    decoded_token = check_token(token)
    if decoded_token is None:
        return jsonify({'message': 'Token inválido ou expirado'}), 401

    if 'file' not in request.files:
        return jsonify({'error': 'Nenhum arquivo enviado'}), 400

    file = request.files['file']

    file_wrapper = UploadedFile(file)

    template = Template.query.options(joinedload(Template.campos)).filter_by(id=template_id).first()
    if not template:
        return jsonify({'error': 'Template não encontrado'}), 404

    extensao_template = template.extensao
    expected_columns = [campo.name for campo in template.campos]
    expected_types = [campo.tipo for campo in template.campos]

    if not file.filename.endswith(extensao_template):
        return jsonify({'error': 'Formato de arquivo não condiz com o template'}), 400

    df = None
    if file.filename.endswith('csv'):
        file_data = file_wrapper.read()
        df = pd.read_csv(BytesIO(file_data), sep=";")
        file_wrapper.seek(0)  # redefine a posição do cursor para o início do arquivo
    elif file.filename.endswith('xls') or file.filename.endswith('xlsx'):
        file_data = file_wrapper.read()
        df = pd.read_excel(BytesIO(file_data))
        file_wrapper.seek(0)
        
    else:
        return jsonify({'error': 'Formato de arquivo não suportado'}), 400
    
    if len(df.columns) != len(expected_columns):
        return jsonify({'error': 'Número de colunas não corresponde ao esperado'}), 400

    for column in expected_columns:
        if column not in df.columns:
            return jsonify({'error': f'O nome da coluna "{column}" não está presente no arquivo'}), 400

    for column, col_type in zip(df.columns, df.dtypes):
        if str(col_type) != expected_types[df.columns.get_loc(column)]:
            return jsonify({'error': f'O tipo de dados da coluna "{column}" não corresponde ao esperado'}), 400
        

    path = upload_file_to_s3(file,file.filename,decoded_token['id'])

    new_upload = Upload(
        user_id=decoded_token['id'],
        template_id=template_id,
        nomeArquivo=file.filename,
        path= path,
        created_at=datetime.now()
    )

    db.session.add(new_upload)
    db.session.commit()


    return jsonify({'message': 'Arquivo enviado com sucesso', 'file_path': path, 'extensao_template': extensao_template}), 200

@upload_bp.route('/getAllUploads', methods=['GET'])
def getAllUploads():
    token = request.headers.get('Authorization')

    if token is None:
        return jsonify({'message': 'Token ausente'}), 401

    decoded_token = check_token(token)
    if decoded_token is None:
        return jsonify({'message': 'Token inválido ou expirado'}), 401


    user = User.query.filter_by(id=decoded_token['id'], is_admin=True).first()

    if not user:
        return jsonify({'error': 'Permissão negada'}), 403
    

    results = (
        db.session.query(Upload, Template.name.label('template_name'), User.name.label('user_name'), User.matricula.label('matricula'),Template.extensao)
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
            'user_name': user_name
        })

    return jsonify(formatted_results)