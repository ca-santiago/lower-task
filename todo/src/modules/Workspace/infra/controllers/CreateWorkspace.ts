import { BaseController } from "../../../../shared/infra/BaseController";
import { CreateWorkspaceDTO } from "../../useCases/Workspace/CreateWorkspace/DTO";
import { CreateWorkspaceUseCase } from "../../useCases/Workspace/CreateWorkspace/UseCase";

export class CreateWorkspaceController extends BaseController {
  constructor(private readonly useCase: CreateWorkspaceUseCase) {
    super();
  }

  public async executeImpl(req, res): Promise<any> {
    const dto: CreateWorkspaceDTO = {
      accountId: req.body.accountId,
      name: req.body.name,
    };

    const errors = [];
    if (!req.body.name) errors.push("Should provide name");

    if (errors.length > 0) return this.badRequest(res, errors);

    const useCaseResult = await this.useCase.run(dto);
    if (useCaseResult.isSuccess == false) {
      switch (useCaseResult.constructor) {
        default:
          return this.fail(res, useCaseResult.error);
      }
    } else {
      return this.ok(res);
    }
  } // execute end
}
