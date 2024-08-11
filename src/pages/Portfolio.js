import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TOKEN } from "../config";
import PortfolioNavbar from "../layout/PortfolioNavbar";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Portfolio() {
    const [me, setMe] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [formData, setFormData] = useState({
        symbol: '',
        price: '',
        amount: ''
    });

    const getMe = async () => {
        try {
            const response = await axios.get('/user/me', {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                },
            });
            setMe(response.data);
        } catch (error) {
            console.error('API call error:', error);
        }
    };

    useEffect(() => {
        getMe();
    }, []);

    useEffect(() => {
        if (modalData) {
            setFormData({
                symbol: modalData.portfolioCrypto.symbol,
                price: modalData.price,
                amount: modalData.amount
            });
        } else {
            setFormData({
                symbol: '',
                price: '',
                amount: ''
            });
        }
    }, [modalData]);

    const handleButtonClick = (item) => {
        setModalData(item);
        setShowModal(true);
    };

    const handleOpenModal = () => {
        setModalData(null);
        setFormData({
            symbol: '',
            price: '',
            amount: ''
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalData(null);
        getMe();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleOperation = (buyOrSell) => async () => {
        if (!me) return;

        const requestBody = {
            user: {
                id: me.id
            },
            crypto: {
                symbol: formData.symbol
            },
            price: parseFloat(formData.price),
            amount: parseFloat(formData.amount),
            buyOrSell: buyOrSell
        };

        console.log(requestBody);
        try {
            await axios.post('/portfolio', requestBody, {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });
            handleCloseModal();
        } catch (error) {
            console.error('API call error:', error);
        }
    };

    return (
        <>
            <PortfolioNavbar />
            <div className="d-flex flex-column align-items-center" style={{ height: 'calc(100vh - 56px)' }}>
                <div className="mb-3">
                    <Button onClick={handleOpenModal}>
                        Add New Operation
                    </Button>
                </div>
                <div style={{ width: '80%' }}>
                    {me && me.portfolio && (
                        <div className="table-container">
                            <table className="custom-table grid-table">
                                <thead>
                                <tr>
                                    <th scope="col">Symbol</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Total</th>
                                    <th scope="col"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {me.portfolio.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.portfolioCrypto.symbol}</td>
                                        <td>{item.price.toFixed(2)}</td>
                                        <td>{item.amount.toFixed(2)}</td>
                                        <td>{item.total.toFixed(2)}</td>
                                        <td>
                                            <Button onClick={() => handleButtonClick(item)}>Buy Sell</Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal} className="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>{modalData ? 'Edit Operation' : 'Add Operation'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicSymbol">
                            <Form.Label>Symbol</Form.Label>
                            <Form.Control
                                type="text"
                                name="symbol"
                                value={formData.symbol}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="text"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: 'center' }}>
                    <Button variant="success" onClick={handleOperation("BUY")}>BUY</Button>
                    <Button variant="danger" onClick={handleOperation("SELL")}>SELL</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
