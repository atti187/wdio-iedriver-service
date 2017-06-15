var assert = require('assert')
var fs = require('fs')
var path = require('path')

describe('webdriverio', function () {
    it('should run a test', function () {
        browser.url('/')
        assert.equal(browser.getTitle(), 'WebDriver')
    })

    it('should have created a log file', function () {
        var filePath = path.join(process.cwd(), 'IEDriver.txt')
        var file = fs.statSync(filePath)
        assert(file.size > 0)
    })
})
