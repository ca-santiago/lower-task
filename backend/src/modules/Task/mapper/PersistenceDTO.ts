
import { Nullable } from "../../../shared/types";

export interface TaskPersistenceDTO {
  title: string;
  content: Nullable<string>;
  createdAt: string;
  _id: string;
  owner: string;
}
