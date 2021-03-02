import { spaceMapper, taskMapper, workspaceMapper } from "../mapper";
import { SpaceMongoRepository, TaskRepo, WorkspaceRepo } from "./mongo";

export const taskRepo = new TaskRepo(taskMapper);
export const workspaceRepo = new WorkspaceRepo(workspaceMapper, taskRepo);
export const spaceMongoRepo = new SpaceMongoRepository(spaceMapper, workspaceRepo);
