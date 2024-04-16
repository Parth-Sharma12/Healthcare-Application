import React, { useState, useEffect } from 'react';
import { db, signInAnonymouslyIfNeeded } from '../firebase-config';
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import Message from './Message';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const messagesRef = collection(db, "Messages");
  // Sign in anonymously when the component mounts
  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", "room1"),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);


  return (
    <div>
      <h1>Messages for Room 1</h1>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <p>{message.text}</p>
            <p>Posted by: {message.userId}</p>
          </div>
        ))}
      </div>
      <Message/>
    </div>
  );
}
