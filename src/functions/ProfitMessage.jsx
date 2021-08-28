import { formatPrice } from './formatPrice';

export function profitMessage(showBalance, profitAmount) {
    var profitPopupMessage = formatPrice(profitAmount, 2);
    if (profitAmount === 0)
        return 'No gain, no loss';
    if (showBalance)
        return profitAmount >= 0 ? `Profitted by $${profitPopupMessage}` : `Loss of $${profitPopupMessage}`;
    else
        return profitAmount >= 0 ? `Profittable` : `Loss encountered`;
}
