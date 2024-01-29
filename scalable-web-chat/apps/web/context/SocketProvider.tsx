'use client';
import React, { useCallback,useContext,useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps{
    children?: React.ReactNode;
}

interface ISocketContext {
    sendMessage: (msg: string) => any;
    messages: string[];
  }

  const SocketContext = React.createContext<ISocketContext | null>(null); 
  

  export const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) throw new Error(`Error in state of useSocket`);
    
    return state;
  };

  export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket>()
    const [socketNg, setSocketNg] = useState<Socket>()
    const [messages, setMessages] = useState<string[]>([])
    
    const sendMessage: ISocketContext["sendMessage"] = useCallback(
      (msg) => {
        console.log("Send Message", msg);
        if(socket){
            socket.emit('event:message', {message: msg} );
        }else if(socketNg){
          socketNg.emit('event:message', {message: msg} );
          }
      },
      [socket, socketNg]
    );

    const onMessageRec = useCallback((msg: string)=>{
        console.log("Message Recevied from ", msg);
        const { message } = JSON.parse(msg) as {message: string}
        setMessages(prev => [...prev, message]);
    },[])

    useEffect(()=>{
        const _socket = io("http://192.168.1.17:8000");
        // const __socket = io("https://mint-parrot-namely.ngrok-free.app:8000");
        _socket.on('message', onMessageRec);
        // __socket.on('message', onMessageRec);
        setSocket(_socket);
        // setSocketNg(__socket);

        return ()=>{
            _socket.disconnect();
            // __socket.disconnect();
            _socket.off('message', onMessageRec);
            // __socket.off('message', onMessageRec);
            setSocket(undefined);
            setSocketNg(undefined);
        };
    },[])
    
    return(
        <SocketContext.Provider value={{ sendMessage,messages }}>
            {children}
        </SocketContext.Provider>
    )
}
