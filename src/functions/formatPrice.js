export const formatPrice = (price) => {
    if (price === 0)
        return price;
    var digits = 4;
    var formattedPrice = parseFloat(Number(price).toFixed(digits));
    for (; formattedPrice === 0; ++digits) {
        if (digits === 15)
            return price;
        formattedPrice = parseFloat(Number(price).toFixed(digits));
    }
    return formattedPrice;
}
