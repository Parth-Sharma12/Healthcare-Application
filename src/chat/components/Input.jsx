import React,{useState} from 'react'
import '../CSS/Input.css'
import { GrGallery } from "react-icons/gr";
import { CgAttachment } from "react-icons/cg";
import { db, auth, signInAnonymouslyIfNeeded } from '../../firebase-config';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { encryptMessage,masterKey} from '../../EncryptionHelper';
export default function Input(props) {
  const { patient, dateAppointments,onPatientClick } = props;
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const userIdDoc = authToken ? parseInt(authToken.userId) : null;
  console.log("selected patient in input",patient);
  const userIdPatient=patient.userId;
  const roomId='$'+userIdDoc+'_'+userIdPatient;
  const [newMessage, setNewMessage] = useState("");
  const encryptedText = encryptMessage(newMessage, masterKey);
  const senderId=userIdDoc + "_" + userIdPatient;
  //const senderId='9_5';
  const messagesRef = collection(db, "Messages");

  const isDateInPreviousThreeDays = (date) => {
    const currentDate = new Date();
    const previousThreeDays = new Date(currentDate);
    previousThreeDays.setDate(currentDate.getDate() - 3);
    const appointmentDate = new Date(date);
    return appointmentDate > previousThreeDays;
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentUser = auth.currentUser;
    if (newMessage === ""||!isDateInPreviousThreeDays(dateAppointments[0].date)) return;

    try {
      await addDoc(messagesRef, {
        text: encryptedText,
        createdAt: serverTimestamp(),
        senderId:senderId,
        room: roomId
      });

      setNewMessage("");
      console.log("Message sent successfully!");
      //Decrypt the message and print its value
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const readOnlyInput = !isDateInPreviousThreeDays(dateAppointments[0].date);

  return (
    <form onSubmit={handleSubmit}>
    <div className="chatInput">
      <input type="text" placeholder="Type something..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)}  readOnly={readOnlyInput} />
      <div className="sendMessage">
        <CgAttachment />
        <GrGallery />
        <button type="submit" disabled={readOnlyInput}>Send</button>
      </div>
    </div>
  </form>
  )
}
