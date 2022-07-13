#!/usr/bin/env node

const commander = require('commander')
const pkg = require('../package.json')

commander.version(pkg.version, '-v, --version', 'output the current version')

commander
    .command('gen [name] [type]')
    .description('Gen a template.')
    .option('--force', 'Overwrite folder', false)
    .action(require("../lib/gen"))

// commander
//     .command('run [type]')
//     .description('Run a template.')
//     .option('-p, -prefix', 'Prefix for bot', '$')
//     .action((options, type) => {
//         console.log(options)
//         console.log(type)
//     })

commander.parse(process.argv)
