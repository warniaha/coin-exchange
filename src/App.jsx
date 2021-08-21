import './App.css';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import CashAvailable from './components/CashAvailable/CashAvailable';
import BuyDialog from './components/BuyDialog/BuyDialog';
import BuyNewDialog from './components/BuyNewDialog/BuyNewDialog';
import SellDialog from './components/SellDialog/SellDialog';
import LoadingDialog from './components/LoadingDialog/LoadingDialog';
import 'bootswatch/dist/flatly/bootstrap.min.css';
import { formatPrice } from './functions/formatPrice'
import React from 'react';
import axios from 'axios';
import { ActionType } from './components/ActionType';
import { LoadingState } from './components/LoadingState';
import { createCoinBalance, saveCoinBalance, readCoinBalance } from './functions/CoinBalance';
import { getCoinTicker } from './functions/CoinTicker'

function App(props) {
  const[balance, setBalance] = React.useState(0);
  const[cashAvailable, setCashAvailable] = React.useState(undefined);
  const[showBalance, setShowBalance] = React.useState(false);
  const[coinBalance, setCoinBalance] = React.useState(undefined);  // balances of each coin purchased
  const[isLoadingDialogOpen, setLoadingDialogOpen] = React.useState(LoadingState.Initial);
  const[isBuyDialogOpen, setBuyDialogOpen] = React.useState(false);
  const[isSellDialogOpen, setSellDialogOpen] = React.useState(false);
  const[isBuyNewDialogOpen, setBuyNewDialogOpen] = React.useState(false);
  const[changeCoin, setChangeCoin] = React.useState(null);  // coin dialogs operate on
  const[initialValue, setInitialValue] = React.useState(0);
  const[coinTicker, setCoinTicker] = React.useState(undefined);  // list of coins
  const[quantity, setQuantity] = React.useState(0);     // dialogs quantity

  const closeBuyDialog = () => {
    setBuyDialogOpen(false);
  }
  const closeSellDialog = () => {
    setSellDialogOpen(false);
  }
  const closeBuyNewDialog = () => {
    setBuyNewDialogOpen(false);
  }
  const closeLoadingDialog = () => {
    setLoadingDialogOpen(LoadingState.Completed);
    calculateBalance();
  }

  const calculateBalance = (bal = coinBalance, cash = cashAvailable) => {
    if (typeof(coinTicker) == "object" &&
      typeof(bal) == "object" &&
      cash !== undefined && cash >= 0) {
      var total = cash;
      bal.forEach(coin => {
        total += coin.shares * coin.price;
      });
      setBalance(total);
    }
    else
      setBalance(0);
  }

  const coinCashAvailableFilename = "PaperCashAvailable";
  const saveCashAvailable = (cash) => {
    localStorage.setItem(coinCashAvailableFilename, JSON.stringify(cash));
  }
  const readCashAvailable = () => {
    const cash = JSON.parse(localStorage.getItem(coinCashAvailableFilename));
    setCashAvailable(cash ?? 0);
  }

  const onReloadLoadingDialog = () => {
    if (coinTicker === null) {
      getCoinTicker(coinTicker, setCoinTicker);
    }
    if (coinBalance === null) {
      readCoinBalance(setCoinBalance);
    }
    if (cashAvailable === -1) {
      readCashAvailable();
    }
  }
  const componentDidMount = async () => {
    if (isLoadingDialogOpen === LoadingState.Initial) {
      setLoadingDialogOpen(LoadingState.Displayed);
    }
    if (coinTicker === undefined) {
      setCoinTicker(null);
      getCoinTicker(coinTicker, setCoinTicker);
    }
    if (coinBalance === undefined) {
      setCoinBalance(null);
      readCoinBalance(setCoinBalance);
    }
    if (cashAvailable === undefined) {
      setCashAvailable(-1);
      readCashAvailable();
    }
  }

  React.useEffect(() => {
    if (coinBalance === undefined) {
      componentDidMount();
    }
  })

  const toggleBalance = (showBalance) => {
    setShowBalance(showBalance);
    calculateBalance();
  }

  const handleDeposit = async (value) => {
    const total = cashAvailable + value;
    setCashAvailable(total);
    saveCashAvailable(total);
    calculateBalance(coinBalance, total);
  }

  const handleWithdraw = async (value) => {
    if (cashAvailable >= value) {
      const total = cashAvailable - value;
      setCashAvailable(total);
      saveCashAvailable(total);
      calculateBalance(coinBalance, total);
    }
  }
  
  const handleBuyMore = async (valueChangeTicker) => {
    const foundCoin = coinBalance.find(coin => valueChangeTicker === coin.key);
    setChangeCoin(foundCoin);
    // setup modal
    setActionTitle('Buy');
    setModalTitle(`Buy ${foundCoin.ticker}`);
    setInputTitle(`Spend cash available to purchase ${foundCoin.ticker}`);
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
    const foundCoin = coinBalance.find(coin => valueChangeTicker === coin.key);
    setChangeCoin(foundCoin);
    // setup modal
    setActionTitle('Sell');
    setModalTitle(`Sell ${foundCoin.ticker}`);
    setInputTitle(`Sell existing ${foundCoin.ticker} for cash`);
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
    var foundCoin = coinBalance.find(coin => valueChangeTicker === coin.key);
    if (foundCoin === undefined) {
      foundCoin = createCoinBalance(response.data);
      const newList = [...coinBalance];
      newList.push(foundCoin);
      setCoinBalance(newList);
      saveCoinBalance(newList);
      calculateBalance(newList, cashAvailable);
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
      calculateBalance(newCoinData, cashAvailable);
    }
    console.log(`Updated price of ${foundCoin.ticker} to ${newPrice}`);
    return foundCoin;
  }

  const handleRefresh = async (valueChangeTicker) => {
    updateTickerPrice(valueChangeTicker).then(result => {
      // make sure to update the coin for the dialogs
      setChangeCoin(result);
    });
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
        buyShares(actionParameter.key, actionParameter.shares);
        break;
      case ActionType.SellShares:
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
    const cash = cashAvailable + (quantity * changeCoin.price);
    setCashAvailable(cash);
    saveCashAvailable(cash);
    calculateBalance(newCoinBalance, cash);
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
    const cash = cashAvailable - quantity;
    setCashAvailable(cash);
    saveCashAvailable(cash);
    calculateBalance(newCoinBalance, cash);
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
      console.log(JSON.stringify(coin));
      const shares = amount / coin.price;
      setModalStatusMessage(`Purchase ${shares} of ${coin.ticker}`);
      setModalTextFieldStatus(true);
    }
    updateModalTitles(coin);
  }

  return (
    <div className="App">
      <ExchangeHeader />
      <AccountBalance handleAction={handleAction} 
        amount={balance} 
        showBalance={showBalance} />
      <CashAvailable handleAction={handleAction}
        coinTicker={coinTicker}
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
      <LoadingDialog show={isLoadingDialogOpen === LoadingState.Displayed}
        coinBalance={coinBalance}
        coinTicker={coinTicker}
        cashAvailable={cashAvailable}
        modalTitle="Loading values"
        handleReload={onReloadLoadingDialog}
        handleClose={closeLoadingDialog}/>
    </div>
  );
}

export default App;
