# ForestAI-Forest-Classification-Dashboard

An interactive machine learning dashboard that predicts forest cover type using the **Covertype dataset**.  
The backend is powered by **Flask** and **XGBoost**, while the frontend provides an easy interface for visualization and predictions.

---

## Dataset 

We use the **Covertype dataset** from the [UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/datasets/Covertype).

---

## Features

- **Forest Cover Prediction API** using a trained XGBoost model.
- **Feature Importance Endpoint** to understand key features driving predictions.
- **Interactive Frontend (Dashboard)** for inputting values and visualizing results.
- **Modular ML Pipeline** with preprocessing, training, saving, and loading of models.

---

## Technologies Used

### Backend
- **Python 3.x**
- **Flask** – lightweight web framework
- **Flask-CORS** – handle cross-origin requests
- **Pandas** – data processing
- **XGBoost** – machine learning model
- **Joblib** – save/load trained models

### Frontend
- **HTML**, **CSS**, **JAVASCRIPT**

## ⚙️ Installation & Setup (Backend)

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/forest-classification-dashboard.git
cd forest-classification-dashboard/backend
```

2. **Create and activate virtual environment**
```bash
python -m venv venv
venv\Scripts\activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Train the model (first time only)
```bash
python model.py
```

5. Run the Flask API
```bash
python app.py
```


