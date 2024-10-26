import React, { useEffect, useState } from 'react';
import './HelpRequests.css'; // Import the CSS file

function HelpRequests() {
    const [helpRequests, setHelpRequests] = useState([]);

    useEffect(() => {
        const fetchHelpRequests = async () => {
            try {
                const response = await fetch('https://backend-ziqe.onrender.com/help_requests');
                const data = await response.json();
                setHelpRequests(data);
            } catch (error) {
                console.error('Error fetching help requests:', error);
            }
        };

        fetchHelpRequests();
    }, []);

    return (
        <div className="help-requests-container">
            <h2>Help Requests</h2>
            <ul className="help-requests-list">
                {helpRequests.map((request, index) => (
                    <li key={index} className="help-request-item">
                        <div className="alert-icon">!</div>
                        <div className="request-details">
                            <p>Name: {request.name || 'N/A'}</p>
                            <p>Mobile: {request.mobile || 'N/A'}</p>
                            <p>City: {request.location?.city || 'Unknown city'}</p>
                            <p>District: {request.location?.district || 'Unknown district'}</p>
                            <p>Status: {request.status || 'Unknown status'}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HelpRequests;
