import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function Register() {

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const register = async (e) => {
        e.preventDefault();

        const requestBody = {
            name: name,
            surname: surname,
            username: username,
            email: email,
            password: password,
        };

        try {
            await axios.post(`/auth`, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            window.location.href = '/login';
        } catch (error) {
            alert("An error occurred while registering!")
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '350px', backgroundColor: "#E0E0E0" }}>
                <h3 className="text-center mb-4">Log in</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="surname" className="form-label">Surname</label>
                        <input
                            type="text"
                            className="form-control"
                            name="surname"
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </div>
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
                        <label htmlFor="email" className="form-label">E-Mail</label>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
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
                        <Link className="btn" onClick={register} style={{backgroundColor: '#181c26', color: '#ffffff'}}>Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
