const cache = require('./../../../src/crosscut/Cache')
const assert = require('assert');
const { wait } = require('./../../../src/crosscut/time')

describe('Cache test', () => {

    it('Cache test - Common set and get data', () => {
        const content = cache
            .set('test', { ok: true }, { expireAt: Date.now() + 3000 })
            .get('test')

        console.log(content)
        return assert.equal(content.value.ok, true)
    })

    it('Cache test - Expired data', async function () {
        cache.set('test', { ok: true }, { expireAt: Date.now() + 100 })
        this.timeout(800);

        await wait(300)
        const content = cache.get('test')
        console.log('content', content)
        return assert.equal(content, null)
    })

    it('Infinity time', async function () {
        cache.set('test', { ok: true }, { expireAt: -1 })
        this.timeout(800);

        await wait(300)
        const content = cache.get('test')
        console.log('content', content)
        return assert.equal(content.value.ok, true)
    })

    it('Access data in diferent times', async function () {
        cache.set('test', { ok: true }, { expireAt: Date.now() + 1000 })
        this.timeout(2000);

        await wait(300)
        const contentA = cache.get('test')
        console.log('contentA', contentA)

        await wait(1000)
        const contentB = cache.get('test')
        console.log('contentB', contentB)

        return assert.equal(contentA.value.ok === true && contentB === null, true)
    })
})
