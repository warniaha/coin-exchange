import React, { Component } from 'react'
import { Modal, Button, Table } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input-field';

export default function BuySellDialog(props) {
    const onBuy = (event) => {
        console.log('buy: ', event);
    }

    const ticker = props.changeCoin ? props.changeCoin.ticker : "";
    const price = props.changeCoin ? props.changeCoin.price : "";
    const divClass = (props.modalTextFieldStatus ? "form-group has-success" : "form-group has-danger");
    const inputClass = (props.modalTextFieldStatus ? "form-control is-valid" : "form-control is-invalid");
    const feedbackClass = (props.modalTextFieldStatus ? "valid-feedback" : "invalid-feedback");

    const handleCancel = () => {
        props.handleClose();
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
                    prefix="$"
                    intlConfig={{ locale: 'en-US', currency: 'USD' }}
                    onValueChange={(changedText) => props.onValidator(changedText)}
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
