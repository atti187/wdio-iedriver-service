import IEDriver from 'iedriver'
import fs from 'fs-extra'
import getFilePath from './utils/getFilePath'
import childProcess from 'child_process'
var binPath = IEDriver.path

const DEFAULT_LOG_FILENAME = 'IEDriver.txt'

class IEDriverLauncher {
    constructor () {
        this.ieDriverLogs = null
        this.ieDriverArgs = {}
        this.logToStdout = false
        this.killInstances = false
    }

    onPrepare (config) {
        this.ieDriverArgs = config.ieDriverArgs || {}
        this.ieDriverLogs = config.ieDriverLogs
        this.logToStdout = config.logToStdout
        this.killInstances = config.killInstances

        return new Promise((resolve, reject) => {
            this.process = childProcess.execFile(binPath, [], (err, stdout, stderr) => {
                if (err) {
                    console.log('Error in process: ' + err)
                    return reject(err)
                }
            })

            if (this.process) {
                if (typeof this.ieDriverLogs === 'string') {
                    this._redirectLogStream()
                }
                resolve()
            }
        })
    }

    onComplete () {
        return new Promise((resolve, reject) => {
            if (this.process) {
                if (this.killInstances === true) {
                    const killer = childProcess.spawn('taskkill', ['/F', '/IM', 'iexplore.exe'])
                    killer.on('close', (code) => {
                        this.process.kill()
                        resolve()
                    })
                } else {
                    this.process.kill()
                    resolve()
                }
            } else {
                reject('Process not started')
            }
        })
    }

    _redirectLogStream () {
        const logFile = getFilePath(this.ieDriverLogs, DEFAULT_LOG_FILENAME)

        // ensure file & directory exists
        fs.ensureFileSync(logFile)

        const logStream = fs.createWriteStream(logFile, { flags: 'w' })
        this.process.stdout.pipe(logStream)
        this.process.stderr.pipe(logStream)
    }
}

export default IEDriverLauncher
