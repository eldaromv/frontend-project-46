import yaml from 'js-yaml';

const makeParse = (file, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
    case 'yaml':
      return yaml.load(file);
    default:
      throw new Error(`Unknown type ${type}!`);
  }
};

export default makeParse;
