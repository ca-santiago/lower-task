import { BaseController } from "../../../../shared/infra/BaseController";
import { GetWorkspacesByOwnerUseCase } from "../../useCases/Workspace/GetByOwner/UseCase";
import { GetWorkspacesByOwnerDTO } from "../../useCases/Workspace/GetByOwner/DTO";

export class GetWorkspacesByOwnerController extends BaseController {
  constructor(private readonly useCase: GetWorkspacesByOwnerUseCase) {
    super();
  }

  public async executeImpl(req, res): Promise<any> {
    const dto: GetWorkspacesByOwnerDTO = {
      accountId: req.body.accountId,
    };

    const useCaseResult = await this.useCase.run(dto);
    if (useCaseResult.isSuccess == false) {
      switch (useCaseResult.constructor) {
        default:
          return this.fail(res, useCaseResult.error);
      }
    } else {
      return this.ok(res, { results: useCaseResult.getValue() });
    }
  } // execute end
}
