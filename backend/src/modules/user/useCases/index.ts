
import { CreateUser } from './createUser'
import { DeleteUser } from './deleteUser'
import { GetUserInfoUseCase } from './getUserInfo'
import { LoginUseCase } from './login'
import { UploadProfilePictureUseCase } from './uploadProfilePicture'

import { MongodbRepository } from '../repositories/mongo'
import { UserMapper } from '../mappers/user.mapper'
// import { LocalRepo } from '../repositories/LocalUserRepo'
import { authService } from '../services'
import { GetUsersProfileUseCase } from './getUsersProfile/UseCase'
import {StorageService} from '../../../shared/services/FileSaver'

const mapper = new UserMapper();
// const localRepo = new LocalRepo(mapper);
const repo = new MongodbRepository(mapper);

const createUser = new CreateUser(repo, mapper);
const deleteUser = new DeleteUser(repo);
const getUserInfoUseCase = new GetUserInfoUseCase(repo, mapper, StorageService);
const loginUseCase = new LoginUseCase(repo, mapper, authService, StorageService)
const uploadProfilePicture = new UploadProfilePictureUseCase(repo, mapper, StorageService);
const getUsersProfile = new GetUsersProfileUseCase(repo, mapper, StorageService);

export {
  createUser,
  deleteUser,
  getUserInfoUseCase,
  loginUseCase,
  uploadProfilePicture,
  getUsersProfile
}
