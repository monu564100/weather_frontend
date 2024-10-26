// import axios from 'axios';

// const BASE_URL = 'http://127.0.0.1:5000';  // Flask backend URL

// export const predictForestFire = async (data) => {
//     try {
//         const response = await axios.post(`${BASE_URL}/predict`, data);
//         return response.data.prediction;
//     } catch (error) {
//         console.error("Error predicting forest fire:", error);
//         return "Error";
//     }
// };

// // Add similar functions for earthquake and flood predictions
import axios from 'axios';

const BASE_URL = 'https://backend-ziqe.onrender.com';  // Flask backend URL

export const predictFlood = async (precipitation, temperature) => {
    const data = {
        precipitation: precipitation,
        temperature: temperature
    };
    try {
        const response = await axios.post(`${BASE_URL}/predict_flood`, data);
        return response.data.prediction;
    } catch (error) {
        console.error("Error predicting flood risk:", error);
        return "Error";
    }
};

export const predictForestFire = async (data) => {
        try {
             const response = await axios.post(`${BASE_URL}/predict`, data);
             return response.data.prediction;
         } catch (error) {
             console.error("Error predicting forest fire:", error);
             return "Error";
         }
 };

// You can add more flood-related functions here if needed
