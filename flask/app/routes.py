from flask import Blueprint

bp = Blueprint('main', __name__)

from .upload_routes import upload_bp
from .download_routes import download_bp

bp.register_blueprint(upload_bp)
bp.register_blueprint(download_bp)
