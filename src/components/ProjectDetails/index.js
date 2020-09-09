import React, { useEffect, useState } from 'react';
import { LeftOutlined, SettingOutlined } from '@ant-design/icons';
import { StyledButton, StyledTable, StyledDiv, StyledSpiner, StyledTableTwo } from './style';
import { Descriptions, Tag } from 'antd';
import moment from 'moment';
import TicketDetails from '../TicketDetails/index';

const ProjectDetails = (props) => {

    const [rows, setRows] = useState(null);
    const [ticketRows, setTicketRows] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [content, setConent] = useState();

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

    const getStatus = (status) => {
        if(status === 1) {
            return <Tag color="magenta">New</Tag>;
        } else if(status === 2) {
            return <Tag color="green">Open</Tag>;
        } else if(status === 3) {
            return <Tag color="red">In progress</Tag>;
        } else if(status === 4) {
            return <Tag color="cyan">Info required</Tag>;
        } else {
            return <Tag color="blue">Done</Tag>;
        }
    }

    const click = (id, title, description, project, developer, submitter, priority, status, type, created,) => {
        setConent(
            <TicketDetails 
                id={id}
                title={title}
                description={description}
                project={project}
                developer={developer}
                submitter={submitter}
                priority={priority}
                status={status}
                type={type}
                created={created}
                show={setShowDetails} 
            />
        );
        setShowDetails(true);
    }

    async function getData() {
        try{
            // Napraviti da se prikazuje i ostalo za detalje za ticket
            const response = await fetch("http://localhost:5000/admin/usersAndTicketsOnProject/" + props.id, {
                method: "POST",
                body: JSON.stringify({
                    token: localStorage.getItem("token"),
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            let data = (await response.json());
            let usersOnProject = data.usersOnProject;
            let ticketsOnProject = data.ticketsOnProject;
            
            let userRows = <>{usersOnProject.map(user =>
                <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{getRole(user.role)}</td>
                </tr>
                )}
            </>
            setRows(userRows);

            let ticketRows = <>{ticketsOnProject.map(ticket =>
                <tr key={ticket.id}>
                    <td>{ticket.title}</td>
                    <td>{ticket.submitter}</td>
                    <td>{ticket.developer}</td>
                    <td>{getStatus(ticket.status)}</td>
                    <td>{moment(ticket.created).format('DD MMM YYYY HH:mm:ss')}</td>
                    <td>
                        <StyledButton onClick={() => {click(
                            ticket.id,
                            ticket.title,
                            ticket.description,
                            ticket.project,
                            ticket.developer,
                            ticket.submitter,
                            ticket.priority,
                            ticket.status,
                            ticket.type,
                            ticket.created,
                            )}}
                        >
                            <SettingOutlined />
                        </StyledButton>
                    </td>
                </tr>
                )}
            </>
            setTicketRows(ticketRows);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {showDetails ? content : 
                <>
                    <h3>
                        <StyledButton onClick={() => {props.show(false)}}><LeftOutlined /></StyledButton>
                        Details for project {props.name}
                    </h3>
                    <StyledDiv>
                        <Descriptions bordered column={1} size="middle">
                            <Descriptions.Item label="Project name">{props.name}</Descriptions.Item>
                            <Descriptions.Item label="Project description">{props.description}</Descriptions.Item>
                        </Descriptions>
                    </StyledDiv>

                    <StyledDiv>
                        <h3>Assigned Personnel</h3>

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
                            </StyledTable> : <StyledSpiner/>
                        }
                    </StyledDiv>

                    <h3>Tickets for this Project</h3>
                    
                    {ticketRows ? 
                        <StyledTableTwo>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Submitter</th>
                                    <th>Developer</th>
                                    <th>Status</th>
                                    <th>Created</th>
                                    <th>Details</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {ticketRows}
                                </tbody>
                        </StyledTableTwo> : <StyledSpiner/>
                    }
                </>
            }
        </>
    );
}

export default ProjectDetails;