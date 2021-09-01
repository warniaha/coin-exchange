import React from 'react'
import { Modal, Button, Table } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input-field';
import { ActionType } from '../ActionType';
import { getPriceFromTicker } from '../../functions/CoinTicker'

export default function BuyDialog(props) {
    const changeCoin = props.coinBalance ? props.coinBalance.find(coin => coin.ticker === props.dialogTicker) : undefined;
    const onBuy = (button) => {
        props.handleAction(ActionType.BuyShares, { key: changeCoin.key, shares: props.quantity})
        // console.log('buy: ', quantity);
        props.handleClose();
    }

    const ticker = props.dialogTicker ?? "";
    const price = getPriceFromTicker(props.coinTicker, ticker);
    const divClass = (props.modalTextFieldStatus ? "form-group has-success" : "form-group has-danger");
    const inputClass = (props.modalTextFieldStatus ? "form-control is-valid" : "form-control is-invalid");
    const feedbackClass = (props.modalTextFieldStatus ? "valid-feedback" : "invalid-feedback");

    const onAll = () => {
        props.onValidator({quantity: props.cashSharesAvailable, coin: changeCoin});
    }
    
    const handleCancel = () => {
        props.handleClose();
    }
    
    const callValidator = (quantity, coin) => {
        props.onValidator({quantity: quantity, coin: coin});
    }
    const onValidator = (value) => {
        callValidator(value, changeCoin);
    }
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Table className="table table-primary table-borders">
                <tbody>
                    <tr>
                        <th>Coin</th>
                        <td>{ticker}</td>
                    </tr>
                    <tr>
                        <th>Price</th>
                        <td>{price}</td>
                    </tr>
                    <tr>
                        <th>{props.availability}</th>
                        <td>{props.cashSharesAvailable}</td>
                    </tr>
                </tbody>
            </Table>
            <div className="flex-filter">
                {props.inputTitle}
                <div>
                    <Button variant="danger" size="sm"
                        onClick={onAll}>
                        All
                    </Button>
                </div>
            </div>
            <div className={divClass}>
                <CurrencyInput
                    className={inputClass} 
                    id="text-input" 
                    name="input-name"
                    placeholder="Please enter a dollar amount"
                    decimalsLimit={18}
                    allowNegativeValue="false"
                    value={isNaN(props.quantity) ? 0 : props.quantity}
                    defaultValue={props.initialValue}
                    prefix={props.prefix}
                    intlConfig={{ locale: 'en-US', currency: 'USD' }}
                    onValueChange={(changedText) => onValidator(changedText)}
                />
                <div className={feedbackClass}>{props.modalStatusMessage}</div>
            </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" 
                    onClick={handleCancel}>
                    Cancel
                </Button>
                <Button disabled={!props.modalTextFieldStatus} 
                    onClick={onBuy} 
                    variant="primary">
                    {props.actionTitle}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
