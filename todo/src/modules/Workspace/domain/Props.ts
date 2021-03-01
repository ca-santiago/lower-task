import { EntityId } from "../../../shared/domain/EntityId";
import { Nullable } from "../../../shared/types";
import { TaskContent } from "./Content";
import { TaskTitle } from "./Tittle";

export interface TaskProps {
  title: TaskTitle;
  content: Nullable<TaskContent>;
  createAt: string;
  owner: EntityId;
	workspace: EntityId;
}

