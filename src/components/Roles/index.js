import React, { useState, useEffect } from 'react';
import {
    Tag,
    message
} from 'antd';
import { 
    StyledTable, 
    StyledSpiner, 
    StyledButton,
    StyledForm,
    StyledSelect
} from './style';

const Roles = (props) => {

    const { Option } = StyledSelect;
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [rows, setRows] = useState(null);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

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

    async function getData() {
        try{
            const response = await fetch("http://localhost:5000/admin/", {
                method: "POST",
                body: JSON.stringify({
                    token: localStorage.getItem("token"),
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            let data = (await response.json());
            let users = data.users;
            let roles = data.roles;
        
            let userList = <>{users.map(user => <Option key={user.user_id} value={user.username}>{user.username}</Option>)}</>;
            setUsers(userList);
            
            let roleList = <>{roles.map(role => <Option key={role.role_id} value={role.role_name}>{role.role_name}</Option>)}</>;
            setRoles(roleList);

            let userRows = <>{users.map(user => 
                <tr key={user.user_id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{getRole(user.role)}</td>
                </tr>
                )}
            </>
            setRows(userRows);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const changeUsername = (username) => {
        setUser(username);
    }

    const changeRole = (role) => {
        let roleNumber = 1;
        if(role === "Admin") {
            roleNumber = 1;
        } else if (role === "Project Manager") {
            roleNumber = 2;
        } else if (role === "Developer") {
            roleNumber = 3;
        } else if (role === 'Tester') {
            roleNumber = 4;
        }
        setRole(roleNumber);
    }

    const editRole = () => {
        if(user === null) {
            message.warning("Select user!");
        } else if(role === null) {
            message.warning("Select role!");
        } else if(user !== 'admin') {
            fetch('http://localhost:5000/admin/editRole', {
            method: "POST",
            body: JSON.stringify({
                user: user,
                role: role,
                token: localStorage.getItem("token"),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
                }).then(res => {
                    if(res.status === 200) {
                        getData();
                        message.success("Role successfully changed!");
                    } else {
                        message.error("Select user and role!");
                    }
                }).catch(err => {
                    console.log(err.message);
                });
        } else {
            message.error("Can't change admin's role!");
        }
    }

    return (
        <> 
            <h1>Manage User Roles</h1>
            <StyledForm>
                <StyledSelect defaultValue="Select user" onChange={changeUsername}>
                    {users}
                </StyledSelect>
                    <StyledSelect defaultValue="Select role" onChange={changeRole}>
                    {roles}
                </StyledSelect>
                <StyledButton onClick={() => {editRole()}}>Submit</StyledButton>
            </StyledForm>

            <h2>All the users in your database</h2>
            {rows ? 
            <StyledTable>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
            </StyledTable>    
            : <StyledSpiner />}
                
        </>
    )
}

export default Roles;