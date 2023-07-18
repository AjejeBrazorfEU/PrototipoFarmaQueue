import React, { useState } from "react";
import { roles,LoginUser } from "./Mock";

function Login({setToken}){
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
            console.log(res);
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
            </form>
        </div>
    );
}

export default Login;