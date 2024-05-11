import React,{useState,useEffect,useRef} from 'react'
import Message from './Message'
import '../CSS/Messages.css'
import { db } from '../../firebase-config';
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { decryptMessage,encryptMessage,masterKey } from '../../EncryptionHelper';
export default function Messages(props) {
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const userIdDoc = authToken ? parseInt(authToken.userId) : null;
  const patient=props.patient;
  const userIdPatient=patient.userId;
  //console.log("user id of patient in chathome before fetching messages",userIdPatient);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true); // Introduce loading state
  const messagesRef = collection(db, "Messages");
  const roomId='$'+userIdDoc+'_'+userIdPatient;
  //console.log("room id of patient in chathome before fetching messages",roomId);
  useEffect(() => {
    setLoading(true); // Set loading to true when component mounts or roomId changes
    const queryMessages = query(
      messagesRef,
      where("room", "==", roomId), // Adjust room as needed
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let decryptedMessages = []; // Array to store decrypted messages
      snapshot.forEach((doc) => {
        const message = doc.data();
        const decryptedText = decryptMessage(message.text, masterKey); // Decrypt message text
        const decryptedMessage = { ...message, text: decryptedText }; // Replace encrypted text with decrypted text
        decryptedMessages.push({ ...decryptedMessage, id: doc.id });
      });
      setMessages(decryptedMessages);
      setLoading(false); // Set loading to false after messages are fetched
    });

    return () => unsubscribe();
  },[roomId]); // Listen for changes to roomId
   
  console.log(messages);
  return (
    <div className='chatMessages'>
    {loading ? (
      <p className="chatLoadingMessage">......</p> // Display loading indicator while messages are being fetched
    ) : (
      messages.map((message) => (
        <Message key={message.id} patient={patient} message={message}/>
      ))
    )}
  </div>
    );
}
