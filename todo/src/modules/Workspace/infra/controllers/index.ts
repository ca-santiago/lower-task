import { CreateWorkspaceController } from "./CreateWorkspace";
import { GetSpaceByOwnerController } from "./GetSpaceByOwner";
import { CreateTaskController } from "./CreateTask";
import {
  createTaskUseCase,
  createWorkspaceUseCase,
  getSpaceByOwnerUseCase,
  getTasksByWorkspaceUseCase,
} from "../../useCases";
import { GetTaskByWorkspaceController } from "./GetTasksByWorkspace";

export const createWorkspaceController = new CreateWorkspaceController(
  createWorkspaceUseCase
);
export const getSpaceByOwnerController = new GetSpaceByOwnerController(
  getSpaceByOwnerUseCase
);
export const createTaskController = new CreateTaskController(createTaskUseCase);
export const getTasksByWorkspaceController = new GetTaskByWorkspaceController(
  getTasksByWorkspaceUseCase
);
