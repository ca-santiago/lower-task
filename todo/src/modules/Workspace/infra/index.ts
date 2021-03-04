import { CreateWorkspaceController } from "./controllers/CreateWorkspace";
import { GetSpaceByOwnerController } from "./controllers/GetSpaceByOwner";
import {
  createWorkspaceUseCase,
  getSpaceByOwnerUseCase
} from "../useCases";

export const createWorkspaceController = new CreateWorkspaceController(
  createWorkspaceUseCase
);
export const getSpaceByOwnerController = new GetSpaceByOwnerController(
  getSpaceByOwnerUseCase
);
