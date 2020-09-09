import React, { useState, useEffect } from 'react';
import { StyledForm, StyledButton, StyledInput, StyledTable, StyledSpiner, StyledButtonTwo } from './style';
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { message, Select, Tag } from 'antd';
import TicketDetails from '../TicketDetails/index';
import moment from 'moment';
import { useWindowDimsContext } from '../../components/Context/useWindowDimsContext'; 
 
const Tickets = () => {

    const { Option } = Select;
    const [toggle, setToggle] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescritpion] = useState("");
    const [rows, setRows] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [content, setConent] = useState();
    const [developers, setDevelopers] = useState([]);
    const [developer, setDeveloper] = useState("");
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState("");
    const [priorities, setPriorities] = useState([]);
    const [priority, setPriority] = useState("");
    const [types, setTypes] = useState([]);
    const [type, setType] = useState("");
    const [statuses, setStatuses] = useState([]);
    const [status, setStatus] = useState("");
    const { TextArea } = StyledInput;
    const { dimensions } = useWindowDimsContext();
    const { width } = dimensions;
    let role = JSON.parse(localStorage.getItem("role"));
    let url = "";
    let body = {};

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

    const getPriority = (priority) => {
        if(priority === 1) {
            return <Tag color="green">Low</Tag>;
        } else if(priority === 2) {
            return <Tag color="volcano">Medium</Tag>;
        } else if(priority === 3) {
            return <Tag color="red">High</Tag>;
        }
    }

    const getType = (type) => {
        if(type === 1) {
            return <Tag color="red">Bug</Tag>;
        } else if(type === 2) {
            return <Tag color="green">Improvement</Tag>;
        } else if(type === 3) {
            return <Tag color="cyan">New Feature</Tag>;
        } else if(type === 4) {
            return <Tag color="blue">Test</Tag>;
        } else if(type === 5) {
            return <Tag color="lime">Task</Tag>;
        } else if(type === 6) {
            return <Tag color="purple">Sub Task</Tag>;
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

    const changeDeveloper = (developer) => {
        setDeveloper(developer);
    }

    const changeProject = (project) => {
        setProject(project);
    }

    const changePriority = (priority) => {
        setPriority(priority);
    }

    const changeType = (type) => {
        setType(type);
    }

    const changeStatus = (status) => {
        setStatus(status);
    }

    if(role === 1) {
        url = "http://localhost:5000/admin/ticket"
        body = JSON.stringify({
            token: localStorage.getItem("token"),
        });
    } else {
        url = "http://localhost:5000/dashboard/ticket";
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
                }
            });

            let data = (await response.json());
            let projects = data.projects;
            let developers = data.developers;
            let priorities = data.priorities;
            let types = data.types;
            let tickets = data.tickets;
            let statuses = data.statuses;

            let developerList = <>{developers.map(developer => <Option key={developer.user_id} value={developer.user_id}>{developer.username}</Option>)}</>;
            setDevelopers(developerList);

            let projectList = <>{projects.map(project => <Option key={project.id} value={project.id}>{project.name}</Option>)}</>;
            setProjects(projectList);

            let statusList = <>{statuses.map(status => <Option key={status.id} value={status.id}>{status.name}</Option>)}</>;
            setStatuses(statusList);

            let priorityList = <>{priorities.map(priority => <Option key={priority.id} value={priority.id}>{priority.name}</Option>)}</>;
            setPriorities(priorityList);

            let typeList = <>{types.map(type => <Option key={type.id} value={type.id}>{type.name}</Option>)}</>;
            setTypes(typeList);

            let ticketRows = <>{tickets.map(ticket => 
                <tr key={ticket.id}>
                    <td>{ticket.title}</td>
                    <td>{ticket.project}</td>
                    {width > 1000 ? 
                        <>
                            <td>{ticket.developer}</td>
                            <td>{getPriority(ticket.priority)}</td>
                            <td>{getStatus(ticket.status)}</td>
                            <td>{getType(ticket.type)}</td>
                            <td>{moment(ticket.created).format('DD MMM YYYY')}</td>
                        </>
                        :null
                    }
                    <td>
                        <StyledButton onClick={() => {
                            deleteTicket(
                                ticket.id, 
                                ticket.title, 
                                ticket.description,
                                ticket.project,
                                ticket.priority,)
                            }}
                        >
                            <DeleteOutlined />
                        </StyledButton>
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
            setRows(ticketRows);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteTicket = (id) => {
        fetch('http://localhost:5000/admin/deleteTicket/' + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem("token"),
            }),
        }).then(res => {
            if(res.status === 200) {
                message.success("Ticket successfully deleted!");
                getData();
            } else {
                message.error("Error while deleting ticket!");
            }
        }).catch(err => {
            console.log(err.message);
        });
    }

    const handleClick = (event) => {
        event.preventDefault();
        if(title === "") {
            message.error("Title is required!");
        } else if (description === "") {
            message.error("Descritpion is required!");
        } else if (title.length > 45) {
            message.error("Title is 45 max!");
        } else if (description.length > 255) {
            message.error("Description is 255 max!");
        } else if (developer === "") {
            message.error("Developer is required!");
        } else if (project === "") {
            message.error("Project is required!");
        } else if (priority === "") {
            message.error("Priority is required!");
        } else if (type === "") {
            message.error("Type is required!");
        } else if (status === "") {
            message.error("Status is required!");
        } else {
            fetch('http://localhost:5000/admin/addTicket', {
                    method: "POST",
                    body: JSON.stringify({
                        title: title,
                        description: description,
                        project: project,
                        developer: developer,
                        priority: priority,
                        type: type,
                        submitter: JSON.parse(localStorage.getItem("user")).user_id,
                        status: status,
                        token: localStorage.getItem("token"),
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    if(res.status === 200) {
                        setTitle("");
                        setDescritpion("");
                        setToggle(false);
                        message.success("Ticket successfully created!");
                        getData();
                    } else {
                        message.error("There is already ticket with this name!");
                    }
                }).catch(err => {
                    console.log(err.message);
                });
        }
    }

    const form = 
    <div>
        <StyledInput type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => {setTitle(event.target.value)}}
        />
        <TextArea 
            rows={4} 
            placeholder="Description" 
            value={description}
            onChange={(event) => {setDescritpion(event.target.value)}}
            style={{ width: '100%', marginBottom: 5 }}
        />
        <Select defaultValue="Select developer" style={{ width: '100%', marginBottom: 5 }} onChange={changeDeveloper}>
            {developers}
        </Select>
        <Select defaultValue="Select project" style={{ width: '100%', marginBottom: 5 }} onChange={changeProject}>
            {projects}
        </Select>
        <Select defaultValue="Select priority" style={{ width: '100%', marginBottom: 5 }} onChange={changePriority}>
            {priorities}
        </Select>
        <Select defaultValue="Select type" style={{ width: '100%', marginBottom: 5 }} onChange={changeType}>
            {types}
        </Select>
        <Select defaultValue="Select status" style={{ width: '100%', marginBottom: 5 }} onChange={changeStatus}>
            {statuses}
        </Select>

        <StyledButtonTwo onClick={((event) =>{handleClick(event)})}>Save</StyledButtonTwo>
    </div>;

    return (
        <>
            {showDetails ? content :
                <>
                    <h2>All the tickets in your database</h2>
                    <StyledForm>
                        <StyledButton onClick={() => {setToggle(!toggle)}}>Create Ticket</StyledButton>
                        {toggle ? form : null}
                    </StyledForm>
                    {rows ? 
                    <StyledTable>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Project</th>
                                {width > 1000 ? 
                                    <>
                                        <th>Developer</th>
                                        <th>Priority</th>
                                        <th>Status</th>
                                        <th>Type</th>
                                        <th>Created</th>
                                    </>
                                    :null
                                }
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
        </>
    )
}

export default Tickets;