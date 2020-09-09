import React from 'react';
import Toolbar from '../../components/Toolbar/index';
import LoginForm from '../../components/LoginForm';
import Button from '../../components/Button/index';

const Login = ({setAuth}) => {
    return (
        <>
            <Toolbar>
                <Button link="/register">Register</Button>
            </Toolbar>
            <LoginForm setAuth={setAuth}/>
        </>
    )
}

export default Login;