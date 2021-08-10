import React, { Component } from 'react'
import { Modal, Button, Table } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input-field';

export default function BuyMoreDialog(props) {
    const [purchaseAmount, setPurchaseAmount] = React.useState(props.purchaseAmount);
    const mustBeGreaterThanZero = 'Amount to purchase must be greater than zero';
    var statusMessage = mustBeGreaterThanZero;
    var buyDisabled = true;
    var fieldStatus = false;
    const title = "Buy " + (props.changeCoin ? props.changeCoin.ticker : "");
    const ticker = props.changeCoin ? props.changeCoin.ticker : "";
    const price = props.changeCoin ? props.changeCoin.price : "";
    const inputTitle = `Dollars to purchase ${ticker}`;

    const onBuy = (event) => {
        console.log('buy: ', event);
    }

    const handleCancel = () => {
        props.handleClose();
    }

    const updateStatus = (value) => {
        const amount = (value === undefined ? 0 : Number(value));
        console.log(`updateStatus.amount: ${amount}`);
        console.log(`updateStatus.value: ${value}`);
        if (amount <= 0) {
            statusMessage = mustBeGreaterThanZero;
            fieldStatus = false;
            buyDisabled = true;
        }
        else if (amount > props.cashAvailable) {
            statusMessage = 'Amount to purchase exceeds cash available';
            fieldStatus = false;
            buyDisabled = true;
        }
        else {
            const shares = amount / props.changeCoin.price;
            statusMessage = `Purchase ${shares} of ${props.changeCoin.ticker}`;
            fieldStatus = true;
            buyDisabled = false;
        }
        console.log(`updateStatus.statusMessage: ${statusMessage}`);
    }

    const onValidator = (value) => {
        console.log(`onValidator.value: ${value}`);
        updateStatus(value);
        setPurchaseAmount(value);
    }

    updateStatus(props.purchaseAmount);
    const divClass = (fieldStatus ? "form-group has-success" : "form-group has-danger");
    const inputClass = (fieldStatus ? "form-control is-valid" : "form-control is-invalid");
    const feedbackClass = (fieldStatus ? "valid-feedback" : "invalid-feedback");
    console.log(`statusMessage: ${statusMessage}`);
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
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
                            <th>Available</th>
                            <td>{props.cashAvailable}</td>
                        </tr>
                    </tbody>
                </Table>
                <p>{inputTitle}</p>
                <div className={divClass}>
                    <CurrencyInput
                        className={inputClass} 
                        id="text-input" 
                        name="input-name"
                        defaultValue={purchaseAmount}
                        placeholder="Please enter a dollar amount"
                        decimalsLimit={18}
                        allowNegativeValue="false"
                        prefix="$"
                        intlConfig={{ locale: 'en-US', currency: 'USD' }}
                        // onValueChange={(changedText) => onValidator(changedText)}
                    />
                    <div className={feedbackClass}>{statusMessage}</div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button disabled={buyDisabled} onClick={onBuy} variant="primary">Buy</Button>
            </Modal.Footer>
        </Modal>
    );
}
