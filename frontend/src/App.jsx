import React, { useState, useEffect, useContext } from 'react';
// import { socket } from './socket';
// import { ConnectionState } from './components/ConnectionState';
// import { Events } from "./components/Events";
import Sidebar from './components/Sidebar';
import ChatArea from './components/Chatarea';
// import { MyForm } from './components/MyForm';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { AuthContext } from './contextapi/Context';

export default function App() {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const {selectedUser} = useContext(AuthContext);

  // useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   function onMessage(value) {
  //     setMessages(previous => [...previous, value]);
  //   }

  //   // socket.on('connect', onConnect);
  //   // socket.on('disconnect', onDisconnect);
  //   // socket.on('message', onMessage);

  //   return () => {
  //     // socket.off('connect', onConnect);
  //     // socket.off('disconnect', onDisconnect);
  //     // socket.off('message', onMessage);
  //   };
  // }, []);

  useEffect(() => {
    if(!localStorage.getItem('chat-practice')){
      navigate('/login');
    }

  },[])

  return (
    <div className="App">
      {/* <ConnectionState isConnected={ isConnected } /> */}
      {/* <Events events={ messages } /> */}
      {/* <MyForm /> */}
      <Sidebar />
      {selectedUser ? <ChatArea /> : null}
      
    </div>
  );
}