import React, { useEffect, useState } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { StyledButton, StyledTable, StyledDiv, StyledSpiner, StyledFilesTable, BackButton, StyledInput, StyledButtonTwo, StyledNoteInput, StyledTableTwo, StyledSelect, StyledFileForm, StyledFileInput } from './style';
import { Descriptions, Tag, message } from 'antd';
import moment from 'moment';

const TicketDetails = (props) => {

    const [rows, setRows] = useState(null);
    const [rowsTwo, setRowsTwo] = useState(null);
    const [commentText, setCommentText] = useState("");
    const [status, setStatus] = useState(props.status);
    const [statusSelect, setStatusSelect] = useState([]);
    const [note, setNote] = useState("");
    const [files, setFiles] = useState("");
    const { Option } = StyledSelect;

    const [fileInputState] = useState("");
    const [previewSource, setPreviewSource] = useState();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    }

    const handleSubmitFile = (e) => {
        if(!previewSource) return;
        if(note === "") {
            message.warning("Note is required!");
        } else {
            uploadImage(previewSource);
        }
    }

    const uploadImage = async (base64EncodedImage) => {
        try {
            const image = await fetch("http://localhost:5000/files/uploadFile", {
                method: "POST",
                body: JSON.stringify({
                    data: base64EncodedImage,
                    token: localStorage.getItem("token"),
                }),
                headers: {'Content-Type': 'application/json'},
            })
            
            let response = (await image.json());
            let imageUrl = response.url;

            fetch('http://localhost:5000/files/addFile', {
                method: "POST",
                body: JSON.stringify({
                    link: imageUrl,
                    uploader: JSON.parse(localStorage.getItem("user")).user_id,
                    note: note,
                    ticket: props.id,
                    token: localStorage.getItem("token"),
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if(res.status === 200) {
                    message.success("Image successfully uploaded!");
                    getData();
                } else {
                    message.error("Upload error!");
                }
            }).catch(err => {
                console.log(err.message);
            });
        } catch (error) {
            console.error(error);
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

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

    const getStatus = (status) => {
        if(status === 1) {
            return <Tag color="magenta">New</Tag>;
        } else if(status === 2) {
            return <Tag color="green">Open</Tag>;
        } else if(status === 3) {
            return <Tag color="red">In progress</Tag>;
        } else if(status === 4) {
            return <Tag color="cyan">Info required</Tag>;
        }else {
            return <Tag color="blue">Done</Tag>;
        }
    }

    async function getData() {
        try{
            const response = await fetch("http://localhost:5000/admin/ticketDetails/" + props.id, {
                method: "POST",
                body: JSON.stringify({
                    token: localStorage.getItem("token"),
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            let data = (await response.json());
            let comments = data.comments;
            let history = data.history;
            let statuses = data.statuses;
            let files = data.files;

            let statusList = <>{statuses.map(newStatus => <Option key={newStatus.id} value={newStatus.id}>{newStatus.name}</Option>)}</>;
            setStatusSelect(statusList);
            
            let commentRows = <>{comments.map(comment =>
                <tr key={comment.id}>
                    <td>{comment.commenter}</td>
                    <td>{comment.message}</td>
                    <td>{moment(comment.created).format('DD MMM YYYY HH:mm:ss')}</td>
                </tr>
                )}
            </>
            setRows(commentRows);

            let historyRows = <>{history.map(history =>
                <tr key={history.id}>
                    <td>{history.username}</td>
                    <td>{getStatus(history.old)}</td>
                    <td>{getStatus(history.new)}</td>
                    <td>{moment(history.changed).format('DD MMM YYYY HH:mm:ss')}</td>
                </tr>
                )}
            </>
            setRowsTwo(historyRows);

            // eslint-disable-next-line
            let fileRows = <>{files.map(file =>
                {
                    if(file.ticket === props.id) {
                        return (
                        <tr key={file.id}>
                        <td><a href={file.link} target="_blank" rel="noopener noreferrer">Link</a></td>
                        <td>{file.note}</td>
                        <td>{file.uploader}</td>
                        <td>{moment(history.changed).format('DD MMM YYYY HH:mm:ss')}</td>
                        </tr>)
                    } 
                } 
                )}
            </>
            setFiles(fileRows);
        } catch (err) {
            console.error(err.message);
        }
    }

    const changeStatus = (newStatus) => {
        if(status !== newStatus) {
            let oldStatus = status;

            fetch('http://localhost:5000/admin/changeStatus', {
                method: "POST",
                body: JSON.stringify({
                    status: newStatus,
                    id: props.id,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if(res.status === 200) {
                    setStatus(newStatus);
                fetch('http://localhost:5000/admin/addInHistory', {
                    method: "POST",
                    body: JSON.stringify({
                        ticket: props.id,
                        new: newStatus,
                        old: oldStatus,
                        user: JSON.parse(localStorage.getItem("user")).user_id,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    if(res.status === 200) {
                        message.success("Status successfully chenged!");
                        getData();
                    } else {
                        message.error("Error while writing in history!");
                    }
                }).catch(err => {
                    console.log(err.message);
                });
                } else {
                    message.error("Error while changing status!");
                }
            }).catch(err => {
                console.log(err.message);
            });
        } else {
            message.error("Can't change status!");
        }
        
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClick = (event) => {
        event.preventDefault();
        if(commentText === "") {
            message.error("Message is required!");
        } else if (commentText.length > 255) {
            message.error("Message is 255 max!");
        } else {
            fetch('http://localhost:5000/admin/addComment', {
                    method: "POST",
                    body: JSON.stringify({
                        message: commentText,
                        commenter: JSON.parse(localStorage.getItem("user")).user_id,
                        ticket: props.id,
                        token: localStorage.getItem("token"),
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    if(res.status === 200) {
                        setCommentText("");
                        message.success("Comment successfully created!");
                        getData();
                    } else {
                        message.error("Error while adding comment!");
                    }
                }).catch(err => {
                    console.log(err.message);
                });
        }
    }

    return (
        <>
            <h3>
                <BackButton onClick={() => {props.show(false)}}><LeftOutlined /></BackButton>
                Details for ticket {props.title}
            </h3>
            
            <StyledDiv>
                <Descriptions bordered column={1} size="middle">
                    <Descriptions.Item label="Title">{props.title}</Descriptions.Item>
                    <Descriptions.Item label="Description">{props.description}</Descriptions.Item>
                    <Descriptions.Item label="Project">{props.project}</Descriptions.Item>
                    <Descriptions.Item label="Submitter">{props.submitter}</Descriptions.Item>
                    <Descriptions.Item label="Developer">{props.developer}</Descriptions.Item>
                    <Descriptions.Item label="Priority">{getPriority(props.priority)}</Descriptions.Item>
                    <Descriptions.Item label="Status">
                        <>
                            {getStatus(status)}
                            <StyledSelect defaultValue="New status" onChange={changeStatus}>
                                {statusSelect}
                            </StyledSelect>
                        </>
                    </Descriptions.Item>
                    <Descriptions.Item label="Type">{getType(props.type)}</Descriptions.Item>
                    <Descriptions.Item label="Created">{moment(props.created).format('DD MMM YYYY HH:mm:ss')}</Descriptions.Item>
                </Descriptions>
            </StyledDiv>

            <StyledDiv>
                <h3>All comments for this ticket</h3>

                <h4>Add a Comment?</h4>
                <StyledInput 
                    type="text"
                    placeholder=""
                    value={commentText}
                    onChange={(event) => {setCommentText(event.target.value)}}
                />
                
                <StyledButtonTwo onClick={((event) =>{handleClick(event)})}>Add</StyledButtonTwo>

                {rows ? 
                    <StyledTable>
                        <thead>
                            <tr>
                                <th>Commenter</th>
                                <th>Message</th>
                                <th>Created</th>
                            </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                    </StyledTable> : <StyledSpiner/>
                }

                <StyledFileForm>
                    <h3>Ticket Images</h3>
                    <h4>Add an Image?</h4>

                    <form onSubmit={handleSubmitFile}>  
                        <StyledFileInput 
                            type="file" 
                            name="file" 
                            onChange={handleFileInputChange}
                            value={fileInputState}
                        />
                        <StyledNoteInput type="text" value={note} onChange={(e) => {setNote(e.target.value)}} placeholder="Note" />
                    </form>

                    <StyledButton type="submit" onClick={(e) => {handleSubmitFile(e)}}>Upload</StyledButton>

                </StyledFileForm>

                {files ? 
                    <StyledFilesTable>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Note</th>
                                <th>Uploader</th>
                                <th>Created</th>
                            </tr>
                            </thead>
                            <tbody>
                                {files}
                            </tbody>
                    </StyledFilesTable> : <StyledSpiner/>
                }


                <h3>Ticket History</h3>

                {rowsTwo ? 
                    <StyledTableTwo>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Old</th>
                                <th>New</th>
                                <th>Changed</th>
                            </tr>
                            </thead>
                            <tbody>
                                {rowsTwo}
                            </tbody>
                    </StyledTableTwo> : <StyledSpiner/>
                }
            </StyledDiv>
        </>
    );
}

export default TicketDetails;