import React, { useState } from 'react';
import { predictFlood } from '../api/disasterPredictionApi';  // Make sure this path is correct

const FloodPrediction = () => {
    const [precipitation, setPrecipitation] = useState('');
    const [temperature, setTemperature] = useState('');
    const [prediction, setPrediction] = useState('');

    const handlePredict = async () => {
        if (precipitation === '' || temperature === '') {
            alert("Please enter both precipitation and temperature values.");
            return;
        }
        const result = await predictFlood(Number(precipitation), Number(temperature));
        setPrediction(result);
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Flood Prediction</h2>
            <input
                type="number"
                placeholder="Enter Precipitation (mm)"
                value={precipitation}
                onChange={(e) => setPrecipitation(e.target.value)}
                style={{ margin: '10px', padding: '10px' }}
            />
            <input
                type="number"
                placeholder="Enter Temperature (°C)"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                style={{ margin: '10px', padding: '10px' }}
            />
            <button onClick={handlePredict} style={{ padding: '10px 20px' }}>
                Predict Flood Risk
            </button>

            {prediction && (
                <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
                    <h3>{prediction}</h3>
                </div>
            )}
        </div>
    );
};

export default FloodPrediction;
