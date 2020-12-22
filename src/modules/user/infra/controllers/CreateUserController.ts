
import express from 'express';
import { BaseController } from "../../../../shared/infra/BaseController";
import { CreateUser } from "../../useCases/createUser/CreateUserUseCase";
import { CreateUserDTO } from '../../useCases/createUser/CreateUserDTO';
import { CreateUsernameError } from '../../useCases/createUser/CreateUserErrors';
import { UseCasesErrors } from '../../../../shared/useCases/Errors';
import { Result } from '../../../../shared/core/Result';


export class CreateUserController extends BaseController {
    private readonly useCase: CreateUser;

    constructor(useCase: CreateUser) {
        super();
        this.useCase = useCase;
    }

    public async executeImpl(req: express.Request, res: express.Response): Promise<any> {
        let dto = req.body as CreateUserDTO;
        // TODO: Sanitize those values?

        const useCaseResult: Result<void> = await this.useCase.run(dto);

        if (useCaseResult.isSuccess == false) {
            switch (useCaseResult.constructor) {
                case CreateUsernameError.EmailAlreadyExists:
                    this.conflict(res, useCaseResult.error);
                    break
                case UseCasesErrors.InvalidParamError:
                    this.badRequest(res, useCaseResult.error);
                    break
                default:
                    console.log(`[LogError] ${useCaseResult.error}`)
                    this.fail(res, useCaseResult.error);
                    break
            }
        }
        else {
            this.created(res);
        }
    }
}