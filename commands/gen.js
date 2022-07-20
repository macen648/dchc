const Project = require('../lib/project')
const { DCHCLog } = require('../lib/utils/Logs')

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


module.exports = async function gen(name, options){
    DCHCLog.clear()

    const project = new Project()
    await project.resolveOptions(name, options)
    project.generate()
}

