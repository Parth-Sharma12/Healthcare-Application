import React,{useEffect,useState} from 'react'
import ChatSideBar from '../components/ChatSideBar'
import Chat from '../components/Chat'
import { useLocation } from 'react-router-dom'
import {signInAnonymouslyIfNeeded } from '../../firebase-config';
import '../CSS/ChatHome.css'
import Navbar from '../../Doctor/Components/Navbar/Navbar';
export default function ChatHome() {
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  // Function to handle selecting a patient
  const handlePatientSelect = (selectedPatient) => {
    setSelectedPatient(selectedPatient);
  };

  useEffect(() => {
    async function authenticate() {
      await signInAnonymouslyIfNeeded();
      setAuthenticated(true);
    }
    authenticate();
  }, []);

  
  const location = useLocation();
  const { dateAppointments } =location.state;
  console.log(dateAppointments[0]);
  console.log("selected patient is",selectedPatient);
  return (
    <>
    <Navbar/>
    <div className='chatHome'>
      <div className="chatHomeContainer">
      {authenticated && <ChatSideBar patient={selectedPatient || (dateAppointments.length > 0 ? dateAppointments[0].patient : null)} dateAppointments={dateAppointments} onPatientClick={handlePatientSelect}/>}
        {authenticated && <Chat patient={selectedPatient || (dateAppointments.length > 0 ? dateAppointments[0].patient : null)}/>}
      </div>
    </div>
    </>
  )
}
