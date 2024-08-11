import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TOKEN } from "../config";
import Button from 'react-bootstrap/Button';
import AdminNavbar from "../layout/AdminNavbar";

export default function Admin() {
    const [allUsers, setAllUsers] = useState(null);

    const getAllUsers = async () => {
        try {
            const response = await axios.get('/admin/users', {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                },
            });
            setAllUsers(response.data);
        } catch (error) {
            console.error('API call error:', error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`/admin/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                },
            });
            getAllUsers();
        } catch (error) {
            console.error('API call error:', error);
        }
    };

    const deleteAllUsers = async () => {
        try {
            await axios.delete('/admin/users', {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                },
            });
            getAllUsers();
        } catch (error) {
            console.error('API call error:', error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <>
            <AdminNavbar />
            <div className="d-flex flex-column align-items-center" style={{ height: 'calc(100vh - 56px)' }}>
                <div className="mb-3">
                    <Button variant="danger" onClick={deleteAllUsers}>DELETE ALL</Button>
                </div>
                <div style={{ width: '80%' }}>
                    {allUsers && (
                        <div className="table-container">
                            <table className="custom-table grid-table">
                                <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">E-Mail</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {allUsers.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td>{user.name} {user.surname}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Button variant="success">Update</Button>
                                        </td>
                                        <td>
                                            <Button variant="danger" onClick={() => deleteUser(user.id)}>DELETE</Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
