export const createCoinBalance = (coin) => {
    return {
        key: coin.key,
        name: coin.name,
        ticker: coin.ticker,
        shares: 0,
        costBasis: 0,
    }
}

const coinBalanceFilename = 'PaperCoinBalance';

export const resetCoinBalance = () => {
  localStorage.removeItem(coinBalanceFilename);
}

export const saveCoinBalance = (values) => {
  const balances = values.balance.filter(coin => coin && !isNaN(coin.shares) && coin.shares > 0);
  const balanceJson = JSON.stringify({ balance: balances, totalDeposits: values.totalDeposits, cash: values.cash, feesPaid: values.feesPaid });
  localStorage.setItem(coinBalanceFilename, balanceJson);
  console.log(`balances: ${balanceJson}`);
}

export const readCoinBalance = (setters) => {
  setters.balance(null);
  const jsonValues = localStorage.getItem(coinBalanceFilename);
  const parsedValues = JSON.parse(jsonValues);
  console.log(`readCoinBalance: jsonValues: ${jsonValues}`)

  var balances = [];
  var cash = 0;
  var feesPaid = 0;
  var totalDeposits = 0;

  if (parsedValues !== null) {
    balances = parsedValues.balance ?? [];
    cash = parsedValues.cash ?? 0;
    feesPaid = parsedValues.feesPaid ?? 0;
    totalDeposits = parsedValues.totalDeposits ?? 0;
  }
  balances = balances.map(coin => {
    // add newly added members
    if (isNaN(coin.costBasis))
      coin.costBasis = 0;
    return coin;
  });

  // trim records that have NaN as the number of shares
  const noNan = balances.filter(coin => coin && !isNaN(coin.shares));
  setters.balance(noNan);
  setters.cash(cash);
  setters.feesPaid(feesPaid);
  setters.totalDeposits(totalDeposits);
}

