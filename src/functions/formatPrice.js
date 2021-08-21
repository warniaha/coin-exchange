export const formatPrice = (price, digits = 4) => {
    if (price === 0)
        return price;
    var formattedPrice = parseFloat(Number(price).toFixed(digits));
    for (; formattedPrice === 0; ++digits) {
        if (digits === 15)
            return price;
        formattedPrice = parseFloat(Number(price).toFixed(digits));
    }
    return formattedPrice;
}
