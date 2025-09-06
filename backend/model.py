import joblib
from utils import preprocess_input

def load_model(path="forest_model.pkl"):
    """
    Load trained model from .pkl file
    """
    return joblib.load(path)

def predict(model, data):
    """
    Predict forest cover type from input dictionary.
    Returns:
        predicted_class (int)
        probabilities (list of floats)
    """
    df = preprocess_input(data)

    prediction = model.predict(df)[0]
    probabilities = model.predict_proba(df)[0]

    predicted_class = int(prediction + 1)
    return predicted_class, probabilities.tolist()

def get_feature_importance(model):
    """
    Return feature importance as dictionary
    """
    return {f"feature_{i}": float(imp) for i, imp in enumerate(model.feature_importances_)}
