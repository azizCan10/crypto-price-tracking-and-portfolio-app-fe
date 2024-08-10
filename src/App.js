import './App.css';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import  React from 'react';
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import OperationHistory from "./pages/OperationHistory";
import Register from "./pages/Register";

function App() {
    axios.defaults.baseURL = 'http://localhost:8080/api';

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route index element={<Login/>} />

                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/portfolio" element={<Portfolio />} />
                    <Route exact path="/operation-history" element={<OperationHistory />} />
                    <Route exact path="/register" element={<Register />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;