import { Result } from "../../../../../shared/core/Result";
import { IUseCase } from "../../../../../shared/core/UseCase";
import { EntityId } from "../../../../../shared/domain/EntityId";
import { UseCasesErrors } from "../../../../../shared/useCases/Errors";
import { TaskMapper } from "../../../mapper/task/mapper";
import { TaskOwnerDTO, TaskPublicDTO } from "../../../mapper/task/pub.dto";
import { ITaskRepo } from "../../../repository/ITaskRepo";
import { IWorkspaceRepo } from "../../../repository/IWorkspaceRepo";
import { GetTasksByWorkspaceDTO } from "./DTO";

export type _Result = Result<TaskOwnerDTO[] | TaskPublicDTO[]>;

export class GetTasksByWorkspaceUseCase
  implements IUseCase<GetTasksByWorkspaceDTO, _Result> {
  constructor(
    private readonly taskRepo: ITaskRepo,
    private readonly wsRepo: IWorkspaceRepo,
    private readonly taskMapper: TaskMapper
  ) {}

  async run(dto: GetTasksByWorkspaceDTO): Promise<_Result> {
    const { accountId, workspaceId } = dto;

    const wsOrNull = await this.wsRepo.findById(workspaceId);
    if (!wsOrNull) return new UseCasesErrors.NotFound();

    const accId = EntityId.from(accountId).getValue();
    if (!wsOrNull.isCollab(accId) || !wsOrNull.owner.equals(accId)) {
      // mapp to public dto
    }

    const tasks = await this.taskRepo.findByWorkspace(wsOrNull.id.value);
    const mapped = this.taskMapper.toOwnerDTOMany(tasks);

    return Result.ok(mapped);
  }
}
