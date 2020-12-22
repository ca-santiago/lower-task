
import { makeLocalFileSaver } from './LocalFileSaver'
import config from '../../../config'

const saveFile = makeLocalFileSaver(config.fileStoragePath);

export {
    saveFile
}
