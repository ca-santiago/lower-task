
import { Guard } from "../../../../shared/core/Guard";
import { Result } from "../../../../shared/core/Result";
import { IUseCase } from "../../../../shared/core/UseCase";
import { UseCasesErrors } from "../../../../shared/useCases/Errors";
import { Task } from "../../domain/Task";
import { CreateTaskDTO } from "./DTO";
import { TaskMapper } from "../../mapper/TaskMapper";
import { TaskTitle } from "../../domain/Tittle";
import { TaskContent } from "../../domain/Content";
import { ITaskRepo } from "../../repository/ITaskRepo";
import { EntityId } from "../../../../shared/domain/EntityId";

import moment from 'moment'

export class CreateTaskUseCase implements IUseCase<CreateTaskDTO, Result<any>>{

  constructor(
    private readonly mapper: TaskMapper,
    private readonly repo: ITaskRepo,
  ) { }

  async run(request: CreateTaskDTO): Promise<Result<any>> {
    const titleOrError = Guard.againstNullOrUndefined(request.title, 'task title');
    const contentOrDefault = Guard.optionalInput(request.content, '')

    if (titleOrError.isSuccess === false)
      return new UseCasesErrors.InvalidParamError(titleOrError.error);

    const titleInstanceOrError = TaskTitle.create({ value: titleOrError.getValue() })
    const contentInstanceOrError = TaskContent.create({ value: contentOrDefault });

    const combineResult = Result.combine([
      titleInstanceOrError,
      contentInstanceOrError,
    ])

    if (combineResult.isSuccess === false)
      return new UseCasesErrors.InvalidParamError(combineResult.error);

    const ownerId = EntityId.from(request.ownerId);
    const id = EntityId.new();

    const taskOrError = Task.create({
      content: contentInstanceOrError.getValue(),
      title: titleInstanceOrError.getValue(),
      createAt: moment().format(),
      owner: ownerId.getValue()
    }, id)

    if (taskOrError.isSuccess === false)
      return Result.fail(taskOrError.error);

    const saveResult = await this.repo.save(taskOrError.getValue());
    if (saveResult.isSuccess === false)
      return new UseCasesErrors.DataBaseConnection();

    const mappedTask = this.mapper.toDTO(taskOrError.getValue());
    return Result.ok(mappedTask);
  }

}
