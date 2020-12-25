
import express from 'express'
import { BaseController } from '../../../../shared/infra/BaseController';
import { UseCasesErrors } from '../../../../shared/useCases/Errors';
import { GetUsersProfileUseCase } from '../../useCases/getUsersProfile/UseCase';

export class GetUsersProfileController extends BaseController {

  constructor(private readonly useCase: GetUsersProfileUseCase) { super() }

  async executeImpl(req: express.Request, res: express.Response): Promise<void> {
    const useCaseResult = await this.useCase.run({});

    if (useCaseResult.isSuccess === false) {
      switch (useCaseResult.constructor) {
        case UseCasesErrors.Unauthorized:
          return this.unauthorized(res, useCaseResult.error[0]);
        default:
          this.fail(res, useCaseResult.error);
          break
      }
    } else {
      this.ok(res, useCaseResult.getValue());
    }
  }

}
