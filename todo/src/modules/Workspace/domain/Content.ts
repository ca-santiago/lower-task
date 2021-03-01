import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

export class TaskContent extends ValueObject<string>{
  private static maxTaskContentLenght = 1024;

  private constructor(props: string) {
    super(props)
  }

  public static create(props: string): Result<TaskContent> {
    if (props.length > TaskContent.maxTaskContentLenght)
      return Result.fail(['Invalid task content lenght'])
    return Result.ok(
      new TaskContent(props)
    )
  }
}
