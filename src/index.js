import readFile from "./read.js";
import compareObject from "./compare.js";

export default (file1, file2) => {
  const data1 = readFile(file1);
  const data2 = readFile(file2);
  return compareObject(data1, data2);
}