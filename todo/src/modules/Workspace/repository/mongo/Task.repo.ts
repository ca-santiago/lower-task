import { TaskCollection } from "../../domain/Collections";
import { Task } from "../../domain/Task";
import { TaskMapper } from "../../mapper/task/mapper";
import { ITaskRepo } from "../ITaskRepo";
import { TaskModel } from "./Task.model";

export class TaskRepo implements ITaskRepo {
  constructor(private readonly taskMapper: TaskMapper) {}

  async save(t: Task) {
    const upsetData = this.taskMapper.toRepository(t);
    try {
      TaskModel.findByIdAndUpdate(t.id.value, upsetData, {
        upsert: true,
      }).exec();
    } catch (err) {}
  }

  async saveMany(ts: TaskCollection) {
    return Promise.all(ts.Items.map((t) => this.save(t)));
  }

  async findByWorkspace(id: string): Promise<Task[]> {
    const results = await TaskModel.find({ workspace: id }).exec();
    const output = results.map(t => this.taskMapper.toDomain(t));
    return output;
  }
}
