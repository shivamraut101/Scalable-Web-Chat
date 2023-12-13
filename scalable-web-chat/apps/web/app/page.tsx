'use client'
import { useState, useRef, useEffect } from "react";
import { useSocket } from "../context/SocketProvider"
import classes from "./page.module.css"
export default function Page() {

  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState('');
  const messageDisplayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to scroll the message display to the bottom
  const scrollToBottom = () => {
    if (messageDisplayRef.current) {
      const scrollHeight = messageDisplayRef.current.scrollHeight;
      const clientHeight = messageDisplayRef.current.clientHeight;
      messageDisplayRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  // Example of how to use the scrollToBottom function after adding a new message
  // Replace this with your actual code for adding messages
  const addMessage = () => {
    // Your code to add a new message goes here
    if (message.trim() !== "") {
      sendMessage(message);
      setMessage("");
    }
    // After adding the message, scroll to the bottom
    scrollToBottom();
    inputRef.current?.focus();
  };


  return (
    <>
      <div className={classes["chat-container"]}>
        <div className={classes["message-display"]} ref={messageDisplayRef}>
          {/* <!-- Messages will be displayed here --> */}
          {messages.map((e, key) => <li key={key}>{e}</li>)}
        </div>

        <input
          type="text"
          value={message}
          ref={inputRef}
          onChange={(e) => setMessage(e.target.value)}
          className={classes["message-input"]}
          placeholder="Type your message..." />

        <button onClick={addMessage} type="submit" className={classes["send-button"]}>Send</button>

      </div>
    </>
  )
}