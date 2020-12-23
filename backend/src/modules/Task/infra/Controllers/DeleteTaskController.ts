
import express from 'express';
import { BaseController } from "../../../../shared/infra/BaseController"
import { UseCasesErrors } from '../../../../shared/useCases/Errors';
import { DeleteTaskDTO } from '../../useCase/deleteTask/DTO';
import { DeleteTaskUseCase } from '../../useCase/deleteTask/UseCase';


export class DeleteTaskController extends BaseController {

    constructor(private readonly useCase: DeleteTaskUseCase) {
        super()
    }

    async executeImpl(req: express.Request, res: express.Response): Promise<any> {

        if (req.params.id === undefined || typeof req.params.id !== 'string')
            this.badRequest(res, ['Should provide task id']);

        const dto: DeleteTaskDTO = {
            taskId: req.params.id
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
            this.ok(res);
        }

    }
}