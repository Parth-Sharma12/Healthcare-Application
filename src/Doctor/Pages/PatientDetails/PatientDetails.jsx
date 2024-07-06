import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import '../PatientDetails/PatientDetails.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from '../../../BaseUrl';

export default function PatientDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const { patient = {}, date } = location.state || {};
    const [quizInfo, setQuizInfo] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchQuizScores(); // Fetch quiz scores when the component mounts
    }, []);

    // Fetch quiz score when the component mounts
    const fetchQuizScores = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/api/quiz/quiz-score/${patient.userId}`);
            // Assuming the API response contains an array of quiz scores
            setQuizInfo(response.data);
            //setShowModal(true); // Show the modal after fetching the data
        } catch (error) {
            console.error('Error fetching quiz scores:', error);
            // Handle error case
        }
    };

    console.log("quiz info is", quizInfo);
    const handleChatNow = () => {
        // Check if patient object exists before navigating
        if (patient) {
            // Navigate to the chat page and pass the entire patient object in the state
            navigate('/chat', { state: { patient } });
        } else {
            console.error("Patient object is null or undefined");
        }
    };
    const handleGoBack = () => {
        // Navigate back with the same state that was received
        navigate("/home");
    };

    const handleQuizScores = (event) => {
        event.preventDefault();
        setShowModal(true); // Show modal when Quiz Scores button is clicked
    };

    const handleCloseModal = () => {
        console.log("function to close quiz called");
        setShowModal(false); // Close modal
    };

    return (
        <>
            <Navbar />
            {patient && (
                <div className='container-view-patient'>
                    <div className="form-view-patient">
                        <div className="img-view-patient">
                            <img src={patient.image} alt="" />
                            <p className='img-text-view-patient'>{patient.firstName + " " + patient.lastName}<br />{patient.age}<br />{patient.gender}</p>
                        </div>
                        <div className="view-patient-form">
                            <span className="circle-view-patient-one"></span>
                            <span className='circle-view-patient-two'></span>
                            <form className='view-a-patient'>
                                <h3 className='patient-page-title'>Appointment Details</h3>
                                <div className="input-container-view-patient focus">
                                    <input type="text" name="patient-name" className='input-view-patient' value={patient.firstName + " " + patient.middleName + " " + patient.lastName} readOnly />
                                    <label className='view-patient-label' htmlFor="">Patient Name</label>
                                    <span>Patient Name</span>
                                </div>
                                <div className="input-container-view-patient focus">
                                    <input type="text" name="patient-age" className='input-view-patient' value={patient.age} readOnly />
                                    <label className='view-patient-label' htmlFor="">Age</label>
                                    <span>Age</span>
                                </div>
                                <div className="input-container-view-patient focus">
                                    <input type="text" name="patient-gender" className='input-view-patient' placeholder='male' value={patient.gender} readOnly />
                                    <label className='view-patient-label' htmlFor="">Gender</label>
                                    <span>Gender</span>
                                </div>
                                <div className="input-container-view-patient focus">
                                    <input type="text" name="patient-appointment-date" className='input-view-patient' value={date} readOnly />
                                    <label className='view-patient-label' htmlFor="">Appointment Date</label>
                                    <span>Appointment Date</span>
                                </div>
                                <div className="input-container-view-patient focus">
                                    <input type="text" name="patient-appointment-time" className='input-view-patient' value={patient.mobileNo} readOnly />
                                    <label className='view-patient-label' htmlFor="">Contact</label>
                                    <span>Contact</span>
                                </div>
                                <div className="input-container-view-patient focus">
                                    <input type="text" name="patient-email" className='input-view-patient' value={patient.email} readOnly />
                                    <label className='view-patient-label' htmlFor="">Email</label>
                                    <span>Email</span>
                                </div>
                                <div className="input-container-view-patient focus">
                                    <input type="text" name="appointment-duration" className='input-view-patient' placeholder='1 hour' readOnly />
                                    <label className="view-patient-label" htmlFor="">Duration</label>
                                    <span>Duration</span>
                                </div>
                                <div className="view-patient-buttons">
                                    <button className='view-patient-button' onClick={handleGoBack}>Back</button>
                                    <button className='view-patient-button' onClick={(event) => handleQuizScores(event)}>Quiz Scores</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {showModal && (
                <div className="modal-quiz">
                    <div className="modal-content-quiz">
                        <span className="close-quiz" onClick={handleCloseModal}>&times;</span>
                        <h1>Quiz Scores</h1>
                        {quizInfo.map((quiz, index) => (
                            <div key={index + 1}>
                                <h3>{quiz.quizType.quizName}: {quiz.totalScore}</h3>
                                <ul>
                                    {JSON.parse(quiz.jsonQuizScores).map((question, index) => (
                                        <li key={index + 1}>
                                            {index+1}: Score: {question.score || '0'}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
