const addChild = (child) => {
  if (typeof child === 'object' && child !== null && !Array.isArray(child)) {
    return '[complex value]';
  }
  if (typeof child === 'string') {
    return `'${child}'`;
  }
  return `${child}`;
};

const plain = (array, accum = '') => {
  const keys = Object.keys(array);
  const lines = [];

  keys.forEach((key) => {
    const obj = array[key];

    if (obj.type === 'parent') {
      lines.push(plain(obj.children, `${accum}${obj.key}.`));
    } else if (obj.type === 'deleted') {
      lines.push(`Property '${accum + obj.key}' was removed`);
    } else if (obj.type === 'added') {
      lines.push(`Property '${accum + obj.key}' was added with value: ${addChild(obj.children)}`);
    } else if (obj.type === 'diffValue') {
      lines.push(`Property '${accum + obj.key}' was updated. From ${addChild(obj.children)} to ${addChild(obj.children2)}`);
    }
  });

  return lines.join('\n');
};

export default plain;
