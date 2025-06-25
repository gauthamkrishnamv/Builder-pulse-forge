import os
import json
from flask import Blueprint, request, jsonify, send_from_directory

upload_bp = Blueprint('upload', __name__)

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '..', 'uploads')
METADATA_FILE = os.path.join(UPLOAD_FOLDER, 'metadata.json')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def save_metadata(entry):
    # Load existing metadata
    if os.path.exists(METADATA_FILE):
        with open(METADATA_FILE, 'r') as f:
            data = json.load(f)
    else:
        data = []
    data.append(entry)
    with open(METADATA_FILE, 'w') as f:
        json.dump(data, f)

@upload_bp.route('/upload', methods=['POST'])
def upload_video():
    if 'video' not in request.files:
        return jsonify({'error': 'No video part'}), 400
    file = request.files['video']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    title = request.form.get('title', '')
    description = request.form.get('description', '')

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    # Save metadata
    entry = {
        'filename': file.filename,
        'title': title,
        'description': description
    }
    save_metadata(entry)

    return jsonify({
        'message': 'Video uploaded successfully',
        **entry
    })

@upload_bp.route('/videos', methods=['GET'])
def list_videos():
    if os.path.exists(METADATA_FILE):
        with open(METADATA_FILE, 'r') as f:
            data = json.load(f)
    else:
        data = []
    return jsonify(data)

@upload_bp.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

import glob

@upload_bp.route('/delete_all', methods=['POST'])
def delete_all_videos():
    # Delete all video files (adjust the extension as needed)
    video_files = glob.glob(os.path.join(UPLOAD_FOLDER, '*'))
    for f in video_files:
        if os.path.isfile(f):
            os.remove(f)
    # Delete metadata file
    if os.path.exists(METADATA_FILE):
        os.remove(METADATA_FILE)
    return jsonify({'message': 'All videos and metadata deleted.'})