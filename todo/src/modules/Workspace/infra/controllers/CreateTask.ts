import { BaseController } from "../../../../shared/infra/BaseController";
import { UseCasesErrors } from "../../../../shared/useCases/Errors";
import { CreateTaskUseCase } from "../../useCases/Task/CreateTask/UseCase";

export class CreateTaskController extends BaseController {
  constructor(private readonly useCase: CreateTaskUseCase) {
    super();
  }

  async executeImpl(req, res): Promise<any> {
    const { content, workspaceId, accountId } = req.body;
    const { id } = req.params;

    const errors = [];
    if (!content || typeof content != "string")
      errors.push("Should provide task content");
    //if (!id || typeof id != "string")
    //  errors.push("Should provide workspace id");

    if (errors.length > 0) return this.badRequest(res, errors);

    const dto = { accountId, workspaceId: id, taskContent: content };
    const useCaseRes = await this.useCase.run(dto);

    if (!useCaseRes.isSuccess) {
      // TODO Conver to function on BaseController
      // standart error handling
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
      this.ok(res);
    }
  }
}
