import PropTypes from 'prop-types';
import React from 'react'
import styled from 'styled-components';
import './AccountBalance.css';

const Section = styled.section`
    border: 1px solid red;
    font-size: 3rem;
`;

export default function AccountBalance (props) {
    const handleClick = (event) => {
        event.preventDefault();
        props.showHideBalance(!props.showBalance);
    }
    const buttonText = props.showBalance ? 'Hide Balance' : 'Show Balance';
    const balanceText = props.showBalance ? "Balance: $" + props.amount : "";
    return (
        <Section className="balance">
            {balanceText}
            <button className="showHideBalance" onClick={handleClick} >{buttonText}</button>
        </Section>
    );
}

AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired,
  }
