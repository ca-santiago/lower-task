import { BaseController } from "../../../../shared/infra/BaseController";
import { UseCasesErrors } from "../../../../shared/useCases/Errors";
import { DeleteTaskDTO } from "../../useCases/Task/DeleteTask/DTO";
import { DeleteTaskUseCase } from "../../useCases/Task/DeleteTask/UseCase";

export class DeleteTaskController extends BaseController {
  constructor(private readonly useCase: DeleteTaskUseCase) {
    super();
  }

  public async executeImpl(req, res): Promise<any> {
    const { taskId, wsId } = req.params;
    const dto: DeleteTaskDTO = {
      accountId: req.body.accountId,
      taskId: taskId,
      workspaceId: wsId,
    };

    const errors = [];
    if (errors.length > 0) return this.badRequest(res, errors);

    const useCaseResult = await this.useCase.run(dto);
    if (useCaseResult.isSuccess == false) {
      switch (useCaseResult.constructor) {
        case UseCasesErrors.NotFound:
          this.notFound(res);
          break;
        case UseCasesErrors.InvalidParamError:
          this.badRequest(res, useCaseResult.error);
          break;
        case UseCasesErrors.Conflict:
          this.conflict(res, useCaseResult.error);
          break;
        case UseCasesErrors.Unauthorized:
          this.unauthorized(res);
          break;
        default:
          this.fail(res);
          break;
      }
    } else {
      return this.ok(res);
    }
  } // execute end
}
