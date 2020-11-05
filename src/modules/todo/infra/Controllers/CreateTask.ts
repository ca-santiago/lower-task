
import express, { Request, Response } from 'express';
import { BaseController } from "../../../../shared/infra/BaseController";
import { CreateTaskUseCase } from '../../useCase/createTask/CreateTaskUseCase';
import { CreateTaskDTO } from '../../useCase/createTask/DTO';
import _ from 'lodash';
import { UseCasesErrors } from '../../../../shared/useCases/Errors';

export class CreateTaskController extends BaseController {

  constructor(
    private readonly useCase: CreateTaskUseCase
  ) { super() }

  protected async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    // public async executeImpl(req: Request, res: Response): Promise<any> {
    const dto = req.body as CreateTaskDTO;
    console.log(dto)
    console.log(req.body)
    const bodyErrors: string[] = [];
    if (typeof dto.title !== 'string') {
      bodyErrors.push('invalid propertie: title');
    }
    if (_.has(dto, 'content') && typeof dto.content !== 'string') {
      bodyErrors.push('invalid propertie: content');
    }
    if (bodyErrors.length > 0) {
      return this.badRequest(res, bodyErrors);
    }


    const useCaseResult = await this.useCase.run(dto);
    if (useCaseResult.isSuccess === false) {
      switch (useCaseResult.error.constructor) {
        case UseCasesErrors.InvalidParamError:
          return this.badRequest(res, useCaseResult.error);
        default:
          return this.fail(res);
      }
    } else {
      return this.ok(res, useCaseResult.getValue());
    }
  }
}
