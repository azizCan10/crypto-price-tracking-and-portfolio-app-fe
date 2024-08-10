import './App.css';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import  React from 'react';
import Home from "./pages/Home";
import MyProfile from "./pages/MyProfile";
import OperationHistory from "./pages/OperationHistory";

function App() {
    axios.defaults.baseURL = 'http://localhost:8080/api';

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route index element={<Login/>} />

                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/profile" element={<MyProfile />} />
                    <Route exact path="/operation-history" element={<OperationHistory />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;