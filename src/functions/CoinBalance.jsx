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

