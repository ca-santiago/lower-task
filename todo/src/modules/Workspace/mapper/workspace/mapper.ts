import { EntityId } from "../../../../shared/domain/EntityId";
import { Collaborator } from "../../domain/Collaborator";
import { CollabCollection } from "../../domain/Collections";
import { CollaboratorProps, WorkspaceProps } from "../../domain/types";
import { Workspace } from "../../domain/Workspace";
import { OwnerCollabDTO, OwnerWorkspaceDTO } from "./public.dto";
import { CollabRepoDTO, WorkspaceRepoDTO } from "./repo.dto";

export class WorkspaceMapper {
  private mapCollabRepo(c: CollabCollection): Array<CollabRepoDTO> {
    return c.Items.map((theC) => ({
      name: theC._name,
      id: theC.id.value,
      email: theC.email,
    }));
  }

  toRepository(w: Workspace): WorkspaceRepoDTO {
    const collabs = this.mapCollabRepo(w.collabs);
    const output: WorkspaceRepoDTO = {
			_id: w.id.value,
      collabs,
      spaceId: w.spaceId.value,
      name: w._name,
      owner: w.owner.value,
      maxTasks: w.maxTasks,
      maxCollaborators: w.maxCollabs,
      totalTasks: w.totalTasks,
      createdAt: w.createdAt,
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

  toDomain(w: WorkspaceRepoDTO): Workspace {
    const collabsProps = this.mapCollabDomain(w.collabs);
    const cInstances = collabsProps.map((c) =>
      Collaborator.create(c).getValue()
    );

    const id = EntityId.from(w._id).getValue();
    const spaceId = EntityId.from(w.spaceId).getValue();
    const wProps: WorkspaceProps = {
      spaceId, 
      maxCollaborators: w.maxCollaborators,
      maxTasks: w.maxTasks,
      owner: EntityId.from(w.owner).getValue(),
      _name: w.name,
      collabs: CollabCollection.create(cInstances),
      totalTasks: w.totalTasks,
      createdAt: w.createdAt
    };
    const output = Workspace.create(wProps, id).getValue();
    return output;
  }

  public toOwnerDTO(ws: Workspace): OwnerWorkspaceDTO {
    const collabs = ws.collabs.Items.map(c => this.mapCollabToDTO(c));
    const output: OwnerWorkspaceDTO = {
      id: ws.id.value,
      createAt: ws.createdAt,
      maxCollaborators: ws.maxCollabs,
      maxTasks: ws.maxTasks,
      name: ws._name,
      owner: ws.owner.value,
      totalTasks: ws.totalTasks,
      collabs,
    }
    return output;
  }

  public mapCollabToDTO(data: Collaborator): OwnerCollabDTO { 
    return {
      email: data.email,
      id: data.id.value,
      name: data._name,
    }
  }
}
