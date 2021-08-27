import React from 'react';
import PopupButton from '../PopupButton';
import PropTypes from 'prop-types';
import { ActionType } from '../ActionType';
// import styled, { css } from 'styled-components';
import styled from 'styled-components';
import { formatPrice } from '../../functions/formatPrice';
import './Coin.css';
import { getPriceFromTicker } from '../../functions/CoinTicker'

const Td = styled.td`
    border: 2px solid #cccccc;
    width: 25vh;
`;
export default function Coin (props) {
    const handleBuyMore = (event) => {
        event.preventDefault();
        props.handleAction(ActionType.BuyMore, props.id);
    }
    const handleSellSome = (event) => {
        event.preventDefault();
        props.handleAction(ActionType.SellSome, props.id);
    }
    const price = getPriceFromTicker(props.coinTicker, props.ticker);
    const netBalance = props.shares * price;
    const profit = netBalance - (props.shares * props.costBasis);
    const profitLossClass = profit >= 0 ? "price-profit" : "price-loss"
    const arrowCharacter = profit >= 0 ? "▲" : "▼";
    const balanceText = props.showBalance ? '$' + formatPrice(netBalance) : arrowCharacter;
    const basisText = props.showBalance ? '$' + formatPrice(props.costBasis) : '-';
    const buyPopupText = `Buy more ${props.ticker}`;
    const sellPopupText = `Sell your ${props.ticker}`;
    // console.log(`Coin: coinTicker: ${JSON.stringify(props)}`);
    return (
        <tr className="coin-row">
            <Td>{props.name}</Td>
            <Td>{props.ticker}</Td>
            <Td>{props.shares}</Td>
            <Td>${formatPrice(price)}</Td>
            <Td>{basisText}</Td>
            <Td>
                <div className={profitLossClass}>
                    {balanceText}
                </div>
            </Td>
            <Td>
                <div className="td-action-buttons">
                    <PopupButton
                        disabled={false} 
                        variant="success"
                        popup={buyPopupText}
                        text="Buy"
                        onClick={handleBuyMore} />
                    <PopupButton
                        disabled={false} 
                        variant="danger"
                        popup={sellPopupText}
                        text="Sell"
                        onClick={handleSellSome} />
                </div>
            </Td>
        </tr>
    );
}

Coin.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    shares: PropTypes.number.isRequired,
    costBasis: PropTypes.number.isRequired,
}
  
  