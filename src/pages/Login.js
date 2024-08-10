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
            const response = await axios.post(`/auth/generate-token`, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            alert('Giriş başarılı');
            localStorage.setItem('token', response.data)
            window.location.href = '/home';
        } catch (error) {
            if (error.response.status === 404) {
                alert("Böyle bir kullanıcı bulunmamaktadır!");
            } else {
                alert("Kullanıcı adı ya da şifre hatalı!");
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '350px', backgroundColor: "#f8f9fa" }}>
                <h3 className="text-center mb-4">Giriş Yap</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">Kullanıcı Adı</label>
                        <input
                            type="text"
                            className="form-control"
                            name="userName"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Şifre</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid">
                        <Link className="btn btn-success mx-2" onClick={login}>Giriş Yap</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
