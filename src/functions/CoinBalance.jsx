export const createCoinBalance = (coin) => {
    return {
        key: coin.key,
        name: coin.name,
        ticker: coin.ticker,
        shares: 0,
        price: coin.price,
        costBasis: 0,
    }
}

const coinBalanceFilename = 'PaperCoinBalance';

export const resetCoinBalance = () => {
  localStorage.removeItem(coinBalanceFilename);
}

export const saveCoinBalance = (values) => {
  const balances = values.filter(coin => coin && !isNaN(coin.shares) && coin.shares > 0);
  // console.log(`balances: ${JSON.stringify(balances)}`);
  localStorage.setItem(coinBalanceFilename, JSON.stringify(balances));
}

export const readCoinBalance = (setCoinBalance) => {
  setCoinBalance(null);
  var balances = JSON.parse(localStorage.getItem(coinBalanceFilename));
  if (balances === null)
    balances = [];
  balances = balances.map(coin => {
    // add newly added members
    if (isNaN(coin.costBasis))
      coin.costBasis = 0;
    return coin;
  });
  const noNan = balances.filter(coin => coin && !isNaN(coin.shares));
  setCoinBalance(noNan);
  return balances;
}

