#!/usr/bin/env node
const fs = require('fs');
const yaml = require('js-yaml');

function parseFile(filepath) {
    const fileContent = fs.readFileSync(filepath, 'utf8');
    const parsedData = yaml.load(fileContent);
    return parsedData;
}

module.exports = parseFile;