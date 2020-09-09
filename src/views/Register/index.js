import React from 'react';
import Toolbar from '../../components/Toolbar/index';
import RegistrationForm from '../../components/RegistrationForm/index';
import Button from '../../components/Button/index';

const Register = ({setAuth}) => {
    return (
        <>
            <Toolbar>
                <Button link="/">Login</Button>
            </Toolbar>
            <RegistrationForm setAuth={setAuth} />
        </>
    )
}

export default Register;