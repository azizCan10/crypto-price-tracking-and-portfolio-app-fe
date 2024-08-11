import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TOKEN } from "../config";
import Button from 'react-bootstrap/Button';
import AdminNavbar from "../layout/AdminNavbar";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function Admin() {
    const [allUsers, setAllUsers] = useState(null);
    const [roles, setRoles] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);

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

    const getRoles = async () => {
        try {
            const response = await axios.get('/role', {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                },
            });
            setRoles(response.data);
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

    const handleUpdateClick = async (userId) => {
        setSelectedUserId(userId);
        await getRoles();
        setShowModal(true);
    };

    const handleCheckboxChange = (role) => {
        setSelectedRoles(prevSelectedRoles =>
            prevSelectedRoles.includes(role)
                ? prevSelectedRoles.filter(r => r !== role)
                : [...prevSelectedRoles, role]
        );
    };

    const handleUpdate = async () => {
        try {
            await axios.put('/admin/user', {
                id: selectedUserId,
                authorities: selectedRoles
            }, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                },
            });
            setShowModal(false);
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
                                            <Button variant="success" onClick={() => handleUpdateClick(user.id)}>Update</Button>
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

            <Modal show={showModal} onHide={() => setShowModal(false)} className="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Update User Roles</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {roles.map((role, index) => (
                            <Form.Check
                                key={index}
                                type="checkbox"
                                label={role}
                                onChange={() => handleCheckboxChange(role)}
                                checked={selectedRoles.includes(role)}
                            />
                        ))}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
