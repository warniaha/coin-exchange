import React from 'react'
import PropTypes from 'prop-types';
import { ActionType } from '../ActionType';
// import styled, { css } from 'styled-components';
import styled from 'styled-components';
import { formatPrice } from '../../functions/formatPrice'
import './Coin.css';

const Td = styled.td`
    border: 2px solid #cccccc;
    width: 25vh;
`;

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
    // console.log(`Coin: ${JSON.stringify(props)}`);
    return (
        <tr className="coin-row">
            <Td>{props.name}</Td>
            <Td>{props.ticker}</Td>
            <Td>{props.shares}</Td>
            <Td>${formatPrice(props.price)}</Td>
            <Td>{balanceText}</Td>
            <Td>
                <div>
                    <button className="btn btn-info" onClick={handleRefresh}>Refresh</button>
                    <button className="btn btn-success" onClick={handleBuyMore}>Buy</button>
                    <button className="btn btn-danger" onClick={handleSellSome}>Sell</button>
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
  
  