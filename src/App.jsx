// NavBar example: https://stackoverflow.com/questions/51486024/bootstrap-navbar-with-react

import './App.css';
import CoinList from './components/CoinList/CoinList';
import ExchangeHeader from './components/ExchangeHeader/ExchangeHeader';
import BuyDialog from './components/BuyDialog/BuyDialog';
import BuyNewDialog from './components/BuyNewDialog/BuyNewDialog';
import SellDialog from './components/SellDialog/SellDialog';
import LoadingDialog from './components/LoadingDialog/LoadingDialog';
import SettingsDialog from './components/SettingsDialog/SettingsDialog';
import OverviewPanel from './components/OverviewPanel/OverviewPanel';
import AlertDialog from './components/AlertDialog/AlertDialog';
import HelpDialog from './components/HelpDialog/HelpDialog';

import 'bootswatch/dist/flatly/bootstrap.min.css';
import React from 'react';
import { ActionType } from './components/ActionType';
import { LoadingState } from './components/LoadingState';
import { createCoinBalance, saveCoinBalance, readCoinBalance, resetCoinBalance } from './functions/CoinBalance';
import { saveSettings, readSettings, resetSettings } from './functions/Settings';
import { getPriceFromTicker, getCoinTicker, resetCoinTicker } from './functions/CoinTicker'
import { minutesAsSeconds } from './functions/timeframes';

function App(props) {
  const[totalDeposits, setTotalDeposits] = React.useState(0);
  const[netBalance, setNetBalance] = React.useState(0);
  const[cashAvailable, setCashAvailable] = React.useState(undefined);
  const[feeRate, setFeeRate] = React.useState(undefined);
  const[feeTotal, setFeeTotal] = React.useState(undefined);
  const[showBalance, setShowBalance] = React.useState(false);
  const[coinBalance, setCoinBalance] = React.useState(undefined);  // balances of each coin purchased
  const[isHelpDialogOpen, setHelpDialogOpen] = React.useState(false);
  const[isLoadingDialogOpen, setLoadingDialogOpen] = React.useState(LoadingState.Initial);
  const[isBuyDialogOpen, setBuyDialogOpen] = React.useState(false);
  const[isSellDialogOpen, setSellDialogOpen] = React.useState(false);
  const[isBuyNewDialogOpen, setBuyNewDialogOpen] = React.useState(false);
  const[isSettingsDialogOpen, setSettingsDialogOpen] = React.useState(false);
  const[dialogTicker, setDialogTicker] = React.useState("");  // ticker the dialogs operate on
  const[initialValue, setInitialValue] = React.useState(0);
  const[coinTicker, setCoinTicker] = React.useState(undefined);  // list of coins
  const[quantity, setQuantity] = React.useState(0);     // dialogs quantity
  const[statusBarText, setStatusBarText] = React.useState("Loading...");

  // alert values
  const[showAlert, setShowAlert] = React.useState(false);
  const[alertHeading, setAlertHeading] = React.useState("");
  const[alertMessage, setAlertMessage] = React.useState("");
  const[alertButtonAcceptText, setAlertButtonAcceptText] = React.useState("");
  const[alertAcceptHandler, setAlertAcceptHandler] = React.useState(undefined);
  const[alertCancelHandler, setAlertCancelHandler] = React.useState(undefined);

  // 1 second timer used for updating the popup text over the refresh buttons
  const [seconds, setSeconds] = React.useState(0);
  const [lastRefresh, setLastRefresh] = React.useState(0);

  const calculateBalance = React.useCallback((bal = coinBalance, cash = cashAvailable, ticker = coinTicker) => { 
    if (typeof(coinTicker) == "object" &&
      typeof(bal) == "object" &&
      cash !== undefined && cash >= 0) {
      var totalAvailable = cash;
      bal.forEach(coin => {
        totalAvailable += coin.shares * getPriceFromTicker(ticker, coin.ticker);
      });
      if (totalAvailable !== netBalance)
        setNetBalance(totalAvailable);
    }
    else
      if (0 !== netBalance)
        setNetBalance(0);
  }, [coinBalance, cashAvailable, coinTicker, netBalance]);

  React.useEffect(() => {
    const isRefreshNeeded = () => {
      if (!coinTicker)
        return false;
      const bitCoin = coinTicker.find(coin => coin.ticker === "BTC");
      const priceAge = Date.parse(bitCoin.last_updated);
      const lastRefreshSeconds = (Date.now() - lastRefresh) / 1000;
      const priceAgeSeconds = (Date.now() - priceAge) / 1000;
      if (lastRefreshSeconds > minutesAsSeconds(1) &&
        priceAgeSeconds > minutesAsSeconds(5)) {
        return true;
      }
      return false;
    }
    const interval = setInterval(() => {
    setSeconds(seconds => seconds + 1);
    if (isRefreshNeeded()) {
      setLastRefresh(Date.now());
      getCoinTicker(setCoinTicker, setStatusBarText, calculateBalance);
    }
  }, 1000);
  return () => clearInterval(interval);
  }, [seconds, coinTicker, setCoinTicker, lastRefresh, setLastRefresh, setStatusBarText, calculateBalance]);

  const closeHelpDialog = () => {
    setHelpDialogOpen(false);
  }
  const closeAlertDialog = () => {
    setShowAlert(false);
  }
  const closeSettingsDialog = () => {
    setSettingsDialogOpen(false);
  }
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

  const onReloadLoadingDialog = () => {
    if (coinBalance === undefined) {
      readCoinBalance({ balance: setCoinBalance, totalDeposits: setTotalDeposits, cash: setCashAvailable, feesPaid: setFeeTotal });
      readSettings({ feeRate: setFeeRate });
    }
  }

  const reloadApp = () => {
    setCoinTicker(undefined);
    setCoinBalance(undefined);
    setCashAvailable(undefined);
    setFeeRate(undefined);
    componentDidMount(true);
  }

  const componentDidMount = async (forcedReset = false) => {
    if (isLoadingDialogOpen === LoadingState.Initial || forcedReset) {
      setLoadingDialogOpen(LoadingState.Displayed);
    }
    getCoinTicker(setCoinTicker, setStatusBarText, calculateBalance);
    if (coinBalance === undefined || forcedReset) {
      readCoinBalance({ balance: setCoinBalance, totalDeposits: setTotalDeposits, cash: setCashAvailable, feesPaid: setFeeTotal });
    }
    if (feeRate === undefined || forcedReset) {
      readSettings({ feeRate: setFeeRate });
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
    const totalAvailable = cashAvailable + value;
    const deposits = totalDeposits + value;
    setCashAvailable(totalAvailable);
    saveCoinBalance({ balance: coinBalance, totalDeposits: deposits, cash: totalAvailable, feesPaid: feeTotal });
    calculateBalance(coinBalance, totalAvailable);
    setTotalDeposits(deposits);
    var timestamp = new Date(Date.now());
    setStatusBarText(`Depositted $1000 at ${timestamp.toLocaleString()}`)
  }

  const handleWithdraw = async (value) => {
    if (cashAvailable >= value) {
      const totalAvailable = cashAvailable - value;
      const deposits = totalDeposits - value;
      setCashAvailable(totalAvailable);
      saveCoinBalance({ balance: coinBalance, totalDeposits: deposits, cash: totalAvailable, feesPaid: feeTotal });
      calculateBalance(coinBalance, totalAvailable);
      setTotalDeposits(deposits);
      var timestamp = new Date(Date.now());
      setStatusBarText(`Withdrew $1000 at ${timestamp.toLocaleString()}`)
    }
  }
  
  const handleBuyMore = async (valueChangeTicker) => {
    const foundCoin = coinBalance.find(coin => valueChangeTicker === coin.key);
    setDialogTicker(foundCoin.ticker);
    // setup modal
    setActionTitle('Buy');
    setModalTitle(`Buy ${foundCoin.ticker}`);
    setInputTitle(`Spend cash available to purchase ${foundCoin.ticker}`);
    setAvailability('Cash Available');
    setInitialValue(0);
    setQuantity("");
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
    setDialogTicker(currentCoin.ticker);
    return currentCoin;
  }

  const handleSellSome = async (valueChangeTicker) => {
    const foundCoin = coinBalance.find(coin => valueChangeTicker === coin.key);
    setDialogTicker(foundCoin.ticker);
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

  const handleBuyNew = async () => {
    const ticker = dialogTicker ?? "coins";
    // console.log(`handleBuyNew`);
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

  const handleSettings = () => {
    setSettingsDialogOpen(true);
    setQuantity(feeRate);
  }

  const resetAllData = () => {
    resetCoinTicker();
    resetCoinBalance();
    resetSettings();
    reloadApp();
    setStatusBarText(`All purchases/deposits have been erased`);
  }

  const resetCancelled = () => {
  }

  const handleReset = () => {
    setShowAlert(true);
    setSettingsDialogOpen(false);
    setAlertHeading("Erase everything?");
    setAlertMessage("All of your purchases and deposits will be erased");
    setAlertButtonAcceptText("Erase");
    setAlertAcceptHandler({handler: resetAllData});
    setAlertCancelHandler({handler: resetCancelled});
  }

  const handleAction = async (action, actionParameter) => {
    switch (action) {
      case ActionType.Reset:
        handleReset(actionParameter);
        break;
      case ActionType.Settings:
        handleSettings(actionParameter);  // opens SettingsDialog
        break;
      case ActionType.SaveSettings:
        setFeeRate(actionParameter.feeRate);  // saves settings
        saveSettings({ feeRate: actionParameter.feeRate });
        break;
      case ActionType.BuyMore:
        handleBuyMore(actionParameter); // opens BuyDialog
        break;
      case ActionType.SellSome:
        handleSellSome(actionParameter); // opens SellDialog
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
        handleBuyNew(); // opens BuyNewDialog
        break;
      case ActionType.BuyShares:
        buyShares(actionParameter.key, actionParameter.shares);
        break;
      case ActionType.SellShares:
        sellShares(actionParameter.key, actionParameter.shares);
        break;
      case ActionType.Help:
        showHelp();
        break;
      default:
        throw Object.assign(new Error(`Unexpected action type: ${action}`), { code: 402 });
    }
  }

  const showHelp = () => {
    setHelpDialogOpen(true);
  }

  const sellShares = (key, quantity) => {
    if (!dialogTicker) {
      console.log(`Current ticker is null`);
      return;
    }
    const changeCoin = coinBalance.find(coin => coin.ticker === dialogTicker);
    if (!changeCoin) {
      console.log(`${dialogTicker} wasn't found in coinBalance`);
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
    const price = getPriceFromTicker(coinTicker, changeCoin.ticker);
    var cost = quantity * price;
    const sellFees = cost * feeRate;
    // cost -= sellFees;
    // const sellQuantity = cost / price;
    const newCoinBalance = coinBalance.map(coin => {
      if (coin.key === key) {
        const newShares = coin.shares - quantity;
        var newCoin = {...coin};
        newCoin.costBasis = newShares > 0 ? (((coin.shares * coin.costBasis) - (quantity + sellFees)) / newShares) : 0;
        newCoin.shares = newShares;
        return newCoin;
      }
      return coin;
    });
    const cash = cashAvailable + (quantity * price) - sellFees;
    const totalFeesPaid = feeTotal + sellFees;
    setCashAvailable(cash);
    calculateBalance(newCoinBalance, cash);
    const statusText = `Sold ${quantity / price} shares of ${changeCoin.ticker} collecting $${quantity} paying $${sellFees} in fees`;
    setFeeTotal(totalFeesPaid);
    setStatusBarText(statusText);
    console.log(statusText);
    setCoinBalance(newCoinBalance);
    saveCoinBalance({ balance: newCoinBalance, totalDeposits: totalDeposits, cash: cash, feesPaid: totalFeesPaid });
  }

  const buyShares = (key, quantity) => {
    if (quantity > cashAvailable) {
      console.log(`not enough cach`);
      return;
    }
    var newCoinBalance;
    var buyFees = quantity * feeRate;
    var price;
    quantity -= buyFees;
    var purchaseCoin = coinBalance.find(coin => key === coin.key);
    if (!purchaseCoin) {
      const ticker = coinTicker.find(coin => key === coin.key);
      if (!ticker) {
        console.log(`ticker ${key} was not found`);
        return;
      }
      
      purchaseCoin = createCoinBalance(ticker);
      price = getPriceFromTicker(coinTicker, purchaseCoin.ticker);
      purchaseCoin.shares = quantity / price;
      purchaseCoin.costBasis = price;
      newCoinBalance = [...coinBalance];
      newCoinBalance.push(purchaseCoin);
    }
    else {
      price = getPriceFromTicker(coinTicker, purchaseCoin.ticker);
      newCoinBalance = coinBalance.map(coin => {
        if (coin.key === key) {
          const newShares = quantity / price + coin.shares;
          coin.costBasis = ((coin.shares * coin.costBasis) + quantity) / newShares;
          coin.shares = newShares;
          if (coin.shares === 0)
            return null;
        }
        return coin;
      });
    }
    const cash = cashAvailable - (quantity + buyFees);
    const totalFeesPaid = feeTotal + buyFees;
    setFeeTotal(totalFeesPaid);
    setCashAvailable(cash);
    calculateBalance(newCoinBalance, cash);
    const statusText = `Purchased ${quantity / price} shares of ${purchaseCoin.ticker} spending $${quantity} paying $${buyFees} in fees`;
    setStatusBarText(statusText);
    console.log(statusText);
    setCoinBalance(newCoinBalance);
    saveCoinBalance({ balance: newCoinBalance, totalDeposits: totalDeposits, cash: cash, feesPaid: totalFeesPaid });
  }

  const buyMustBeGreaterThanZero = 'Amount to purchase must be greater than zero';
  const sellMustBeGreaterThanZero = 'Number of shares to sell must be greater than zero';
  const [modalStatusMessage, setModalStatusMessage] = React.useState("");
  const [modalTextFieldStatus, setModalTextFieldStatus] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState("");
  const [inputTitle, setInputTitle] = React.useState("");
  const [actionTitle, setActionTitle] = React.useState("");
  const [availability, setAvailability] = React.useState("");

  const onSettingsValidator = (value) => {
    setQuantity(value.feeRate);
  }
  const onModalSellValidator = (dollarAmount) => {
    var value = dollarAmount;
    if (typeof(dollarAmount) === "string") {
      value = dollarAmount.replace(/[^\d.-]/g, ''); // remove non-digits like $ or ,
    }

    const changeCoin = coinBalance.find(coin => coin.ticker === dialogTicker);
    if (!changeCoin) {
      console.log(`${dialogTicker} wasn't found in coinBalance`);
      return;
    }
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
      const price = getPriceFromTicker(coinTicker, changeCoin.ticker);
      const shares = amount * price;
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
      // console.log(JSON.stringify(coin));
      const shares = amount / getPriceFromTicker(coinTicker, coin.ticker);
      setModalStatusMessage(`Purchase ${shares} of ${coin.ticker}`);
      setModalTextFieldStatus(true);
    }
    updateModalTitles(coin);
  }

  const sharesAvailableForSale = () => {
    const changeCoin = coinBalance ? coinBalance.find(coin => coin.ticker === dialogTicker) : undefined;
    return Boolean(!changeCoin) ? 0 : changeCoin.shares;
  }
  
  return (
    <div className="App">
      <ExchangeHeader />
      <OverviewPanel
        totalDeposits={totalDeposits}
        netBalance={netBalance} 
        feesCollected={feeTotal}
        feeRate={feeRate}
        cashAvailable={cashAvailable} 
        showBalance={showBalance}
        handleAction={handleAction} />
      <CoinList
        coinBalance={coinBalance} 
        coinTicker={coinTicker}
        showBalance={showBalance} 
        handleAction={handleAction} />
      <div className="status-bar">
        <div>Status: </div>
        <div className="status-bar-message">{statusBarText}</div>
      </div>
      <BuyDialog show={isBuyDialogOpen} 
        cashSharesAvailable={cashAvailable} 
        dialogTicker={dialogTicker}
        coinBalance={coinBalance} 
        coinTicker={coinTicker}
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
        cashSharesAvailable={sharesAvailableForSale()} 
        coinBalance={coinBalance} 
        coinTicker={coinTicker}
        dialogTicker={dialogTicker}
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
        coinBalance={coinBalance} 
        coinTicker={coinTicker}
        dialogTicker={dialogTicker}
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
        settings={{feeRate: feeRate}}
        modalTitle="Loading values"
        handleReload={onReloadLoadingDialog}
        handleClose={closeLoadingDialog}/>
      <SettingsDialog show={isSettingsDialogOpen} 
        modalTitle="Settings"
        inputTitle="Paper Coin Exchange Settings"
        settings={{feeRate: quantity}}
        onValidator={onSettingsValidator}
        handleAction={handleAction}
        handleClose={closeSettingsDialog} />
      <AlertDialog
        alertHeading={alertHeading}
        alertMessage={alertMessage}
        alertButtonAcceptText={alertButtonAcceptText}
        alertAcceptHandler={alertAcceptHandler}
        alertCancelHandler={alertCancelHandler}
        show={showAlert}
        handleClose={closeAlertDialog}/>
      <HelpDialog show={isHelpDialogOpen}
        handleAction={handleAction}
        totalDeposits={totalDeposits}
        netBalance={netBalance}
        showBalance={showBalance}
        handleClose={closeHelpDialog}/>
    </div>
  );
}

export default App;
