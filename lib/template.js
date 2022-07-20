class Template {
    constructor() {
        this.templates = [
            {
                type: "basic",
                gitPath: "macen648/discordBotTemplate"
            },
            {
                type: "music",
                gitPath: "macen648/music-template"
            },
            {
                type: "raw_discord",
                gitPath: "macen648/raw-discord-template"
            }
        ]

        this.type 

        this.gitPath 
    }

    resolveGitPath(type){
        this.type = type
        var result = this.templates.find(data => data.type === type)
        this.gitPath = result.gitPath 
    }

}


module.exports = Template
