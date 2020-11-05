
import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
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

  private constructor(props: TaskProps) { super(props) }

  public updateTitle(t: TaskTitle) {
    this.props.title = t;
  }

  public updateContent(c: Nullable<TaskContent>) {
    this.props.content = c;
  }

  public static create(props: TaskProps): Result<Task> {

    return Result.ok(
      new Task(props)
    );
  }
}