import {WorkspaceCollection} from "../domain/Collections";
import {Workspace} from "../domain/Workspace";

export interface IWorkspaceRepo {
	save(w: Workspace): Promise<void>;
	saveMany(ws: WorkspaceCollection): Promise<void[]>;
}
