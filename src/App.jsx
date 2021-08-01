import './App.css';
import AccountBalance from './components/AccountBalance/AccountBalance'
import CoinList from './components/CoinList/CoinList'
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader'

import React from 'react';
// import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
const COIN_COUNT = 10;

const formatPrice = (price) => {
  return parseFloat(Number(price).toFixed(4));
}
function App(props) {
  const[balance, setBalance] = React.useState(10000);
  const[showBalance, setShowBalance] = React.useState(true);
  const[coinData, setCoinData] = React.useState([]);

  const componentDidMount = async () => {
      const listResponse = await axios.get('https://api.coinpaprika.com/v1/coins');
      const coinIds = listResponse.data.slice(0, COIN_COUNT).map(coin => coin.id);
      const promises = coinIds.map(id => axios.get(`https://api.coinpaprika.com/v1/tickers/${id}`));
      const coinData = await Promise.all(promises);
      const coinPriceData = coinData.map((response) => {
        var coin = response.data;
        return {
          key: coin.id,
          name: coin.name,
          ticker: coin.symbol,
          balance: 0,
          price: formatPrice(coin.quotes['USD'].price),
        }
      });
      setCoinData(coinPriceData);
  }

  React.useEffect(() => {
    if (coinData.length === 0) {
      componentDidMount();
    }
  })

  const showHideBalance = (showBalance) => {
    setShowBalance(showBalance);
  }

  const handleRefresh = async (valueChangeTicker) => {
    const response = await axios.get(`https://api.coinpaprika.com/v1/tickers/${valueChangeTicker}`);
    const newPrice = formatPrice(response.data.quotes.USD.price);
    const newCoinData = coinData.map( function( values ) {
      let newValues = {...values};
      if (valueChangeTicker === values.key) {
        newValues.price = newPrice;
      }
      return newValues;
    });
    setCoinData(newCoinData);
  }
    return (
      <div className="App">
        <ExchangeHeader />
        <AccountBalance showHideBalance={showHideBalance} 
          amount={balance} 
          showBalance={showBalance} />
        <CoinList coinData={coinData} 
          showHideBalance={showHideBalance} 
          showBalance={showBalance} 
          handleRefresh={handleRefresh} />
      </div>
    );
}

export default App;
