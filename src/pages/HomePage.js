import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../layout/Navbar';
import { TOKEN } from "../config";
import TradingViewWidget from "../widget/TradingViewWidget";

export default function HomePage() {
    const [me, setMe] = useState(null);
    const [selectedSymbol, setSelectedSymbol] = useState('BINANCE:BTCUSDT');

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
            console.error('API çağrısı hatası:', error);
        }
    };

    useEffect(() => {
        getMe();
    }, []);

    const handleSymbolClick = (symbol) => {
        setSelectedSymbol(symbol);
    };

    return (
        <>
            <Navbar />
            <div className="d-flex" style={{ height: 'calc(100vh - 56px)' }}>
                <div style={{ width: '80%' }}>
                    <TradingViewWidget symbol={selectedSymbol} />
                </div>

                <div style={{ width: '20%' }}>
                    <table className="custom-table">
                        <thead>
                        <tr>
                            <th scope="col">Tracking</th>
                        </tr>
                        </thead>
                        <tbody>
                        {me && me.tracking && me.tracking.map((x, index) => (
                            <tr key={index} onClick={() => handleSymbolClick(x.symbol)}>
                                <td>{x.symbol}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
