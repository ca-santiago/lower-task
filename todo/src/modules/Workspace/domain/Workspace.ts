import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { EntityId } from "../../../shared/domain/EntityId";
import { WorkspaceProps } from "./types";
import { TaskCollection, CollabCollection } from "./Collections/";
import { Task } from "./Task";

export class Workspace extends Entity<WorkspaceProps> {

  get id(): EntityId {
    return this._id;
  }

	get owner(): EntityId {
    return this.props.owner;
	}
	
	get _name(): string {
    return this.props._name;	
	}

	get collabs(): CollabCollection {
    return this.props.collabs;	
	}

	get maxTasks(): number {
    return this.props.maxTasks;
	}

	get maxCollabs(): number {
    return this.props.maxCollaborators;	
	}

	get tasks(): TaskCollection {
    return this.props.tasks;	
  }
  
  get totalTasks(): number {
    return this.props.totalTasks;
  }

  get createdAt(): string {
    return this.props.createdAt;
  }

  get spaceId(): EntityId {
    return this.props.spaceId;
  }

  public addTask(t: Task): Result<void> {
    if(this.props.totalTasks + 1 > this.props.maxTasks)
      return Result.fail(['Max tasks reached']);
    this.props.tasks.add(t);
    this.props.totalTasks += 1;
    return Result.ok(null);
  }

  public isCollab(id: EntityId): boolean {
    return !!this.props.collabs.Items.find(c => c.id.value === id.value);
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
