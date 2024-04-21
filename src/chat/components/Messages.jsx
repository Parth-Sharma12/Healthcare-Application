import React,{useState,useEffect,useRef} from 'react'
import Message from './Message'
import '../CSS/Messages.css'
import { db } from '../../firebase-config';
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

export default function Messages(props) {
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const userIdDoc = authToken ? parseInt(authToken.userId) : null;
  const patient=props.patient;
  const userIdPatient=patient.userId;
  const [messages, setMessages] = useState([]);
  const messagesRef = collection(db, "Messages");
  const roomId='$'+userIdDoc+'_'+userIdPatient;
  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", roomId), // Adjust room as needed
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  },[]); // Listen for changes to roomId
   
  console.log(messages);
  return (
      <div className='chatMessages'>
        {messages.map((message) => (
          <Message key={message.id} patient={patient} message={message}/>
        ))}
      </div>
    );
}
