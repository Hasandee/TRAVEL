from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the model and encoders
with open('tourism_data.pkl', 'rb') as file:
    data = pickle.load(file)

model = data["model"]
le_interests = data["le_interests"]
le_budget_range = data["le_budget_range"]
le_travel_type = data["le_travel_type"]
le_duration = data["le_duration"]
le_accommodation_preference = data["le_accommodation_preference"]
le_transport_preferences = data["le_transport_preferences"]
le_country_category = data["le_country_category"]
le_preferred_locations = data["le_preferred_locations"]
le_activities = data["le_activities"]

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.json  # Get request data
        print(input_data)  # Log the input data

        # Ensure the "Interests" and "Transport_Preferences" are joined if they are arrays
        if isinstance(input_data["interests"], list):
            input_data["interests"] = ", ".join(input_data["interests"])
        if isinstance(input_data["transport_preferences"], list):
            input_data["transport_preferences"] = ", ".join(input_data["transport_preferences"])

        # Transform input features
        interests = le_interests.transform([input_data["interests"]])[0]
        budget_range = le_budget_range.transform([input_data["budget_range"]])[0]
        travel_type = le_travel_type.transform([input_data["travel_type"]])[0]
        duration = le_duration.transform([input_data["duration"]])[0]
        accommodation_preference = le_accommodation_preference.transform([input_data["accommodation_preference"]])[0]
        transport_preferences = le_transport_preferences.transform([input_data["transport_preferences"]])[0]
        country_category = le_country_category.transform([input_data["country_category"]])[0]

        # Prepare feature array
        features = [[interests, budget_range, travel_type, duration, accommodation_preference, transport_preferences, country_category]]

        # Predict travel recommendations
        predictions = model.predict(features)
        preferred_locations_pred = predictions[0][0]
        activities_pred = predictions[0][1]

        # Decode predictions
        preferred_locations = le_preferred_locations.inverse_transform([int(preferred_locations_pred)])[0]
        activities = le_activities.inverse_transform([int(activities_pred)])[0]

        # Return predictions as JSON
        return jsonify({
            "Preferred_Locations": preferred_locations,
            "Activities": activities
        })

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 400  # Return error message if any exception occurs

if __name__ == "__main__":
    app.run(port=5000,debug=True)
