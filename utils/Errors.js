const { exit } = require('process')
const moment = require('moment')

class DCHCError {
    error(msg){
        if (!msg) return
        console.log(`[DCHC Error] : ${msg}`)
    }

    newLine(msg){
        if (!msg) return
        console.log(`               ${msg}`) 
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
        this.code = code
        this.exitCode = exitCode
    }
}

module.exports = {
    DCHCError : new DCHCError(),
    DCHCHardError
}