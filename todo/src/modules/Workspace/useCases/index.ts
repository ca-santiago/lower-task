import { spaceMapper } from "../mapper";
import { spaceMongoRepo } from "../repository";
import { CreateSpaceUseCase } from "./Space/CreateSpace/UseCase";
import { GetSpaceByOwnerUseCase } from "./Space/GetSpaceByOwner/UseCase";
import { CreateWorkspaceUseCase } from "./Workspace/CreateWorkspace/UseCase";

export const createSpaceUseCase = new CreateSpaceUseCase(spaceMongoRepo);
export const createWorkspaceUseCase = new CreateWorkspaceUseCase(
  spaceMongoRepo
);
export const getSpaceByOwnerUseCase = new GetSpaceByOwnerUseCase(
  spaceMongoRepo, spaceMapper
);
