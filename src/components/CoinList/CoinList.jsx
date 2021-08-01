import React from 'react'
import Coin from '../Coin/Coin'

export default function CoinList (props) {
    const balanceText = props.showBalance ? <th>Balance</th> : <></>;
    return (
        <div>
            <table className="coin-table">
            <thead>
                <tr>
                <th>Name</th>
                <th>Ticker</th>
                <th>Price</th>
                {balanceText}
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.coinData.map( value => 
                        <Coin key={value.key} id={value.key}
                        showBalance={props.showBalance}
                        handleRefresh={props.handleRefresh} 
                        {...value} />
                    )
                }
            </tbody>
            </table>
        </div>
    )
}
