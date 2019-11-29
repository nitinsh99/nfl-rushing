module.exports.getNumber = (num) => {

    if(Number.isNaN(num)) {
        replace(/\D/g,'')
        return parseInt(num.trim().replace(/\D/g,''),10)

    }else {
        return num;
    }
} 
