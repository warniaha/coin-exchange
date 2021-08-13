const ActionType = {
    Refresh: "Refresh", // refresh the price of the coin
    BuyMore: "BuyMore", // but more of shares already owned
    SellSome: "SellSome",   // sell existing shares
    ToggleBalance: "ToggleBalance", // shows/hides the balances
    Deposit: "Deposit",     // Deposit $1000
    Withdraw: "Withdraw",   // Withdraw $1000
    BuyNew: "BuyNew",   // list coins not owned to purchase dialog
    BuyShares: "BuyShares"  // action resulting from clicking the Buy button
}

export { ActionType };
