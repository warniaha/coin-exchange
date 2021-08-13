import './App.css';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import CashAvailable from './components/CashAvailable/CashAvailable';
import BuyDialog from './components/BuyDialog/BuyDialog';
import BuyNewDialog from './components/BuyNewDialog/BuyNewDialog';
import SellDialog from './components/SellDialog/SellDialog';
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/flatly/bootstrap.min.css';

import React from 'react';
// import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { ActionType } from './components/ActionType';

const COIN_COUNT = 10;

const formatPrice = (price) => {
  return parseFloat(Number(price).toFixed(4));
}

// copied from https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
function uniqByKeepFirst(list, key) {
  var keys = new Set();
  return list.filter(item => {
    const itemKey = key(item)
    if (keys.has(itemKey)) {
      return false; // key was already added
    }
    else {
      keys.add(itemKey);  // add the key to the set
      return item;
    }
  });
}

function App(props) {
  const[balance, setBalance] = React.useState(0);
  const[cashAvailable, setCashAvailable] = React.useState(0);
  const[showBalance, setShowBalance] = React.useState(false);
  const[coinData, setCoinData] = React.useState([]);
  const[isBuyDialogOpen, setBuyDialogOpen] = React.useState(false);
  const[isSellDialogOpen, setSellDialogOpen] = React.useState(false);
  const[isBuyNewDialogOpen, setBuyNewDialogOpen] = React.useState(false);
  const[changeCoin, setChangeCoin] = React.useState(null);
  const[initialValue, setInitialValue] = React.useState(0);
  const[coinList, setCoinList] = React.useState();

  const closeBuyDialog = () => {
    setBuyDialogOpen(false);
  }
  const closeSellDialog = () => {
    setSellDialogOpen(false);
  }
  const closeBuyNewDialog = () => {
    setBuyNewDialogOpen(false);
  }

  const calculateBalance = () => {
    setBalance(0);
  }

  // create coinData from CoinList element
  const createCoinData = (coin) => {
    return {
      key: coin.id,
      name: coin.name,
      ticker: coin.symbol,
      shares: 0,
      price: formatPrice(coin.quotes['USD'].price),
    }
  }

  const getCoinList = async () => {
    if (coinList === undefined) {
      console.log(`getCoinList getting token list`);
      const listResponse = await axios.get('https://api.coinpaprika.com/v1/coins').catch(function(error) {
        debugger;
        console.log(error);
        console.log(`getCoinList reading old file from computer`);
        return readCoinList();
      });
      if (listResponse !== undefined) {
        setCoinList(uniqByKeepFirst(listResponse.data, key => key.symbol));
        saveCoinList(listResponse.data);
        return listResponse.data;
      }
    }
    return undefined;
  }

  const getTickerData = async (id) => {
    const response = await axios.get(`https://api.coinpaprika.com/v1/tickers/${id}`);
    return createCoinData(response.data);
}

  const componentDidMount = async () => {
    console.log(`componentDidMount called`);
    const coins = await getCoinList();
    if (coins !== undefined) {
      const coinIds = coins.slice(0, COIN_COUNT).map(coin => coin.id);
      const promises = coinIds.map(id => axios.get(`https://api.coinpaprika.com/v1/tickers/${id}`));
      const coinData = await Promise.all(promises);
      const coinPriceData = coinData.map((response) => {
        return createCoinData(response.data);
      });
      console.log(`componentDidMount saving coin data`);
      setCoinData(coinPriceData);
      calculateBalance();
    }
  }

  // how to read/write to localstorage: https://jsonworld.com/demo/how-to-use-localStorage-with-reactjs
  const coinListFilename = 'PaperCoinList';
  const saveCoinList = (values) => {
    localStorage.setItem(coinListFilename, JSON.stringify(values));
  }
  const readCoinList = () => {
    const coins = JSON.parse(localStorage.getItem(coinListFilename));
    console.log(coins);
    setCoinList(coins);
    return coins;
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
    const changeCoin = coinData.find(coin => valueChangeTicker === coin.key);
    setChangeCoin(changeCoin);
    // setup modal
    setActionTitle('Buy');
    setModalTitle(`Buy ${changeCoin.ticker}`);
    setInputTitle(`Spend cash available to purchase ${changeCoin.ticker}`);
    setAvailability('Cash Available');
    setInitialValue(0);
    setModalStatusMessage(buyMustBeGreaterThanZero);
    setModalTextFieldStatus(false);
    setBuyDialogOpen(true);
  }

  const selectCoin = (symbol) => {
    console.log(`selectCoin.symbol: ${symbol.target.value}`);
    var changeCoin = coinData.find(coin => symbol.target.value === coin.symbol);
    if (changeCoin === undefined) {
      debugger;
      console.log(`selectCoin: ${symbol.target.value} was not found, need to find it from the coinList`);
      const newCoin = coinList.find(coin => symbol.target.value === coin.symbol);
      console.log(newCoin);
      updateTickerPrice(newCoin.id);
      changeCoin = coinData.find(coin => symbol.target.value === coin.ticker);
    }
    console.log(`selectCoin.changeCoin: ${changeCoin}`);
    setChangeCoin(changeCoin);
  }

  const handleSellSome = async (valueChangeTicker) => {
    const changeCoin = coinData.find(coin => valueChangeTicker === coin.key);
    setChangeCoin(changeCoin);
    // setup modal
    setActionTitle('Sell');
    setModalTitle(`Sell ${changeCoin.ticker}`);
    setInputTitle(`Sell existing ${changeCoin.ticker} for cash`);
    setAvailability('Shares Available');
    setInitialValue(0);
    setModalStatusMessage(sellMustBeGreaterThanZero);
    setModalTextFieldStatus(false);
    setSellDialogOpen(true);
  }

  const handleBuyNew = async (valueChangeTicker) => {
    const ticker = (changeCoin == null ? "coins" : changeCoin.ticker);
    console.log(`handleBuyNew`);
    setActionTitle('Buy');
    setModalTitle(`Buy ${ticker}`);
    setInputTitle(`Spend cash available to purchase ${ticker}`);
    setAvailability('Cash Available');
    setInitialValue(0);
    setModalStatusMessage(buyMustBeGreaterThanZero);
    setModalTextFieldStatus(false);
    setBuyNewDialogOpen(true);
  }

  const updateTickerPrice = async (valueChangeTicker) => {
    const response = await axios.get(`https://api.coinpaprika.com/v1/tickers/${valueChangeTicker}`);
    const newPrice = formatPrice(response.data.quotes.USD.price);
    const foundCoin = coinData.find(coin => valueChangeTicker === coin.key);
    if (foundCoin === undefined) {
      const foundCoin = createCoinData(response.data);
      const newList = [...coinData];
      console.log(`coinData List ${coinData}`);
      newList.push(foundCoin);
      setCoinData(newList);
      console.log(`Added coin ${foundCoin}`);
      console.log(`newList List ${newList}`);
    }
    else {
      const newCoinData = coinData.map( function( values ) {
        let newValues = {...values};
        if (valueChangeTicker === values.key) {
          newValues.price = newPrice;
        }
        return newValues;
      });
      setCoinData(newCoinData);
    }
  }

  const handleRefresh = async (valueChangeTicker) => {
    updateTickerPrice(valueChangeTicker);
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
      case ActionType.BuyShares:
        break;
      default:
        throw Object.assign(new Error(`Unexpected action type: ${action}`), { code: 402 });
    }
  }

  const buyMustBeGreaterThanZero = 'Amount to purchase must be greater than zero';
  const sellMustBeGreaterThanZero = 'Number of shares to sell must be greater than zero';
  const [modalStatusMessage, setModalStatusMessage] = React.useState("");
  const [modalTextFieldStatus, setModalTextFieldStatus] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState("");
  const [inputTitle, setInputTitle] = React.useState("");
  const [actionTitle, setActionTitle] = React.useState("");
  const [availability, setAvailability] = React.useState("");

  const onModalSellValidator = (value) => {
    const amount = (value === undefined ? 0 : Number(value));
    if (amount <= 0) {
        setModalStatusMessage(sellMustBeGreaterThanZero);
        setModalTextFieldStatus(false);
    }
    else if (amount > changeCoin.shares) {
        setModalStatusMessage('Amount to sell exceeds shares available');
        setModalTextFieldStatus(false);
    }
    else {
        const shares = amount * changeCoin.price;
        setModalStatusMessage(`Receive $${shares} for selling ${changeCoin.ticker}`);
        setModalTextFieldStatus(true);
    }
  }
  const onModalBuyValidator = (value) => {
      const amount = (value === undefined ? 0 : Number(value));
      if (amount <= 0) {
          setModalStatusMessage(buyMustBeGreaterThanZero);
          setModalTextFieldStatus(false);
      }
      else if (amount > cashAvailable) {
          setModalStatusMessage('Amount to purchase exceeds cash available');
          setModalTextFieldStatus(false);
      }
      else {
          const shares = amount / changeCoin.price;
          setModalStatusMessage(`Purchase ${shares} of ${changeCoin.ticker}`);
          setModalTextFieldStatus(true);
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
      <BuyDialog show={isBuyDialogOpen} 
        cashSharesAvailable={cashAvailable} 
        changeCoin={changeCoin}
        initialValue={initialValue}
        modalStatusMessage={modalStatusMessage}
        modalTextFieldStatus={modalTextFieldStatus}
        onValidator={onModalBuyValidator}
        modalTitle={modalTitle}
        inputTitle={inputTitle}
        actionTitle={actionTitle}
        availability={availability}
        prefix="$"
        handleAction={handleAction}
        handleClose={closeBuyDialog}/>
      <SellDialog show={isSellDialogOpen} 
        cashSharesAvailable={changeCoin == null ? 0 : changeCoin.shares} 
        changeCoin={changeCoin}
        initialValue={initialValue}
        modalStatusMessage={modalStatusMessage}
        modalTextFieldStatus={modalTextFieldStatus}
        onValidator={onModalSellValidator}
        modalTitle={modalTitle}
        inputTitle={inputTitle}
        actionTitle={actionTitle}
        availability={availability}
        handleAction={handleAction}
        handleClose={closeSellDialog}/>
      <BuyNewDialog show={isBuyNewDialogOpen}
        cashSharesAvailable={cashAvailable} 
        coinList={coinList}
        modalStatusMessage={modalStatusMessage}
        modalTextFieldStatus={modalTextFieldStatus}
        onValidator={onModalBuyValidator}
        modalTitle={modalTitle}
        inputTitle={inputTitle}
        actionTitle={actionTitle}
        availability={availability}
        selectCoin={selectCoin}
        handleAction={handleAction}
        handleClose={closeBuyNewDialog}/>
    </div>
  );
}

export default App;
