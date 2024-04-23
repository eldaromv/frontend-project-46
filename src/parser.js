import path from 'path';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPathFile = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (file) => {
  const pathOfFile = getPathFile(file);
  const data = readFileSync(pathOfFile, 'utf-8');
  const format = path.extname(pathOfFile).replace('.', '');
  switch (format) {
    case 'json': return JSON.parse(data);
    case 'yaml': return yaml.load(data);
    case 'yml': return yaml.load(data);
    default: return null;
  }
};

export default readFile;
