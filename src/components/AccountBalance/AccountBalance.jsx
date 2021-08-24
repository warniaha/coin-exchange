import PropTypes from 'prop-types';
import React from 'react'
import styled from 'styled-components';
import { ActionType } from '../ActionType';
import './AccountBalance.css';
import { formatPrice } from '../../functions/formatPrice';

const Section = styled.section`
    border: 1px solid white;
    font-size: 1.5rem;
`;

export default function AccountBalance (props) {
    const handleClick = (event) => {
        event.preventDefault();
        props.handleAction(ActionType.ToggleBalance, !props.showBalance);
    }
    const handleSettings = (event) => {
        event.preventDefault();
        props.handleAction(ActionType.Settings);
    }
    const buttonText = props.showBalance ? 'Hide Balance' : 'Show Balance';
    const buttonClass = 'btn ' + (props.showBalance ? 'btn-warning' : 'btn-info');
    const balanceText = `Net Balance: $${props.showBalance ? formatPrice(props.amount, 2) : " -"}`;
    return (
        <Section className="balance">
            <div className="flex-filter">
                {balanceText}
                <div className='btn-toolbar text-center well'>
                    <button 
                        className="btn btn-info" 
                        onClick={handleSettings} >Settings
                    </button>
                    <button 
                        className={buttonClass} 
                        onClick={handleClick} >{buttonText}
                    </button>
                </div>
            </div>
        </Section>
    );
}

AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired,
  }