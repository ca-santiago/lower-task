
/* return the current storage region */
export type GetRegion = () => string;

export type SaveFile = (data: Buffer, key: string) => string;

export type SetBucketName =  (name: string) => void;

export type GetSignedObjectURL = (fileName: string) => string;




export interface ObjectStorageServiceConfig {
	accessKey: string, secretKey: string, region: string,	
	BucketName: string, endpoint?: string,
}

export type MakeObjectStorageService = (config: ObjectStorageServiceConfig) => IOBjectStorageService;

export interface IOBjectStorageService {
	GetRegion: GetRegion,
	SaveFile: SaveFile,
	SetBucketName: SetBucketName,
	GetSignedObjectURL: GetSignedObjectURL
}

