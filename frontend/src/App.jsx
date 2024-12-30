import React, { useState, useEffect, useContext } from 'react';
import { socket } from './socket';
import Sidebar from './components/Sidebar';
import ChatArea from './components/Chatarea';
import { useNavigate } from 'react-router';
import { AuthContext } from './contextapi/Context';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const navigate = useNavigate();
  const {selectedUser, loginUserId, setLoginUserId,setToken} = useContext(AuthContext);

  // handle socket connection and disconnection
  useEffect(() => {
    function onConnect() {
      const user = JSON.parse(localStorage.getItem('chat-practice'))
      socket.emit('register',user._id);
      console.log("Socket connected")
      setIsConnected(true);
    }
    
    function onDisconnect() {
      console.log("Socket disconnected")
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  // handle user isLogin or not
  useEffect(() => {
    if(!localStorage.getItem('chat-practice')){
      socket.disconnect();
      navigate('/login');
    }

    const user = JSON.parse(localStorage.getItem('chat-practice'))
    setToken(user.token)
    setLoginUserId(user._id)

    socket.connect();

  },[])

  return (
    <div className="App">
      <Sidebar />
      {selectedUser ? <ChatArea /> : null}
      
    </div>
  );
}