export function calculateCostBasis(oldShares, oldCostBasis, addShares, currentPrice) {
    const oldValue = oldShares * oldCostBasis;
    const newValue = addShares * currentPrice;
    var costBasis = 0;
    if (oldValue !== 0 && newValue !== 0) {
        costBasis = (oldValue + newValue) / (oldShares + addShares);
        return costBasis;
    }
    else if (oldValue === 0 && newValue === 0) {
        costBasis = 0;  // everything is zero
    }
    else if (oldValue === 0) {
        costBasis = currentPrice; // only new purchases
    }
    else {
        costBasis = oldCostBasis;   // no change
    }
    return costBasis;
}
