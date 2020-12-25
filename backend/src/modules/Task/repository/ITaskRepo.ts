
import { Result } from "../../../shared/core/Result";
import { EntityId } from "../../../shared/domain/EntityId";
import { Task } from "../domain/Task";


export interface ITaskRepo {
  exist(id: string): Promise<boolean>;
  save(t: Task): Promise<Result<any>>;
  delete(id: EntityId): Promise<void>;
  findByTitleOrContent(regex: string): Promise<Task[]>;
}