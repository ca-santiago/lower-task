import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

export interface TaskTitleProps {
  value: string;
}

export class TaskTitle extends ValueObject<TaskTitleProps> {

  public static readonly maxTitleLenght = 240;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: TaskTitleProps) {
    super(props);
  }

  public static create(props: TaskTitleProps): Result<TaskTitle> {
    if (props.value.length > TaskTitle.maxTitleLenght)
      return Result.fail(['Invalida task title lenght']);

    return Result.ok(
      new TaskTitle(props)
    );
  }

} 
