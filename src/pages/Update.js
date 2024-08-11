import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { TOKEN } from "../config";

export default function Update() {
    const [me, setMe] = useState(null);
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const getMe = async () => {
        try {
            const response = await axios.get('/user/me', {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                },
            });
            setMe(response.data);
            setName(response.data.name);
            setSurname(response.data.surname);
            setUsername(response.data.username);
            setEmail(response.data.email);
        } catch (error) {
            console.error('API call error:', error);
        }
    };

    const handleUpdate = async (id) => {
        const requestBody = {
            id: id,
            name: name || null,
            surname: surname || null,
            username: username || null,
            email: email || null,
            password: password || null,
        };

        try {
            await axios.put(`/user`, requestBody, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json',
                },
            });

            window.location.href = '/';
        } catch (error) {
            console.error('API call error:', error);
        }
    };

    useEffect(() => {
        getMe();
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '350px', backgroundColor: "#E0E0E0" }}>
                <h3 className="text-center mb-4">Update</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="surname" className="form-label">Surname</label>
                        <input
                            type="text"
                            className="form-control"
                            name="surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="userName"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">E-Mail</label>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid">
                        <Link className="btn" onClick={() => handleUpdate(me.id)} style={{backgroundColor: '#181c26', color: '#ffffff'}}>Update</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
