import PropTypes from 'prop-types';
import React from 'react'
import styled from 'styled-components';
import { ActionType } from '../ActionType';
import './AccountBalance.css';

const Section = styled.section`
    border: 1px solid red;
    font-size: 3rem;
`;

export default function AccountBalance (props) {
    const handleClick = (event) => {
        event.preventDefault();
        props.handleAction(ActionType.ToggleBalance, !props.showBalance);
    }
    const buttonText = props.showBalance ? 'Hide Balance' : 'Show Balance';
    const buttonClass = 'btn ' + (props.showBalance ? 'btn-warning' : 'btn-info');
    const balanceText = props.showBalance ? "Net Balance: $" + props.amount : "";
    return (
        <Section className="balance">
            {balanceText}
            <button 
                className={buttonClass} onClick={handleClick} >{buttonText}</button>
        </Section>
    );
}

AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired,
  }
