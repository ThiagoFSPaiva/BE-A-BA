from . import db

class Template(db.Model):
    __tablename__ = 'template'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    extensao = db.Column(db.String(10))
    campos = db.relationship('Campo', backref='template', lazy=True)

class Campo(db.Model):
    __tablename__ = 'campo'
    id = db.Column(db.Integer, primary_key=True)
    template_id = db.Column(db.Integer, db.ForeignKey('template.id'), nullable=False)
    name = db.Column(db.String(255))
    tipo = db.Column(db.String(100))

class Upload(db.Model):
    __tablename__ = 'upload'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    template_id = db.Column(db.Integer)
    nomeArquivo = db.Column(db.String)
    path = db.Column(db.String)
    created_at = db.Column(db.DateTime)

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    matricula = db.Column(db.String)
    created_at = db.Column(db.DateTime)