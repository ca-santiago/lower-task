import { WorkspaceCollection } from "../../domain/Collections";
import { Space } from "../../domain/Space";
import { SpaceMapper } from "../../mapper/space/mapper";
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
      SpaceModel.findByIdAndUpdate(mappedData._id, upsetData, {
        upsert: true,
      }).exec();
    } catch (err) {
			throw err;
		}
  }

  public async delete(id: string) {
    throw new Error("Method not implemented");
  }

  public async findById(id) {
    throw new Error("Method not implemented");
  }
}
