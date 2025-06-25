from flask import Flask, jsonify
from flask_cors import CORS

from upload import upload_bp  # Import the blueprint

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

app.register_blueprint(upload_bp)  # Register the blueprint

@app.route('/')
def hello_world():
    return jsonify(message="Hello, World!")

if __name__ == '__main__':
    app.run(debug=True)