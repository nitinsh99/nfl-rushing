module.exports.getNumber = (num) => {

    if(typeof num === 'number') {
        return num;
    }
    const _num = parseInt(num.replace(/\D/g,''),10);
    return (num.startsWith('-') ? -1*_num : _num);  
} 
