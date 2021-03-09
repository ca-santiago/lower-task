import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { EntityId } from "../../../shared/domain/EntityId";
import { SpaceProps } from "./types";
import { Workspace } from "./Workspace";
import {
  CollabCollection,
	WorkspaceCollection
} from "./Collections";

export class Space extends AggregateRoot<SpaceProps> {

  get _name(): string {
    return this.props._name;
  }

  get owner(): EntityId {
    return this.props.owner;
  }

  get workspaces(): WorkspaceCollection {
    return this.props.workspaces;
  }

	get maxWorkspaces(): number {
		return this.props.maxWorkspaces;	
	}

	get totalWorkspaces(): number {
		return this.props.totalWorkspaces;	
	}

  get id(): EntityId {
    return this._id;
  }

	public createWorkspace(name: string, space: EntityId): Result<void> {
		const newW = Workspace.create({
		  owner: this.props.owner,
			_name: name, 
			collabs: CollabCollection.create([]),
		 	maxTasks: 1000,
      maxCollaborators: 5,
      totalTasks: 0,
      createdAt: new Date().toUTCString(),
      spaceId: space
		}).getValue();
		if(this.props.totalWorkspaces + 1 > this.props.maxWorkspaces)
		  return Result.fail(['Max number of worksapces reached']); 
    this.workspaces.addItem(newW);
    this.props.totalWorkspaces += 1;
		return Result.ok();
  }
  
  public updateWorkspace(ws: Workspace): Result<void> {
    this.props.workspaces.addItem(ws);
    return Result.ok(null);
  }

  private constructor(props: SpaceProps, id?: EntityId) {
    super(props, id);
  }

  public static create(props: SpaceProps, id?: EntityId): Result<Space> {
    const workspaces = props.workspaces
      ? props.workspaces
      : WorkspaceCollection.create([]);
    const finalProps: SpaceProps = {
      ...props,
      workspaces,
    };
    return Result.ok(new Space(finalProps, id));
  }
}
