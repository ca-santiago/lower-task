
import { Nullable } from "../../../shared/types";

export interface TaskPersistenceDTO {
  title: string;
  content: Nullable<string>;
  createdAt: string;
  id: string;
}
