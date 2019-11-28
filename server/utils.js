module.exports.getNumber = (num) => {

    if (typeof num === 'string' && num.includes(',')) {
        return parseInt(num.replace(/,/g, ''), 10)
    } else if (typeof num === 'string' && num.includes('T')) {
        return parseInt(num.replace(/T/g, ''), 10)
    } else {
        return num;
    }
} 
