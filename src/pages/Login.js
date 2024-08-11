import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const login = async (e) => {
        e.preventDefault();

        const requestBody = {
            username: username,
            password: password,
        };

        try {
            const response = await axios.post(`/auth/login`, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            localStorage.setItem('token', response.data)
            window.location.href = '/home';
        } catch (error) {
            if (error.response.status === 404) {
                alert("There is no such user!");
            } else {
                alert("Username or password is wrong!!");
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '350px', backgroundColor: "#E0E0E0" }}>
                <h3 className="text-center mb-4">Log in</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="userName"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid">
                        <Link className="btn" onClick={login} style={{backgroundColor: '#181c26', color: '#ffffff'}}>Log
                            in</Link>
                    </div>
                    <div className="text-center mt-3">
                        <span>Not registered yet? </span>
                        <Link to="/register" style={{color: '#181c26', textDecoration: 'underline'}}>Sign up now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
