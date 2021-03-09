import { CreateWorkspaceController } from "./CreateWorkspace";
import { GetSpaceByOwnerController } from "./GetSpaceByOwner";
import { CreateTaskController } from "./CreateTask";
import { GetTaskByWorkspaceController } from "./GetTasksByWorkspace";
import { GetWorkspacesByOwnerController } from "./GetWorkspacesByOwner";
import {
  createTaskUseCase,
  createWorkspaceUseCase,
  getSpaceByOwnerUseCase,
  getTasksByWorkspaceUseCase,
  getWorkspacesByOwnerUseCase,
  deleteTaskUseCase,
} from "../../useCases";
import { DeleteTaskController } from "./DeleteTask";

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
export const getWorkspacesByOwnerController = new GetWorkspacesByOwnerController(
  getWorkspacesByOwnerUseCase
);
export const deleteTaskController = new DeleteTaskController(deleteTaskUseCase);
