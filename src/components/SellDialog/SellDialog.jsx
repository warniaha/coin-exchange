import React from 'react'
import { Modal, Button, Table } from 'react-bootstrap';
import { ActionType } from '../ActionType';
import { getPriceFromTicker } from '../../functions/CoinTicker'

export default function SellDialog(props) {
    const changeCoin = props.coinBalance ? props.coinBalance.find(coin => coin.ticker === props.dialogTicker) : undefined;
    const onSell = (event) => {
        props.handleAction(ActionType.SellShares, { key: changeCoin.key, shares: props.quantity});
        props.handleClose();
    }

    const ticker = changeCoin ? changeCoin.ticker : "";
    const price = getPriceFromTicker(props.coinTicker, ticker);
    const divClass = (props.modalTextFieldStatus ? "form-group has-success" : "form-group has-danger");
    const inputClass = (props.modalTextFieldStatus ? "form-control is-valid" : "form-control is-invalid");
    const feedbackClass = (props.modalTextFieldStatus ? "valid-feedback" : "invalid-feedback");

    const handleCancel = () => {
        props.handleClose();
    }
    
    const onAll = () => {
        props.onValidator(props.cashSharesAvailable);
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
                        <td>{props.dialogTicker}</td>
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
                <input type="text"
                    className={inputClass} 
                    id="text-input" 
                    value={props.quantity}
                    name="input-name"
                    placeholder="Please enter number of shares to sell"
                    onChange={(event) => props.onValidator(event.target.value)}
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
                    onClick={onSell} 
                    variant="primary">
                    {props.actionTitle}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
