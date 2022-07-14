#!/usr/bin/env node

const commander = require('commander')
const pkg = require('../package.json')

commander.version(pkg.version, '-v, --version', 'output the current version')

commander
    .command('gen [name]')
    .description('Gen a template.')
    .option('-d, --dir <dir>', 'Change output folder', './')
    .option('-t, --type <template-name>', 'Change template', 'use-selector')
    .option('-t-D, --type-Default', 'Default to basic')
    .option('--force', 'Overwrite folder', false)
    .action(require("../commands/gen"))


commander
    .command('run')
    .description('Run a template.')
    //.option('-p, -prefix', 'Prefix for bot', '$')
    .action(require("../commands/run"))

commander.parse(process.argv)
