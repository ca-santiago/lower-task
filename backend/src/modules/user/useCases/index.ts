
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

const mapper = new UserMapper();
// const localRepo = new LocalRepo(mapper);
const repo = new MongodbRepository(mapper);

const createUser = new CreateUser(repo, mapper);
const deleteUser = new DeleteUser(repo);
const getUserInfoUseCase = new GetUserInfoUseCase(repo, mapper);
const loginUseCase = new LoginUseCase(repo, mapper, authService)
const uploadProfilePicture = new UploadProfilePictureUseCase(repo, mapper);
const getUsersProfile = new GetUsersProfileUseCase(repo, mapper);

export {
  createUser,
  deleteUser,
  getUserInfoUseCase,
  loginUseCase,
  uploadProfilePicture,
  getUsersProfile
}
