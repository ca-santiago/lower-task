import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { EntityId } from "../../../shared/domain/EntityId";
import { WorkspaceProps } from "./types";
import { TaskCollection, CollabCollection } from "./Collections/";

export class Workspace extends Entity<WorkspaceProps> {

  get id(): EntityId {
    return this._id;
  }

  private constructor(props: WorkspaceProps, id?: EntityId) {
    super(props, id);
  }

  public static create(
    props: WorkspaceProps,
    id?: EntityId
  ): Result<Workspace> {

    const finalProps: WorkspaceProps = {
      ...props,
      collabs: props.collabs ? props.collabs : CollabCollection.create([]),
      tasks: props.tasks ? props.tasks : TaskCollection.create([]),
    };

    return Result.ok(new Workspace(finalProps, id));
  }
}
