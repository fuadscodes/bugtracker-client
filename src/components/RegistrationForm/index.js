import React, { useState } from "react";
import Button from '../Button/index';
import Window from "../Window/Window";
import { StyledForm } from './style';
import { message } from "antd";

const RegistrationForm = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRetyped, setPasswordRetyped] = useState("");

    const handleClick = (event) => {
        event.preventDefault();
        if(firstName === "") {
            message.error("First Name is required!");
        } else if (lastName === "") {
            message.error("Last Name is required!");
        } else if (email === "") {
            message.error("Email is required!");
        } else if (username === "") {
            message.error("Username is required!");
        } else if (username.length < 6) {
            message.error("Username must be at least 6 characters long!");
        } else if (password === "") {
            message.error("Password is required!");
        } else if (password.length < 8) {
            message.error("Password must be at least 8 characters long!");
        } else if (passwordRetyped.length < 8) {
            message.error("Password must be at least 8 characters long!");
        } else if (password !== passwordRetyped) {
            message.error("Passwords must match!");
        } else {
            fetch('http://localhost:5000/register', {
                    method: "POST",
                    body: JSON.stringify({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
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
                            message.success("Registered Successfully");
                            props.setAuth(true);
                        })
                    } else if(res.status === 401) {
                        message.error("There is already user with this e-mail!");
                    }
                }).catch(err => {
                    console.log(err.message);
                });
        }
    }

    return(
        <StyledForm>
            <Window>
                <h1>Registration</h1>
                <div>
                    <input 
                        type={"text"} 
                        placeholder="First Name" 
                        value={firstName}
                        onChange={(event) => {setFirstName(event.target.value)}}
                    />
                </div>

                <div>
                    <input 
                        type={"text"} 
                        placeholder="Last Name"
                        value={lastName} 
                        onChange={(event) => {setLastName(event.target.value)}}
                    />
                </div>

                <div>
                    <input 
                        type={"text"} 
                        placeholder="Email Address"
                        value={email} 
                        onChange={(event) => {setEmail(event.target.value)}}
                    />
                </div>

                <div>
                    <input 
                        type={"text"} 
                        placeholder="Username"
                        value={username}
                        onChange={(event) => {setUsername(event.target.value)}}
                    />
                </div>

                <div>
                    <input 
                        type={"password"} 
                        placeholder="Password" 
                        value={password} 
                        onChange={(event) => {setPassword(event.target.value)}}
                    />
                </div>

                <div>
                    <input 
                        type={"password"} 
                        placeholder="Retype Password"
                        value={passwordRetyped} 
                        onChange={(event) => {setPasswordRetyped(event.target.value)}}    
                    />
                </div>

                <Button>
                    <b onClick={((event) =>{handleClick(event)})}>Sign up</b>
                </Button>
            </Window>
        </StyledForm>
    )
};

export default RegistrationForm;
