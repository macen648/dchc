const download = require('download-git-repo')
const path = require('path')
const fs = require('fs')
const { exit } = require('process')
const { AppError } = require('../utils/Errors')
const { AppLog } = require('../utils/Logs')

//TODO
// Convert type to inquirer selection if type doesnt exist
// Re write new package jsons to have new packge data i.e name and or verison

module.exports = async function gen(name, type, options) {

        if (name === undefined) name = path.basename(process.cwd())

        if (fs.existsSync(name)) {
                if (options.force == false) {
                        AppError(`Dir '/${name}' already exits. Use --force to overwrite.`)
                        exit(1)
                }
        }
        var gitPath

        if (!type) type = 'default'
        if (type == 'default') gitPath = 'macen648/discordBotTemplate'

        download(gitPath, `${process.cwd()}/${name}`, (err) => {
                err ? AppError('Unable to curl git request') : AppLog(`📦 ${name} has been generated succesfully!`)
        })

}