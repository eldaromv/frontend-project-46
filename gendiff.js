#!/usr/bin/env node
const { program } = require('commander');
const parseFile = require('./parser');

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format')
    .helpOption('-h, --help', 'output usage information')
    .action((filepath1, filepath2) => {
    const parsedData1 = parseFile(filepath1);
    const parsedData2 = parseFile(filepath2);

    console.log('Parsed data from file1:', parsedData1);
    console.log('Parsed data from file2:', parsedData2);
  });
program.parse();