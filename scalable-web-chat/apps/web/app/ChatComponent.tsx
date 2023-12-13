// ChatComponent.tsx
import React, { useEffect, useRef } from 'react';

const ChatComponent: React.FC = () => {
  const messageDisplayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, []);

  // Function to scroll the message display to the bottom
  const scrollToBottom = () => {
    if (messageDisplayRef.current) {
      messageDisplayRef.current.scrollTop = messageDisplayRef.current.scrollHeight;
    }
  };

  // Example of how to use the scrollToBottom function after adding a new message
  // Replace this with your actual code for adding messages
  const addMessage = () => {
    // Your code to add a new message goes here

    // After adding the message, scroll to the bottom
    scrollToBottom();
  };

  return (
    <div className="chat-container">
      {/* ... other chat components ... */}
      <div className="message-display" ref={messageDisplayRef}>
        {/* Your messages go here */}
      </div>
      {/* ... other chat components ... */}
    </div>
  );
};

export default ChatComponent;
