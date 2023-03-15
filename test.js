function numberFormat(n) {
    let wan = n / 10000
    if (wan >= 1) {
        return `字数:${wan.toFixed(0)}万${n % 10000 > 0 ? n % 10000 : ''}`
    } else {
        return `字数:${n}`
    }
}

console.log(numberFormat(123))
console.log(numberFormat(12345))
console.log(numberFormat(10000))
console.log(numberFormat(10000000))
console.log(numberFormat(10000001))
