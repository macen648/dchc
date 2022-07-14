class DCHCLog {
    log(msg){
        if (!msg) return
        console.log(`[DCHC] : ${msg}`)
    }
    newLine(msg){
        if(!msg) return
        console.log(`         ${msg}`)  
    }

    clear(){
        process.stdout.write("\u001b[2J\u001b[0;0H")
    }
}

module.exports = {
    DCHCLog : new DCHCLog
}