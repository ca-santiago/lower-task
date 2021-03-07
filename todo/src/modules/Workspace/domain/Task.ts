import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { EntityId } from "../../../shared/domain/EntityId";
import { Nullable } from "../../../shared/types";
import { TaskContent } from "./Content";
import { TaskProps } from "./Props";

export class Task extends Entity<TaskProps> {
  get content(): TaskContent {
    return this.props.content;
  }

  get createAt(): string {
    return this.props.createAt;
  }

  get owner(): EntityId {
    return this.props.owner;
  }

  get id(): EntityId {
    return this._id;
  }

  get workspace(): EntityId {
    return this.props.workspace;
  }

  private constructor(props: TaskProps, id: EntityId) {
    super(props, id);
  }

  public updateContent(c: Nullable<TaskContent>): Result<any> {
    this.props.content = c;
    return Result.ok();
  }

  public static create(props: TaskProps, id?: EntityId): Result<Task> {
    return Result.ok(new Task(props, id));
  }
}
