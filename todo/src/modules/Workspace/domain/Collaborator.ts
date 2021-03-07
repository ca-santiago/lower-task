import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { EntityId } from "../../../shared/domain/EntityId";
import { CollaboratorProps } from "./types";

export class Collaborator extends Entity<CollaboratorProps> {
	
	get id(): EntityId {
	  return this.props.id;
	}

	get _name(): string {
      return this.props._name;	
	}
	
	get email(): string {
      return this.props.email;	
	}

	constructor(props: CollaboratorProps)	{
	  super(props);
	}
	
	public static create(props: CollaboratorProps) {
		return Result.ok(new Collaborator(props));	
	}
}

