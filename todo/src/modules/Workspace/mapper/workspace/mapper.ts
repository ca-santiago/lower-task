import { EntityId } from "../../../../shared/domain/EntityId";
import { Collaborator } from "../../domain/Collaborator";
import { CollabCollection } from "../../domain/Collections";
import { CollaboratorProps, WorkspaceProps } from "../../domain/types";
import { Workspace } from "../../domain/Workspace";
import { CollabRepoDTO, WorkspaceRepoDTO } from "./repo.dto";

export class WorkspaceMapper {
  private mapCollabRepo(c: CollabCollection): Array<CollabRepoDTO> {
    return c.Items.map((theC) => ({
      name: theC.name,
      id: theC.id.value,
      email: theC.email,
    }));
  }

  toRepository(w: Workspace): WorkspaceRepoDTO {
    const collabs = this.mapCollabRepo(w.collabs);
    const output: WorkspaceRepoDTO = {
			_id: w.id.value,
      collabs,
      name: w.name,
      owner: w.owner.value,
      maxTasks: w.maxTasks,
      maxCollaborators: w.maxCollabs,
    };
    return output;
  }

  private mapCollabDomain(c: CollabRepoDTO[]): Array<CollaboratorProps> {
    return c.map((theC) => ({
      id: EntityId.from(theC.id).getValue(),
      email: theC.email,
      _name: theC.name,
    }));
  }

  toMapper(w: WorkspaceRepoDTO): Workspace {
    const collabsProps = this.mapCollabDomain(w.collabs);
    const cInstances = collabsProps.map((c) =>
      Collaborator.create(c).getValue()
    );

    const wProps: WorkspaceProps = {
      maxCollaborators: w.maxCollaborators,
      maxTasks: w.maxTasks,
      owner: EntityId.from(w.owner).getValue(),
      _name: w.name,
      collabs: CollabCollection.create(cInstances),
    };
    const output = Workspace.create(wProps).getValue();
    return output;
  }
}
