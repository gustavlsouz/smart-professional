const cheerio = require('cheerio')

module.exports = class HTMLHandler {
    constructor(properties = {}) {
        this.handler = properties.htmlHandler || cheerio
    }
    load(htmlString) {
        this.selector = this.handler.load(htmlString)
        return this
    }
    get(tag) {
        const results = this.selector(tag)
        const list = results.map((_, node) => {
            return this.selector(node).text();
        }).get()
        return list
    }
}