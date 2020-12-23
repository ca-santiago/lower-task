
import express from 'express';
import { BaseController } from "../../../../shared/infra/BaseController";
import { UseCasesErrors } from "../../../../shared/useCases/Errors";
import { UploadlPictureDTO } from "../../useCases/uploadProfilePicture/DTO";
import { UploadProfilePictureUseCase } from "../../useCases/uploadProfilePicture/UploadProfilePictureUseCase";

export class UpdatePictureController extends BaseController {

    constructor(
        private readonly useCase: UploadProfilePictureUseCase,
    ) {
        super()
    }

    public async executeImpl(req: express.Request, res: express.Response) {

        if (!req.file?.buffer)
            return this.badRequest(res, ['Should provide file']);

        let dto: UploadlPictureDTO = {
            file: req.file.buffer,
            token: req.headers['token'] as string
        };

        const useCaseResul = await this.useCase.run(dto);
        if (useCaseResul.isSuccess === false) {
            switch (useCaseResul.constructor) {
                case UseCasesErrors.InvalidParamError:
                    return this.badRequest(res, useCaseResul.error);
                case UseCasesErrors.Unauthorized:
                    return this.unauthorized(res, useCaseResul.error[0]);
                default:
                    return this.fail(res, useCaseResul.error);
            }
        } else {
            return this.accepted(res);
        }
    }

}