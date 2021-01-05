
import { Result } from "../../../../shared/core/Result";
import { IUseCase } from "../../../../shared/core/UseCase";
import { TaskDTO } from "../../mapper/TaskDTO";
import { TaskMapper } from "../../mapper/TaskMapper";
import { ITaskRepo } from "../../repository/ITaskRepo";
import { GetTasksByOwnerDTO } from "./DTO";

export class GetTasksByOwnerUseCase implements IUseCase<GetTasksByOwnerDTO, Result<TaskDTO[]>> {

  constructor(
    private readonly taskRepo: ITaskRepo,
    private readonly taskMapper: TaskMapper
  ) { }

  async run(request: GetTasksByOwnerDTO): Promise<Result<TaskDTO[]>> {
    const { ownerId } = request;
    const res = await this.taskRepo.findByOwner(ownerId);
    const mappedTasks = res.map(theTask => this.taskMapper.toDTO(theTask))
    return Result.ok<TaskDTO[]>(mappedTasks);
  }
}
