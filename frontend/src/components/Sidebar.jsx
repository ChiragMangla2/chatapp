import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contextapi/Context";

const Sidebar = () => {

  const [users, setUsers] = useState('');
  const {setSelectedUser} = useContext(AuthContext);

  const getUsers = async () => {
    if(localStorage.getItem('chat-practice')){

      const user = JSON.parse(localStorage.getItem('chat-practice'))
      const data = await axios.get("http://localhost:3000/api/v1/user", {
        headers: {
          authorization: `Bearer ${user.token}`
        }
      });
      
      if (data) {
        console.log("Users => ", data.data.users);
        setUsers(data.data.users)
      }
    }
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div className="sidebar hide-scrollbar">
      <h1>Chat App</h1>
      {
        users?.length ? users.map((user, index) => {
          return <div className={`userField ${index % 2 == 0 ? "bg1" : "bg2"}`} key={index} onClick={() => setSelectedUser(user)}>
            <div className={`circle ${index % 2 == 0 ? "bg3" : "bg4"}`}>{user.username[0] + user.username[1]}</div>
            <div className="name">{user.username}</div>
          </div>
        }) : <div className='userField bg1'>
          <div className='circle bg3'>No</div>
          <div className="name">No user exist</div>
        </div>
      }
    </div>
  )
}

export default Sidebar
