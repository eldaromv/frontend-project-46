import path from 'path';
import { readFileSync } from 'fs';
import { cwd } from 'process';

const getPathFile = (file) => path.resolve(cwd(), file);

const readFile = (file) => {
  const path = getPathFile(file);
  const data = readFileSync(path, 'utf-8');
  return JSON.parse(data);
}

export default readFile;