import { expect, test } from '@jest/globals';
import gendiff from '../src/index.js';
import _ from 'lodash';

test('compare json files', () => {
  const lines = [
    '    host: hexlet.io',
    '  - timeout: 50',
    '  + timeout: 20',
    '  - proxy: 123.234.53.22',
    '  - follow: false',
    '  + verbose: true',
];

  const path1 = '__fixtures__/file1.json';
  const path2 = '__fixtures__/file2.json';

  const result = ['{', ...lines, '}'].join('\n');
  const copiedResult = _.cloneDeep(result);

  expect(gendiff(path1, path2)).toBe(copiedResult);
});