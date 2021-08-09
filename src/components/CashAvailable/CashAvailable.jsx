import React, { Component } from 'react'
import './CashAvailable.css';
import { ActionType } from '../ActionType';

export default function CashAvailable (props) {
    const cashText = props.showBalance ? "Cash Available: $" + props.amount : "";
    const handleClickBuyNew = (event) => {
        event.preventDefault();
        // popup a modal to let the user decide what coin & how much
        props.handleAction(ActionType.BuyNew);
    }
    // const handleClickHelicopter = (event) => {
    //     event.preventDefault();
    //     // popup a modal to let the user decide how much
    //     props.handleAction(ActionType.Deposit, 1200);
    // }
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
    return (
        <div className="cashavailable">
            {cashText}
            <button className="btn btn-info" onClick={handleClickDeposit} >Deposit</button>
            {/* <button className="btn btn-success" onClick={handleClickHelicopter} >
                <i className="fas fa-helicopter" />
            </button> */}
            <button className="btn btn-info" onClick={handleClickWithdraw} >Withdraw</button>
            <button className="btn btn-success" onClick={handleClickBuyNew} >Buy</button>
        </div>
    )
}
