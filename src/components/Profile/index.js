import React, { useState } from 'react';
import { 
    Descriptions, 
    Tag 
} from 'antd';
import { 
    EyeInvisibleOutlined, 
    EyeTwoTone 
} from '@ant-design/icons';
import { 
    StyledForm,
    StyledInput, 
    StyledButton,
} from './style';
import { message } from "antd";

const Profile = (props) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [toggle, setToggle] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");

    const handleClick = (event) => {
        event.preventDefault();
        if(currentPassword === "") {
            message.error("Current Password is required!");
        } else if (currentPassword.length < 8) {
            message.error("Password must be at least 8 characters long!");
        } else if (newPassword === "") {
            message.error("New Password is required!");
        } else if (newPassword.length < 8) {
            message.error("Password must be at least 8 characters long!");
        } else if (retypedPassword === "") {
            message.error("Retyped Password is required!");
        } else if (retypedPassword.length < 8) {
            message.error("Password must be at least 8 characters long!");
        }else if (newPassword !== retypedPassword) {
            message.error("Passwords must match!");
        } else if (newPassword === currentPassword) {
            message.error("New password is same as current password!");
        } else {
            console.log(user.user_id);
            fetch('http://localhost:5000/dashboard/changePassword/', {
                    method: "POST",
                    body: JSON.stringify({
                        toke: localStorage.getItem("token"),
                        user_id: user.user_id,
                        currentPassword: currentPassword,
                        newPassword: newPassword,
                        retypedPassword: retypedPassword,
                        token: localStorage.getItem("token"),
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    if(res.status === 200) {
                            message.success("Password changed successfully!");
                            setToggle(false);
                    } else if(res.status === 401) {
                        message.error("Error!");
                    }
                }).catch(err => {
                    console.log(err.message);
                });
        }
    }

    let content = 
        <StyledForm>
            <StyledInput type="password"
                placeholder="Current password"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                value={currentPassword}
                onChange={(event) => {setCurrentPassword(event.target.value)}}
            />
            <StyledInput type="password"
                placeholder="New password"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                value={newPassword}
                onChange={(event) => {setNewPassword(event.target.value)}}
            />
            <StyledInput type="password"
                placeholder="Retype new password"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                value={retypedPassword}
                onChange={(event) => {setRetypedPassword(event.target.value)}}
            />

            <StyledButton onClick={((event) =>{handleClick(event)})}>Save</StyledButton>
        </StyledForm>
    
    const getRole = (role) => {
        if(role === 1) {
            return <Tag color="red">Admin</Tag>;
        } else if(role === 2) {
            return <Tag color="green">Project Manager</Tag>;
        } else if(role === 3) {
            return <Tag color="cyan">Developer</Tag>;
        } else if(role === 4) {
            return <Tag color="blue">Tester</Tag>;
        } else {
            return <Tag color="magenta">N/A</Tag>;
        }
    }

    return (
        <>
            <h2>User Profile</h2>
            <Descriptions bordered column={1} size="middle">
                <Descriptions.Item label="First Name">{user.first_name}</Descriptions.Item>
                <Descriptions.Item label="Last Name">{user.last_name}</Descriptions.Item>
                <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
                <Descriptions.Item label="Role">{getRole(user.role)}</Descriptions.Item>
            </Descriptions>
            <br/>
            <StyledButton onClick={() => {setToggle(!toggle)}}>Change password</StyledButton>
            {toggle ? content: null}
        </>
    )
}

export default Profile;