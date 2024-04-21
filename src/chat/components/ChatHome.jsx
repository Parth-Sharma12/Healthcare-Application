import React,{useEffect,useState} from 'react'
import ChatSideBar from '../components/ChatSideBar'
import Chat from '../components/Chat'
import { useLocation } from 'react-router-dom'
import {signInAnonymouslyIfNeeded } from '../../firebase-config';
import '../CSS/ChatHome.css'
import Navbar from '../../Doctor/Components/Navbar/Navbar';
export default function ChatHome() {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    async function authenticate() {
      await signInAnonymouslyIfNeeded();
      setAuthenticated(true);
    }
    authenticate();
  }, []);

  
  const location = useLocation();
  const { patient } =location.state;
  console.log(patient);
  return (
    <>
    <Navbar/>
    <div className='chatHome'>
      <div className="chatHomeContainer">
      {authenticated && <ChatSideBar patient={patient}/>}
        {authenticated && <Chat patient={patient}/>}
      </div>
    </div>
    </>
  )
}
