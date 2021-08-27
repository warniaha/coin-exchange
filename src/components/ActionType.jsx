const ActionType = {
    Settings: "Settings", // settings dialog
    BuyMore: "BuyMore", // but more of shares already owned
    SellSome: "SellSome",   // sell existing shares
    ToggleBalance: "ToggleBalance", // shows/hides the balances
    Deposit: "Deposit",     // Deposit $1000
    Withdraw: "Withdraw",   // Withdraw $1000
    BuyNew: "BuyNew",   // list coins not owned to purchase dialog
    BuyShares: "BuyShares",  // action resulting from clicking the Buy button
    SellShares: "SellShares",  // action resulting from clicking the Sell button
    SaveSettings: "SaveSettings",   // save settings from the SettingsDialog
    Help: "Help",   // Show the help window
}

export { ActionType };
