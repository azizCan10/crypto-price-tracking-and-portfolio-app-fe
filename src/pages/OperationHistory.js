import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TOKEN } from "../config";
import OperationHistoryNavbar from "../layout/OperationHistoryNavbar";

export default function OperationHistory() {
    const [operationHistory, setOperationHistory] = useState(null);

    const getOperationHistory = async () => {
        try {
            const response = await axios.get('/operation-history', {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                },
            });
            setOperationHistory(response.data);
        } catch (error) {
            console.error('API call error:', error);
        }
    };

    useEffect(() => {
        getOperationHistory();
    }, []);

    return (
        <>
            <OperationHistoryNavbar />
            <div className="d-flex flex-column align-items-center" style={{ height: 'calc(100vh - 56px)' }}>
                <div style={{ width: '80%' }}>
                    {operationHistory && (
                        <div className="table-container">
                            <table className="custom-table grid-table">
                                <thead>
                                <tr>
                                    <th scope="col">Symbol</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Buy/Sell</th>
                                </tr>
                                </thead>
                                <tbody>
                                {operationHistory.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.crypto.symbol}</td>
                                        <td>{item.price.toFixed(2)}</td>
                                        <td>{item.amount.toFixed(2)}</td>
                                        <td style={{ color: item.buyOrSell === 'BUY' ? 'green' : 'red' }}>
                                            {item.buyOrSell}
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
