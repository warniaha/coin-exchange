import React from 'react'
import { Modal, Button, Table } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input-field';
import { ActionType } from '../ActionType';
import './BuyNewDialog.css';

export default function BuyNewDialog(props) {
    const onBuy = (quantity) => {
        props.handleAction(ActionType.BuyShares, { id: props.changeCoin.id, shares: quantity})
        console.log('buy: ', quantity);
    }
    const onFilterList = (text) => {
        setFilter(text);
    }
    const handleCancel = () => {
        props.handleClose();
    }
    const filterCoins = (filter) => {
        if (props.coinList !== undefined && props.show === true) {
            const mapData = props.coinList.map (coin => {
                if (filter.length === 0 || coin.symbol.toLowerCase().includes(filter.toLowerCase())) {
                    // console.log(`<option key=${coin.symbol} value=${coin.symbol} >${coin.symbol}</option>`)
                    return <option key={coin.symbol} value={coin.symbol} >{coin.symbol}</option>
                }
                return null;
            });
            return mapData;
        }
        return null;
    }
    const ticker = props.changeCoin ? props.changeCoin.ticker : "";
    const price = props.changeCoin ? props.changeCoin.price : "";
    const divClass = (props.modalTextFieldStatus ? "form-group has-success" : "form-group has-danger");
    const inputClass = (props.modalTextFieldStatus ? "form-control is-valid" : "form-control is-invalid");
    const feedbackClass = (props.modalTextFieldStatus ? "valid-feedback" : "invalid-feedback");
    const [filter, setFilter] = React.useState("");
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
                <div className="flex-filter" id="filter-div">
                    <label htmlFor="filter-select" className="form-label mt-4">Select ticker</label>
                    <div>
                        <input type="text"
                            className="form-control"
                            id="filter-coins" 
                            name="filter-coins"
                            placeholder="Filter list by ticker name"
                            onChange={(event) => onFilterList(event.target.value)}
                        />
                    </div>
                </div>
                <select className="form-select" id="filter-select" onChange={props.selectCoin}>
                    {filterCoins(filter)}
                </select>
                <br/>
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

