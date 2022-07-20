class DCHCLog {
    log(msg){
        if (!msg) return
        console.log(`[DCHC] : ${msg}`)
        return this
    }
    newLine(msg){
        if(!msg) return
        console.log(`         ${msg}`)  
        return this
    }

    clear(){
        process.stdout.write("\u001b[2J\u001b[0;0H")
        return this
    }
}

module.exports = {
    DCHCLog : new DCHCLog()
}