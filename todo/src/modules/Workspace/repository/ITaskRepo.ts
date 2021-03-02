import { TaskCollection } from "../domain/Collections";
import { Task } from "../domain/Task";

export interface ITaskRepo {
  save(t: Task): Promise<void>;
  saveMany(ts: TaskCollection): Promise<void[]>;
}

