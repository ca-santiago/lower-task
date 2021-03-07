import { WorkspaceCollection } from "../../domain/Collections";
import { Workspace } from "../../domain/Workspace";
import { WorkspaceMapper } from "../../mapper/workspace/mapper";
import { WorkspaceRepoDTO } from "../../mapper/workspace/repo.dto";
import { ITaskRepo } from "../ITaskRepo";
import { IWorkspaceRepo } from "../IWorkspaceRepo";
import { WorkspaceModel } from "./Workspace.model";

export class WorkspaceRepo implements IWorkspaceRepo {
  constructor(
    private readonly workspaceMapper: WorkspaceMapper,
    private readonly taskRepo: ITaskRepo
  ) {}

  async findByOwner(id: string): Promise<Workspace[]> {
    const results = await WorkspaceModel.find({ owner: id }).exec();
    const output = results.map(ws => {
      return this.workspaceMapper.toDomain(ws as WorkspaceRepoDTO);
    })
    return output;
  }

  public async save(w: Workspace): Promise<void> {
    const mappedWs = this.workspaceMapper.toRepository(w);
    const upsetDate = { ...mappedWs };

    try {
      await this.taskRepo.saveMany(w.tasks);
      await WorkspaceModel.findByIdAndUpdate(w.id.value, upsetDate, {
        upsert: true,
      });
    } catch (err) {}
  }

  public async saveMany(ws: WorkspaceCollection) {
    try {
      return await Promise.all(ws.newItems.map((i) => this.save(i)));
      // await Promise.all(ws.removed.map(i => this.delete(i)))
    } catch (err) {
      return;
    }
  }

  async findById(id: string): Promise<Workspace | null> {
    const res = await WorkspaceModel.findById(id).exec();
    if (!res) return null;
    return this.workspaceMapper.toDomain(res as WorkspaceRepoDTO);
  }
}
