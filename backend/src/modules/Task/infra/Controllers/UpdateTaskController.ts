
import express from 'express';
import { BaseController } from "../../../../shared/infra/BaseController";
import { UseCasesErrors } from '../../../../shared/useCases/Errors';
import { UpdateTaskDTO } from '../../useCase/updateTask/DTO';
import { UpdateTaskUseCase } from "../../useCase/updateTask/UseCase";


export class UpdateTaskController extends BaseController {

    constructor(private readonly useCase: UpdateTaskUseCase) {
        super()
    }

    async executeImpl(req: express.Request, res: express.Response): Promise<void> {

        const dto: UpdateTaskDTO = {
            taskId: req.params.id,
            userId: req.params.userId,
            content: req.body.content,
            title: req.body.title,
        }

        const useCaseResult = await this.useCase.run(dto);
        if (useCaseResult.isSuccess === false) {
            switch (useCaseResult.constructor) {
                case UseCasesErrors.Conflict:
                    return this.conflict(res, useCaseResult.error);
                case UseCasesErrors.Unauthorized:
                    return this.unauthorized(res);
                case UseCasesErrors.NotFound:
                    return this.notFound(res);
                case UseCasesErrors.Unauthorized:
                    this.unauthorized(res);
                    return
                default:
                    this.fail(res);
                    return
            }
        } else {
            this.ok(res);
        }
    }



}
