import _ from 'lodash';

const compareObject = (data1, data2, depth = 2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);

  const replacer = ' ';
  const spacesCount = 1;

  const indentSize = depth * spacesCount;
  const currentIndent = replacer.repeat(indentSize);

  const lines = keys.map((key) => {
    if (!_.has(data1, key)) {
      return `${currentIndent}+ ${key}: ${data2[key]}`;
    }
    if (!_.has(data2, key)) {
      return `${currentIndent}- ${key}: ${data1[key]}`;
    }
    if (data1[key] === data2[key]) {
      return `${currentIndent}  ${key}: ${data1[key]}`;
    }
    return `${currentIndent}- ${key}: ${data1[key]}\n${currentIndent}+ ${key}: ${data2[key]}`;
  });
  return ['{', ...lines, '}'].join('\n');
};

export default compareObject;
