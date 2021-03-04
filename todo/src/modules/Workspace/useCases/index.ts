import { spaceMongoRepo } from "../repository";
import { CreateSpaceUseCase } from "./CreateSpace/UseCase";
import { CreateWorkspaceUseCase } from "./Workspace/CreateWorkspace/UseCase";

export const createSpaceUseCase = new CreateSpaceUseCase(spaceMongoRepo);
export const createWorkspaceUseCase = new CreateWorkspaceUseCase(spaceMongoRepo);
