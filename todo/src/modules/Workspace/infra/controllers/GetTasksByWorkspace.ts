import { BaseController } from "../../../../shared/infra/BaseController";
import { UseCasesErrors } from "../../../../shared/useCases/Errors";
import { GetTasksByWorkspaceUseCase } from "../../useCases/Task/GetTasksByWorkspace/UseCase";

export class GetTaskByWorkspaceController extends BaseController {
  constructor(private readonly useCase: GetTasksByWorkspaceUseCase) {
    super();
  }

  async executeImpl(req, res): Promise<any> {
    const { accountId } = req.body;
    const { wsId } = req.params;

    const errors = [];
    if (errors.length > 0) return this.badRequest(res, errors);

    const dto = { accountId, workspaceId: wsId };
    const useCaseRes = await this.useCase.run(dto);

    if (!useCaseRes.isSuccess) {
      switch (useCaseRes.constructor) {
        case UseCasesErrors.NotFound:
          this.notFound(res);
          break;
        case UseCasesErrors.InvalidParamError:
          this.badRequest(res, useCaseRes.error);
          break;
        case UseCasesErrors.Conflict:
          this.conflict(res, useCaseRes.error);
          break;
        case UseCasesErrors.Unauthorized:
          this.unauthorized(res);
          break;
        default:
          this.fail(res);
          break;
      }
    } else {
      this.ok(res, { results: useCaseRes.getValue() });
    }
  }
}
