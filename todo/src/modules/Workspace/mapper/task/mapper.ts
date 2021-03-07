import { EntityId } from "../../../../shared/domain/EntityId";
import { TaskContent } from "../../domain/Content";
import { Task } from "../../domain/Task";
import { TaskTitle } from "../../domain/Tittle";
import { TaskProps } from "../../domain/types";
import { TaskOwnerDTO } from "./pub.dto";
import { TaskRepoDTO } from "./repo.dto";

export class TaskMapper {
  toRepository(t: Task): TaskRepoDTO {
    const output: TaskRepoDTO = {
      _id: t.id.value,
      content: t.content.raw,
      createAt: t.createAt,
      owner: t.owner.value,
      workspace: t.workspace.value,
    };
    return output;
  }

  toDomain(t: TaskRepoDTO): Task {
    const content = TaskContent.create(t.content).getValue();
    const id = EntityId.from(t._id).getValue();

    const props: TaskProps = {
      owner: EntityId.from(t.owner).getValue(),
      workspace: EntityId.from(t.workspace).getValue(),
      content,
      createAt: t.createAt,
    };
    return Task.create(props, id).getValue();
  }

  toOwnerDTOMany(ts: Task[]): TaskOwnerDTO[] {
    return ts.map(t => this.toOwnerDTO(t))
  }

  toOwnerDTO(t: Task): TaskOwnerDTO {
    const mapped: TaskOwnerDTO = {
      content: t.content.value,
      createAt: t.createAt,
      id: t.id.value,
      owner: t.owner.value,
      workspace: t.workspace.value,
    }
    return mapped;
  }
}
