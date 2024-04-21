import React,{useState} from 'react'
import '../CSS/Input.css'
import { GrGallery } from "react-icons/gr";
import { CgAttachment } from "react-icons/cg";
import { db, auth, signInAnonymouslyIfNeeded } from '../../firebase-config';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Input(props) {
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const userIdDoc = authToken ? parseInt(authToken.userId) : null;
  const patient=props.patient;
  const userIdPatient=patient.userId;
  const roomId='$'+userIdDoc+'_'+userIdPatient;
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "Messages");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentUser = auth.currentUser;

    if (newMessage === "") return;

    try {
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        senderId:userIdDoc+"_"+userIdPatient,
        room: roomId
      });

      setNewMessage("");
      console.log("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className="chatInput">
      <input type="text" placeholder="Type something..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
      <div className="sendMessage">
        <CgAttachment />
        <GrGallery />
        <button type="submit">Send</button>
      </div>
    </div>
  </form>
  )
}
