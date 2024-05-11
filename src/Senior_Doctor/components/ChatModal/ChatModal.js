import React, { useState, useEffect } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase-config';
import { signInAnonymouslyIfNeeded } from '../../../firebase-config';
import "./ChatModal.css"

export const ChatModal = ({ show, handleClose, userIdDoc , userIdPatient  }) => {
  const [authenticated, setAuthenticated] = useState(false);
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
    const queryMessages = query(
      messagesRef,
      where("room", "==", roomId),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages)
      setMessages(messages);
    });

    return () => unsubscribe();
  }, []);

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
