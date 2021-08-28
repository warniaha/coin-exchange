import { uniqueByKeepFirst } from './uniqueByKeepFirst';
import axios from 'axios';

export const createCoinTicker = (coin) => {
    return {
      key: coin.id,
      name: coin.name,
      ticker: coin.symbol,
      price: coin.quotes['USD'].price,
      last_updated: coin.last_updated,
      last_refresh: coin.last_updated,
    }
}

// how to read/write to localstorage: https://jsonworld.com/demo/how-to-use-localStorage-with-reactjs
const coinListFilename = 'PaperCoinList';

export const resetCoinTicker = () => {
    localStorage.removeItem(coinListFilename);
}

export const saveCoinTicker = (values) => {
    localStorage.setItem(coinListFilename, JSON.stringify(values));
}

export const readCoinTicker = (setCoinTicker) => {
    const coins = JSON.parse(localStorage.getItem(coinListFilename));
    // console.log(coins);
    if (coins)
        setCoinTicker(coins);
    return coins;
}

export const getPriceFromTicker = (coinTicker, ticker) => {
    const coin = coinTicker ? coinTicker.find(item => item.ticker === ticker) : undefined;
    return coin ? coin.price : "";
}

const getTickers = async (setCoinTicker) => {
    return await axios.get('https://api.coinpaprika.com/v1/tickers').catch(function(error) {
        console.log(error);
        console.log(`getTickers reading old file from computer`);
        return readCoinTicker(setCoinTicker);
    });
}

export const getCoinTicker = (setCoinTicker, setStatusBarText, calculateBalance) => {
    // console.log(`getCoinTicker getting token list`);
    getTickers(setCoinTicker).then(listResponse => {
        if (listResponse !== undefined) {
            const tickers = uniqueByKeepFirst(listResponse.data, key => key.symbol);
            if (tickers) {
                const tickerMap = tickers.map(coin => {
                    return createCoinTicker(coin);
                })
                setCoinTicker(tickerMap);
                saveCoinTicker(tickerMap);
                var timestamp = new Date(Date.now());
                setStatusBarText(`Prices updated at: ${timestamp.toLocaleString()}`);
                calculateBalance();
            }
        }
    }, reason => {
        setStatusBarText(`Failed to load prices: ${reason}`);
        console.log(`getCoinTicker failed: ${reason}`);
    });
}
