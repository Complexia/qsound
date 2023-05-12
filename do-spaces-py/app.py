from flask import Flask, request
import s3
import os

app = Flask(__name__)

@app.route('/upload-song-spaces', methods=['POST'])
def upload_song():
    req = request.json  
    endpoint = os.getenv('SPACES_ENDPOINT')
    client = s3.create_client(endpoint)
    bucket_name = 'songs'
    file_name = req['file_name']
    file_bytes = req['file_bytes']
    metadata = {}
    s3.upload_file_to_bucket(client, bucket_name, file_name, file_bytes, metadata)
    
    return req['file_name']

@app.route('/download-song-from-spaces', methods=['POST'])
def download_song():
    req = request.json  
    endpoint = os.getenv('SPACES_ENDPOINT')
    client = s3.create_client(endpoint)
    bucket_name = 'songs'
    file_name = req['file_name']
    file_bytes = req['file_bytes']
    metadata = {}
    file = s3.download_file_from_bucket(client, bucket_name, file_name)
    
    return file

if __name__ == '__main__':
    app.run(port=4030)