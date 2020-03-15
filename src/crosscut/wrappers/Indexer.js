const path = require('path')
const requireSmart = require('require-smart')

module.exports = class Indexer {
    constructor(properties = {}) {
        this.loader = properties.loader || requireSmart
        this.logger = properties.logger || console
        return this
    }
    setRoot(rootPath) {
        this.root = rootPath || process.cwd()
    }
    load(target) {
        this.logger.log(`Loading ${path}`)
        if (!this.root) {
            this.setRoot()
        }
        return this.loader(path.join(this.root, target))
    }
}