exports.config = {
    port: '5555',
    path: '/',
    specs: [
        './test/integration/*.spec.js'
    ],

    capabilities: [{
        browserName: 'internet explorer',
        ignoreProtectedModeSettings: true
    }],

    sync: true,
    logLevel: 'verbose',
    coloredLogs: true,

    baseUrl: 'http://webdriver.io',

    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,

    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd'
    },

    services: [
        require('../../launcher')
    ],
    ieDriverLogs: './',
    killInstances: false
}
