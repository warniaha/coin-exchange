import React, { Component } from 'react'
// import logo from './money.gif'
import './ExchangeHeader.css';

export default class ExchangeHeader extends Component {
    render() {
        return (
            <header className="App-header">
                {/* <img src={logo} alt="App logo" className="App-logo" /> */}
                <h1 className="App-title">
                    Paper Coin Exchange
                </h1>
            </header>
          )
    }
}
