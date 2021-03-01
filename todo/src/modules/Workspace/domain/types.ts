import { EntityId } from "../../../shared/domain/EntityId";
import { CollabCollection } from "./Collections/CollabCollection";
import { TaskCollection } from "./Collections/TaskCollection";
import { WorkspaceCollection } from "./Collections";
import { Nullable } from "../../../shared/types";
import { TaskTitle } from "./Tittle";
import { TaskContent } from "./Content";

export interface SpaceProps {
  _name: string;
  owner: EntityId;
  workspaces?: WorkspaceCollection;
}

export interface WorkspaceProps {
  owner: EntityId;
  _name: string;
  maxCollaborators: number;
  maxTasks: number;
  collabs?: CollabCollection;
  tasks?: TaskCollection;
}

export interface CollaboratorProps {
  id: EntityId;
  email: string;
  _name: string;
}

export type DescriptionProps = string;

// TASK
export interface TaskProps {
  title: TaskTitle;
  content: Nullable<TaskContent>;
  createAt: string;
  owner: EntityId;
	workspace: EntityId;
}

export interface TaskTitleProps {
  value: string;
}
