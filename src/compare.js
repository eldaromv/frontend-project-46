import _ from 'lodash';

const compareObject = (data1, data2, depth = 2) => {  
  // const data1 = readFile(file1);
  // const data2 = readFile(file2);
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);

  const replacer = ' ';
  const spacesCount = 1;

  const indentSize = depth * spacesCount;
  const currentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);

  const lines = keys.map((key) => {
    if (!_.has(data1, key)) {
    return `${currentIndent}+ ${key}: ${data2[key]}`;
    } else if (!_.has(data2, key)) {
    return `${currentIndent}- ${key}: ${data1[key]}`;
    } else if (data1[key] === data2[key]) {
    return `${currentIndent}  ${key}: ${data1[key]}`;
    } else {
    return `${currentIndent}- ${key}: ${data1[key]}\n${currentIndent}+ ${key}: ${data2[key]}`;
    }
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

export default compareObject;