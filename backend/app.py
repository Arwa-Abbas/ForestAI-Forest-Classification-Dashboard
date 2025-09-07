from flask import Flask, request, jsonify
from flask_cors import CORS
from model import load_model, predict, get_feature_importance

app = Flask(__name__)
CORS(app) 

model = load_model("forest_model.pkl")


@app.route('/')
def home():
    return "Forest Cover Prediction API is running!"


@app.route('/predict', methods=['POST'])
def make_prediction():
    """
    Expects JSON data like:
    {
        "Elevation": 2596,
        "Aspect": 45,
        "Slope": 8,
        ...
        "Soil_Type40": 0
    }
    """
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No input data provided"}), 400

        predicted_class, probabilities = predict(model, data)
        return jsonify({
            "predicted_cover_type": predicted_class,
            "probabilities": probabilities
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/feature_importance', methods=['GET'])
def feature_importance():
    """
    Returns feature importance for the trained model
    """
    try:
        importance = get_feature_importance(model)
        return jsonify(importance)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
