
import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { EntityId } from "../../../shared/domain/EntityId";
import { Nullable } from "../../../shared/types";
import { TaskContent } from "./Content";
import { TaskProps } from "./Props";
import { TaskTitle } from "./Tittle";

export class Task extends AggregateRoot<TaskProps>{

  get content(): Nullable<TaskContent> {
    return this.props.content;
  }

  get title(): TaskTitle {
    return this.props.title;
  }

  get createAt(): string {
    return this.props.createAt;
  }

  get owner(): EntityId {
    return this.props.owner;
  }

  private constructor(props: TaskProps, id: EntityId) {
    super(props, id)
  }

  public updateTitle(t: TaskTitle): Result<any> {
    this.props.title = t;
    return Result.ok();
  }

  public updateContent(c: Nullable<TaskContent>): Result<any> {
    this.props.content = c;
    return Result.ok();
  }

  public static create(props: TaskProps, id: EntityId): Result<Task> {

    return Result.ok(
      new Task(props, id)
    );
  }
}