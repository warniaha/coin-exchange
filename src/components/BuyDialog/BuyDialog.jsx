import React from 'react'
import { Modal, Button, Table } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input-field';
import { ActionType } from '../ActionType';

export default function BuyDialog(props) {
    const onBuy = (button) => {
        props.handleAction(ActionType.BuyShares, { key: props.changeCoin.key, shares: props.quantity})
        // console.log('buy: ', quantity);
        props.handleClose();
    }

    const ticker = props.changeCoin ? props.changeCoin.ticker : "";
    const price = props.changeCoin ? props.changeCoin.price : "";
    const divClass = (props.modalTextFieldStatus ? "form-group has-success" : "form-group has-danger");
    const inputClass = (props.modalTextFieldStatus ? "form-control is-valid" : "form-control is-invalid");
    const feedbackClass = (props.modalTextFieldStatus ? "valid-feedback" : "invalid-feedback");

    const handleCancel = () => {
        props.handleClose();
    }
    
    const callValidator = (quantity, coin) => {
        props.onValidator({quantity: quantity, coin: coin});
    }
    const onValidator = (value) => {
        callValidator(value, props.changeCoin);
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
            <p>{props.inputTitle}</p>
            <div className={divClass}>
                <CurrencyInput
                    className={inputClass} 
                    id="text-input" 
                    name="input-name"
                    placeholder="Please enter a dollar amount"
                    decimalsLimit={18}
                    allowNegativeValue="false"
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
