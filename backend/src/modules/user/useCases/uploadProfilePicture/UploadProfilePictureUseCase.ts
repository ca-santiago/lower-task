
import { Guard } from "../../../../shared/core/Guard";
import { Result } from "../../../../shared/core/Result";
import { IUseCase } from "../../../../shared/core/UseCase";
import { saveFile } from "../../../../shared/services/FileSaver";
import { resizeImage } from "../../../../shared/services/ImageResizer";
import { UseCasesErrors } from "../../../../shared/useCases/Errors";
import { Picture } from "../../domain/Picture";
import { IUserRepository } from "../../repositories/IUserRepo";
import { UploadlPictureDTO } from "./DTO";
import { MapPictureToDTO } from "../../mappers/Picture.mapper";
import IAuthService from "../../services/IAuthService";
import { UserMapper } from "../../mappers/user.mapper";

import moment from 'moment'
import Jimp from "jimp";
import {IOBjectStorageService} from "../../../../shared/services/IObjectStorage";


export class UploadProfilePictureUseCase implements IUseCase<UploadlPictureDTO, Result<any>> {

    constructor(
        private readonly userRepo: IUserRepository,
        private readonly mapper: UserMapper,
				private readonly FileStorageService: IOBjectStorageService,
    ) { }

    async run(request: UploadlPictureDTO): Promise<Result<any>> {
        const guardPictureResult = Guard.againstNullOrUndefined(request.file, 'picture');
        if (guardPictureResult.isSuccess === false)
            return new UseCasesErrors.InvalidParamError(guardPictureResult.error);

        const { userId } = request;

        const user = await this.userRepo.getUserByUserId(userId);
        if (!user)
            return new UseCasesErrors.Unauthorized();


				// TODO: Remove those try declaration from all use cases.
		    // the contrller try should catch those exceptions
        try {
						
						//TODO: Apply try chatch here in order to catch some service errors
						// and throw an specific errror.
						const fileName = `${user.id.value}--${moment().format()}.png`
						await this.uploadFile(fileName, guardPictureResult.getValue());

            const newPicture = Picture.create({
                format: Jimp.MIME_PNG,
                keyName:  fileName,
            });

            const pictureInstance = newPicture.getValue()
            user.updatePicture(pictureInstance);

            this.userRepo.save(this.mapper.toPersistence(user))
            return Result.ok();
            
        } catch (err) {
            console.log(`[ServerError] ${err}`)
            return Result.fail(['500']);
        }
    }

		private async uploadFile(fileName: string, data: Buffer) {
				await this.FileStorageService.SaveFile(data, fileName);
		}

    private async processFile(data: Buffer, size: { w: number, h: number }, baseName: string) {
        const { h, w } = size;
        const resizedFile = await resizeImage(data, { h, w });
        const fullName = baseName + `${h}x${w}` + '.png';
        saveFile(resizedFile, fullName);

        return fullName
    }

}

