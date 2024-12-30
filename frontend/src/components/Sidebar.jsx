import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contextapi/Context";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router";

const Sidebar = () => {

  const [users, setUsers] = useState('');
  const { setSelectedUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  // get all register users
  const getUsers = async () => {
    if (localStorage.getItem('chat-practice')) {

      const user = JSON.parse(localStorage.getItem('chat-practice'))
      const data = await axios.get("http://localhost:3000/api/v1/user", {
        headers: {
          authorization: `Bearer ${user.token}`
        }
      });

      if (data) {
        setUsers(data.data.users)
      }
    }
  }

  useEffect(() => {
    // call getUsers
    getUsers();
  }, []);

  // set new selected userId
  const handleSelectedUser = (user) => {
    localStorage.setItem("chat-selectedUser", JSON.stringify(user))
    setSelectedUser({ ...user, timestamps: Date.now() });
  }

  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("chat-selectedUser")
    localStorage.removeItem("chat-practice")
    setSelectedUser('');
    setToken('')
    navigate('/login')
  }


  return (
    <>
      <div className="sidebar hide-scrollbar">
        <div className="logo">
          <h1>Chat App</h1>
          <div className="logout" onClick={handleLogout}><IoLogOut /></div>
        </div>
        {
          users?.length ? users.map((user, index) => {
            return <div className={`userField ${index % 2 == 0 ? "bg1" : "bg2"}`} key={index} onClick={() => handleSelectedUser(user)}>
              <div className={`circle ${index % 2 == 0 ? "bg3" : "bg4"}`}>{user.username[0] + user.username[1]}</div>
              <div className="name">{user.username}</div>
            </div>
          }) : <div className='userField bg1'>
            <div className='circle bg3'>No</div>
            <div className="name">No user exist</div>
          </div>
        }
      </div>
    </>
  )
}

export default Sidebar
