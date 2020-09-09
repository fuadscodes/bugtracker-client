import React, { useState, useEffect } from 'react';
import { Tag, message } from 'antd';
import { StyledTable, StyledSpiner, StyledButton, StyledForm, StyledSelect } from './style';
import { DeleteOutlined } from '@ant-design/icons';

const Users = () => {
    const { Option } = StyledSelect;
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [rows, setRows] = useState(null);
    const [user, setUser] = useState(null);
    const [project, setProject] = useState(null);

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

    const changeUsername = (username) => {
        setUser(username);
    }

    const changeProject = (project) => {
        setProject(project);
    }

    async function getData() {
        try{
            const response = await fetch("http://localhost:5000/admin", {
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
            let projects = data.projects;
            let project_user = data.project_user;
            

            let userList = <>{users.map(user => <Option key={user.user_id} value={user.user_id}>{user.username}</Option>)}</>;
            setUsers(userList);
            
            let projectList = <>{projects.map(project => <Option key={project.id} value={project.id}>{project.name}</Option>)}</>;
            setProjects(projectList);

            let userRows = <>{project_user.map(project_user =>
                <tr key={project_user.id}>
                    <td>{project_user.username}</td>
                    <td>{project_user.name}</td>
                    <td>{getRole(project_user.role)}</td>
                    <td>
                        <StyledButton onClick={() => {deleteUser(project_user.id)}}>
                            <DeleteOutlined />
                        </StyledButton>
                    </td>
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

    const deleteUser = (id) => {
        fetch('http://localhost:5000/admin/deleteProjectUser/' + id, {
            method: "DELETE",
            body: JSON.stringify({
                token: localStorage.getItem("token"),
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => {
            if(res.status === 200) {
                message.success("User successfully deleted from project!");
                getData();
            } else {
                message.error("Error while deleting user from project!");
            }
        }).catch(err => {
            console.log(err.message);
        });
    }

    const addUserOnProject = () => {
        if(user === null) {
            message.warning("Select user!");
        } else if(project === null) {
            message.warning("Select project!");
        } else {
            fetch('http://localhost:5000/admin/addUserToProject', {
            method: "POST",
            body: JSON.stringify({
                user: parseInt(user),
                project: project,
                token: localStorage.getItem("token"),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
                }).then(res => {
                    if(res.status === 200) {
                        getData();
                        message.success("User successfully added to project!");
                    } else {
                        message.error("User can't be added to this project!");
                    }
                }).catch(err => {
                    console.log(err.message);
                });
        }
    }

    return (
        <> 
            <h1>Manage Project Users</h1>
            <StyledForm>
                <StyledSelect defaultValue="Select user" onChange={changeUsername}>
                    {users}
                </StyledSelect>
                <StyledSelect defaultValue="Select project" onChange={changeProject}>
                    {projects}
                </StyledSelect>
                <StyledButton onClick={() => {addUserOnProject()}}>Add</StyledButton>
            </StyledForm>

            <h2>Users on projects</h2>
            {rows ? 
            <StyledTable>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Project</th>
                        <th>Role</th>
                        <th>Delete</th>
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

export default Users;