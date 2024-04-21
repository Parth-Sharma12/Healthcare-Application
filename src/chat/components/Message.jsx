import React,{useRef,useEffect} from 'react'
import '../CSS/Message.css'
export default function Message(props) {
  const messageEndRef = useRef(null);
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const userIdDoc = authToken ? parseInt(authToken.userId) : null;
  const {patient,message}=props;
  const patientId=patient.userId;
  const senderId=userIdDoc+"_"+patientId;

  //retrieved from a message
  const messageSenderId=message.senderId;
  const isOwner=messageSenderId===senderId;

  function formatMessageTime(createdAt) {
    if (!createdAt) {
      return ''; // or any default value you want to return for null createdAt
    }
    // Convert nanoseconds and seconds to milliseconds
    const milliseconds = createdAt.seconds * 1000 + Math.round(createdAt.nanoseconds / 1000000);
  
    // Create a new Date object for the message creation time
    const messageDate = new Date(milliseconds);
  
    // Get the current time
    const currentDate = new Date();
  
    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - messageDate;
  
    // Define the threshold for "just now" (e.g., 1 minute)
    const justNowThreshold = 60 * 1000; // 1 minute in milliseconds
  
    // Format the time
    let formattedTime;
    if (timeDifference < justNowThreshold) {
      formattedTime = "Just now";
    } else {
      // Get the hours, minutes, and seconds
      const hours = messageDate.getHours();
      const minutes = messageDate.getMinutes();
  
      // Format the time as 24-hour time (HH:MM)
      formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }
  
    return formattedTime;
  }
  // Scroll to the bottom of messages container when messages change
  useEffect(() => {
    scrollToBottom();
  }, [message]);

  // Function to scroll to the bottom of messages container
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
const className = `message ${isOwner ? 'owner' : ''}`;
  return (
    <div className={className} ref={messageEndRef}>
      <div className="messageInfo">
        <img src="https://media.istockphoto.com/id/1294477039/vector/metaphor-bipolar-disorder-mind-mental-double-face-split-personality-concept-mood-disorder-2.jpg?s=612x612&w=0&k=20&c=JtBxyFapXIA63hzZk_F5WNDF92J8fD2gIFNX3Ta4U3A=" alt=""/>
        <span>{formatMessageTime(message.createdAt)}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
      </div>
    </div>
  )
}
