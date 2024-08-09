import './App.css';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import  React from 'react';

function App() {
    axios.defaults.baseURL = 'http://localhost:8080/api';

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route index element={<Login/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;