import pandas as pd
from xgboost import XGBClassifier
import joblib
import os
import requests
from utils import preprocess_input

# Column names for the dataset
column_names = [
    "Elevation","Aspect","Slope","Horizontal_Distance_To_Hydrology",
    "Vertical_Distance_To_Hydrology","Horizontal_Distance_To_Roadways",
    "Hillshade_9am","Hillshade_Noon","Hillshade_3pm",
    "Horizontal_Distance_To_Fire_Points"
]

for i in range(1,5):
    column_names.append(f"Wilderness_Area{i}")

for i in range(1,41):
    column_names.append(f"Soil_Type{i}")

column_names.append("Cover_Type")


def download_dataset(file_id, save_path="covertype/covtype.data"):
    """
    Downloads dataset from Google Drive if it doesn't exist locally
    """
    if not os.path.exists(save_path):
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        url = f"https://drive.google.com/uc?export=download&id={file_id}"
        print(f"Downloading dataset from Google Drive to {save_path} ...")
        r = requests.get(url)
        with open(save_path, "wb") as f:
            f.write(r.content)
        print("Download complete.")


def train_and_save_model(dataset_path="covtype.data", save_path="forest_model.pkl"):
    """
    Train XGBoost on Covertype dataset (.data file) and save as forest_model.pkl
    """
    
    file_id = "11ickN1DLJX6N43YKsnTprOwaSKVwvFHP"  # Your Google Drive file ID
    download_dataset(file_id, dataset_path)

    # Load dataset
    df = pd.read_csv(dataset_path, header=None, names=column_names)

    X = df.drop("Cover_Type", axis=1)
    y = df["Cover_Type"] - 1  

    model = XGBClassifier(objective="multi:softmax", num_class=7, eval_metric='mlogloss')
    model.fit(X, y)

    joblib.dump(model, save_path)
    print(f"Model saved at {save_path}")
    return model


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


if __name__ == "__main__":
    train_and_save_model()
