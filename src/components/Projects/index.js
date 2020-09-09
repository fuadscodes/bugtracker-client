import React, { useState, useEffect } from 'react';
import { 
    StyledForm, 
    StyledButton, 
    StyledInput,
    StyledTable,
    StyledSpiner,
    StyledButtonTwo,
} from './style';
import {
    DeleteOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { 
    Input, 
    message 
} from 'antd';
import ProjectDetails from '../ProjectDetails/index';
 
const Projects = () => {

    const [toggle, setToggle] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescritpion] = useState("");
    const [rows, setRows] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [content, setConent] = useState();
    let role = JSON.parse(localStorage.getItem("role"));
    let url = "";
    let body = {};

    const { TextArea } = Input;

    const click = (id, name, description) => {
        setConent(<ProjectDetails id={id} show={setShowDetails} name={name} description={description} />);
        setShowDetails(true);
    }

    if(role === 1) {
        url = "http://localhost:5000/admin/projects"
        body = JSON.stringify({
            token: localStorage.getItem("token"),
        });
    } else {
        url = "http://localhost:5000/dashboard/projects";
        body = JSON.stringify({
            token: localStorage.getItem("token"),
            user: JSON.parse(localStorage.getItem("user")).user_id,
        });
    }

    async function getData() {
        try{
            const response = await fetch(url, {
                method: "POST",
                body: body,
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            let data = (await response.json());
            let projects = data.projects;

            let projectRows = <>{projects.map(project => 
                <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td>
                        <StyledButton onClick={() => {deleteProject(project.id)}}>
                            <DeleteOutlined />
                        </StyledButton>
                        <StyledButton onClick={() => {click(project.id, project.name, project.description)}}>
                            <SettingOutlined />
                        </StyledButton>
                    </td>
                </tr>
                )}
            </>
            setRows(projectRows);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteProject = (id) => {
        fetch('http://localhost:5000/admin/deleteProject/' + id, {
            method: "DELETE",
            body: JSON.stringify({
                token: localStorage.getItem("token"),
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => {
            if(res.status === 200) {
                message.success("Project successfully deleted!");
                getData();
            } else {
                message.error("Error while deleting project!");
            }
        }).catch(err => {
            console.log(err.message);
        });
    }

    const handleClick = (event) => {
        event.preventDefault();
        if(projectName === "") {
            message.error("Project Name is required!");
        } else if (projectDescription === "") {
            message.error("Project Descritpion is required!");
        } else if (projectName.length > 255) {
            message.error("Project Name is 255 max!");
        } else if (projectDescription.length > 255) {
            message.error("Project Description is 255 max!");
        } else {
            fetch('http://localhost:5000/admin/addProject', {
                    method: "POST",
                    body: JSON.stringify({
                        projectName: projectName,
                        projectDescription: projectDescription,
                        token: localStorage.getItem("token"),
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    if(res.status === 200) {
                        setProjectName("");
                        setProjectDescritpion("");
                        setToggle(false);
                        message.success("Project successfully created!");
                        getData();
                    } else {
                        message.error("There is already project with this name!");
                    }
                }).catch(err => {
                    console.log(err.message);
                });
        }
    }

    const form = 
    <div>
        <StyledInput type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(event) => {setProjectName(event.target.value)}}
        />
        <TextArea 
            rows={4} 
            placeholder="Description" 
            value={projectDescription}
            onChange={(event) => {setProjectDescritpion(event.target.value)}}    
        />

        <StyledButtonTwo onClick={((event) =>{handleClick(event)})}>Save</StyledButtonTwo>
    </div>;

    return (
        <div>
            {showDetails ? content :
                <>
                    <h2>All the projects in your database</h2>
                    <StyledForm>
                        <StyledButton onClick={() => {setToggle(!toggle)}}>Create Project</StyledButton>
                        {toggle ? form : null}
                    </StyledForm>
                    {rows ? 
                    <StyledTable>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Delete/Details</th>
                            </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                    </StyledTable>    
                    : <StyledSpiner />}
                </> 
            }
        </div>
    )
}

export default Projects;