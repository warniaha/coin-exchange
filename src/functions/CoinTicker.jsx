import { uniqueByKeepFirst } from './uniqueByKeepFirst';
import axios from 'axios';
import { minutesAsSeconds } from '../functions/timeframes';

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
    if (coins && setCoinTicker)
        setCoinTicker(coins);
    return coins;
}

export const getPriceFromTicker = (coinTicker, ticker) => {
    const coin = coinTicker ? coinTicker.find(item => item.ticker === ticker) : undefined;
    return coin ? coin.price : "";
}

export const isCoinTickerRefreshNeeded = (coinTicker, lastRefresh) => {
    if (!coinTicker)
      return false;
    const bitCoin = coinTicker.find(coin => coin.ticker === "BTC");
    const priceAge = Date.parse(bitCoin.last_updated);
    // if lastRefresh is undefined, set to 2 minutes - it will use the actual age from the coinTickers for comparasion
    const lastRefreshSeconds = lastRefresh ? (Date.now() - lastRefresh) / 1000 : minutesAsSeconds(2);
    const priceAgeSeconds = (Date.now() - priceAge) / 1000;
    if (lastRefreshSeconds > minutesAsSeconds(1) &&
      priceAgeSeconds > minutesAsSeconds(5)) {
      return true;
    }
    return false;
}

const getTickers = async (setCoinTicker, setStatusBarText) => {
    const diskBasedCoinTicker = readCoinTicker(null);
    if (diskBasedCoinTicker && !isCoinTickerRefreshNeeded(diskBasedCoinTicker)) {
        const bitcoin = diskBasedCoinTicker.find(coin => coin.ticker === 'BTC');
        var timestamp = new Date(Date.parse(bitcoin.last_updated));
        setStatusBarText(`Using cached prices, last updated at: ${timestamp.toLocaleString()}`);
        return setCoinTicker(diskBasedCoinTicker);  // ok to use the last one loaded
    }
    return await axios.get('https://api.coinpaprika.com/v1/tickers').catch(function(error) {
        const bitcoin = diskBasedCoinTicker.find(coin => coin.ticker === 'BTC');
        var timestamp = new Date(Date.parse(bitcoin.last_updated));
        setStatusBarText(`Failed to retrieve updated prices, cached prices will be used.  Last update was: ${timestamp.toLocaleString()}`);
        return setCoinTicker(diskBasedCoinTicker);  // failed to connect, use the cached version
    });
}

export const getCoinTicker = (setCoinTicker, setStatusBarText, calculateBalance) => {
    // console.log(`getCoinTicker getting token list`);
    getTickers(setCoinTicker, setStatusBarText).then(listResponse => {
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
