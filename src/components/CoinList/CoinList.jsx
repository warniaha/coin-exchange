import React from 'react'
import Coin from '../Coin/Coin'

export default function CoinList (props) {
    const coinBalances = () => {
        if (props.coinBalance) {
            // console.log(`CoinList: ${props.coinBalance} ${JSON.stringify(props.coinBalance)}`);
            return props.coinBalance.map( value => 
                <Coin key={value.key} id={value.key}
                    showBalance={props.showBalance}
                    coinTicker={props.coinTicker}
                    handleAction={props.handleAction} 
                    {...value} />
            )
        }
    }
    return (
        <div>
            <table className="table table-primary table-borders">
            <thead>
                <tr>
                <th>Name</th>
                <th>Ticker</th>
                <th>Shares</th>
                <th>Price</th>
                <th>Cost Basis</th>
                <th>Balance</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {coinBalances()}
            </tbody>
            </table>
        </div>
    )
}
