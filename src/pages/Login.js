import React, { useState } from "react";
import { roles,LoginUser } from "./Mock";
import { useNavigate } from 'react-router-dom';



function Login({setToken}){
    const navigate = useNavigate();


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function validateForm(){
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event){
        event.preventDefault();
        const res = LoginUser(username, password);
        if(res !== roles.unregistered){
            setToken(res);
            if(res === roles.admin){
                navigate('/homeAdmin');
            }else if(res === roles.utente){
                navigate('/homeUtente/' + username);
            }else if(res === roles.farmacista){
                navigate('/homeFarmacista');
            }else if(res === roles.totem){
                navigate('/homeTotem');
            }
        }else{
            alert("Unregistered");
        }
    }

    return (
        <div className="Login">
            <form className="LoginForm" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input

                        type="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button disabled={!validateForm()} type="submit">Login</button>
                <button onClick={() => navigate('/viewRegistraUtente')}>Registrati</button>
            </form>
        </div>
    );
}

export default Login;