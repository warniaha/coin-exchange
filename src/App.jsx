import './App.css';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import CashAvailable from './components/CashAvailable/CashAvailable';
import BuyMoreDialog from './components/BuyMoreDialog/BuyMoreDialog';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/flatly/bootstrap.min.css';

import React from 'react';
// import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { ActionType } from './components/ActionType';

import { Modal, Button } from 'react-bootstrap';

const COIN_COUNT = 10;

const formatPrice = (price) => {
  return parseFloat(Number(price).toFixed(4));
}

function App(props) {
  const[balance, setBalance] = React.useState(0);
  const[cashAvailable, setCashAvailable] = React.useState(0);
  const[showBalance, setShowBalance] = React.useState(false);
  const[coinData, setCoinData] = React.useState([]);
  const[isBuyMoreDialogOpen, setBuyMoreDialogOpen] = React.useState(false);
  const[changeCoin, setChangeCoin] = React.useState(null);
  
  const handleClose = () => setBuyMoreDialogOpen(false);
  const handleShow = () => setBuyMoreDialogOpen(true);

  const closeBuyMoreDialog = () => {
    console.log('closeBuyMoreDialog');
    setBuyMoreDialogOpen(false);
  }

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

  const toggleBalance = (showBalance) => {
    setShowBalance(showBalance);
  }

  const handleDeposit = async (value) => {
    setCashAvailable(cashAvailable + value);
  }

  const handleWithdraw = async (value) => {
    if (cashAvailable >= value)
      setCashAvailable(cashAvailable - value);
  }
  
  const handleBuyMore = async (valueChangeTicker) => {
    setBuyMoreDialogOpen(true);
    console.log(`handleBuyMore ${valueChangeTicker}`);
    const changeCoin = coinData.find(coin => valueChangeTicker === coin.key);
    setChangeCoin(changeCoin);
  }

  const handleSellSome = async (valueChangeTicker) => {
    console.log(`handleSellSome ${valueChangeTicker}`);
  }

  const handleSellAll = async (valueChangeTicker) => {
    console.log(`handleSellAll ${valueChangeTicker}`);
  }

  const handleBuyNew = async (valueChangeTicker) => {
    console.log(`handleBuyNew`);
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

  const handleAction = async (action, actionParameter) => {
    switch (action) {
      case ActionType.Refresh:
        handleRefresh(actionParameter);
        break;
      case ActionType.BuyMore:
        handleBuyMore(actionParameter);
        break;
      case ActionType.SellSome:
        handleSellSome(actionParameter);
        break;
      case ActionType.SellAll:
        handleSellAll(actionParameter);
        break;
      case ActionType.ToggleBalance:
        toggleBalance(actionParameter);
        break;
      case ActionType.Deposit:
        handleDeposit(actionParameter);
        break;
      case ActionType.Withdraw:
        handleWithdraw(actionParameter);
        break;
      case ActionType.BuyNew:
        handleBuyNew();
        break;
      default:
        throw 'Unexpected action type';
    }
  }
  return (
    <div className="App">
      <ExchangeHeader />
      <AccountBalance handleAction={handleAction} 
        amount={balance} 
        showBalance={showBalance} />
      <CashAvailable handleAction={handleAction}
        showBalance={showBalance}
        amount={cashAvailable} />
      <CoinList coinData={coinData} 
        showBalance={showBalance} 
        handleAction={handleAction} />
      <BuyMoreDialog show={isBuyMoreDialogOpen} 
        cashAvailable={cashAvailable} 
        changeCoin={changeCoin}
        handleClose={closeBuyMoreDialog}/>
    </div>
  );
}

export default App;
