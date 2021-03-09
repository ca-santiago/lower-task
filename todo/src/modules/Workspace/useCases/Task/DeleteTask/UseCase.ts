import { Result } from "../../../../../shared/core/Result";
import { IUseCase } from "../../../../../shared/core/UseCase";
import { ISpaceRepo } from "../../../repository/ISpaceRepo";
import { ITaskRepo } from "../../../repository/ITaskRepo";
import { IWorkspaceRepo } from "../../../repository/IWorkspaceRepo";
import { DeleteTaskDTO } from "./DTO";
import { UseCasesErrors } from "../../../../../shared/useCases/Errors";
import { EntityId } from "../../../../../shared/domain/EntityId";

export type _Result = Result<void>;

export class DeleteTaskUseCase implements IUseCase<DeleteTaskDTO, _Result> {
  constructor(
    private readonly spaceRepo: ISpaceRepo,
    private readonly wsRepo: IWorkspaceRepo,
    private readonly taskRepo: ITaskRepo
  ) {}

  async run(dto: DeleteTaskDTO): Promise<_Result> {
    const { accountId, workspaceId, taskId } = dto;

    const wsOrNull = await this.wsRepo.findById(workspaceId);
    if (!wsOrNull) return new UseCasesErrors.NotFound();

    const spaceOrNull = await this.spaceRepo.findById(wsOrNull.spaceId.value);
    if (!spaceOrNull) return new UseCasesErrors.NotFound();

    const taskOrNull = await this.taskRepo.findById(taskId);
    // Can perform action test
    const accId = EntityId.from(accountId).getValue();
    if(!wsOrNull.owner.equals(accId) && !wsOrNull.isCollab(accId)){
      console.log("No es owner o collab")
      return new UseCasesErrors.Unauthorized();
    }
    
    // If find return null it does not exist. Then return ok
    if (!taskOrNull) return Result.ok();

    let res = wsOrNull.removeTask(taskOrNull);
    if (res.isSuccess == false) return new UseCasesErrors.Conflict(res.error);

    spaceOrNull.updateWorkspace(wsOrNull);
    await this.spaceRepo.save(spaceOrNull);

    return Result.ok();
  }
}
