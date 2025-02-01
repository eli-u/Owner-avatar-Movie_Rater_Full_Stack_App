import React, { useState, useContext, useEffect } from "react";
import API from "../services/api-service";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom'
// import { TokenContext } from '../main.jsx';

export default function Auth() {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginView, setIsLoginView] = useState(true);

    const [token, setToken] = useCookies("mr-token");
    const navigate = useNavigate();

    useEffect(() => {
        // console.log('token', token['mr-token']);
        if (token['mr-token']) navigate('/movies')
    }, [token])

    const loginUser = () => {
        const getToken = async () => {
            const resp = await API.loginUser({ username, password });
            if (resp) {
                setToken("mr-token", resp.token);
                navigate('/movies');
            }
        }
        getToken();
    }

    const registerUser = () => {
        const register = async () => {
            const resp = await API.registerUser({ username, password });
            if (resp) loginUser();
        }
        register();
    }

    const isDisabled = username == '' || password == '';

    return (
        <div className='App'>
            <header className='App-header p-10 border-b-2 border-orange-500 mb-5'>
                {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}
            </header>

            <div className="grid grid-cols-2 gap-2 w-1/2">
                <label htmlFor="username">Username</label>
                <input className="bg-white text-black" id="username" type="text" placeholder="Username" value={username}
                    onChange={(evt) => setUserName(evt.target.value)} />

                <label htmlFor="password">Password</label>
                <input className="bg-white text-black" id="password" type="password" placeholder="Password" value={password}
                    onChange={(evt) => setPassword(evt.target.value)} />

                <p>&nbsp;</p>
                {isLoginView ?
                    <button onClick={() => loginUser()} disabled={isDisabled}>Login</button> :
                    <button onClick={() => registerUser()} disabled={isDisabled}>Register</button>
                }
            </div>
            {isLoginView ?
                <p>You don't have an account? <span onClick={() => setIsLoginView(false)}> <u>Register here</u> </span></p> :
                <p>Already have an account? <span onClick={() => setIsLoginView(true)}> <u>Login here</u> </span> </p>
            }

        </div>

    )
}