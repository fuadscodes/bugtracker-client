import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/index';
import Home from '../../components/Home';
import Roles from '../../components/Roles';
import Users from '../../components/Users';
import Projects from '../../components/Projects';
import Tickets from '../../components/Tickets';
import Profile from '../../components/Profile';
import Charts from '../../components/Charts';
import Logo from '../../components/Logo/index';
import Backdrop from '../../components/Backdrop/index';
import { message } from 'antd';
import { LogoutOutlined, HomeOutlined, UserOutlined, PieChartOutlined, IdcardOutlined, UsergroupAddOutlined, MenuOutlined, ProfileOutlined } from '@ant-design/icons';
import { StyledDashboard, Right, List, ListButton, StyledButton, StyledButtonTwo, SideDrawer } from './style';
import { useWindowDimsContext } from '../../components/Context/useWindowDimsContext'; 

const Dashboard = ({setAuth}) => {

    const [content, setContent] = useState(<Home />);
    const { dimensions } = useWindowDimsContext();
    const { width } = dimensions;
    const [toggle, setToggle] = useState(false);

    let role = JSON.parse(localStorage.getItem("role"));
    
    useEffect(() => {
        setTimeout(() => {setContent(<Home />)}, 10);
    }, []);
    
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        message.success("Logged out Successfully");
        setAuth(false);
    }

    return (
        <>
            {width < 1000 ? 
                <>
                    {toggle ? <Backdrop clicked={() => {setToggle(!toggle)}} /> : null}
                    <StyledButtonTwo onClick={() => {setToggle(!toggle)}}>
                        <MenuOutlined />
                    </StyledButtonTwo>
                    {toggle ? 
                        <SideDrawer>
                            <Logo />
                                <List>
                                    <ListButton onClick={(e) => {setContent(<Home />)}}><HomeOutlined /> Home</ListButton>
                                    <ListButton onClick={(e) => {setContent(<Charts />)}}><PieChartOutlined /> Charts</ListButton>
                                    {role === 1 ? 
                                        <>
                                            <ListButton onClick={(e) => {setContent(<Roles />)}}><IdcardOutlined /> Roles</ListButton>
                                            <ListButton onClick={(e) => {setContent(<Users />)}}><UsergroupAddOutlined /> Users</ListButton>
                                        </>
                                    : null}
                                    <ListButton onClick={(e) => {setContent(<Projects />)}}><MenuOutlined /> Projects</ListButton>
                                    <ListButton onClick={(e) => {setContent(<Tickets />)}}><ProfileOutlined /> Tickets</ListButton>
                                    <ListButton onClick={(e) => {setContent(<Profile />)}}><UserOutlined /> Profile</ListButton>
                                    <ListButton onClick={(e) => {logout(e)}}><LogoutOutlined /> Logout</ListButton>
                                </List>
                        </SideDrawer> : null}
                    <Right>
                        {content}
                    </Right>
                </>
            :
                <StyledDashboard>
                    <Navbar>
                        <List>
                            <StyledButton onClick={(e) => {setContent(<Home />)}}><HomeOutlined /> Home</StyledButton>
                            <StyledButton onClick={(e) => {setContent(<Charts />)}}><PieChartOutlined /> Charts</StyledButton>
                            {role === 1 ? 
                                <>
                                    <StyledButton onClick={(e) => {setContent(<Roles />)}}><IdcardOutlined /> Roles</StyledButton>
                                    <StyledButton onClick={(e) => {setContent(<Users />)}}><UsergroupAddOutlined /> Users</StyledButton>
                                </>
                            : null}
                            <StyledButton onClick={(e) => {setContent(<Projects />)}}><MenuOutlined /> Projects</StyledButton>
                            <StyledButton onClick={(e) => {setContent(<Tickets />)}}><ProfileOutlined /> Tickets</StyledButton>
                            <StyledButton onClick={(e) => {setContent(<Profile />)}}><UserOutlined /> Profile</StyledButton>
                            <StyledButton onClick={(e) => {logout(e)}}><LogoutOutlined /> Logout</StyledButton>
                        </List>
                    </Navbar>
                    <Right>
                        {content}
                    </Right>
                </StyledDashboard>
            }
        </>
    )
}

export default Dashboard;