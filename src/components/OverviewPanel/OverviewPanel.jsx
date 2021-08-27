import React from 'react'
import styled from 'styled-components';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { ActionType } from '../ActionType';
import PopupButton from '../PopupButton';
import { formatPrice } from '../../functions/formatPrice';

const Td = styled.td`
    border: 2px solid #cccccc;
    width: 25vh;
`;

export default function OverviewPanel(props) {
    const handleShowHideBalance = (event) => {
        event.preventDefault();
        props.handleAction(ActionType.ToggleBalance, !props.showBalance);
    }

    const handleSettings = (event) => {
        event.preventDefault();
        props.handleAction(ActionType.Settings);
    }

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

    const handleClickHelp = (event) => {
        event.preventDefault();
        // popup a modal to let the user decide how much
        props.handleAction(ActionType.Help);
    }

    const netBalance = `${props.showBalance ? "$" + formatPrice(props.netBalance, 2) : " -"}`;
    const totalDeposits = `${props.showBalance ? "Not coded yet" : " -"}`;;
    const feeRate = `${props.feeRate*100}%`;
    const feesCollected = `${props.showBalance ? "$" + formatPrice(props.feesCollected, 2) : " -"}`;
    
    const showHideBalanceText = props.showBalance ? 'Hide Balance' : 'Show Balance';
    const showHideBalanceVariant = (props.showBalance ? 'warning' : 'info');
    const cashAvailable = `${props.showBalance ? "$" + formatPrice(props.cashAvailable, 2) : " -"}`;

    return (
        <div>
            <table  className="table table-primary table-borders">
                <thead>
                    <tr>
                        <th>Total Deposits</th>
                        <th>Net Balance</th>
                        <th>Cash Available</th>
                        <th>Fee Rate</th>
                        <th>Fees collected</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <Td>{totalDeposits}</Td>
                        <Td>{netBalance}</Td>
                        <Td>{cashAvailable}</Td>
                        <Td>{feeRate}</Td>
                        <Td>{feesCollected}</Td>
                    </tr>
                </tbody>
            </table>
            <div className="button-toolbar-actions" >
                <ButtonToolbar aria-label="Toolbar with button groups">
                <ButtonGroup className="me-2" aria-label="First group">
                    <Button variant={showHideBalanceVariant} onClick={handleShowHideBalance} >{showHideBalanceText}</Button>
                </ButtonGroup>
                <ButtonGroup className="me-2" aria-label="Second group">
                    <Button variant="secondary" onClick={handleSettings} >Settings</Button>
                    </ButtonGroup>
                <ButtonGroup className="me-2" aria-label="Third group">
                    <Button variant="success" onClick={handleClickDeposit} >Deposit</Button>
                    <Button variant="danger" onClick={handleClickWithdraw} >Withdraw</Button>
                </ButtonGroup>
                <ButtonGroup className="me-2" aria-label="Fourth group">
                    <Button variant="success" onClick={handleClickBuyNew} >Buy</Button>
                </ButtonGroup>
                <ButtonGroup className="me-2" aria-label="Fifth group">
                    <Button variant="info" onClick={handleClickHelp} >Help</Button>
                </ButtonGroup>
                </ButtonToolbar>
            </div>
        </div>
    );
}