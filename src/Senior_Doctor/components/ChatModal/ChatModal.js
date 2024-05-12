import React, { useState, useEffect } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase-config';
import { signInAnonymouslyIfNeeded } from '../../../firebase-config';
import "./ChatModal.css"
import { masterKey } from "../../../EncryptionHelper";
import { decryptMessage } from "../../../EncryptionHelper";

export const ChatModal = ({ show, handleClose, userIdDoc , userIdPatient  }) => {
  
  const [authenticated, setAuthenticated] = useState(false);
  console.log(userIdDoc);
  console.log(userIdPatient);
  useEffect(() => {
    async function authenticate() {
      await signInAnonymouslyIfNeeded();
      setAuthenticated(true);
    }
    authenticate();
  }, []);

  const [messages, setMessages] = useState([]);
  const messagesRef = collection(db, "Messages");
  const roomId = '$' + userIdDoc + '_' + userIdPatient;

  useEffect(() => {
     // Set loading to true when component mounts or roomId changes
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
      // Set loading to false after messages are fetched
    });

    return () => unsubscribe();
  },[roomId]); // Listen for changes to roomId

  return (
    <div className={`senior-modal ${show ? "show" : ""}`}>
      <div className="senior-modal-overlay" onClick={handleClose}></div>
      <div className="senior-modal-content">
        <div className="senior-modal-header">
          <h3>Chat</h3>
          <button className="senior-close-btn" onClick={handleClose}>X</button>
        </div>
        <div className="senior-modal-body">
        {messages.map((message) => (
  <div key={message.id} className={message.senderId === `${userIdDoc}_${userIdPatient}` ? "senior-left-message" : "senior-right-message"}>
    <p>{message.text}</p>
    {console.log("Message:", message)}
    {console.log("Class:", message.senderId === `${userIdDoc}_${userIdPatient}` ? "left-message" : "right-message")}
  </div>
))}

        </div>
      </div>
    </div>
  );
};
