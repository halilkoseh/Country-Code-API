from flask import Flask, jsonify, request, render_template
import json

app = Flask(__name__)

# JSON dosyasını yükleyin
with open('CountryCodes.json', 'r', encoding='utf-8') as file:
    countries = json.load(file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/countries', methods=['GET'])
def get_countries():
    return jsonify(countries)

@app.route('/countries/code/<code>', methods=['GET'])
def get_country_by_code(code):
    country = next((item for item in countries if item["code"] == code.upper()), None)
    if country:
        return jsonify(country)
    else:
        return jsonify({"error": "Country not found"}), 404

@app.route('/countries/name/<name>', methods=['GET'])
def get_country_by_name(name):
    country = next((item for item in countries if item["name"].lower() == name.lower()), None)
    if country:
        return jsonify(country)
    else:
        return jsonify({"error": "Country not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)