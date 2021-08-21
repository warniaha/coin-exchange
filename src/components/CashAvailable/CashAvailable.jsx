import React from 'react'
import './CashAvailable.css';
import { ActionType } from '../ActionType';
import { formatPrice } from '../../functions/formatPrice'

export default function CashAvailable (props) {
    const cashText = `Cash Available: $${props.showBalance ? formatPrice(props.amount, 2) : " -"}`;
    const handleClickBuyNew = (event) => {
        event.preventDefault();
        // popup a modal to let the user decide what coin & how much
        props.handleAction(ActionType.BuyNew);
    }
    const handleClickDeposit = (event) => {
        event.preventDefault();
        // popup a modal to let the user decide how much
        props.handleAction(ActionType.Deposit, 1000);
    }
    const handleClickWithdraw = (event) => {
        event.preventDefault();
        // popup a modal to let the user decide how much
        props.handleAction(ActionType.Withdraw, 1000);
    }
    const buyEnabled = Boolean(props.coinTicker);
    return (
        <div className="cashavailable">
            {cashText}
            <div className='btn-toolbar text-center well'>
                <button className="btn btn-info" onClick={handleClickDeposit} >Deposit</button>
                <button className="btn btn-info" onClick={handleClickWithdraw} >Withdraw</button>
                <button className="btn btn-success" disabled={!buyEnabled} onClick={handleClickBuyNew} >Buy</button>
            </div>
        </div>
    )
}
