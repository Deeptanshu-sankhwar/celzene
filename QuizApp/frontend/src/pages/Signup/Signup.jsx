import { useState } from "react";
import axios from 'axios';  // npm install axios

function Signup()   {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }


    const callSignUpApi = async () => {
        const payload = {
            name: name,
            email: email,
            password: password
        } // this is my object which I will be passing in the body of my request to be sent to the backend server

        // Now I will creat a POST HTTP call using Axios library where I will pass the payload object in the request
        const response = await axios.post('http://localhost:5789/api/user/signup', payload)
        console.log(response)
    }

    return (
        <div>
            <div>
                <p>Enter your name</p>
                <input type="text" value={name} onChange={handleNameChange}></input>
            </div>

            <div>
                <p>Enter your email</p>
                <input type="text" value={email} onChange={handleEmailChange}></input>
            </div>

            <div>
                <p>Enter your password</p>
                <input type="password" value={password} onChange={handlePasswordChange}></input>
            </div>

            <button onClick={callSignUpApi}>Signup</button>

        </div>
    )
}

export default Signup