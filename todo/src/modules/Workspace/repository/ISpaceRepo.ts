import {Space} from "../domain/Space";

export interface ISpaceRepo {
	save(s: Space): Promise<any>;
	findById(id: string): Promise<any>;
	findByOwnerId(id: string): Promise<Space | null>;
	delete(id: string): Promise<any>;
}

