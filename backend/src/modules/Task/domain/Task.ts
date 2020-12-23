
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

  private constructor(props: TaskProps, id: EntityId) {
    super(props, id)
  }

  public updateTitle(t: TaskTitle) {
    this.props.title = t;
  }

  public updateContent(c: Nullable<TaskContent>) {
    this.props.content = c;
  }

  public static create(props: TaskProps, id: EntityId): Result<Task> {

    return Result.ok(
      new Task(props, id)
    );
  }
}