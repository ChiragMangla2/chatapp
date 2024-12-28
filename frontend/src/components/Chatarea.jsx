import { useContext, useState } from "react"
import { AuthContext } from "../contextapi/Context";

const ChatArea = () => {

  const [msg,setMsg] = useState('');
  const {selectedUser} = useContext(AuthContext);

  const handleSendMsg = async (e) => {
    e.preventDefault();
    console.log(msg)
  }

  return (
    <div className="chatarea">
      <div className="name">{selectedUser.username}</div>
      <div className="messages hide-scrollbar">
        <div className="left msg">Heelo</div>
        <div className="right">World</div>
      </div>
      <form className="input" onSubmit={handleSendMsg}>
        <input type="text" name="msg" placeholder="Enter your message" value={msg} onChange={e=>setMsg(e.target.value)} />
        <button type="submit">send</button>
      </form>
    </div>
  )
}

export default ChatArea
