import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

export interface TaskContentProps {
  value: string;
}

export class TaskContent extends ValueObject<TaskContentProps>{
  private static maxTaskContentLenght = 1024;

  private constructor(props: TaskContentProps) {
    super(props)
  }
  public static create(props: TaskContentProps): Result<TaskContent> {
    if (props.value.length > TaskContent.maxTaskContentLenght)
      return Result.fail(['Invalid task content lenght'])

    return Result.ok(
      new TaskContent(props)
    )
  }
}