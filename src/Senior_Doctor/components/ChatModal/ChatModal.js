import React, { useState, useEffect } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

import { db } from '../../../firebase-config';
import { signInAnonymouslyIfNeeded } from '../../../firebase-config';

export const ChatModal = ({ show, handleClose, userIdDoc = 5, userIdPatient = 24}) => {
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
      setMessages(messages);
      console.log(messages)
    });

    return () => unsubscribe();
  }, [messagesRef, roomId]);

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-overlay" onClick={handleClose}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Chat</h3>
          <button className="close-btn" onClick={handleClose}>X</button>
        </div>
        <div className="modal-body">
          {messages.map((message) => (
            <div key={message.id}>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


