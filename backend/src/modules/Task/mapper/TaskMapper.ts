
import { EntityId } from "../../../shared/domain/EntityId";
import { IMapper } from "../../../shared/domain/Mapper";
import { TaskContent } from "../domain/Content";
import { TaskProps } from "../domain/Props";
import { Task } from "../domain/Task";
import { TaskTitle } from "../domain/Tittle";
import { TaskPersistenceDTO } from "./PersistenceDTO";
import { TaskDTO } from "./TaskDTO";

export class TaskMapper implements IMapper<Task, TaskDTO, TaskPersistenceDTO>{
  toDomain(rawData: TaskPersistenceDTO): Task {
    const taskId = EntityId.from(rawData._id).getValue()
    const title = TaskTitle.create({ value: rawData.title }).getValue();
    const content = TaskContent.create({ value: rawData.content }).getValue();
    const owner = EntityId.from(rawData.owner)
    const createAt = rawData.createdAt;
    const props: TaskProps = {
      content, createAt, title, owner: owner.getValue()
    }
    return Task.create(props, taskId).getValue();

  }

  toPersistence(domain: Task): TaskPersistenceDTO {
    const out: TaskPersistenceDTO = {
      content: domain.content.props.value,
      createdAt: domain.createAt,
      _id: domain.id.value, owner: domain.owner.value,
      title: domain.title.value,
    }
    return out;
  }

  public toDTO(domain: Task): TaskDTO {
    const taskMapped: TaskDTO = {
      createAt: domain.createAt,
      id: domain.id.value, owner: domain.owner.value,
      title: domain.title.props.value,
      content: domain.content?.props.value,
    }

    return taskMapped;
  }
}
