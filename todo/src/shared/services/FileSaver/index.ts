import { makeLocalFileSaver } from "./LocalFileSaver";
import { makeSaveFileS3 } from "./S3";
import config from "../../../config";

const {
  FILE_STORAGE_ACCESS_KEY,
  FILE_STORAGE_SECRET_ACCESS,
  FILE_STORAGE_ENDPOINT,
  FILE_STORAGE_NAME,
} = process.env;

const saveFile = makeLocalFileSaver(config.fileStoragePath);
const StorageService = makeSaveFileS3({
  accessKey: FILE_STORAGE_ACCESS_KEY,
  secretKey: FILE_STORAGE_SECRET_ACCESS,
  region: undefined,
  endpoint: FILE_STORAGE_ENDPOINT,
  BucketName: FILE_STORAGE_NAME,
});

console.log(StorageService)

export { saveFile, StorageService };
