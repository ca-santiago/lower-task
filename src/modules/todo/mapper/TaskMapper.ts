
import { IMapper } from "../../../shared/domain/Mapper";
import { Task } from "../domain/Task";
import { TaskPersistenceDTO } from "./PersistenceDTO";
import { TaskDTO } from "./TaskDTO";

export class TaskMapper implements IMapper<Task, TaskDTO, TaskPersistenceDTO>{
  toDomain: (rawData: TaskPersistenceDTO) => Promise<Task>;
  toPersistence: (domain: Task) => TaskPersistenceDTO;
  public toDTO(domain: Task): TaskDTO {
    const taskMapped: TaskDTO = {
      createAt: domain.createAt,
      id: domain.id.value,
      title: domain.title.props.value,
      content: domain.content?.props.value,
    }

    return taskMapped;
  }
}
