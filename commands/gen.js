const download = require('download-git-repo')
const editJsonFile = require("edit-json-file")
const dirTree = require('directory-tree')

const inquirer = require('inquirer')

const path = require('path')
const fs = require('fs')

const { DCHCError, DCHCHardError } = require('../utils/Errors')
const { DCHCLog } = require('../utils/Logs')

/*
command options:
Gen [name] - if there is already a package.json project defaults to name of that package.json
           - name of project defaults to name of dir its ran in i.e "$ C:home/code-shit: dchc gen -t-D --force" defaults to code-shit
           - name of project also defaults to the given dir i.e -d / --dir <dir> "$ C:home/code-shit: dchc gen -d output -t-D --force" defaults to output
-d / --dir <dir> - changes the directory the template is generated in
                 - "$ C:home/code-shit: dchc gen" will write to code-shit
                 - "$ C:home/code-shit: dchc gen -d output" will write to output
-t / --type <template-name> - sets what type of template to generate. basic, music
-t-D / --type-Default - forces template to be default i.e basic
                      - "$ C:home/code-shit: dchc gen -t-D" does the same as "$ C:home/code-shit: dchc gen -t basic"
                      - But not the same as "$ C:home/code-shit: dchc gen" as this will bring up the cli template selector
--force - Overwrites what ever the selected folder is
        - "$ C:home/code-shit: dchc gen" will overwrite code-shit
        - "$ C:home/code-shit: dchc gen -d output" will overwrite output
**/

class Project {
    constructor(){
        this.templates = [
            {
                name: "basic",
                gitPath: "macen648/discordBotTemplate"
            },
            {
                name: "music",
                gitPath: "macen648/music-template"
            },
            {
                name: "raw_discord",
                gitPath: "macen648/raw-discord-template"
            }
        ]

        this.name

        this.path

        this.options 

        this.type

    }

    async resolveOptions(inputName, options){

        if (inputName) this.name = inputName
        else this.name = path.basename(process.cwd())

        if (options.dir) this.path = path.format({ root: '/', dir: options.dir, base: this.name })
        else this.path = this.name

        if (fs.existsSync(this.path) && options.force == false) {
            DCHCError.error(`Dir '${this.path}' already exits. Use --force to overwrite.`)
            DCHCError.end(1)
        }
        this.options = options

        if (options.type != 'use-selector') return this.type = options.type
 
        if (options.typeDefault) return this.type = 'basic'
        
        this.type = await this.templateSelector()
    }

    gen(){
        download(this.resolveGitPath(this.type), this.path, (error) => {
            if (error){
                //TODO fix this so u can stack
                /*
                    ex:  DCHCError
                                .Error(...)
                                .newLine(...)
                                .newLine(...)
                                .end(1)
                **/
                DCHCError.error('Unable to curl git request')
                DCHCError.newLine(`Git url requested: ${this.resolveGitPath(this.type)}`)
                DCHCError.newLine(error)
                DCHCError.end(1)

                
            } 
            else {
                DCHCLog.log(`📦 ${this.name} has been generated succesfully!`)
                let file = editJsonFile(`${this.path}/package.json`)
                file.set('name', this.name)
                file.save()
                this.listDir(this.path)
            }
        })
    }


    async templateSelector(){
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

    resolveGitPath(_name){
        const result = this.templates.find(data => data.name === _name);
        return result.gitPath 
    }

    //todo make this cleaner and more effecent
    //Maybe scrap i donno 🙃
    listDir(folder) {
        const SYMBOLS = {
            BRANCH: "├── ",
            EMPTY: "",
            INDENT: "    ",
            LAST_BRANCH: "└── ",
            VERTICAL: "│   ",
        }

        const tree = dirTree(folder)
        DCHCLog.log(`Dir ${path.basename(process.cwd())}`)
        for (var i = 0; i < tree.children.length; i++) {
            if (i == tree.children.length - 1) console.log(`       └── ${tree.children[i].name}`)
            else console.log(`       ├── ${tree.children[i].name}`)

            if (tree.children[i].children) {
                for (var j = 0; j < tree.children[i].children.length; j++)
                    if (j == tree.children[i].children.length - 1) console.log(`       │   └── ${tree.children[i].children[j].name}`)
                    else console.log(`       │   ├── ${tree.children[i].children[j].name}`)
            }
        }

    }
}


module.exports = async function gen(name, options){
    DCHCLog.clear()

    const project = new Project()
    await project.resolveOptions(name, options)
    project.gen()
}

