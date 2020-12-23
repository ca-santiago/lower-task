
import { BaseController } from "../../../../shared/infra/BaseController";
import { LoginUseCase } from "../../useCases/login/LoginUseCase";
import { LoginDTO } from "../../useCases/login/LoginDTO";
import { UseCasesErrors } from "../../../../shared/useCases/Errors";

import express from 'express';

export class LoginController extends BaseController {

    constructor(private readonly useCase: LoginUseCase) {
        super();
    }
    public async executeImpl(req: express.Request, res: express.Response): Promise<any> {
        const dto = req.body as LoginDTO;
        const useCaseResult = await this.useCase.run(dto);

        if (!useCaseResult.isSuccess) {
            switch (useCaseResult.constructor) {
                case UseCasesErrors.InvalidParamError:
                    this.badRequest(res, useCaseResult.error);
                    break
                case UseCasesErrors.InvalidCredentials:
                    this.badRequest(res, useCaseResult.error);
                    break
                case UseCasesErrors.NotFound:
                    this.notFound(res);
                    break
                default:
                    console.log(`[LoginDefautError] ${useCaseResult.error}`);
                    this.fail(res, useCaseResult.error);
                    break
            }
        } else {
            this.ok(res, useCaseResult.getValue());
        }

    }

}