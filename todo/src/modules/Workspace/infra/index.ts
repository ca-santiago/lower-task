import { CreateWorkspaceController } from "./controllers/CreateWorkspace";
import { createWorkspaceUseCase } from "../useCases";

export const createWorkspaceController = new CreateWorkspaceController(createWorkspaceUseCase);
