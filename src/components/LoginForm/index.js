import React, { useState } from "react";
import Window from "../Window/Window";
import { LoginBox } from './style';
import Button from '../Button/index';
import { message } from 'antd';

const LoginForm = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleClick = (event) => {
        event.preventDefault();
        if(username === "") {
            message.error("Username is required!");
        } else if (password === "") {
            message.error("Password is required!");
        } else {

            fetch('http://localhost:5000/login', {
                    method: "POST",
                    body: JSON.stringify({
                        username: username,
                        password: password
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    if(res.status === 200) {
                        res.json().then(data => {
                            localStorage.setItem("token", data.token);
                            let user = {
                                user_id: data.user_id,
                                first_name: data.first_name,
                                last_name: data.last_name,
                                username: data.username,
                                email: data.email,
                                role: data.role
                            }
                            localStorage.setItem("user", JSON.stringify(user));
                            localStorage.setItem("role", JSON.stringify(user.role));
                        })
                        message.success("Login Succesfully");
                        props.setAuth(true);
                    } else {
                        message.error("Password or Username is incorrect!");
                    }
                }).catch(err => {
                    console.log(err.message);
                });
        }
    }

    return(
        <LoginBox>
            <Window>
                <h1>Login</h1>
                <div>
                    <input 
                        type={"text"} 
                        placeholder="Username" 
                        name="" 
                        value={username} 
                        onChange={(e) => {handleUsernameChange(e)}}
                        />
                </div>

                <div>
                    <input 
                        type={"password"}
                        placeholder="Password" 
                        name="" 
                        value={password}
                        onChange={(e) => {handlePasswordChange(e)}}
                        />
                </div>
                <Button><b onClick={((event) =>{handleClick(event)})}>Sign in</b></Button>
            </Window>
        </LoginBox>
    )
};

export default LoginForm;
