
import { Result } from "../../../../shared/core/Result";
import { EntityId } from "../../../../shared/domain/EntityId";
import { Task } from "../../domain/Task";
import { TaskPersistenceDTO } from "../../mapper/PersistenceDTO";
import { TaskMapper } from "../../mapper/TaskMapper";
import { ITaskRepo } from "../ITaskRepo";

const TaskStorage: TaskPersistenceDTO[] = [];

export class LocalTaskRepo implements ITaskRepo {

  constructor(
    private readonly mapper: TaskMapper,
  ) { }

  async exist(id: string): Promise<boolean> {
    const exist = TaskStorage.findIndex(theTask => theTask.id === id);
    return exist >= 0
  }

  async save(t: Task): Promise<Result<any>> {
    const mappedTask = this.mapper.toPersistence(t);

    const exists = TaskStorage.findIndex((task) => task.id === mappedTask.id);
    if (exists >= 0) {
      TaskStorage[exists] = mappedTask;
    } else {
      TaskStorage.push(mappedTask);
    }

    return Result.ok();
  }

  async delete(id: EntityId): Promise<void> {
    const taskIndex = TaskStorage.findIndex(theTask => theTask.id === id.value);
    if (taskIndex >= 0)
      return;
    else
      TaskStorage.splice(taskIndex, 1);
    return;
  }

  async findByTitleOrContent(toSearch: string): Promise<Task[]> {

    const Re = new RegExp(toSearch);

    const foundCoincidanceArr = TaskStorage.filter((theTask, i, arr) => {
      if (Re.test(theTask.title) || Re.test(theTask.content)) {
        return theTask;
      }
    }, []);
    const domainTaskArr = foundCoincidanceArr.map(theTask => this.mapper.toDomain(theTask));
    return domainTaskArr;
  }

}
