import React,{useState,useEffect} from 'react'
import { db, auth, signInAnonymouslyIfNeeded } from '../firebase-config';
import {collection,addDoc,where,serverTimestamp,onSnapshot,query,orderBy} from "firebase/firestore";
import {Link} from 'react-router-dom'
export default function Message() {
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "Messages");

    // Sign in anonymously when the component mounts
  useEffect(() => {
    signInAnonymouslyIfNeeded();
  }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const currentUser = auth.currentUser;
        if (newMessage === "") return;
      
        try {
          await addDoc(messagesRef,{
            text: newMessage,
            createdAt: serverTimestamp(),
            userId: currentUser.uid,
            room: "room1"
          });
      
          setNewMessage("");
          console.log("Message sent successfully!");
        } catch (error) {
          console.error("Error sending message:", error);
        }
      };
  return (
    <div>
      <h1>Message Box</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <br />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
