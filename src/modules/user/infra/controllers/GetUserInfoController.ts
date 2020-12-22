
import express from 'express'
import { BaseController } from "../../../../shared/infra/BaseController";
import { UseCasesErrors } from '../../../../shared/useCases/Errors';
import { GetUserInfoDTO } from '../../useCases/getUserInfo/DTO';
import { GetUserInfoUseCase } from "../../useCases/getUserInfo/GetUserInfoUseCase";


export class GetUserInfoController extends BaseController {

    constructor(
        private readonly useCase: GetUserInfoUseCase,
    ) {
        super()
    }

    async executeImpl(req: express.Request, res: express.Response) {

        const { asPublic, id } = req.params;
        const dto: GetUserInfoDTO = {
            token: req.headers['token'] as string,
            asPublic: !!asPublic,
            userId: id
        }
        const useCaseResult = await this.useCase.run(dto);

        if (useCaseResult.isSuccess === false) {
            switch (useCaseResult.constructor) {
                case UseCasesErrors.Unauthorized:
                    return this.unauthorized(res);
                case UseCasesErrors.NotFound:
                    return this.notFound(res);
                default:
                    return this.fail(res, useCaseResult.error);
            }
        } else {
            this.ok(res, useCaseResult.getValue());
        }
    }

}


