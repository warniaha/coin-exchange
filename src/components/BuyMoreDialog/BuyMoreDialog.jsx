import React, { Component } from 'react'
import { Modal, Button, Table } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input-field';

export default function BuyMoreDialog(props) {
    const onBuy = (event) => {
        console.log('buy: ', event);
    }

    const [buyDisabled, setBuyDisabled] = React.useState(true);
    const [statusMessage, setStatusMessage] = React.useState("");
    const [fieldStatus, setFieldStatus] = React.useState(true);
    const onValidator = (value) => {
        const amount = (value === undefined ? 0 : Number(value));
        console.log(`onValidator: ${amount}`);
        if (amount <= 0) {
            setStatusMessage('Amount to purchase must be greater than zero');
            setFieldStatus(false);
            setBuyDisabled(true);
        }
        else if (amount > props.cashAvailable) {
            setStatusMessage('Amount to purchase exceeds cash available');
            setFieldStatus(false);
            setBuyDisabled(true);
        }
        else {
            const shares = amount / props.changeCoin.price;
            setStatusMessage(`Purchase ${shares} of ${props.changeCoin.ticker}`);
            setFieldStatus(true);
            setBuyDisabled(false);
        }
    }

    const title = "Buy " + (props.changeCoin ? props.changeCoin.ticker : "");
    const ticker = props.changeCoin ? props.changeCoin.ticker : "";
    const price = props.changeCoin ? props.changeCoin.price : "";
    const inputTitle = `Dollars to purchase ${ticker}`;
    const divClass = (fieldStatus ? "form-group has-success" : "form-group has-danger");
    const inputClass = (fieldStatus ? "form-control is-valid" : "form-control is-invalid");
    const feedbackClass = (fieldStatus ? "valid-feedback" : "invalid-feedback");

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
                    placeholder="Please enter a dollar amount"
                    decimalsLimit={18}
                    allowNegativeValue="false"
                    prefix="$"
                    intlConfig={{ locale: 'en-US', currency: 'USD' }}
                    onValueChange={(changedText) => onValidator(changedText)}
                />
                <div class={feedbackClass}>{statusMessage}</div>
            </div>
            <br/>
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
