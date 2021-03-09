import {Space} from "../domain/Space";

export interface ISpaceRepo {
	save(s: Space): Promise<void>;
	findById(id: string): Promise<Space | null>;
	findByOwnerId(id: string): Promise<Space | null>;
	delete(id: string): Promise<void>;
}

