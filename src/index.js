import fs from 'fs';
import path from 'path';
import parser from './parser.js';
import compareData from './compare.js';
import getFormat from './formatters/index.js';

const getPath = (way) => path.resolve(process.cwd(), way);

const getData = (filepath) => {
  const resolvedFilepath = getPath(filepath);
  const content = fs.readFileSync(resolvedFilepath, 'utf-8');
  const extension = path.extname(filepath).slice(1);
  return parser(content, extension);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  const differences = getFormat(compareData(data1, data2), formatName);
  return differences;
};

export default genDiff;
