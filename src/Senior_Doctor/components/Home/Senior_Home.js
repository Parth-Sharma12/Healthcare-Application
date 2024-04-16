import React, { useState, useEffect } from 'react';
import './Senior_Home.css';
import Senior_Navbar from '../Senior_Navbar/Senior_Navbar';
import { InformationCard } from '../InformationCard/InformationCard';
import axios from 'axios'; // Import Axios library

export const Senior_Home = () => {
  // Define state to store the fetched doctors data
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors data from backend when the component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const authToken = JSON.parse(localStorage.getItem("authToken"));
        const token = authToken ? authToken.accessToken : '';
        console.log(token);

        const userId = parseInt(token.userId);
        // Make a GET request to fetch doctors data from backend using Axios
        const response = await axios.get('http://localhost:8082/api/appointment/doctors', {
          headers: {
            'Authorization': `Bearer ${token}` // Include the auth token in the header
          }
        });
        const data = response.data; // Extract data from Axios response
        console.log(data);
        setDoctors(data); // Update state with fetched doctors data
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className="Senior2-Home">
      <Senior_Navbar />
      <div className="Senior2-doctor-cards-container">
        {doctors.map(doctor => (
          <InformationCard
            key={doctor.id}
            // If you don't have images, use a placeholder or leave it empty
            profilePhoto="/images/adminpanel.png" // Example placeholder image URL
            name={doctor.name}
            id={doctor.id}
            email={doctor.email}
            experience={doctor.experience}
            age={doctor.age}
          />
        ))}
      </div>
    </div>
  );
};
