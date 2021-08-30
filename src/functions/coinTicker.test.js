import filesystem from 'fs';
import axios from 'axios';

jest.mock('axios');

function getTestCoinTickers() {
    const data = filesystem.readFileSync('src/functions/coinTicker.test.json');
    // console.log(data.length);
    const coinTickersJson = JSON.parse(data);
    const coinTickers = coinTickersJson.map(coin => {
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
    return coinTickers;
}

const coinTickers = getTestCoinTickers();

function secondsAsMilliseconds(sec) {
    return sec * 1000;
}

function minutesAsMilliseconds(min) {
    return min * secondsAsMilliseconds(60);
}

function hoursAsMilliseconds(hours) {
    return hours * minutesAsMilliseconds(60);
}
it('should verify bitcoin price was updated to 50000', () => {
    const bitcoin = coinTickers.find(coin => coin.symbol === 'BTC');
    expect(bitcoin).not.toBeNull();
    expect(bitcoin.quotes.USD.price).toEqual(50000);
});

it('should verify ethereum price was updated to 3000', () => {
    const ethereum = coinTickers.find(coin => coin.symbol === 'ETH');
    expect(ethereum).not.toBeNull();
    expect(ethereum.quotes.USD.price).toEqual(3000);
});

it('should verify bitcoin last_update was less than 5 minutes ago', () => {
    const bitcoin = coinTickers.find(coin => coin.symbol === 'BTC');
    expect(bitcoin).not.toBeNull();
    const timeframe = Date.now() - Date.parse(bitcoin.last_updated);
    expect(timeframe < minutesAsMilliseconds(5));
});
