import React from 'react'
import styled from 'styled-components';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { ActionType } from '../ActionType';
import PopupButton from '../PopupButton';
import PopupDiv from '../PopupDiv';
import { formatPrice } from '../../functions/formatPrice';
import { profitMessage } from '../../functions/ProfitMessage';
import { nobodyLooking, pryingEyes } from '../../functions/StringTable';

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

    const handleReset = (event) => {
        event.preventDefault();
        props.handleAction(ActionType.Reset);
    }

    const profit = props.netBalance - props.totalDeposits;
    const profitLossClass = profit >= 0 ? "price-profit" : "price-loss"
    const arrowCharacter = profit >= 0 ? "▲" : "▼";

    const netBalance = `${props.showBalance ? "$" + formatPrice(props.netBalance, 2) : arrowCharacter}`;
    const totalDeposits = `${props.showBalance ? "$" + formatPrice(props.totalDeposits, 2) : "-"}`;
    const feeRate = `${props.feeRate*100}%`;
    const feesCollected = `${props.showBalance ? "$" + formatPrice(props.feesCollected, 2) : "-"}`;
    
    const showHideBalanceText = props.showBalance ? 'Hide Balance' : 'Show Balance';
    const showHideBalancePopup = props.showBalance ? pryingEyes : nobodyLooking;
    const showHideBalanceVariant = (props.showBalance ? 'warning' : 'info');
    const cashAvailable = `${props.showBalance ? "$" + formatPrice(props.cashAvailable, 2) : "-"}`;
    const withdrawEnabled = props.cashAvailable >= 1000;
    const withdrawPopupText = withdrawEnabled ? "Withdraw $1000" : "Insufficient funds available to withdraw $1000";
    const netBalancePopupMessage = profitMessage(props.showBalance, profit);

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
                        <Td>
                            <div className={profitLossClass}>
                                <PopupDiv
                                    popup={netBalancePopupMessage}
                                    text={netBalance}
                                    disabled={false} />
                            </div>
                        </Td>
                        <Td>{cashAvailable}</Td>
                        <Td>{feeRate}</Td>
                        <Td>{feesCollected}</Td>
                    </tr>
                </tbody>
            </table>
            <div className="button-toolbar-actions" >
                <ButtonToolbar aria-label="Toolbar with button groups">
                <ButtonGroup className="me-2" aria-label="Show-Hide group">
                    <PopupButton
                        disabled={false} 
                        variant={showHideBalanceVariant}
                        popup={showHideBalancePopup}
                        text={showHideBalanceText}
                        onClick={handleShowHideBalance} />
                </ButtonGroup>
                <ButtonGroup className="me-2" aria-label="Reset group">
                    <PopupButton
                        disabled={false} 
                        variant="danger"
                        popup="Reset all deposits and purchases"
                        text="Reset"
                        onClick={handleReset} />
                </ButtonGroup>
                <ButtonGroup className="me-2" aria-label="Preferences group">
                    <PopupButton
                        disabled={false} 
                        variant="secondary"
                        popup="Adjust application preferences"
                        text="Settings"
                        onClick={handleSettings} />
                </ButtonGroup>
                <ButtonGroup className="me-2" aria-label="Deposit-Withdraw group">
                    <PopupButton
                        disabled={false} 
                        variant="success"
                        popup="Deposit $1000"
                        text="Deposit"
                        onClick={handleClickDeposit} />
                    <PopupButton
                        disabled={!withdrawEnabled} 
                        variant="danger"
                        popup={withdrawPopupText}
                        text="Withdraw"
                        onClick={handleClickWithdraw} />
                </ButtonGroup>
                <ButtonGroup className="me-2" aria-label="Buy group">
                    <PopupButton
                        disabled={false} 
                        variant="success"
                        popup="Purchase coins"
                        text="Buy"
                        onClick={handleClickBuyNew} />
                </ButtonGroup>
                <ButtonGroup className="me-2" aria-label="Help group">
                    <PopupButton
                        disabled={false} 
                        variant="info"
                        popup="Get help for using this application"
                        text="Help"
                        onClick={handleClickHelp} />
                </ButtonGroup>
                </ButtonToolbar>
            </div>
        </div>
    );
}