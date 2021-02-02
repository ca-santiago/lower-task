
import { S3 } from 'aws-sdk';
import {IOBjectStorageService, MakeObjectStorageService} from "../IObjectStorage";


const makeSaveFileS3: MakeObjectStorageService = (config: {
    accessKey: string,
    secretKey: string,
    region: string,
    BucketName: string,
    endpoint?: string,
}): 
    IOBjectStorageService => {
    const { region, BucketName, accessKey, secretKey, endpoint} = config;

    let currRegion = region ? region : 'sa-east-1';
    let currBucketName = BucketName;

    const s3 = new S3({
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
        s3ForcePathStyle: true,
        endpoint: endpoint? endpoint : undefined,
        region, signatureVersion: 'v4'
    });

    function SaveFile(data: Buffer, key: string){
        const params = { Bucket: currBucketName, Key: key, Body: data};
        s3.putObject(params, (err, data)=>{
            if(err)
                return console.log(err)
        });
        return '';
    }

		function GetSignedObjectURL(fileName: string): string {
				const res = s3.getSignedUrl('getObject', { Bucket: currBucketName, Key: fileName });
				console.log(res);
				return res;
		}

    function SetBucketName(name){
        currBucketName = name;
    }

    return {
			GetRegion: () => currRegion,
			SaveFile, SetBucketName,
			GetSignedObjectURL,
    }
}

export {
    makeSaveFileS3
}

