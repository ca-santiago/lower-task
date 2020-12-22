
import { User } from "../domain/User";
import { UserPersistenceDTO } from "../mappers/repository.dto";

export interface IUserRepository {
    exists(userEmail: string): Promise<boolean>;
    getUserByUserId(userId: string): Promise<User | null>;
    getUserByEmail(userEmail: string): Promise<User | null>;
    getUserByUserName(userName: string): Promise<User | null>;
    save(user: UserPersistenceDTO): Promise<void>;
    delete(userId: string): Promise<void>;
    getMany(): Promise<User[]>
}
