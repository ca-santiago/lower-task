
import path from 'path';

const baseDir = path.join(__dirname, '../../');
/**
 * File storage name -> Based on the baseDir path.
 * this path is added at the end of baseDir
 */
const fileStorageName = 'file-storage'
const fileStoragePath = path.join(baseDir, fileStorageName);
let baseHost: "" | string = '';

const config = {
    baseDir,
    baseHost,
    fileStorageName,
    fileStoragePath
}

export default config;
