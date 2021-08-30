import filesystem from 'fs';
import React from 'react';
import axios from 'axios';
import { minutesAsMilliseconds } from './timeframes';

jest.mock('axios');

var coinTickers = undefined;
export function getTestCoinTickers() {
    if (!coinTickers) {
        const data = filesystem.readFileSync('src/functions/coinTicker.test.json');
        // console.log(data.length);
        const coinTickersJson = JSON.parse(data);
        coinTickers = coinTickersJson.map(coin => {
            if (coin.symbol === 'BTC') {
                var bitcoin = {...coin};
                bitcoin.last_updated = new Date().toISOString();
                bitcoin.quotes.USD.price = 50000;
                return bitcoin;
            }
            else if (coin.symbol === 'ETH') {
                var ethereum = {...coin};
                ethereum.quotes.USD.price = 3000;
                return ethereum;
            }
            else {
                return coin;
            }
        });
    }
    return coinTickers;
}


it('should verify bitcoin price was updated to 50000', () => {
    const bitcoin = getTestCoinTickers().find(coin => coin.symbol === 'BTC');
    expect(bitcoin).not.toBeNull();
    expect(bitcoin.quotes.USD.price).toEqual(50000);
});

it('should verify ethereum price was updated to 3000', () => {
    const ethereum = getTestCoinTickers().find(coin => coin.symbol === 'ETH');
    expect(ethereum).not.toBeNull();
    expect(ethereum.quotes.USD.price).toEqual(3000);
});

it('should verify bitcoin last_update was less than 5 minutes ago', () => {
    const bitcoin = getTestCoinTickers().find(coin => coin.symbol === 'BTC');
    expect(bitcoin).not.toBeNull();
    const timeframe = Date.now() - Date.parse(bitcoin.last_updated);
    expect(timeframe < minutesAsMilliseconds(5));
});

// it('should return test data when calling axios.get', () => {
//     const realUseState = React.useState;
//     const stubCoinState = [getTestCoinTickers()];
//     jest.spyOn(React, 'useState').mockImplementationOnce(() => realUseState(stubCoinState));
// });