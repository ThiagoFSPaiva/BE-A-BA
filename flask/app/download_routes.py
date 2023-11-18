
from flask import Blueprint, jsonify, request, send_file
import io
import pandas as pd
import xlwt

from .auth import check_token
from .file_handler import get_presigned_file_url
from .models import Template,Upload
from sqlalchemy.orm import joinedload

download_bp = Blueprint('download', __name__)

@download_bp.route('/download_excel/<int:template_id>', methods=['GET'])
def download_excel(template_id):

    template = Template.query.options(joinedload(Template.campos)).filter_by(id=template_id).first()
    if not template:
        return jsonify({'error': 'Template não encontrado'}), 404

    extensao_template = template.extensao
    expected_columns = [campo.name for campo in template.campos]

    df = pd.DataFrame(columns=expected_columns)
    
  
    strIO = io.BytesIO()
    if extensao_template == 'csv':
        df.to_csv(strIO, index=False, sep=';')
        mimetype = 'text/csv'
    elif extensao_template == 'xlsx':
        with pd.ExcelWriter(strIO, engine="xlsxwriter") as excel_writer:
            df.to_excel(excel_writer, sheet_name="sheet1", index=False)
        mimetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    elif extensao_template == 'xls':
        workbook = xlwt.Workbook()
        sheet = workbook.add_sheet('Sheet1')
        for i, col in enumerate(expected_columns):
            sheet.write(0, i, col)
        strIO = io.BytesIO()
        workbook.save(strIO)
        mimetype = 'application/vnd.ms-excel'

    strIO.seek(0)
    file_name = f"{template.name}.{extensao_template}"

    return send_file(
        strIO,
        mimetype=mimetype,
        as_attachment=True,
        download_name=file_name
    )

@download_bp.route('/download', methods=['POST'])
def download_file():
    token = request.headers.get('Authorization')
    if token is None:
        return jsonify({'message': 'Token ausente'}), 401

    decoded_token = check_token(token)
    if decoded_token is None:
        return jsonify({'message': 'Token inválido ou expirado'}), 401


    data = request.get_data(as_text=True)
    upload = Upload.query.filter_by(id=data).first()

    if not upload:
        return jsonify({'error': 'Upload não encontrado'}), 404

    url = get_presigned_file_url(upload.path,upload.nomeArquivo)

    return jsonify({'url': url}), 200