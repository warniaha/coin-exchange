import React from 'react'
import Coin from '../Coin/Coin'

export default function CoinList (props) {
    return (
        <div>
            <table className="table table-primary table-borders">
            <thead>
                <tr>
                <th>Name</th>
                <th>Ticker</th>
                <th>Price</th>
                <th>Balance</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.coinData.map( value => 
                        <Coin key={value.key} id={value.key}
                        showBalance={props.showBalance}
                        handleAction={props.handleAction} 
                            {...value} />
                    )
                }
            </tbody>
            </table>
        </div>
    )
}
