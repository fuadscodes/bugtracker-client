import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { BrowserRouter as Router } from "react-router-dom";
import 'antd/dist/antd.css';
import './index.css';

const App = () => {
  return (
    <Router>
        <Routes />
    </Router>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));