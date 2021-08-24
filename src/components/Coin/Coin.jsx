import React from 'react';
import PopupButton from '../PopupButton';
import PropTypes from 'prop-types';
import { ActionType } from '../ActionType';
// import styled, { css } from 'styled-components';
import styled from 'styled-components';
import { formatPrice } from '../../functions/formatPrice';
import './Coin.css';

const Td = styled.td`
    border: 2px solid #cccccc;
    width: 25vh;
`;
const minimumRefreshSeconds = 600;

export default function Coin (props) {
    const handleRefresh = (event) => {
        event.preventDefault();
        props.handleAction(ActionType.Refresh, props.id);
    }
    const handleBuyMore = (event) => {
        event.preventDefault();
        props.handleAction(ActionType.BuyMore, props.id);
    }
    const handleSellSome = (event) => {
        event.preventDefault();
        props.handleAction(ActionType.SellSome, props.id);
    }
    const balanceText = props.showBalance ? '$' + formatPrice(props.shares * props.price) : '-';
    const basisText = props.showBalance ? '$' + formatPrice(props.costBasis) : '-';
    const coinTicker = props.coinTicker ? props.coinTicker.find(coin => coin.ticker === props.ticker) : undefined;
    var refreshEnabled = false;
    var priceAge = 0;
    if (coinTicker) {
        priceAge = (Date.now() - Date.parse(coinTicker.last_updated)) / 1000;
        refreshEnabled = priceAge > minimumRefreshSeconds;
    }
    const popupText = refreshEnabled ? "Refresh price" : `Refresh available in ${minimumRefreshSeconds - priceAge} seconds`
    console.log(`Coin: priceAge: ${priceAge}`);
    // console.log(`Coin: coinTicker: ${JSON.stringify(props)}`);
    return (
        <tr className="coin-row">
            <Td>{props.name}</Td>
            <Td>{props.ticker}</Td>
            <Td>{props.shares}</Td>
            <Td>${formatPrice(props.price)}</Td>
            <Td>{basisText}</Td>
            <Td>{balanceText}</Td>
            <Td>
                <div className="td-action-buttons">
                    <PopupButton
                        disabled={!refreshEnabled} 
                        variant="info"
                        popup={popupText}
                        text="Refresh"
                        onClick={handleRefresh} />
                    {/* <button className="btn btn-info" disabled={!refreshEnabled} onClick={handleRefresh}>Refresh</button> */}
                    <PopupButton
                        disabled={false} 
                        variant="success"
                        popup=""
                        text="Buy"
                        onClick={handleBuyMore} />
                    {/* <button className="btn btn-success" onClick={handleBuyMore}>Buy</button> */}
                    <PopupButton
                        disabled={false} 
                        variant="danger"
                        popup=""
                        text="Sell"
                        onClick={handleSellSome} />
                    {/* <button className="btn btn-danger" onClick={handleSellSome}>Sell</button> */}
                </div>
            </Td>
        </tr>
    );
}

Coin.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }
  
  