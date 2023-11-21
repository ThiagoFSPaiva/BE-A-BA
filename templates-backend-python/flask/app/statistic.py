from datetime import timedelta, datetime
from flask import Blueprint, jsonify
from sqlalchemy import func, and_
from .models import *
from . import db

statistic_bp = Blueprint('statistic', __name__)

@statistic_bp.route('/consulta_dados/<int:dias>', methods=['GET'])
def consulta_dados(dias):

    try:
        data_7_dias_atras = datetime.utcnow() - timedelta(days=dias)

        results = (
            db.session.query(
                func.count().label('quantidade'),
                Template.extensao,
                func.to_char(Template.created_at, 'DD/MM').label('dia_mes')
            )
            .filter(
                and_(
                    Template.extensao.in_(['xls', 'xlsx', 'csv']),
                    Template.created_at >= data_7_dias_atras
                )
            )
            .group_by(Template.extensao, 'dia_mes')
            .order_by('dia_mes')
            .all()
        )

        data = [{'quantidade': row.quantidade, 'extensao': row.extensao, 'dia_mes': row.dia_mes} for row in results]

        return jsonify(data)

    except Exception as e:
        return jsonify({'error': str(e)})
    



def formatar_numero(numero):
    if numero < 1000:
        return str(numero)
    elif 1000 <= numero < 1000000:
        return f"{round(numero/1000, 1)}k"
    else:
        return f"{round(numero/1000000, 1)}kk"

@statistic_bp.route('/totals', methods=['GET'])
def get_totals():
    total_users = User.query.count()
    total_uploads = Upload.query.count()
    total_templates = Template.query.count()

    response = {
        'total_users': formatar_numero(total_users),
        'total_uploads': formatar_numero(total_uploads),
        'total_templates': formatar_numero(total_templates)
    }

    return jsonify(response)