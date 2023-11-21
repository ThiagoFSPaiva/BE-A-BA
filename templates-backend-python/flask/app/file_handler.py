import datetime
from io import BytesIO
from turtle import pd
import uuid
import boto3
from config import AWS_ACCESS_KEY, AWS_SECRET_KEY,S3_BUCKET_NAME

s3 = boto3.client('s3',
        aws_access_key_id=AWS_ACCESS_KEY, 
        aws_secret_access_key=AWS_SECRET_KEY, 
    )

S3_BUCKET_NAME = S3_BUCKET_NAME
S3_EXPIRES_IN_SECONDS = 100

def get_file_type(filename): 
    return '.' in filename and filename.rsplit('.', 1)[1].lower()

def upload_file_to_s3(file, user_id, category_name):
    stored_file_name = f'{category_name}/{user_id}/{str(uuid.uuid4())}.{get_file_type(file.filename)}'
    s3.upload_fileobj(file, S3_BUCKET_NAME, stored_file_name)
    return stored_file_name


def get_presigned_file_url(stored_file_name, provided_file_name):
    if not stored_file_name or not provided_file_name:
        return
    return s3.generate_presigned_url(
        'get_object',
        Params = {
            'Bucket': S3_BUCKET_NAME,
            'Key': stored_file_name,
            'ResponseContentDisposition': f"attachment; filename = {provided_file_name}"
        },
        ExpiresIn = S3_EXPIRES_IN_SECONDS
    )