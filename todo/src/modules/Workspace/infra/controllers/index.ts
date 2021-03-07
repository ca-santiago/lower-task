import { CreateWorkspaceController } from "./CreateWorkspace";
import { GetSpaceByOwnerController } from "./GetSpaceByOwner";
import { CreateTaskController } from "./CreateTask";
import {
  createTaskUseCase,
  createWorkspaceUseCase,
  getSpaceByOwnerUseCase,
} from "../../useCases";

export const createWorkspaceController = new CreateWorkspaceController(
  createWorkspaceUseCase
);
export const getSpaceByOwnerController = new GetSpaceByOwnerController(
  getSpaceByOwnerUseCase
);
export const createTaskController = new CreateTaskController(createTaskUseCase);
