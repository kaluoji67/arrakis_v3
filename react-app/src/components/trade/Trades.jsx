import React from 'react'
import { useState, useEffect } from 'react'
import { TradeDetail } from './TradeDetail'
import Table from 'react-bootstrap/Table';
import { getAllTrades, getTradesBySecurityId } from '../../services/trade-service';

const dummy = [
    {
        id: 'id',
        isin: 111,
        bookId: 'book 22',
        counterParty: 'shell',
        status: 'open',
        quantity: 3,
        unitPrice: 10,
        currency: 'USD',
        buySell: 'sell',
        tradeDate: '03.04.2023',
        settlementDate: '03.06.2024'

    }
]

const Trades = ( props ) => {
    const [trades, setTrades] = useState([]);
    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(false);

    const getAllTradesFromAPI = () => {
        getAllTrades([props.id])
            .then(res => {
                setLoaded(true);
                setTrades(res.data);
                setError('');
            })
            .catch(err => {
                setTrades([]);
                setError(err);
                console.log(err);
                setLoaded(false);
            })

    }



    useEffect(() => {
        getAllTradesFromAPI();
    },
        []
    );


    if (error && !loaded) {
        return (
            <div className='x'>
                <p>
                    ERROR LOADING TRADES
                </p>
            </div>
        )
    }
    if (!loaded) {
        return (
            <div className='x'>
                <p>
                    LOADING TRADES
                </p>
            </div>
        )
    }
    if (loaded) {
        return (
            <div className='trades-table-container'>
                <Table striped bordered hover className='trades-table'>
                    <thead>
                        <tr>
                            {/* <th>ISIN</th> */}
                            <th>Book Id</th>
                            <th>Client</th>
                            <th>Currency</th>
                            <th>Status</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Buy/Sell</th>
                            <th>Trade Date</th>
                            <th>Settlement Date</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            trades.map(trade => (
                                < TradeDetail info={trade} key={trade.id} />
                            ))
                        }
                      
                    </tbody>
                </Table>
            </div>

        )
    }
}


export default Trades