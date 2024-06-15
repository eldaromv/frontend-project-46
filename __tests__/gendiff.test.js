import path, { dirname } from 'path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf-8');

const fileFormats = ['json', 'yml'];
const formatters = [
  [undefined, 'Stylish'],
  ['stylish', 'Stylish'],
  ['plain', 'Plain'],
  ['json', 'Json'],
];

describe.each(fileFormats)('File format: %s', (file1case) => {
  describe.each(fileFormats)('Compared with format: %s', (file2case) => {
    describe.each(formatters)('Using formatter: %s', (formatter, formatterName) => {
      test(`Get difference of two ${file1case} files with ${formatterName} formatter`, () => {
        const path1 = getFixturePath(`file1.${file1case}`);
        const path2 = getFixturePath(`file2.${file2case}`);
        const resultFile = `rightValue${formatterName}.txt`;
        const result = readFile(resultFile);

        expect(genDiff(path1, path2, formatter)).toBe(result);
      });
    });
  });
});
