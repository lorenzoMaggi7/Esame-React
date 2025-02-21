import json
from flask import Flask, jsonify, render_template
from flask_cors import CORS
import os


app = Flask(__name__, static_folder="static", template_folder=os.path.dirname(os.path.abspath(__file__)))
CORS(app)

# Percorso del database JSON
db_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), "database.json")

def load_json_db():
    """Carica i dati dal file JSON e gestisce errori di lettura/parsing."""
    try:
        if not os.path.exists(db_file):
            print("⚠️  Errore: Il file database.json non esiste!")
            return None

        with open(db_file, "r", encoding="utf-8") as file:
            database = json.load(file)

        if not isinstance(database, dict):
            print("⚠️  Errore: Il database JSON non è un dizionario valido.")
            return None

        return database
    except json.JSONDecodeError as e:
        print(f"⚠️  Errore nel parsing del database JSON: {e}")
        return None
    except Exception as e:
        print(f"⚠️  Errore nel caricamento del database JSON: {e}")
        return None

@app.route('/', methods=['GET'])
def home():
    return render_template("index.html")

@app.route('/api/<string:table_name>', methods=['GET'])
def get_table(table_name):
    """Restituisce i dati della tabella richiesta se disponibile."""
    try:
        database = load_json_db()
        if database is None:
            return jsonify({"error": "Errore nel caricamento del database"}), 500

        table_name = table_name.lower()
        database_normalized = {k.lower(): v for k, v in database.items()}

        if table_name not in database_normalized:
            return jsonify({"error": f"Tabella '{table_name}' non trovata"}), 404

        return jsonify(database_normalized[table_name])
    except Exception as e:
        print(f"⚠️  Errore generico: {e}")
        return jsonify({"error": f"Errore generico: {str(e)}"}), 500

# Gestione degli errori globali
@app.errorhandler(404)
def not_found_error(error):
    return jsonify({"error": "Risorsa non trovata"}), 404

@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({"error": "Errore interno del server"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5005, debug=True)
