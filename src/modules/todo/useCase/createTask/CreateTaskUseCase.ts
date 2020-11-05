
import { Guard } from "../../../../shared/core/Guard";
import { Result } from "../../../../shared/core/Result";
import { IUseCase } from "../../../../shared/core/UseCase";
import { UseCasesErrors } from "../../../../shared/useCases/Errors";
import { Task } from "../../domain/Task";
import { CreateTaskDTO } from "./DTO";
import moment from 'moment'
import { TaskMapper } from "../../mapper/TaskMapper";
import { TaskTitle } from "../../domain/Tittle";
import { TaskContent } from "../../domain/Content";

export class CreateTaskUseCase implements IUseCase<CreateTaskDTO, Result<any>>{

  constructor(private readonly mapper: TaskMapper) { }

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

    const taskOrError = Task.create({
      title: titleInstanceOrError.getValue(),
      content: contentInstanceOrError.getValue(),
      createAt: moment().format()
    })

    if (taskOrError.isSuccess === false)
      return Result.fail(taskOrError.error);

    const mappedTask = this.mapper.toDTO(taskOrError.getValue());
    return Result.ok(mappedTask);
  }

}