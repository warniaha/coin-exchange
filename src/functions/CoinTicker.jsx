import { uniqueByKeepFirst } from './uniqueByKeepFirst';
import axios from 'axios';

export const createCoinTicker = (coin) => {
    return {
      key: coin.id,
      name: coin.name,
      ticker: coin.symbol,
      price: coin.quotes['USD'].price,
      last_updated: coin.last_updated,
    }
}

// how to read/write to localstorage: https://jsonworld.com/demo/how-to-use-localStorage-with-reactjs
const coinListFilename = 'PaperCoinList';

export const saveCoinTicker = (values) => {
    localStorage.setItem(coinListFilename, JSON.stringify(values));
}

export const readCoinTicker = (setCoinTicker) => {
    const coins = JSON.parse(localStorage.getItem(coinListFilename));
    // console.log(coins);
    setCoinTicker(coins);
    return coins;
}

const getTickers = async (setCoinTicker) => {
    return await axios.get('https://api.coinpaprika.com/v1/tickers').catch(function(error) {
        debugger;
        console.log(error);
        console.log(`getCoinTicker reading old file from computer`);
        return readCoinTicker(setCoinTicker);
    });
}

export const getCoinTicker = (coinTicker, setCoinTicker) => {
    if (coinTicker === undefined) {
        console.log(`getCoinTicker getting token list`);
        getTickers(setCoinTicker).then(listResponse => {
            if (listResponse !== undefined) {
                const tickers = uniqueByKeepFirst(listResponse.data, key => key.symbol);
                const tickerMap = tickers.map(coin => {
                    return createCoinTicker(coin);
                })
                setCoinTicker(tickerMap);
                saveCoinTicker(tickerMap);
                return tickerMap;
            }
        });
    }
    return undefined;
}
