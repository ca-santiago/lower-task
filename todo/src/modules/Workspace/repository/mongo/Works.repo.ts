import {WorkspaceCollection} from "../../domain/Collections";
import {Workspace} from "../../domain/Workspace";
import {WorkspaceMapper} from "../../mapper/workspace/mapper";
import {ITaskRepo} from "../ITaskRepo";
import {IWorkspaceRepo} from "../IWorkspaceRepo";
import {WorkspaceModel} from "./Workspace.model";

export class WorkspaceRepo implements IWorkspaceRepo {
	
	constructor(
    private readonly workspaceMapper: WorkspaceMapper, 
	  private readonly taskRepo: ITaskRepo,
		
	){}

  public async save(w: Workspace): Promise<void> {
		const mappedWs = this.workspaceMapper.toRepository(w);
		const upsetDate = {...mappedWs }

		try{
			await this.taskRepo.saveMany(w.tasks);	
			await WorkspaceModel.findByIdAndUpdate(w.id.value, upsetDate, { upsert: true });
		} catch (err) {
		}
	}

	public async saveMany(ws: WorkspaceCollection) {
		return Promise.all(ws.Items.map(async (w) => { await this.save(w) }));
	}
}
