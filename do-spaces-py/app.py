from flask import Flask, request
import s3
import os

app = Flask(__name__)

@app.route('/upload-song-spaces', methods=['POST'])
def upload_song():
    req = request.json  
    endpoint = req['endpoint']
    spaces_key = req['spaces_key']
    spaces_secret = req['spaces_secret']
    client = s3.create_client(endpoint, spaces_key, spaces_secret)
    bucket_name = req['bucket_name']
    file_name = req['file_name']
    file_bytes = req['file_bytes']
    
    metadata = {}
    
    s3.upload_file_to_bucket(client, bucket_name, file_name, file_bytes, 
                             metadata)

    
    return req['file_name']

@app.route('/download-song-from-spaces', methods=['POST'])
def download_song():
    req = request.json  
    endpoint = req['endpoint']
    spaces_key = req['spaces_key']
    spaces_secret = req['spaces_secret']
    client = s3.create_client(endpoint, spaces_key, spaces_secret)
    bucket_name = 'songs'
    file_name = req['file_name']
    
    metadata = {}
    file = s3.download_file_from_bucket(client, bucket_name, file_name, 
                                        metadata)
    
    return file

@app.route('/get-presigned-link-for-download', methods=['POST'])
def get_presigned_download_link():
    print("hello")
    print(request)
    try: 
        req = request.json  
    except Exception as e:
        print(e)
        req = request.get_json()

    print(req)
    endpoint = req['endpoint']
    spaces_key = req['content']['spaces_api_key']
    spaces_secret = req['content']['spaces_secret_key']
    client = s3.create_client(endpoint, spaces_key, spaces_secret)
    bucket_name = req['content']['bucket_name'] 
    file_name = req['content']['filename']
    
    
    url = s3.get_presigned_url_for_file_download(client, bucket_name, file_name) 

    return url                                

@app.route('/get-presigned-link-for-upload', methods=['POST'])
def get_presigned_upload_link():
    req = request.json  
    endpoint = req['endpoint']
    spaces_key = req['spaces_key']
    spaces_secret = req['spaces_secret']
    client = s3.create_client(endpoint, spaces_key, spaces_secret)
    bucket_name = req['bucket_name']
    file_name = req['file_name']
    
    
    url = s3.get_presigned_url_for_file_upload(client, bucket_name, file_name) 

    return url 

if __name__ == '__main__':
    app.run(port=4030)