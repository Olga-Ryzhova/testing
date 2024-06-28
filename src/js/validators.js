export function isValidCard(input) {
 // проверка некорректного номера
    if (input == '' || input == null || input == 0 || /^\s*$/.test(input))  {
        return false;
    }
// алогритм Луна
    const number = input.toString();
    let sum = 0;
    const parity  = (number.length) % 2;
    for (let i = 0; i < number.length; i++) {
        let digit = Number(number[i]);
        if (i % 2 === parity) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
    sum += digit;
    }
    return Number(sum % 10) === 0;
}

// определяем платежную систему карты
export function definishonPaymentSystem(cardNumber) {
    if (/^4/.test(cardNumber) && cardNumber.length === 16) {
        return 'Visa';
    } else if (/^5[1-5]/.test(cardNumber) && cardNumber.length === 16) {
        return 'MasterCard';
    } else if (/^3[4,7]/.test(cardNumber) && cardNumber.length === 15) {
        return 'American Express';
    } else if (/^35/.test(cardNumber) && cardNumber.length === 16) {
        return 'JCB';
    } else if (/^50[18,20,38]/.test(cardNumber) || /^58/.test(cardNumber) || /^63/.test(cardNumber) || /^67[59,61-63]/.test(cardNumber) && cardNumber.length === 16) {
        return 'Maestro';
    } else if (/^2/.test(cardNumber) && cardNumber.length === 16) {
        return 'МИР';
    } 
}