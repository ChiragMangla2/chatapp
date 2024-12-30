import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contextapi/Context";
import { socket } from "../socket";
import axios from "axios";

const ChatArea = () => {

  const [msg, setMsg] = useState('');
  const [allMsg, setAllMsg] = useState([]);
  const { selectedUser, loginUserId, token } = useContext(AuthContext);

  // when selected chat change clean stored chats
  useEffect(() => {
    setAllMsg([]);
    getChats(selectedUser);
  }, [selectedUser]);


  // handle new message come
  function onMessage({ msg, senderId }) {
    const selectedUserLocal = JSON.parse(localStorage.getItem('chat-selectedUser'))

    if (selectedUserLocal._id == senderId) {
      setAllMsg(pre => [...pre, { msg, senderId }])
    }
  }

  useEffect(() => {

    // handle event comes from server
    socket.on('message', onMessage);

    return () => {
      socket.off('message', onMessage);
    };

  }, []);

  // handle send msg from login user
  const handleSendMsg = async (e) => {
    e.preventDefault();

    // emit msg to server
    socket.emit("message", ({ msg, senderId: loginUserId, receiverId: selectedUser._id }));

    // also save login user msg on state
    setAllMsg(pre => [...pre, { msg, senderId: loginUserId, receiverId: selectedUser._id }]);
    setMsg('');
  }

  const getChats = async () => {
    const sender = JSON.parse(localStorage.getItem("chat-selectedUser"))
    const userToken = 'bearer ' + token;
    const data = await axios.get("http://localhost:3000/api/v1/msg", {
      headers: {
        authorization: userToken
      },
      params: {
        senderId: sender._id
      }
    })

    if(data?.data.success){
      setAllMsg(data.data.data)
    }
  }

  return (
    <div className="chatarea">
      <div className="name">{selectedUser.username}</div>
      <div className="messages hide-scrollbar">
        {
          allMsg.length ? allMsg.map((e, index) => {
            return <div className={`${loginUserId == e.senderId ? 'right' : 'left'} left msg`} key={index}>{e.msg}</div>
          }) : ""
        }
      </div>
      <form className="input" onSubmit={handleSendMsg}>
        <input type="text" name="msg" placeholder="Enter your message" value={msg} onChange={e => setMsg(e.target.value)} autoComplete="off" />
        <button type="submit">send</button>
      </form>
    </div>
  )
}

export default ChatArea
