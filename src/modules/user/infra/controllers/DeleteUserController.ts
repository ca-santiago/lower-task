
import express from 'express';

import { BaseController } from "../../../../shared/infra/BaseController";
import { DeleteUser } from "../../useCases/deleteUser/DeleteUserUseCase";

import { DeleteUserDTO } from "../../useCases/deleteUser/DeleteUserDTO";
import { UseCasesErrors } from "../../../../shared/useCases/Errors";

export class DeleteUserController extends BaseController {
    private readonly useCase: DeleteUser;

    constructor(useCase: DeleteUser) {
        super();
        this.useCase = useCase;
    }

    protected async executeImpl(req: express.Request, res: express.Response): Promise<any> {
        let dto = req.body as DeleteUserDTO;
        dto.token = req.headers['token'] as string;

        const resultOrError = await this.useCase.run(dto);

        if (resultOrError.isSuccess === false) {
            switch (resultOrError.constructor) {
                case UseCasesErrors.Unauthorized:
                    this.unauthorized(res, resultOrError.error[0]);
                    break
                default:
                    this.fail(res, resultOrError.error);
                    break;
            }
        } else {
            this.ok(res);
        }
    }
}
