import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TOKEN } from "../config";
import TradingViewWidget from "../widget/TradingViewWidget";
import HomeNavbar from "../layout/HomeNavbar";

export default function Home() {
    const [me, setMe] = useState(null);
    const [selectedSymbol, setSelectedSymbol] = useState('BINANCE:BTCUSDT');
    const [prices, setPrices] = useState({});
    const [previousPrices, setPreviousPrices] = useState({});
    const [admin, setAdmin] = useState(false);

    const getMe = async () => {
        try {
            const response = await axios.get('/user/me', {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json'
                },
            });
            setMe(response.data);

            if (response.data.authorities.includes("ADMIN")) {
                setAdmin(true);
            }
        } catch (error) {
            console.error('API call error:', error);
        }
    };

    useEffect(() => {
        getMe();
    }, []);

    useEffect(() => {
        if (me && me.tracking) {
            const symbols = me.tracking.map(x => x.symbol.toLowerCase() + '@trade').join('/');
            const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${symbols}`);

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                const symbol = data.data.s;
                const price = data.data.p;

                setPrices((prevPrices) => ({
                    ...prevPrices,
                    [symbol]: price,
                }));

                setPreviousPrices((prevPreviousPrices) => ({
                    ...prevPreviousPrices,
                    [symbol]: previousPrices[symbol] || price,
                }));
            };

            ws.onerror = (error) => {
                console.error('WebSocket Error: ', error);
            };

            ws.onclose = () => {
                console.log('WebSocket connection closed');
            };

            return () => {
                ws.close();
            };
        }
    }, [me, prices]);

    const handleSymbolClick = (symbol) => {
        setSelectedSymbol(symbol);
    };

    const getPriceColor = (symbol) => {
        const currentPrice = prices[symbol];
        const previousPrice = previousPrices[symbol];

        if (!currentPrice || !previousPrice) {
            return 'grey';
        }

        return currentPrice > previousPrice ? 'green' : 'red';
    };

    const formatPrice = (price) => {
        const numericPrice = parseFloat(price);
        return isNaN(numericPrice) ? 'Loading...' : numericPrice.toFixed(4);
    };

    return (
        <>
            <HomeNavbar isAdmin={admin} />
            <div className="d-flex" style={{ height: 'calc(100vh - 56px)' }}>
                <div style={{ width: '80%' }}>
                    <TradingViewWidget symbol={selectedSymbol} />
                </div>

                <div style={{ width: '20%' }}>
                    <table className="custom-table">
                        <thead>
                        <tr>
                            <th scope="col">Tracking</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {me && me.tracking && me.tracking.map((x, index) => (
                            <tr key={index} onClick={() => handleSymbolClick(x.symbol)}>
                                <td>{x.symbol}</td>
                                <td style={{ color: getPriceColor(x.symbol) }}>
                                    {formatPrice(prices[x.symbol])}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
