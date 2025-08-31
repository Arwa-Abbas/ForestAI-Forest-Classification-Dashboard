import pandas as pd

def preprocess_input(data):
    """
    Expects a dictionary of input features.
    Returns a DataFrame ready for prediction.
    """
    df = pd.DataFrame([data])

    if "Wilderness_Area" in df.columns:
        df = pd.get_dummies(df, columns=["Wilderness_Area"])
    if "Soil_Type" in df.columns:
        df = pd.get_dummies(df, columns=["Soil_Type"])

    return df
