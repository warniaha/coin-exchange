export const createCoinBalance = (coin) => {
    return {
        key: coin.key,
        name: coin.name,
        ticker: coin.ticker,
        shares: 0,
        price: coin.price,
    }
}

const coinBalanceFilename = 'PaperCoinBalance';

export const saveCoinBalance = (values) => {
  const balances = values.filter(coin => coin && !isNaN(coin.shares) && coin.shares > 0);
  // console.log(`balances: ${JSON.stringify(balances)}`);
  localStorage.setItem(coinBalanceFilename, JSON.stringify(balances));
}

export const readCoinBalance = (setCoinBalance) => {
  var balances = JSON.parse(localStorage.getItem(coinBalanceFilename));
  if (balances === null)
    balances = [];
  console.log(balances);
  const noNan = balances.filter(coin => coin && !isNaN(coin.shares));
  setCoinBalance(noNan);
  return balances;
}

