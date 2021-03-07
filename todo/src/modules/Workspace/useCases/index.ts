import { WorkspaceService } from "../domain/services/Workspace";
import { spaceMapper } from "../mapper";
import { CreateSpaceUseCase } from "./Space/CreateSpace/UseCase";
import { GetSpaceByOwnerUseCase } from "./Space/GetSpaceByOwner/UseCase";
import { CreateTaskUseCase } from "./Task/CreateTask/UseCase";
import { CreateWorkspaceUseCase } from "./Workspace/CreateWorkspace/UseCase";
import { spaceMongoRepo, workspaceRepo } from "../repository";

const wsService = new WorkspaceService();

export const createSpaceUseCase = new CreateSpaceUseCase(spaceMongoRepo);
export const createWorkspaceUseCase = new CreateWorkspaceUseCase(
  spaceMongoRepo
);
export const getSpaceByOwnerUseCase = new GetSpaceByOwnerUseCase(
  spaceMongoRepo,
  spaceMapper
);
export const createTaskUseCase = new CreateTaskUseCase(
  spaceMongoRepo,
  workspaceRepo,
  wsService
);
