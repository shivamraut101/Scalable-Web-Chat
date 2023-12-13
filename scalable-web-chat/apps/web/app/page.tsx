'use client'
import { useState } from "react";
import { useSocket } from "../context/SocketProvider"
import classes from "./page.module.css"
export default function Page() {

  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState('');
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    if (message.trim() !== "") {
      sendMessage(message);
      setMessage("");
    }

  }


  return (
    <>
      <div className={classes["chat-container"]}>
        <div className={classes["message-display"]}>
          {/* <!-- Messages will be displayed here --> */}
          {messages.map((e, key) => <li key={key}>{e}</li>)}
        </div>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={classes["message-input"]}
          placeholder="Type your message..." />

        <button onClick={(e)=>handleSubmit(e)} type="submit" className={classes["send-button"]}>Send</button>

      </div>
    </>
  )
}