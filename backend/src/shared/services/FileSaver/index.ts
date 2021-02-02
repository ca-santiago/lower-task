
import { makeLocalFileSaver } from './LocalFileSaver'
import {makeSaveFileS3 } from './S3';
import config from '../../../config'

const {
  FILE_STORAGE_ACCESS_KEY,
	FILE_STORAGE_SECRET_ACCESS,
	FILE_STORAGE_ENDPOINT,
} = process.env; 

const saveFile = makeLocalFileSaver(config.fileStoragePath);
const saveFileS3 =  makeSaveFileS3({
	  accessKey: FILE_STORAGE_ACCESS_KEY,
    secretKey: FILE_STORAGE_SECRET_ACCESS, 
		region: undefined, endpoint: FILE_STORAGE_ENDPOINT,
		BucketName: 'lower-task-image-bucket'
});


export {
    saveFile,
		saveFileS3
}
