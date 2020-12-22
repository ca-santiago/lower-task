import { CreateUserController } from "./CreateUserController";
import { DeleteUserController } from "./DeleteUserController";
import { LoginController } from "./LoginController";

import { UpdatePictureController } from "./UpdatePictureController";
import { GetUserInfoController } from "./GetUserInfoController";
import {
    createUser, deleteUser, getUserInfoUseCase,
    getUsersProfile, loginUseCase, uploadProfilePicture
} from "../../useCases";
import { GetUsersProfileController } from "./GetUserProfiles.tmp";

const createUserController = new CreateUserController(createUser);
const deleteUserController = new DeleteUserController(deleteUser);
const loginController = new LoginController(loginUseCase);
const updatePictureController = new UpdatePictureController(uploadProfilePicture);
const getUserInfoController = new GetUserInfoController(getUserInfoUseCase);
const getUsersProfileController = new GetUsersProfileController(getUsersProfile);

export {
    createUserController,
    deleteUserController,
    loginController,
    updatePictureController,
    getUserInfoController,
    getUsersProfileController
}