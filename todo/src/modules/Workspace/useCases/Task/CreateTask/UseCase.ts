import { Result } from "../../../../../shared/core/Result";
import { IUseCase } from "../../../../../shared/core/UseCase";
import { EntityId } from "../../../../../shared/domain/EntityId";
import { UseCasesErrors } from "../../../../../shared/useCases/Errors";
import { TaskContent } from "../../../domain/Content";
import { Task } from "../../../domain/Task";
import { ISpaceRepo } from "../../../repository/ISpaceRepo";
import { IWorkspaceRepo } from "../../../repository/IWorkspaceRepo";
import { CreateTaskDTO } from "./DTO";
import { WorkspaceService } from "../../../domain/services/Workspace";

export type _Result = Result<void>;

export class CreateTaskUseCase implements IUseCase<CreateTaskDTO, _Result> {
  constructor(
    private readonly spaceRepo: ISpaceRepo,
    private readonly worksRepo: IWorkspaceRepo,
    private readonly wsService: WorkspaceService
  ) {}

  async run(dto: CreateTaskDTO): Promise<_Result> {
    const { accountId, workspaceId, taskContent } = dto;

    const space = await this.spaceRepo.findByOwnerId(accountId);
    if (!space) return new UseCasesErrors.NotFound();

    const worksOrNull = await this.worksRepo.findById(workspaceId);
    if (!worksOrNull) return new UseCasesErrors.NotFound();

    const owner = EntityId.from(accountId).getValue();

    const contentOrError = TaskContent.create(taskContent);
    if (contentOrError.isSuccess === false)
      return new UseCasesErrors.InvalidParamError(contentOrError.error);

    const taskOrError = Task.create({
      content: contentOrError.getValue(),
      owner,
      createAt: new Date().toUTCString(),
      workspace: worksOrNull.id,
    });
    if (!taskOrError.isSuccess)
    return new UseCasesErrors.InvalidParamError(taskOrError.error);
    
    const res = await this.wsService.addTaskToWorkspace(
      EntityId.from(accountId).getValue(),
      space,
      worksOrNull,
      taskOrError.getValue()
    );

    if (!res.isSuccess) return res;

    await this.spaceRepo.save(space);

    return Result.ok(null);
  }
}
