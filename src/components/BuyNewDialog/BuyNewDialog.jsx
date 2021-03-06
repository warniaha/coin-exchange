import React from 'react'
import { Modal, Button, Table } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input-field';
import { ActionType } from '../ActionType';
import './BuyNewDialog.css';
import { formatPrice } from '../../functions/formatPrice'
import { getPriceFromTicker } from '../../functions/CoinTicker'

export default function BuyNewDialog(props) {
    const changeCoin = props.coinTicker ? props.coinTicker.find(coin => coin.ticker === props.dialogTicker) : undefined;
    const onBuy = (buttonAction) => {
        props.handleAction(ActionType.BuyShares, { key: changeCoin.key, shares: props.quantity})
        props.handleClose();
    }
    const onFilterList = (text) => {
        setFilter(text);
        var mapData = props.coinTicker.map (coin => {
            if (matchesFilter(coin, text)) {
                return coin;
            }
            return null;
        });
        mapData = mapData.filter(Boolean);
        // if the filter erases the selection, pick one of the remaining coins
        const foundList = mapData.find((coin) => coin && props.dialogTicker === coin.ticker);
        if (!foundList && mapData.length > 0) {
            selectCoin(mapData[0].ticker);
        }
    }

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
    const onSelectCoin = (control) => {
        selectCoin(control.target.value);
    }
    const selectCoin = (ticker) => {
        const currentCoin = props.selectCoin(ticker);
        callValidator(props.quantity, currentCoin);
    }
    const matchesFilter = (coin, filter) => {
        return filter.length === 0 ||
            coin.key.toLowerCase().includes(filter.toLowerCase()) ||
            coin.name.toLowerCase().includes(filter.toLowerCase()) ||
            coin.ticker.toLowerCase().includes(filter.toLowerCase());
    }
    const filterCoins = (text) => {
        if (props.coinTicker !== undefined && props.show === true) {
            const mapData = props.coinTicker.map (coin => {
                if (matchesFilter(coin, text)) {
                    // console.log(`<option key=${coin.ticker} value=${coin.ticker} >${coin.ticker}</option>`)
                    return <option key={coin.ticker} value={coin.ticker}  >{coin.ticker}</option>
                }
                return null;
            });
            // console.log(`<option key="null" value="" />`);
            mapData.unshift(<option key="null" value="" />);
            return mapData;
        }
        return null;
    }

    const price = changeCoin ? formatPrice(getPriceFromTicker(props.coinTicker, changeCoin.ticker)) : "";
    const divClass = (props.modalTextFieldStatus ? "form-group has-success" : "form-group has-danger");
    const inputClass = (props.modalTextFieldStatus ? "form-control is-valid" : "form-control is-invalid");
    const feedbackClass = (props.modalTextFieldStatus ? "valid-feedback" : "invalid-feedback");
    const [filter, setFilter] = React.useState("");
    const currencyInputEnabled = changeCoin ? true : false;
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
                <select className="form-select" 
                    id="filter-select" 
                    onChange={onSelectCoin}
                    value={props.dialogTicker}
                    placeholder="Select ticker name...">
                    {filterCoins(filter)}
                </select>
                <br/>
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
                    <CurrencyInput
                        className={inputClass} 
                        id="text-input" 
                        name="input-name"
                        placeholder="Please enter a dollar amount"
                        decimalsLimit={18}
                        allowNegativeValue="false"
                        value={props.quantity}
                        defaultValue={props.initialValue}
                        disabled={!currencyInputEnabled}
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

