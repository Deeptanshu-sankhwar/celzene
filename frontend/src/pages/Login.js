import { useState } from "react";
import axios from 'axios';  // npm install axios

function Login()   {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }


    const callLogInApi = async () => {
        const payload = {
            email: email,
            password: password
        } // this is my object which I will be passing in the body of my request to be sent to the backend server

        // Now I will creat a POST HTTP call using Axios library where I will pass the payload object in the request
        const response = await axios.post('http://localhost:4000/api/login', payload)
        console.log(response.data.token)
        // take this token and assign it in the local storage
        localStorage.setItem('token', response.data.token);

        // local storage is a short database inside our browser which stores data in key-value pairs
    }

    return (
        <div>

            <div>
                <p>Enter your email</p>
                <input type="text" value={email} onChange={handleEmailChange}></input>
            </div>

            <div>
                <p>Enter your password</p>
                <input type="password" value={password} onChange={handlePasswordChange}></input>
            </div>

            <button onClick={callLogInApi}>Login</button>

        </div>
    )
}

export default Login