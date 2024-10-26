// import React, { useState } from 'react';
// import { predictForestFire } from '../api/disasterPredictionApi';

// function ForestFirePrediction() {
//     const [oxygen, setOxygen] = useState('');
//     const [temperature, setTemperature] = useState('');
//     const [humidity, setHumidity] = useState('');
//     const [result, setResult] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const data = { oxygen, temperature, humidity };
//         const prediction = await predictForestFire(data);
//         setResult(prediction);
//     };

//     return (
//         <div>
//             <h2>Forest Fire Prediction</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>Oxygen Level:</label>
//                 <input type="text" value={oxygen} onChange={(e) => setOxygen(e.target.value)} />
//                 <br />
//                 <label>Temperature:</label>
//                 <input type="text" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
//                 <br />
//                 <label>Humidity:</label>
//                 <input type="text" value={humidity} onChange={(e) => setHumidity(e.target.value)} />
//                 <br />
//                 <button type="submit">Predict</button>
//             </form>
//             {result && <p>Prediction Result: {result}</p>}
//         </div>
//     );
// }

// export default ForestFirePrediction;




// import React, { useState, useEffect } from 'react';
// import { predictForestFire } from '../api/disasterPredictionApi';

// const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
// const WEATHER_API_KEY = 'f46bb950ecaff0330d647c15aea7f292';

// function ForestFirePrediction() {
//     const [oxygen, setOxygen] = useState(21);
//     const [temperature, setTemperature] = useState('');
//     const [humidity, setHumidity] = useState('');
//     const [result, setResult] = useState(null);
//     const [showForm, setShowForm] = useState(false);
//     const [userData, setUserData] = useState({ name: '', mobile: '' });

//     useEffect(() => {
//         const fetchWeatherData = async (lat, lon) => {
//             try {
//                 const response = await fetch(
//                     `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
//                 );
//                 if (!response.ok) {
//                     throw new Error(`Weather API error: ${response.statusText}`);
//                 }
//                 const weatherData = await response.json();
//                 setTemperature(weatherData.main.temp);
//                 setHumidity(weatherData.main.humidity);

//                 await fetchPrediction(21, weatherData.main.temp, weatherData.main.humidity);
//             } catch (error) {
//                 console.error('Error fetching weather data:', error);
//             }
//         };

//         const fetchPrediction = async (oxygen, temperature, humidity) => {
//             try {
//                 const data = { oxygen, temperature, humidity };
//                 const prediction = await predictForestFire(data);
//                 setResult(prediction === 'unsafe' ? 'Unsafe' : 'Safe');
//             } catch (error) {
//                 console.error('Error fetching prediction:', error);
//             }
//         };

//         const getLocationAndWeatherData = () => {
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(
//                     (position) => {
//                         const { latitude, longitude } = position.coords;
//                         fetchWeatherData(latitude, longitude);
//                     },
//                     (error) => {
//                         console.error('Geolocation error:', error);
//                     }
//                 );
//             } else {
//                 console.error('Geolocation not supported by this browser.');
//             }
//         };

//         getLocationAndWeatherData();
//     }, []);

//     const handleHelpClick = () => {
//         setShowForm(true);
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUserData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://localhost:5000/submit_help', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(userData),
//             });
//             if (response.ok) {
//                 alert('Help request submitted successfully.');
//                 setShowForm(false);
//                 setUserData({ name: '', mobile: '' });
//             } else {
//                 alert('Failed to submit help request.');
//             }
//         } catch (error) {
//             console.error('Error submitting help request:', error);
//         }
//     };

//     return (
//         <div>
//             <p>Prediction Result: {result ? result : 'Loading...'}</p>
//             {result === 'Safe' && !showForm && (
//                 <button onClick={handleHelpClick}>Help</button>
//             )}
//             {showForm && (
//                 <form onSubmit={handleSubmit}>
//                     <label>
//                         Name:
//                         <input
//                             type="text"
//                             name="name"
//                             value={userData.name}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </label>
//                     <label>
//                         Mobile:
//                         <input
//                             type="tel"
//                             name="mobile"
//                             value={userData.mobile}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </label>
//                     <button type="submit">Submit</button>
//                 </form>
//             )}
//         </div>
//     );
// }

// export default ForestFirePrediction;



import React, { useState, useEffect } from 'react'; 
import { predictForestFire } from '../api/disasterPredictionApi';
import './ForestFirePrediction.css'
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = 'f46bb950ecaff0330d647c15aea7f292';
const GEOCODING_API_URL = 'https://api.opencagedata.com/geocode/v1/json';
const GEOCODING_API_KEY = '9dda6b38bd9643b1a9ae8f974b9d82c2';

function ForestFirePrediction() {
    const [oxygen, setOxygen] = useState(21);
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [result, setResult] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [userData, setUserData] = useState({ name: '', mobile: '', city: '', district: '' });

    useEffect(() => {
        const fetchWeatherData = async (lat, lon) => {
            try {
                const response = await fetch(
                    `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
                );
                if (!response.ok) {
                    throw new Error(`Weather API error: ${response.statusText}`);
                }
                const weatherData = await response.json();
                setTemperature(weatherData.main.temp);
                setHumidity(weatherData.main.humidity);

                await fetchPrediction(21, weatherData.main.temp, weatherData.main.humidity);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        const fetchPrediction = async (oxygen, temperature, humidity) => {
            try {
                const data = { oxygen, temperature, humidity };
                const prediction = await predictForestFire(data);
                setResult(prediction === 'unsafe' ? 'Unsafe' : 'Safe');
            } catch (error) {
                console.error('Error fetching prediction:', error);
            }
        };

        const fetchLocationDetails = async (lat, lon) => {
            try {
                const response = await fetch(
                    `${GEOCODING_API_URL}?q=${lat}+${lon}&key=${GEOCODING_API_KEY}`
                );
                if (!response.ok) {
                    throw new Error(`Geocoding API error: ${response.statusText}`);
                }
                const geocodeData = await response.json();
                const components = geocodeData.results[0]?.components || {};
                setUserData((prevData) => ({
                    ...prevData,
                    city: components.city || components.town || 'Unknown city',
                    district: components.state_district || 'Unknown district'
                }));
            } catch (error) {
                console.error('Error fetching location details:', error);
            }
        };

        const getLocationAndWeatherData = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        fetchWeatherData(latitude, longitude);
                        fetchLocationDetails(latitude, longitude);
                    },
                    (error) => {
                        console.error('Geolocation error:', error);
                    }
                );
            } else {
                console.error('Geolocation not supported by this browser.');
            }
        };

        getLocationAndWeatherData();
    }, []);

    const handleHelpClick = () => {
        setShowForm(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://backend-ziqe.onrender.com/submit_help', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                alert('Help request submitted successfully.');
                setShowForm(false);
                setUserData({ name: '', mobile: '', city: '', district: '' });
            } else {
                alert('Failed to submit help request.');
            }
        } catch (error) {
            console.error('Error submitting help request:', error);
        }
    };

    return (
        <div className={`prediction-container ${result === 'Safe' ? 'prediction-safe' : result === 'Unsafe' ? 'prediction-unsafe' : ''}`}>
            <p>Prediction Result: {result ? result : 'Loading...'}</p>
            {result === 'Safe' && !showForm && (
                <button onClick={handleHelpClick}>Help</button>
            )}
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Mobile:
                        <input
                            type="tel"
                            name="mobile"
                            value={userData.mobile}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        City:
                        <input
                            type="text"
                            name="city"
                            value={userData.city}
                            onChange={handleInputChange}
                            reaquired
                        />
                    </label>
                    <label>
                        District:
                        <input
                            type="text"
                            name="district"
                            value={userData.district}
                            onChange={handleInputChange}
                            reaquired
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
}

export default ForestFirePrediction;
