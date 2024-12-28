import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contextapi/Context";
import axios from 'axios';
import { useNavigate } from "react-router";

const Login = () => {

    const {setToken} = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(localStorage.getItem('chat-practice')){
            navigate('/');
        }
    },[]);

    const handleSubmit = async () => {
        if (!username || !password) {
            return
        }

        const data = await axios.post(`http://localhost:3000/api/v1/auth/login`,{
            username, password
        });

        if(data?.data.success){
            setToken(data.data.user.token)
            localStorage.setItem("chat-practice",JSON.stringify(data.data.user))
            navigate('/')
        }
        
        alert(data.data.message)

    }

    return (
        <div className="main">
            <div className="sub">
                <h1>Login</h1>
                <div className="field">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="Enter username" value={username} onChange={e=>setUsername(e.target.value)} />
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" id="password" placeholder="Enter password" value={password} onChange={e=>setPassword(e.target.value)} />
                </div>

                <button onClick={handleSubmit}>Sign in</button>
            </div>
        </div>
    )
}

export default Login
