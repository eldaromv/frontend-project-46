import { expect, test } from '@jest/globals';
import _ from 'lodash';
import gendiff from '../src/index.js';

test('compare json and yaml files', () => {
  const lines = [
    '    host: hexlet.io',
    '  - timeout: 50',
    '  + timeout: 20',
    '  - proxy: 123.234.53.22',
    '  - follow: false',
    '  + verbose: true',
  ];

  const path1 = 'file1.json';
  const path2 = 'file2.json';
  const path3 = 'file1.yaml';
  const path4 = 'file2.yaml';

  const result = ['{', ...lines, '}'].join('\n');
  const copiedResult = _.cloneDeep(result);

  expect(gendiff(path1, path2)).toBe(copiedResult);
  expect(gendiff(path3, path4)).toBe(copiedResult);
});
