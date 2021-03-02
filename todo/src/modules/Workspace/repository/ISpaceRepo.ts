import {Space} from "../domain/Space";

export interface ISpaceRepo {
	save(s: Space): Promise<any>;
	findById(id: string): Promise<any>;
	delete(id: string): Promise<any>;
}

