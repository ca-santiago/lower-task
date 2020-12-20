
import express from 'express';
import { BaseController } from "../../../../shared/infra/BaseController";
import { UseCasesErrors } from '../../../../shared/useCases/Errors';
import { FindTaskByContentDTO } from '../../useCase/FindByContent/DTO';
import { FindTaskByContentUseCase } from "../../useCase/FindByContent/UseCase";


export class FindTaskByContentController extends BaseController {

    constructor(private readonly useCase: FindTaskByContentUseCase) {
        super()
    }

    async executeImpl(req: express.Request, res: express.Response): Promise<any> {

        if (req.body.match === undefined || typeof req.body.match !== 'string')
            this.badRequest(res, ['Should provide match string']);

        const dto: FindTaskByContentDTO = {
            match: req.body.match
        }

        const useCaseResult = await this.useCase.run(dto);

        if (useCaseResult.isSuccess === false) {
            switch (useCaseResult.constructor) {
                case UseCasesErrors.InvalidParamError:
                    this.badRequest(res, useCaseResult.error);
                    break
                default:
                    this.fail(res);
                    break
            }
        } else {
            this.ok(res, useCaseResult.getValue());
        }

    }

}