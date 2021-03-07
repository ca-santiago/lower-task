import { EntityId } from "../../../shared/domain/EntityId";
import { TaskContent } from "./Content";

export interface TaskProps {
  content: TaskContent;
  createAt: string;
  owner: EntityId;
	workspace?: EntityId;
}

