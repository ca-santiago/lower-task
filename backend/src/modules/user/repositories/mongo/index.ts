
import { User } from '../../domain/User'
import { Username } from '../../domain/Username'
import { UserPersistenceDTO } from '../../mappers/repository.dto'
import { IUserRepository } from '../IUserRepo'


// Entities class
import { UserModel } from './user.model'
import { UserMapper } from '../../mappers/user.mapper'


export class MongodbRepository implements IUserRepository {

  constructor(private readonly mapper: UserMapper) { }
  /**
   * Search by user email
   * @param userEmail 
   */
  async exists(ObjecId: string): Promise<boolean> {
    const exists = await UserModel.find({ '$or': [{ email: ObjecId }, { _id: ObjecId }] });
    return exists.length > 0;
  }

  async getUserByUserId(userId: string): Promise<User | null> {
    const exists = await UserModel.findOne({ _id: userId });
    return exists ? this.mapper.toDomain(exists) : null;
  }

  async getUserByEmail(userEmail: string): Promise<User | null> {
    const exists = await UserModel.findOne({ email: userEmail });
    return exists ? this.mapper.toDomain(exists) : null;
  }


  async getUserByUserName(userName: string | Username): Promise<User | null> {
    throw new Error('Method not implemented.')
  }


  async save(user: UserPersistenceDTO): Promise<void> {
    const upsetData = { ...user }
    await UserModel.findByIdAndUpdate(user.id, upsetData, { upsert: true }).exec()
    return
  }

  async delete(userId: string): Promise<void> {
    UserModel.deleteOne({ _id: userId }).exec();
    return
  }

  async getMany(): Promise<User[]> {
    const data = await UserModel.find().exec();

    const mapUser = async (theUser: any) => {
      return await this.mapper.toDomain(theUser as UserPersistenceDTO)
    }
    return Promise.all(data.map(mapUser));
  }

}
