
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


export class UploadProfilePictureUseCase implements IUseCase<UploadlPictureDTO, Result<any>> {

    constructor(
        private readonly userRepo: IUserRepository,
        private readonly mapper: UserMapper
    ) { }

    async run(request: UploadlPictureDTO): Promise<Result<any>> {
        const guardPictureResult = Guard.againstNullOrUndefined(request.file, 'picture');
        if (guardPictureResult.isSuccess === false)
            return new UseCasesErrors.InvalidParamError(guardPictureResult.error);

        const { userId } = request;

        const user = await this.userRepo.getUserByUserId(userId);
        if (!user)
            return new UseCasesErrors.Unauthorized();

        try {

            (async () => {
                const baseName = moment() + '-somePublicId-';
                const thumbnailURL = await this.processFile(request.file, { h: 70, w: 70 }, baseName);
                const smallURL = await this.processFile(request.file, { h: 400, w: 400 }, baseName);
                const largeURL = await this.processFile(request.file, { h: 1024, w: 1024 }, baseName);

                const newPicture = Picture.create({
                    format: Jimp.MIME_PNG,
                    large: largeURL,
                    small: smallURL,
                    thumbnail: thumbnailURL,
                    baseName,
                });

                const pictureInstance = newPicture.getValue()
                user.updatePicture(pictureInstance);
                this.userRepo.save(this.mapper.toPersistence(user))
            })()
            return Result.ok();
            
        } catch (err) {
            console.log(`[ServerError] ${err}`)
            return Result.fail(['500']);
        }
    }

    private async processFile(data: Buffer, size: { w: number, h: number }, baseName: string) {
        const { h, w } = size;
        const resizedFile = await resizeImage(data, { h, w });
        const fullName = baseName + `${h}x${w}` + '.png';
        saveFile(resizedFile, fullName);

        return fullName
    }

}

