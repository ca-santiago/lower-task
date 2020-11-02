
import config from '../../config';
import { LocalFileRepo } from './LocalFileRepo';
import { initMongoConnection } from './mongodb'

const fileRepo = new LocalFileRepo(config.baseDir, config.baseHost, config.fileStorageName);

export {
    fileRepo,
    initMongoConnection
}