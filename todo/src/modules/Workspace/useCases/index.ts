import { WorkspaceService } from "../domain/services/Workspace";
import { CreateSpaceUseCase } from "./Space/CreateSpace/UseCase";
import { GetSpaceByOwnerUseCase } from "./Space/GetSpaceByOwner/UseCase";
import { CreateTaskUseCase } from "./Task/CreateTask/UseCase";
import { CreateWorkspaceUseCase } from "./Workspace/CreateWorkspace/UseCase";
import { GetTasksByWorkspaceUseCase } from "./Task/GetTasksByWorkspace/UseCase";
import { DeleteTaskUseCase } from "./Task/DeleteTask/UseCase";

import { spaceMongoRepo, taskRepo, workspaceRepo } from "../repository";
import { spaceMapper, taskMapper, workspaceMapper } from "../mapper";
import { GetWorkspacesByOwnerUseCase } from "./Workspace/GetByOwner/UseCase";

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
export const getTasksByWorkspaceUseCase = new GetTasksByWorkspaceUseCase(
  taskRepo,
  workspaceRepo,
  taskMapper
);
export const getWorkspacesByOwnerUseCase = new GetWorkspacesByOwnerUseCase(
  workspaceRepo,
  workspaceMapper
);
export const deleteTaskUseCase = new DeleteTaskUseCase(
  spaceMongoRepo,
  workspaceRepo,
  taskRepo,
);