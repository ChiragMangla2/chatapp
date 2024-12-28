import { useState,useEffect } from "react"
import axios from 'axios';
import { useNavigate } from "react-router";

const Signup = () => {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [cPassword,setCpassword] = useState("");
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(localStorage.getItem('chat-practice')){
            navigate('/');
        }
    },[]);

    const handleSubmit = async () => {
        if(!username || !password || !cPassword) {
            return
        }else if(password != cPassword) {
            alert("Password and Confirm password must be same");
        }

        const data = await axios.post(`http://localhost:3000/api/v1/auth/signup`,{
            username, password
        });

        console.log(data)

        if(data?.data.success){
            navigate('/login')
        }
        
        alert(data.data.message)
    }

    return (
        <div className="main">
            <div className="sub">
                <h1>Register</h1>
                <div className="field">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="Enter username" value={username} onChange={e=>setUsername(e.target.value)} />
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" id="password" placeholder="Enter password" value={password} onChange={e=>setPassword(e.target.value)} />
                </div>
                <div className="field">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="text" name="cpassword" id="cpassword" placeholder="Enter confirm password" value={cPassword} onChange={e=>setCpassword(e.target.value)} />
                </div>

                <button onClick={handleSubmit}>Sign up</button>
            </div>
        </div>
    )
}

export default Signup
