import _ from 'lodash';

const addChild = (child) => {
  if (_.isPlainObject(child)) {
    return '[complex value]';
  }
  if (typeof child === 'string') {
    return `'${child}'`;
  }
  return `${child}`;
};

const plain = (array, accum = '') => {
  const keys = Object.keys(array);
  const result = keys.map((key) => {
    const obj = array[key];

    if (obj.type === 'parent') {
      return plain(obj.children, `${accum}${obj.key}.`);
    }
    if (obj.type === 'deleted') {
      return `Property '${accum + obj.key}' was removed`;
    }
    if (obj.type === 'added') {
      return `Property '${accum + obj.key}' was added with value: ${addChild(obj.value)}`;
    }
    if (obj.type === 'diffValue') {
      return `Property '${accum + obj.key}' was updated. From ${addChild(obj.value1)} to ${addChild(obj.value2)}`;
    }
    return null;
  });

  return result.filter((line) => line !== null).join('\n');
};

export default plain;
