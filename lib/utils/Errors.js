const { exit } = require('process')
const moment = require('moment')

class DCHCError {
    log(msg){
        if (!msg) return
        console.log(`[DCHC Error] : ${msg}`)
        return this
    }

    newLine(msg){
        if (!msg) return
        console.log(`               ${msg}`) 
        return this
    }

    end(exitCode) {
        exit(exitCode)
    }
    
}

class DCHCHardError extends Error {
    constructor(message, exitCode, code) {
        super(message)
  
        Error.captureStackTrace(this, this.constructor)
        this.name = this.constructor.name
        this.timeStamp = moment().format('HH:MM:SS')
        this.code = code
        this.exitCode = exitCode
    }
}

module.exports = {
    DCHCError : new DCHCError(),
    DCHCHardError
}