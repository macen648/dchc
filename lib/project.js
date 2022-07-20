const download = require('download-git-repo')
const editJsonFile = require("edit-json-file")
const inquirer = require('inquirer')

const path = require('path')
const fs = require('fs')

const { DCHCError, DCHCHardError } = require('./utils/Errors')
const { DCHCLog } = require('./utils/Logs')
const Template = require('./template')

class Project {
    constructor() {

        this.name

        this.path

        this.options

        this.Template = new Template()

    }

    generate() {
        
        download(this.Template.gitPath, this.path, (error) => {
            if (error) {
                DCHCError
                    .log('Unable to curl git request')
                    .newLine(`Git url requested: ${this.Template.gitPath}`)
                    
                    .newLine(error)
                    .end(1)
            }

            DCHCLog.log(`📦 ${this.name} has been generated succesfully!`)

            let file = editJsonFile(`${this.path}/package.json`)
            file.set('name', this.name)
            file.save()

        })
    }


    async resolveOptions(inputName, options) {
        var templateType

        if (inputName) this.name = inputName
        else this.name = path.basename(process.cwd())

        if (options.dir) this.path = path.format({ root: '/', dir: options.dir, base: this.name })
        else this.path = this.name

        if (fs.existsSync(this.path) && options.force == false) {
            DCHCError
                .log(`Dir '${this.path}' already exits. Use --force to overwrite.`)
                .end(1)
        }
        this.options = options

        if (options.type != 'use-selector') return templateType = options.type

        if (options.typeDefault) return templateType = 'basic'

        templateType = await this.templateSelector()

        this.Template.resolveGitPath(templateType)
    }



    async templateSelector() {
        const selection = await inquirer.prompt([{
            type: 'list',
            name: 'template',
            message: 'Template selection:',
            choices: ['basic', 'music', 'cancel'],
        },
        ])

        if (selection.template == 'cancel') {
            DCHCLog.log(`Template selection canceled!`)
            DCHCError.end(1)
        }

        return selection.template
    }

}

module.exports = Project