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
import { formatPrice } from './functions/formatPrice'
import React from 'react';
// import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { ActionType } from './components/ActionType';

// copied from https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
function uniqByKeepFirst(list, key) {
  var keys = new Set();
  if (list) {
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
  return list;
}

function App(props) {
  const[balance, setBalance] = React.useState(0);
  const[cashAvailable, setCashAvailable] = React.useState(0);
  const[showBalance, setShowBalance] = React.useState(false);
  const[coinBalance, setCoinBalance] = React.useState([]);
  const[isBuyDialogOpen, setBuyDialogOpen] = React.useState(false);
  const[isSellDialogOpen, setSellDialogOpen] = React.useState(false);
  const[isBuyNewDialogOpen, setBuyNewDialogOpen] = React.useState(false);
  const[changeCoin, setChangeCoin] = React.useState(null);
  const[initialValue, setInitialValue] = React.useState(0);
  const[coinTicker, setCoinTicker] = React.useState();
  const[quantity, setQuantity] = React.useState(0);

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

  // create coinBalance from CoinList element
  const createCoinBalance = (coin) => {
    return {
      key: coin.key,
      name: coin.name,
      ticker: coin.ticker,
      shares: 0,
      price: coin.price,
    }
  }
  const createCoinTicker = (coin) => {
    return {
      key: coin.id,
      name: coin.name,
      ticker: coin.symbol,
      price: coin.quotes['USD'].price,
      last_updated: coin.last_updated,
    }
  }

  const getCoinList = async () => {
    if (coinTicker === undefined) {
      console.log(`getCoinList getting token list`);
      const listResponse = await axios.get('https://api.coinpaprika.com/v1/tickers').catch(function(error) {
        debugger;
        console.log(error);
        console.log(`getCoinList reading old file from computer`);
        return readCoinList();
      });
      if (listResponse !== undefined) {
        const tickers = uniqByKeepFirst(listResponse.data, key => key.symbol);
        const tickerMap = tickers.map(coin => {
          return createCoinTicker(coin);
        })
        setCoinTicker(tickerMap);
        saveCoinList(tickerMap);
        return tickerMap;
      }
    }
    return undefined;
  }

//   const getTickerData = async (id) => {
//     const response = await axios.get(`https://api.coinpaprika.com/v1/tickers/${id}`);
//     return createCoinBalance(response.data);
// }

  const componentDidMount = async () => {
    await getCoinList();
    readCoinBalance();
    calculateBalance();
  }

  // how to read/write to localstorage: https://jsonworld.com/demo/how-to-use-localStorage-with-reactjs
  const coinListFilename = 'PaperCoinList';
  const saveCoinList = (values) => {
    localStorage.setItem(coinListFilename, JSON.stringify(values));
  }
  const readCoinList = () => {
    const coins = JSON.parse(localStorage.getItem(coinListFilename));
    console.log(coins);
    setCoinTicker(coins);
    return coins;
  }

  const coinBalanceFilename = 'PaperCoinBalance';
  const saveCoinBalance = (values) => {
    const balances = values.map(coin => {
      return (coin.shares > 0) ? coin : null;
    })
    // console.log(`balances: ${JSON.stringify(balances)}`);
    localStorage.setItem(coinBalanceFilename, JSON.stringify(balances));
  }
  const readCoinBalance = () => {
    const balances = JSON.parse(localStorage.getItem(coinBalanceFilename));
    if (balances === null || balances.length === 0)
      return undefined;
    if (balances.length === 1 && balances[0] === null )
      return undefined;
    console.log(balances);
    const noNan = balances.filter(coin => coin && !isNaN(coin.shares));
    setCoinBalance(noNan);
    return balances;
  }

  React.useEffect(() => {
    if (coinBalance === undefined || coinBalance.length === 0) {
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
    const changeCoin = coinBalance.find(coin => valueChangeTicker === coin.key);
    setChangeCoin(changeCoin);
    // setup modal
    setActionTitle('Buy');
    setModalTitle(`Buy ${changeCoin.ticker}`);
    setInputTitle(`Spend cash available to purchase ${changeCoin.ticker}`);
    setAvailability('Cash Available');
    setInitialValue(0);
    setQuantity(0);
    setModalStatusMessage(buyMustBeGreaterThanZero);
    setModalTextFieldStatus(false);
    setBuyDialogOpen(true);
  }
  const updateModalTitles = (currentCoin) => {
    if (currentCoin) {
      setModalTitle(`Buy ${currentCoin.ticker}`);
      setInputTitle(`Spend cash available to purchase ${currentCoin.ticker}`);
    }
    else {
      setModalTitle(`Buy coins`);
      setInputTitle(`Spend cash available to purchase coins`);
    }
  }
  const selectCoin = (symbol) => {
    var currentCoin = coinBalance.find(coin => symbol === coin.ticker);
    // console.log(`selectCoin.symbol: ${symbol}`);
    if (currentCoin === undefined) {
      // console.log(`selectCoin: ${symbol} was not found, need to find it from the coinTicker`);
      currentCoin = coinTicker.find(coin => symbol === coin.ticker);
      // console.log(currentCoin);
    }
    updateModalTitles(currentCoin);
    setChangeCoin(currentCoin);
    return currentCoin;
  }

  const handleSellSome = async (valueChangeTicker) => {
    const changeCoin = coinBalance.find(coin => valueChangeTicker === coin.key);
    setChangeCoin(changeCoin);
    // setup modal
    setActionTitle('Sell');
    setModalTitle(`Sell ${changeCoin.ticker}`);
    setInputTitle(`Sell existing ${changeCoin.ticker} for cash`);
    setAvailability('Shares Available');
    setQuantity("");
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
    setQuantity("");
    setInitialValue(0);
    setModalStatusMessage(buyMustBeGreaterThanZero);
    setModalTextFieldStatus(false);
    setBuyNewDialogOpen(true);
  }

  const updateTickerPrice = async (valueChangeTicker) => {
    const response = await axios.get(`https://api.coinpaprika.com/v1/tickers/${valueChangeTicker}`);
    const newPrice = formatPrice(response.data.quotes.USD.price);
    const foundCoin = coinBalance.find(coin => valueChangeTicker === coin.key);
    if (foundCoin === undefined) {
      const foundCoin = createCoinBalance(response.data);
      const newList = [...coinBalance];
      newList.push(foundCoin);
      setCoinBalance(newList);
      saveCoinBalance(newList);
    }
    else {
      const newCoinData = coinBalance.map( function( values ) {
        let newValues = {...values};
        if (valueChangeTicker === values.key) {
          newValues.price = newPrice;
        }
        return newValues;
      });
      setCoinBalance(newCoinData);
      saveCoinBalance(newCoinData);
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
        // console.log(`BuyShares actionParameter: ${JSON.stringify(actionParameter)}`);
        buyShares(actionParameter.key, actionParameter.shares);
        break;
      case ActionType.SellShares:
        console.log(`SellShares actionParameter: ${JSON.stringify(actionParameter)}`);
        sellShares(actionParameter.key, actionParameter.shares);
        break;
      default:
        throw Object.assign(new Error(`Unexpected action type: ${action}`), { code: 402 });
    }
  }
  const sellShares = (key, quantity) => {
    if (!changeCoin) {
      console.log(`changeCoin is null`);
      return;
    }
    if (key !== changeCoin.key) {
      console.log(`${key} doesn't match ${changeCoin.key}`);
      return;
    }
    if (quantity > changeCoin.shares) {
      console.log(`not enough ${changeCoin.ticker}`);
      return;
    }
    const newCoinBalance = coinBalance.map(coin => {
      if (coin.key === key) {
        coin.shares -= quantity;
      }
      return coin;
    });
    setCoinBalance(newCoinBalance);
    saveCoinBalance(newCoinBalance);
    setCashAvailable(cashAvailable + (quantity * changeCoin.price));
  }
  const buyShares = (key, quantity) => {
    if (quantity > cashAvailable) {
      console.log(`not enough cach`);
      return;
    }
    var newCoinBalance;
    var purchaseCoin = coinBalance.find(coin => key === coin.key);
    if (!purchaseCoin) {
      const ticker = coinTicker.find(coin => key === coin.key);
      if (!ticker) {
        console.log(`ticker ${key} was not found`);
        return;
      }
      purchaseCoin = createCoinBalance(ticker);
      purchaseCoin.shares = quantity / purchaseCoin.price;
      newCoinBalance = [...coinBalance];
      newCoinBalance.push(purchaseCoin);
    }
    else {
      newCoinBalance = coinBalance.map(coin => {
        if (coin.key === key) {
          coin.shares += quantity / purchaseCoin.price;
          if (coin.shares === 0)
            return null;
        }
        return coin;
      });
    }
    setCoinBalance(newCoinBalance);
    saveCoinBalance(newCoinBalance);
    setCashAvailable(cashAvailable - quantity);
    console.log(`Purchased ${quantity / purchaseCoin.price} of ${purchaseCoin.ticker} spending $${quantity}`)
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
    setQuantity(value);
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
  const onModalBuyValidator = (valueCoin) => {
    const value = Number(valueCoin.quantity);
    const coin = valueCoin.coin;
    setQuantity(value);
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
      const shares = amount / coin.price;
      setModalStatusMessage(`Purchase ${shares} of ${coin.ticker}`);
      setModalTextFieldStatus(true);
    }
    updateModalTitles(coin);
  }

  // console.log(`coinBalance: ${JSON.stringify(coinBalance)}`);
  return (
    <div className="App">
      <ExchangeHeader />
      <AccountBalance handleAction={handleAction} 
        amount={balance} 
        showBalance={showBalance} />
      <CashAvailable handleAction={handleAction}
        showBalance={showBalance}
        amount={cashAvailable} />
      <CoinList coinBalance={coinBalance} 
        showBalance={showBalance} 
        handleAction={handleAction} />
      <BuyDialog show={isBuyDialogOpen} 
        cashSharesAvailable={cashAvailable} 
        changeCoin={changeCoin}
        quantity={quantity}
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
        quantity={quantity}
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
        coinTicker={coinTicker}
        changeCoin={changeCoin}
        modalStatusMessage={modalStatusMessage}
        modalTextFieldStatus={modalTextFieldStatus}
        onValidator={onModalBuyValidator}
        modalTitle={modalTitle}
        inputTitle={inputTitle}
        actionTitle={actionTitle}
        availability={availability}
        selectCoin={selectCoin}
        quantity={quantity}
        handleAction={handleAction}
        handleClose={closeBuyNewDialog}/>
    </div>
  );
}

export default App;
