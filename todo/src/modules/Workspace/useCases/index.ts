import { spaceMongoRepo } from "../repository";
import { CreateSpaceUseCase } from "./CreateSpace/UseCase";

export const createSpaceUseCase = new CreateSpaceUseCase(spaceMongoRepo);
