import { TaskCollection } from "../domain/Collections";
import { Task } from "../domain/Task";

export interface ITaskRepo {
  save(t: Task): Promise<void>;
  saveMany(ts: TaskCollection): Promise<void>;
  findByWorkspace(id: string): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  delete(t: Task): Promise<void>;
}

