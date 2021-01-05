
import express from 'express';
import { BaseController } from "../../../../shared/infra/BaseController";
import { GetTasksByOwnerDTO } from "../../useCase/FindByOwner/DTO";
import { GetTasksByOwnerUseCase } from "../../useCase/FindByOwner/UseCase";

export class FindTaskByOwnerController extends BaseController {

  constructor(private readonly useCase: GetTasksByOwnerUseCase) {
    super()
  }

  protected async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    const dto: GetTasksByOwnerDTO = {
      ownerId: req.params.id,
      userId: req.params.userId
    }

    const useCaseResult = await this.useCase.run(dto);

    if (useCaseResult.isSuccess === false) {
      switch (useCaseResult.constructor) {
        default:
          this.fail(res);
      }
    } else {
      if (req.method === 'GET')
        this.ok(res, useCaseResult.getValue());
    }
  } // End of execute method
}
