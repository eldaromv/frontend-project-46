import plain from './plain.js';
import makeStylish from './stylish.js';

const getFormat = (data, format, option = undefined) => {
  switch (format) {
    case 'stylish':
      return makeStylish(data, option);
    case 'json':
      return JSON.stringify(data, null, option);
    case 'plain':
      return plain(data, option);
    default:
      throw new Error(`${format} is not supported`);
  }
};

export default getFormat;
