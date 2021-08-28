import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { ActionType } from '../ActionType';
import PopupButton from '../PopupButton';
import PopupDiv from '../PopupDiv';
import { formatPrice } from '../../functions/formatPrice';
import Tab from 'react-bootstrap/Tabs';
import Tabs from 'react-bootstrap/Tabs';
import { profitMessage } from '../../functions/ProfitMessage';
import { nobodyLooking, pryingEyes } from '../../functions/StringTable';

export default function HelpDialog(props) {
    const [key, setKey] = React.useState(0);
    const tabsList = ["deposit", "showBalance", "prices", "buy"];

    const handleShowHideBalance = (event) => {
        event.preventDefault();
        props.handleAction(ActionType.ToggleBalance, !props.showBalance);
    }

    const handleClickDeposit = (event) => {
        event.preventDefault();
        // popup a modal to let the user decide how much
        props.handleAction(ActionType.Deposit, 1000);
    }

    const handlePrevious = (event) => {
        event.preventDefault();
        setKey((key + tabsList.length - 1) % tabsList.length);
    }

    const handleNext = (event) => {
        event.preventDefault();
        setKey((key + 1) % tabsList.length);
    }

    const handleClickBuy = (event) => {
        event.preventDefault();
        props.handleAction(ActionType.BuyNew);
        props.handleClose();
    }

    const profit = props.netBalance - props.totalDeposits;
    const profitLossClass = profit >= 0 ? "price-profit" : "price-loss"
    const arrowCharacter = profit >= 0 ? "▲" : "▼";
    const netBalancePopupMessage = profitMessage(props.showBalance, profit);
    const netBalance = `${props.showBalance ? "$" + formatPrice(props.netBalance, 2) : arrowCharacter}`;
    const showHideBalanceDescription = props.showBalance ? 'hide' : 'show';
    const showHideBalanceText = props.showBalance ? 'Hide Balance' : 'Show Balance';
    const showHideBalancePopup = props.showBalance ? pryingEyes : nobodyLooking;
    const showHideBalanceVariant = (props.showBalance ? 'warning' : 'info');
    const netBalanceDescription = (props.showBalance ? 'Net Balance is displayed for anyone to see' : 'Net Balance displays as an arrow to hide the amount');
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
        >
            <Modal.Header>
                <Modal.Title>Help using Paper Coin Exchange</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs onSelect={(k) => setKey(k)} activeKey={tabsList[key]} id="help-tabs" className="mb-3">
                    <Tab eventKey="deposit" title="Deposit">
                        <div className="wrap-content" >
                            <div>Click the deposit button to deposit $1000 into your account</div>
                            <div className="right-left-margin">
                                <PopupButton
                                    disabled={false} 
                                    variant="success"
                                    popup="Deposit $1000"
                                    text="Deposit"
                                    onClick={handleClickDeposit} />
                            </div>
                            Deposits: {formatPrice(props.totalDeposits, 2)}
                        </div>
                    </Tab>
                    <Tab eventKey="showBalance" title="Balance">
                        <div className="wrap-content" >
                            <div>Click the {showHideBalanceText} button to {showHideBalanceDescription} your balances</div>
                            <div className="right-left-margin">
                                <PopupButton
                                    disabled={false} 
                                    variant={showHideBalanceVariant}
                                    popup={showHideBalancePopup}
                                    text={showHideBalanceText}
                                    onClick={handleShowHideBalance} />
                            </div>
                            <div className="right-margin">{netBalanceDescription}</div>
                            <div className={profitLossClass}>
                                <PopupDiv
                                    popup={netBalancePopupMessage}
                                    text={netBalance}
                                    disabled={false} />
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="prices" title="Price">
                        <div className="wrap-content" >
                            <div>Price are automatically updated every 5 minutes while an internet connection is available.  When an internet connection is not available, a cached version of the prices will be used</div>
                        </div>
                    </Tab>
                    <Tab eventKey="buy" title="Buy">
                        <div className="wrap-content" >
                            <div>Click the Buy button to display a list of coins available to purchase and enter how much to buy.  When you click the Buy button, the help window will close</div>
                            <div className="right-left-margin">
                                <PopupButton
                                    disabled={false} 
                                    variant="success"
                                    popup="Purchase coins"
                                    text="Buy"
                                    onClick={handleClickBuy} />
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" 
                    disabled={false}
                    onClick={handlePrevious}>
                    Previous
                </Button>
                <Button variant="secondary" 
                    disabled={false}
                    onClick={handleNext}>
                    Next
                </Button>
                <Button variant="primary" 
                    disabled={false}
                    onClick={props.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
