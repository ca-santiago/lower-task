
import { Result } from "../../../../shared/core/Result";
import { EntityId } from "../../../../shared/domain/EntityId";
import { Task } from "../../domain/Task";
import { TaskMapper } from "../../mapper/TaskMapper";
import { ITaskRepo } from "../ITaskRepo";
import { TaskModel } from './model'

export class MongooseTaskRepo implements ITaskRepo {

  constructor(private readonly mapper: TaskMapper) { }

  async exist(id: string): Promise<boolean> {
    return await TaskModel.exists({ _id: id });
  }

  async save(t: Task): Promise<Result<any>> {
    try {
      const mappedTask = this.mapper.toPersistence(t);
      const upsetData = { ...mappedTask }
      await TaskModel.findByIdAndUpdate(t.id.value, upsetData,
        { upsert: true }).exec();
      return Result.ok();
    } catch (err) {
      return Result.fail([err.message]);
    }
  }

  async delete(id: EntityId): Promise<void> {
    await TaskModel.findByIdAndDelete(id.value).exec();
    return
  }

  async findByTitleOrContent(regex: string): Promise<Task[]> {
    const RE = new RegExp(regex, 'i');
    const results = await TaskModel.find({ $or: [{ title: RE }, { content: RE }] }).exec()
    const mappedTask = results.map(theTask => this.mapper.toDomain(theTask));
    return mappedTask;
  }

  async findById(id: EntityId): Promise<Task | null> {
    const res = await TaskModel.findOne({ _id: id.value });
    if (!res)
      return null;
    const mapped = this.mapper.toDomain(res);
    return mapped;
  }

  async findByOwner(ownerId: string): Promise<Task[]> {
    let out: Task[];
    const res = await TaskModel.find({ owner: ownerId }).exec();
    out = res.map(theTask => this.mapper.toDomain(theTask))
    return out;
  }
}
