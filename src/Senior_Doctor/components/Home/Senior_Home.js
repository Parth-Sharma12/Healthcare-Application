import React from 'react'
import './Senior_Home.css'
import Senior_Navbar from '../Senior_Navbar/Senior_Navbar';
import { InformationCard } from '../InformationCard/InformationCard';
export const Senior_Home = () => {
    const doctors = [
        {
          id: 1,
          name: "Dr. John Doe",
          
          email: "john.doe@example.com",
          experience: 10,
          age: 45,
          profilePhoto: "/images/doctor1.jpg"
        },
        {
          id: 2,
          name: "Dr. Jane Smith",
         
          email: "jane.smith@example.com",
          experience: 8,
          age: 40,
          profilePhoto: "/images/doctor2.jpg"
        },
        {
            id: 1,
            name: "Dr. John Doe",
           
            email: "john.doe@example.com",
            experience: 10,
            age: 45,
            profilePhoto: "/images/doctor1.jpg"
          },
          {
            id: 2,
            name: "Dr. Jane Smith",
            
            email: "jane.smith@example.com",
            experience: 8,
            age: 40,
            profilePhoto: "/images/doctor2.jpg"
          },
        // Add more doctors as needed
      ];
    
  return (
    <div className="Senior2-Home">
    <Senior_Navbar/>
    <div className="Senior2-doctor-cards-container">
    {doctors.map(doctor => (
      <InformationCard
        key={doctor.id}
        profilePhoto={doctor.profilePhoto}
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
}
