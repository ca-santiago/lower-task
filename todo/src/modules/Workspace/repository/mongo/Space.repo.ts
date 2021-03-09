import { Result } from "../../../../shared/core/Result";
import { WorkspaceCollection } from "../../domain/Collections";
import { Space } from "../../domain/Space";
import { SpaceMapper } from "../../mapper/space/mapper";
import { SpaceRepoDTO } from "../../mapper/space/repo.dto";
import { ISpaceRepo } from "../ISpaceRepo";
import { IWorkspaceRepo } from "../IWorkspaceRepo";
import { SpaceModel } from "./Space.model";

export class SpaceMongoRepository implements ISpaceRepo {
  public constructor(
    private readonly spaceMapper: SpaceMapper,
    private readonly workspaceRepo: IWorkspaceRepo
  ) {}

  private async saveWorkspaces(w: WorkspaceCollection): Promise<void> {
    await this.workspaceRepo.saveMany(w);
  }

  public async save(s: Space) {
    const mappedData = this.spaceMapper.toRepository(s);
    const upsetData = { ...mappedData };

    try {
      await this.saveWorkspaces(s.workspaces);
      await SpaceModel.findByIdAndUpdate(mappedData._id, upsetData, {
        upsert: true,
      }).exec();
    } catch (err) {
      throw err;
    }
  }

  public async findByOwnerId(id: string): Promise<Space | null> {
    const res = await SpaceModel.findOne({ owner: id }).exec();
    return !res ? null : this.spaceMapper.toDomain(res as SpaceRepoDTO);
  }

  public async delete(id: string) {
    throw new Error("Method not implemented");
  }

  async findById(id: string): Promise<Space | null> {
    const exist = await SpaceModel.findById(id).exec();
    return exist ? this.spaceMapper.toDomain(exist) : null;
  }
}
