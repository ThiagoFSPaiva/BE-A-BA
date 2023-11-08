from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/Banco'

    CORS(app)
    db.init_app(app)
    from .routes import bp as main_bp
    app.register_blueprint(main_bp)

    return app

