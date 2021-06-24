module.exports = function() {
    if (process.env.CARD_COLOR === 'random') {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`
    } else {
        return process.env.CARD_COLOR
    }
}