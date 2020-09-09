import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import ErrorPage from "./views/ErrorPage";
import { toast } from 'react-toastify';
import { Provider as WindowDimsProvider } from './components/Context/useWindowDimsContext';
import 'react-toastify/dist/ReactToastify.css';

const Routes = () => {

    toast.configure();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    async function isAuth() {
        try {
            const response = await fetch("http://localhost:5000/verify", {
                method: "POST",
                body: JSON.stringify({
                    token: localStorage.getItem("token")
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const parseRes = await response.json();

            parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
        } catch (err) {
            console.error("Auth error: " + err.message);
        }
    }

    useEffect(() => {
        isAuth();
    }, []);

    const setAuth = (boolean) => {
        setIsAuthenticated(boolean);
    }

    return(
        <Switch>
            <Route 
                exact 
                path="/"
                render={props => 
                    !isAuthenticated ? (
                        <Login {...props} setAuth={setAuth} />
                    ) : (
                        <Redirect to="/dashboard" />
                    )
                }
            />
            <Route 
                exact 
                path="/register"
                render={props => 
                    !isAuthenticated ? (
                        <Register {...props} setAuth={setAuth} />
                    ) : (
                        <Redirect to="/" />
                    )
                }
            />
            <Route 
                exact 
                path="/dashboard"
                render={props => 
                    isAuthenticated ? (
                        <WindowDimsProvider>
                            <Dashboard {...props} setAuth={setAuth} />
                        </WindowDimsProvider>
                    ) : (
                        <Redirect to="/" />
                    )
                }
            />
            <Route component={ErrorPage}/>
        </Switch>
    )
};

export default Routes;
