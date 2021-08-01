import React from 'react'
import PropTypes from 'prop-types';
// import styled, { css } from 'styled-components';
import styled from 'styled-components';

const Td = styled.td`
    border: 2px solid #cccccc;
    width: 25vh;
`;

export default function Coin (props) {
    const handleClick = (event) => {
        event.preventDefault();
        props.handleRefresh(props.id);
    }
    const balanceText = (props.showBalance ? <Td>${props.balance}</Td> : <></>);
    return (
        <tr className="coin-row">
            <Td>{props.name}</Td>
            <Td>{props.ticker}</Td>
            <Td>${props.price}</Td>
            {balanceText}
            <Td>
                <form action="#" method="POST">
                    <button onClick={handleClick}>Refresh</button>
                </form>
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
  
  