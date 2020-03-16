const wait = (time) => new Promise(resolve => {
    const timer = setTimeout(() => {
        clearTimeout(timer)
        return resolve(true)
    }, time)
})

module.exports = {
    wait,
}