import { CreateWorkspaceController } from "./controllers/CreateWorkspace";
import { GetSpaceByOwnerController } from "./controllers/GetSpaceByOwner";
import { CreateTaskController } from "./controllers/CreateTask";
import {
  createTaskUseCase,
  createWorkspaceUseCase,
  getSpaceByOwnerUseCase,
} from "../useCases";

export const createWorkspaceController = new CreateWorkspaceController(
  createWorkspaceUseCase
);
export const getSpaceByOwnerController = new GetSpaceByOwnerController(
  getSpaceByOwnerUseCase
);
export const createTaskController = new CreateTaskController(createTaskUseCase);
