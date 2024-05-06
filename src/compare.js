// import _ from 'lodash';

// const compareObject = (data1, data2, depth = 2) => {
//   const keys1 = Object.keys(data1);
//   const keys2 = Object.keys(data2);
//   const keys = _.union(keys1, keys2);

//   const replacer = ' ';
//   const spacesCount = 1;

//   const indentSize = depth * spacesCount;
//   const currentIndent = replacer.repeat(indentSize);

//   const lines = keys.map((key) => {
//     if (!_.has(data1, key)) {
//       return `${currentIndent}+ ${key}: ${data2[key]}`;
//     }
//     if (!_.has(data2, key)) {
//       return `${currentIndent}- ${key}: ${data1[key]}`;
//     }
//     if (data1[key] === data2[key]) {
//       return `${currentIndent}  ${key}: ${data1[key]}`;
//     }
//     return `${currentIndent}- ${key}: ${data1[key]}\n${currentIndent}+ ${key}: ${data2[key]}`;
//   });
//   return ['{', ...lines, '}'].join('\n');
// };

// export default compareObject;

import _ from 'lodash';

const compareData = (obj1, obj2) => {
  const getChildren = (obj) => Object.keys(obj);
  const childrenObj1 = getChildren(obj1);
  const childrenObj2 = getChildren(obj2);
  const childrenMass = childrenObj1.concat(childrenObj2);
  const last = childrenMass.filter((child, index) => childrenMass.indexOf(child) === index);
  const final = _.sortBy(last);
  return final.map((key) => {
    const obj1HasKey = Object.getOwnPropertyDescriptor(obj1, key);
    const obj2HasKey = Object.getOwnPropertyDescriptor(obj2, key);
    const value1 = obj1[key];
    const value2 = obj2[key];
    const obj1KeyIsObject = (typeof value1 === 'object' && value1 !== null && !Array.isArray(value1));
    const obj2KeyIsObject = (typeof value2 === 'object' && value2 !== null && !Array.isArray(value2));
    if (obj1HasKey && obj2HasKey && obj1KeyIsObject && obj2KeyIsObject) {
      return {
        type: 'parent',
        key,
        children: compareData(value1, value2),
      };
    } if (obj1HasKey && obj2HasKey && obj1KeyIsObject && !obj2KeyIsObject) {
      return {
        type: 'diffValue',
        key,
        children: value1,
        children2: value2,
      };
    } if (obj1HasKey && obj2HasKey && !obj1KeyIsObject && obj2KeyIsObject) {
      return {
        type: 'diffValue',
        key,
        children: value1,
        children2: value2,
      };
    } if (obj1HasKey && !obj2HasKey && obj1KeyIsObject) {
      return {
        type: 'deleted',
        key,
        children: value1,
      };
    } if (!obj1HasKey && obj2HasKey && obj2KeyIsObject) {
      return {
        type: 'added',
        key,
        children: value2,
      };
    } if (obj1HasKey && obj2HasKey) {
      if (value1 === value2) {
        return {
          type: 'staySame',
          key,
          children: value1,
        };
      }
      return {
        type: 'diffValue',
        key,
        children: value1,
        children2: value2,
      };
    } if (obj1HasKey && !obj2HasKey) {
      return {
        type: 'deleted',
        key,
        children: value1,
      };
    }
    return {
      type: 'added',
      key,
      children: value2,
    };
  });
};
export default compareData;
