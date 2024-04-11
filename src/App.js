import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Doctor/Pages/Register/Register";
import React, { useState, useEffect } from "react";
import DoctorHome from "./Doctor/Pages/DoctorHome/DoctorHome";
import Footer from "./Doctor/Components/Footer/Footer";
import ViewPosts from "./Doctor/Pages/ViewPosts/ViewPosts"
import ProfileDetails from './Doctor/Pages/ProfileDetails/ProfileDetails'
import PatientDetails from "./Doctor/Pages/PatientDetails/PatientDetails";
import InvalidRole from "./InvalidRole/InvalidRole";
import DoctorDetails from './Admin/Pages/DoctorDetails/DoctorDetails';
import Home from './Admin/Pages/AdminHome/AdminHome';
import Moderator from './Admin/Pages/Moderator/Moderator';
import Patient from './Admin/Pages/Patient/Patient';
import Responder from './Admin/Pages/Responder/Responder';
import Requests from './Admin/Pages/Requests/Requests';
import Profile from './Admin/Pages/Profile/Profile';
import AdminHome from "./Admin/Pages/AdminHome/AdminHome";
import PostCard from './Moderator/components/PostCard/MPostCard.js';
import QuestionAnswerCard from './Moderator/components/QuestionAnswerCard/MQuestionAnswerCard.js';
import QnA from './Moderator/components/QnA/MQnA.js';
import { Profile_info } from "./Moderator/Info/components/Profile_info/Profile_info.js";
import { MFlaggedPosts } from './Moderator/components/MflaggedPost/MFlaggedPosts.js';
import { RHome } from './Responder/components/Home/RHome.js';
import { RUnanswered } from './Responder/components/Unanswered/RUnanswered.js';
import AnsweringCard from './Responder/components/AnsweringCard/RAnsweringCard.js';
import AddPost from "./Doctor/Pages/AddPost/AddPost.jsx";
import { Senior_Home } from "./Senior_Doctor/components/Home/Senior_Home.js";
import Senior_Navbar from "./Senior_Doctor/components/Senior_Navbar/Senior_Navbar.js";
import { InformationCard } from "./Senior_Doctor/components/InformationCard/InformationCard.js";
import  {Appointment_History}  from "./Senior_Doctor/components/Appointment_History/Appointment_History.js";
import { Moderator_Profile } from "./Moderator/components/Moderator_Profile/Moderator_Profile.js";

//Logic to implement role based routing
function App() {
  const [role, setRole] = useState(window.localStorage.getItem('userRole')||false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(window.localStorage.getItem('isLoggedIn')) || true
  );
  useEffect(() => {
    const storedRole = window.localStorage.getItem("userRole");
    const storedLoggedIn = JSON.parse(window.localStorage.getItem('isLoggedIn'));
    if (storedRole !== null && storedLoggedIn !== null) {
      setRole(storedRole);
      setIsLoggedIn(storedLoggedIn);
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login setRole={setRole} setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              role === "doctor" ? (
                <DoctorHome />
              ) : role === "admin" ? (
                <AdminHome />
              ) : role === "moderator" ? (
                // <Appointment_History/>
                <MFlaggedPosts />
              ) : role === "responder" ? (
                <RHome />
              ) : (
                <InvalidRole />
              )
            ) : (
              <InvalidRole />
            )
          }
        />
        <Route path="/ViewPosts" exact element={role === 'doctor' && isLoggedIn ? <ViewPosts /> : <InvalidRole />} />
        <Route path="/viewprofile" exact element={role === 'doctor' && isLoggedIn ? <ProfileDetails /> : <InvalidRole />} />
        <Route path="/register" exact element={role === 'doctor' && isLoggedIn ? <Register /> : <InvalidRole />} />
        <Route path="/PatientDetails" exact element={role === 'doctor' && isLoggedIn ? <PatientDetails /> : <InvalidRole />} />
        <Route path="/doctors" exact element={role === 'admin' && isLoggedIn ? <DoctorDetails /> : <InvalidRole />} />
        <Route path="/patients" exact element={role === 'admin' && isLoggedIn ? <Patient/> : <InvalidRole />} />
        <Route path="/responders" exact element={role === 'admin' && isLoggedIn ? <Responder /> : <InvalidRole />} />
        <Route path="/moderators" exact element={role === 'admin' && isLoggedIn ? <Moderator /> : <InvalidRole />} />
        <Route path="/requests" exact element={role === 'admin' && isLoggedIn ? <Requests /> : <InvalidRole />} />
        <Route path="/logout" exact element={role === 'admin' && isLoggedIn ? <DoctorDetails /> : <InvalidRole />} />
        <Route path="/profile" exact element={role === 'admin' && isLoggedIn ? <Profile /> : <InvalidRole />} />
        <Route path="/QnA" exact element={role === 'moderator' && isLoggedIn ? <QnA /> : <InvalidRole />} />
        <Route path="/Moderator_Profile" exact element={role === 'moderator' && isLoggedIn ? <Moderator_Profile /> : <InvalidRole />} />
        <Route path="/RUnanswered" exact element={role === 'responder' && isLoggedIn ? <RUnanswered /> : <InvalidRole />} />
      <Route path="/addposts" exact element={<AddPost/>}/>
      </Routes>
    </Router>
  );
}

export default App;
