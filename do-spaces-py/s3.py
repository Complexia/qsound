import os
import boto3
import botocore

def create_client(endpoint):
    session = boto3.session.Session()
    client = session.client('s3', 
                            config=botocore.config.Config(s3={'addressing_style': 'virtual'}), 
                            region_name='syd1',
                            endpoint_url=endpoint,
                            aws_access_key_id=os.getenv('SPACES_KEY'),
                            aws_secret_access_key=os.getenv('SPACES_SECRET'))
    return client


def create_bucket(bucket_name, client):
    client.create_bucket(Bucket=bucket_name)
    return bucket_name



def list_all_buckets(client):
    response = client.list_buckets()
    return response

def list_all_files_in_bucket(client, bucket_name):
    response = client.list_objects(Bucket=bucket_name)
    return response

def upload_file_to_bucket(client, bucket_name, file_name, file_bytes, metadata):
    client.put_object(Bucket=bucket_name,
                  Key=file_name,
                  Body=file_bytes,
                  ACL='private',
                  Metadata=metadata,
                )
    return file_name
    
def download_file_from_bucket(client, bucket_name, file_name):
    local_file_path = "/tmp/%s" % file_name
    client.download_file(bucket_name,
                        file_name,
                        local_file_path)
    return local_file_path
    

def get_presigned_url_for_file_download(client, bucket_name, file_name):
    url = client.generate_presigned_url(ClientMethod='get_object',
                                    Params={'Bucket': bucket_name,
                                            'Key': file_name},
                                    ExpiresIn=1000)

    return url

def get_presigned_url_for_file_upload(client, bucket_name, file_name):
    url = client.generate_presigned_url(ClientMethod='put_object',
                                    Params={'Bucket': bucket_name,
                                            'Key': file_name},
                                    ExpiresIn=1000)

    return url

def delete_file_from_bucket(client, bucket_name, file_name):
    client.delete_object(Bucket=bucket_name,
                        Key=file_name) 
    
    return '200'